/** @type {Detox.DetoxConfig} */
module.exports = {
  artifacts: {
    rootDir: 'artifacts',
    plugins: {
      junit: {
        enabled: true,
        keepOnlyFailedTestsArtifacts: false,
      },
    },
  },
  testRunner: {
    args: {
      '$0': 'jest',
      config: 'e2e/jest.config.js'
    },
    jest: {
      setupTimeout: 120000
    }
  },
  apps: {
    'ios.debug': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/detoxtest.app',
      build: 'xcodebuild -workspace ios/detoxtest.xcworkspace -scheme detoxtest -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build'
    },
    'ios.release': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Release-iphonesimulator/detoxtest.app',
      build: 'xcodebuild -workspace ios/detoxtest.xcworkspace -scheme detoxtest -configuration Release -sdk iphonesimulator -derivedDataPath ios/build'
    },
    'android.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build: 'cd android && ./gradlew :app:assembleDebug :app:assembleAndroidTest -DtestBuildType=debug',
      reversePorts: [
        8081
      ]
    },
    'android.release': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/release/app-release.apk',
      testBinaryPath: 'android/app/build/outputs/apk/androidTest/release/app-release-androidTest.apk',
      build: 'cd android && ./gradlew :app:assembleRelease :app:assembleAndroidTest -DtestBuildType=release'
    }
  },
  devices: {
    'simulator.iphone_16e': {
      type: 'ios.simulator',
      device: { type: 'iPhone 16e' }
    },
    'simulator.iphone_16_pro_max': {
      type: 'ios.simulator',
      device: { type: 'iPhone 16 Pro Max' }
    },
    'simulator.iphone_16_pro': {
      type: 'ios.simulator',
      device: { type: 'iPhone 16 Pro' }
    },
    'simulator.iphone_16_plus': {
      type: 'ios.simulator',
      device: { type: 'iPhone 16 Plus' }
    },
    'simulator.iphone_16': {
      type: 'ios.simulator',
      device: { type: 'iPhone 16' }
    },
    'simulator.iphone_13': {
      type: 'ios.simulator',
      device: { type: 'iPhone 13' }
    },
    'simulator.ipad_mini_a17_pro': {
      type: 'ios.simulator',
      device: { type: 'iPad mini (A17 Pro)' }
    },
    'simulator.ipad_pro_13_m4': {
      type: 'ios.simulator',
      device: { type: 'iPad Pro 13-inch (M4)' }
    },
    'simulator.ipad_pro_11_m4': {
      type: 'ios.simulator',
      device: { type: 'iPad Pro 11-inch (M4)' }
    },
    'simulator.ipad_air_13_m3': {
      type: 'ios.simulator',
      device: { type: 'iPad Air 13-inch (M3)' }
    },
    'simulator.ipad_air_11_m3': {
      type: 'ios.simulator',
      device: { type: 'iPad Air 11-inch (M3)' }
    },
    'simulator.ipad_a16': {
      type: 'ios.simulator',
      device: { type: 'iPad (A16)' }
    },
    attached: {
      type: 'android.attached',
      device: {
        adbName: '.*'
      }
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_9_Pro'
      }
    }
  },
  configurations: {
    'ios.sim.debug': { device: 'simulator.iphone_16_plus', app: 'ios.debug' },
    'ios.sim.release': { device: 'simulator.iphone_16_plus', app: 'ios.release' },
    'ios.sim.iphone_16e.debug': { device: 'simulator.iphone_16e', app: 'ios.debug' },
    'ios.sim.iphone_16e.release': { device: 'simulator.iphone_16e', app: 'ios.release' },
    'ios.sim.iphone_16_pro_max.debug': { device: 'simulator.iphone_16_pro_max', app: 'ios.debug' },
    'ios.sim.iphone_16_pro_max.release': { device: 'simulator.iphone_16_pro_max', app: 'ios.release' },
    'ios.sim.iphone_16_pro.debug': { device: 'simulator.iphone_16_pro', app: 'ios.debug' },
    'ios.sim.iphone_16_pro.release': { device: 'simulator.iphone_16_pro', app: 'ios.release' },
    'ios.sim.iphone_16_plus.debug': { device: 'simulator.iphone_16_plus', app: 'ios.debug' },
    'ios.sim.iphone_16_plus.release': { device: 'simulator.iphone_16_plus', app: 'ios.release' },
    'ios.sim.iphone_16.debug': { device: 'simulator.iphone_16', app: 'ios.debug' },
    'ios.sim.iphone_16.release': { device: 'simulator.iphone_16', app: 'ios.release' },
    'ios.sim.iphone_13.debug': { device: 'simulator.iphone_13', app: 'ios.debug' },
    'ios.sim.iphone_13.release': { device: 'simulator.iphone_13', app: 'ios.release' },
    'ios.sim.ipad_mini_a17_pro.debug': { device: 'simulator.ipad_mini_a17_pro', app: 'ios.debug' },
    'ios.sim.ipad_mini_a17_pro.release': { device: 'simulator.ipad_mini_a17_pro', app: 'ios.release' },
    'ios.sim.ipad_pro_13_m4.debug': { device: 'simulator.ipad_pro_13_m4', app: 'ios.debug' },
    'ios.sim.ipad_pro_13_m4.release': { device: 'simulator.ipad_pro_13_m4', app: 'ios.release' },
    'ios.sim.ipad_pro_11_m4.debug': { device: 'simulator.ipad_pro_11_m4', app: 'ios.debug' },
    'ios.sim.ipad_pro_11_m4.release': { device: 'simulator.ipad_pro_11_m4', app: 'ios.release' },
    'ios.sim.ipad_air_13_m3.debug': { device: 'simulator.ipad_air_13_m3', app: 'ios.debug' },
    'ios.sim.ipad_air_13_m3.release': { device: 'simulator.ipad_air_13_m3', app: 'ios.release' },
    'ios.sim.ipad_air_11_m3.debug': { device: 'simulator.ipad_air_11_m3', app: 'ios.debug' },
    'ios.sim.ipad_air_11_m3.release': { device: 'simulator.ipad_air_11_m3', app: 'ios.release' },
    'ios.sim.ipad_a16.debug': { device: 'simulator.ipad_a16', app: 'ios.debug' },
    'ios.sim.ipad_a16.release': { device: 'simulator.ipad_a16', app: 'ios.release' },
    'android.att.debug': {
      device: 'attached',
      app: 'android.debug'
    },
    'android.att.release': {
      device: 'attached',
      app: 'android.release'
    },
    'android.emu.debug': {
      device: 'emulator',
      app: 'android.debug'
    },
    'android.emu.release': {
      device: 'emulator',
      app: 'android.release'
    }
  }
};
