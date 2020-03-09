it("На странице есть кнопка Add ticket", async () => {
  await browser.url("http://localhost:3000/tickets");
  const btn = await $('#basic-button');
  const existing = await btn.isExisting();
  console.log(browser)
  return existing;
});
