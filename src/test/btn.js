it("На странице есть кнопка Add ticket", async () => {
  await browser.url("http://localhost:3000/tickets");
  const elem = await browser.$("#basic-button");
  await elem.click();
  console.log(elem.myFirefoxBrowser)
  await elem.myFirefoxBrowser.isExisting();
});
