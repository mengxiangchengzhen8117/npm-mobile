import { getUrlParameters, objectToQueryString } from '../index';

describe('工具函数单测', () => {
  test('objectToQueryString', () => {
    expect(
      objectToQueryString({ page: '1', size: '2kg', key: undefined })
    ).toBe('?page=1&size=2kg');
  });
  test('getUrlParameters', () => {
    expect(
      getUrlParameters('http://url.com/page?name=Adam&surname=Smith')
    ).toEqual({ name: 'Adam', surname: 'Smith' });

    expect(
      getUrlParameters('http://url.com/page?name=Adam&surname=Smith', ['name'])
    ).toEqual({ name: 'Adam' });
  });
});
