'use strict';

describe('Manageinfocontacts E2E Tests:', function () {
  describe('Test Manageinfocontacts page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/manageinfocontacts');
      expect(element.all(by.repeater('manageinfocontact in manageinfocontacts')).count()).toEqual(0);
    });
  });
});
