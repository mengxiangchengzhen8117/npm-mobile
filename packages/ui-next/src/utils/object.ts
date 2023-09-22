export const omit = (obj: { [key: string]: any } = {}, keys: string[] = []) => {
  return Object.entries(obj).reduce((o, [key, value]) => {
    if (keys.indexOf(key) > -1) return o;
    o[key] = value;
    return o;
  }, {});
};
