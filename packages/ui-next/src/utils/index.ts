export type T_Obj<T = string> = { [key: string]: T };

/**
 * eg: objectToQueryString({ page: '1', size: '2kg', key: undefined }); result: '?page=1&size=2kg'
 */
export const objectToQueryString = (queryParameters: object) => {
  return queryParameters
    ? Object.entries(queryParameters).reduce((queryString, [key, val]) => {
      const symbol = queryString.length === 0 ? '?' : '&';
      queryString += typeof val === 'string' ? `${symbol}${key}=${val}` : '';
      return queryString;
    }, '')
    : '';
};

/**
 * eg: getBaseUrl('http://url.com/page?name=Adam&surname=Smith');   result: 'http://url.com/page'
 */
export const getBaseUrl = (url: string) => url.replace(/[?#].*$/, '');

/**  eg: getUrlHash('http://localhost:8080/#/utils-klm') result:  /utils-klm */
export const getUrlHash = (url: string) => url.match(/#.*$/)?.[0]?.slice(1) ?? '';

/**  eg: getUrlHash('http://localhost:8080/#/utils-klm') result:  http://localhost:8080/ */
export const deleteUrlHash = (url: string) => url.replace(/#.*$/, '');

export const isNil = (value) => value === undefined || value === null;

/**
 * eg: getUrlParameters('google.com'); result:  {}
 * eg: getUrlParameters('http://url.com/page?name=Adam&surname=Smith'); result:  {name: 'Adam', surname: 'Smith'}
 * eg: getUrlParameters('http://url.com/page?name=Adam&surname=Smith', ['name']); result:  {name: 'Adam', surname: 'Smith'}
 */
export const getUrlParameters = (url: string, selectKeys?: string[]) => {
  const queryArr = deleteUrlHash(url).match(/([^?=&]+)(=([^&]*))/g) || [];
  const formatQueryArr = queryArr.map((str) => str.split('='));
  const filterQueryArr =
    Array.isArray(selectKeys) && selectKeys.length > 0
      ? formatQueryArr.filter(([key]) => selectKeys.indexOf(key) !== -1)
      : formatQueryArr;

  type tt = typeof selectKeys;

  const parameters = filterQueryArr.reduce((queryObj, [key, value]) => {
    queryObj[key] = value;
    return queryObj;
  }, {} as { [key: string]: string });

  return parameters;
};

/**
 * eg: addUrlParameters('https://www.typescriptlang.org/play?key=213#sd', { test: '2' }); result: https://www.typescriptlang.org/play?key=213&test=2#sd
 */
export const addUrlParameters = (url: string, parameter: T_Obj = {}) => {
  const originParameters = getUrlParameters(url);
  const hash = getUrlHash(url);
  const baseUrl = getBaseUrl(url);

  return (
    baseUrl +
    objectToQueryString({ ...originParameters, ...parameter }) +
    `#${hash}`
  );
};
