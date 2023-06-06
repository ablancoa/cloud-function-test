import puppeteer from "puppeteer";

const service = async (keyword) => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
    args: ["--no-sandbox"],
  });

  const inputField = ".header-search-input";
  const repoList = ".repo-list";

  try {
    const page = await browser.newPage();
    await page.goto("https://www.github.com");
    console.log("page loaded");
    await page.waitForSelector(inputField);
    await page.focus(inputField);
    await page.keyboard.type(keyword);

    await page.keyboard.press("Enter");

    await page.waitForNavigation();
    await page.waitForSelector(repoList);

    const title = await page.evaluate(
      (repoList) =>
        document
          .querySelector(repoList)
          .querySelectorAll("li")[0]
          .querySelector(".f4.text-normal").innerText,
      repoList
    );
    console.log("page end");

    await browser.close();
    return title;
  } catch (e) {
    throw e;
  }
};

export default service;
