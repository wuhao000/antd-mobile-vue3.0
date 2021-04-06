const camel = function(key) {
  return key.replace(/(-[a-z])/g, function($1) {
    return $1.toUpperCase().replace('-', '');
  });
};

export const camelAttrs = function(attrs) {
  const newAttrs = {};
  for (const attr in attrs) {
    newAttrs[camel(attr)] = attrs[attr];
  }
  return newAttrs;
};
