const {
  withProjectBuildGradle,
  withAppBuildGradle,
  withAndroidManifest,
  withDangerousMod,
} = require('@expo/config-plugins');
const path = require('path');
const fs = require('fs');

// 1. Add Detox maven repo to project-level build.gradle
const withDetoxProjectGradle = (config) => {
  return withProjectBuildGradle(config, (mod) => {
    let contents = mod.modResults.contents;

    if (!contents.includes('Detox-android')) {
      // Add an allprojects block with the Detox maven repo.
      // Expo 54 / RN 0.81 generated build.gradle has no allprojects block by default.
      contents += `\nallprojects {\n    repositories {\n        maven { url "\$rootDir/../node_modules/detox/Detox-android" }\n    }\n}\n`;
    }

    mod.modResults.contents = contents;
    return mod;
  });
};

// 2. Patch app/build.gradle: add test runner config + Detox dependency
const withDetoxAppGradle = (config) => {
  return withAppBuildGradle(config, (mod) => {
    let contents = mod.modResults.contents;

    // Add testBuildType + testInstrumentationRunner inside defaultConfig
    if (!contents.includes('testBuildType')) {
      contents = contents.replace(
        /(defaultConfig\s*\{[^}]*)(versionCode\s+\d+)/,
        (match, prefix, versionCode) =>
          `${prefix}${versionCode}\n        testBuildType System.getProperty('testBuildType', 'debug')\n        testInstrumentationRunner 'androidx.test.runner.AndroidJUnitRunner'`,
      );
    }

    // Add Detox proguard file to release buildType
    if (!contents.includes('proguard-rules-app.pro')) {
      contents = contents.replace(
        /(release\s*\{[^}]*proguardFiles[^\n]*)/,
        `$1\n            proguardFile "\${rootProject.projectDir}/../node_modules/detox/android/detox/proguard-rules-app.pro"`,
      );
    }

    // Add androidTestImplementation in dependencies block
    if (!contents.includes('com.wix:detox')) {
      contents = contents.replace(
        /dependencies\s*\{/,
        `dependencies {\n    androidTestImplementation('com.wix:detox:+')`,
      );
    }

    // Fix duplicate libfbjni.so conflict between react-native-gesture-handler and react-android
    if (!contents.includes('pickFirst')) {
      contents = contents.replace(
        /android\s*\{/,
        `android {\n    packagingOptions {\n        pickFirst 'lib/arm64-v8a/libfbjni.so'\n        pickFirst 'lib/x86_64/libfbjni.so'\n        pickFirst 'lib/x86/libfbjni.so'\n        pickFirst 'lib/armeabi-v7a/libfbjni.so'\n    }`,
      );
    }

    mod.modResults.contents = contents;
    return mod;
  });
};

// 3. Create DetoxTest.java
const withDetoxTestClass = (config) => {
  return withDangerousMod(config, [
    'android',
    async (mod) => {
      const packageName = mod.android?.package ?? 'com.haupt.ross.detoxtest';
      const packagePath = packageName.replace(/\./g, '/');
      const testDir = path.join(
        mod.modRequest.platformProjectRoot,
        `app/src/androidTest/java/${packagePath}`,
      );

      fs.mkdirSync(testDir, { recursive: true });

      const testFilePath = path.join(testDir, 'DetoxTest.java');
      if (!fs.existsSync(testFilePath)) {
        fs.writeFileSync(
          testFilePath,
          `package ${packageName};

import com.wix.detox.Detox;
import com.wix.detox.config.DetoxConfig;

import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;

import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.filters.LargeTest;
import androidx.test.rule.ActivityTestRule;

@RunWith(AndroidJUnit4.class)
@LargeTest
public class DetoxTest {
    @Rule
    public ActivityTestRule<MainActivity> mActivityRule = new ActivityTestRule<>(MainActivity.class, false, false);

    @Test
    public void runDetoxTests() {
        DetoxConfig detoxConfig = new DetoxConfig();
        detoxConfig.idlePolicyConfig.masterTimeoutSec = 90;
        detoxConfig.idlePolicyConfig.idleResourceTimeoutSec = 60;
        detoxConfig.rnContextLoadTimeoutSec = (BuildConfig.DEBUG ? 180 : 60);

        Detox.runTests(mActivityRule, detoxConfig);
    }
}
`,
        );
      }

      return mod;
    },
  ]);
};

// 4. Create network_security_config.xml
const withDetoxNetworkSecurityConfig = (config) => {
  return withDangerousMod(config, [
    'android',
    async (mod) => {
      const xmlDir = path.join(
        mod.modRequest.platformProjectRoot,
        'app/src/main/res/xml',
      );

      fs.mkdirSync(xmlDir, { recursive: true });

      const xmlPath = path.join(xmlDir, 'network_security_config.xml');
      if (!fs.existsSync(xmlPath)) {
        fs.writeFileSync(
          xmlPath,
          `<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">10.0.2.2</domain>
        <domain includeSubdomains="true">localhost</domain>
    </domain-config>
</network-security-config>
`,
        );
      } else {
        // If it exists, ensure the Detox domains are included
        let existing = fs.readFileSync(xmlPath, 'utf-8');
        if (!existing.includes('10.0.2.2')) {
          existing = existing.replace(
            '</network-security-config>',
            `    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">10.0.2.2</domain>
        <domain includeSubdomains="true">localhost</domain>
    </domain-config>
</network-security-config>`,
          );
          fs.writeFileSync(xmlPath, existing);
        }
      }

      return mod;
    },
  ]);
};

// 5. Register networkSecurityConfig in AndroidManifest.xml
const withDetoxManifest = (config) => {
  return withAndroidManifest(config, (mod) => {
    const application = mod.modResults.manifest.application?.[0];
    if (application && !application.$['android:networkSecurityConfig']) {
      application.$['android:networkSecurityConfig'] =
        '@xml/network_security_config';
    }
    return mod;
  });
};

// Compose all modifications
const withDetox = (config) => {
  config = withDetoxProjectGradle(config);
  config = withDetoxAppGradle(config);
  config = withDetoxTestClass(config);
  config = withDetoxNetworkSecurityConfig(config);
  config = withDetoxManifest(config);
  return config;
};

module.exports = withDetox;
