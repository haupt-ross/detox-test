describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });
  
  it('should press the electronics button', async () => {
    await waitFor(element(by.text('Electronics'))).toBeVisible().withTimeout(5000);
    await element(by.text('Electronics')).tap();
  });

  it('should not show running shoes', async () => {
    await waitFor(element(by.text('Running Shoes'))).not.toBeVisible().withTimeout(5000);
  });

  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap();
  //   await expect(element(by.text('World!!!'))).toBeVisible();
  // });
});
