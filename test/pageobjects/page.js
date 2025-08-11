class Page {
    open(path) {
        return browser.url(`https://www.saucedemo.com/${path}`);
    }
}
export default Page;