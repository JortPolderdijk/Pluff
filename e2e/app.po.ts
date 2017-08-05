import { browser, by, element } from 'protractor';

export class PluffPage {
  navigateTo() {
    return browser.get('/');
  }

  getPageTitle() {
    return browser.getTitle();
  }
}
