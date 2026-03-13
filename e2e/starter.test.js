describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });
  
  it('should press the electronics button', async () => {
    await waitFor(element(by.text('Electronics'))).toBeVisible().withTimeout(5000);
    await device.takeScreenshot('Home-screen');
    await element(by.text('Electronics')).tap();
    await device.takeScreenshot('Electronics-screen');
  });

  it('should not show running shoes', async () => {
    await waitFor(element(by.text('Running Shoes'))).not.toBeVisible().withTimeout(5000);
    await device.takeScreenshot('No-running-shoes');
  });

  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap();
  //   await expect(element(by.text('World!!!'))).toBeVisible();
  // });
});
