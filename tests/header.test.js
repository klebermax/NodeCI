const Page = require('./helpers/page');

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  await page.close();
});

describe('When I navigate to the home page', () => {
  test('the header has the correct text', async () => {
    const text = await page.getContentsOf('a.brand-logo');

    expect(text).toEqual('Blogster');
  });

  test('should starts oauth when clicks login', async () => {
    await page.click('.right a');

    const url = await page.url();

    expect(url).toMatch(/accounts\.google\.com/);
  });
});

test('when signed in, shows logout button ', async () => {
  await page.login();

  const logoutText = await page.getContentsOf('a[href="/auth/logout"]');

  expect(logoutText).toEqual('Logout');
});
