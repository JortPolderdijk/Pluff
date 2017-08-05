import { PluffPage } from './app.po';

describe('pluff App', () => {
  let page: PluffPage;

  beforeEach(() => {
    page = new PluffPage();
  });

  it('should be titled Pluff', () => {
    page.navigateTo();
    expect(page.getPageTitle()).toEqual('Pluff');
  });
});
