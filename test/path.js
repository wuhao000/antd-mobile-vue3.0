const array = [{
  name: 'afs'
}, {
  name: 'fgs'
}, {
  name: 'dds'
}, {
  name: 'css'
}];
console.log(array.sort((a, b) => {
  return a.name.localeCompare(b.name);
}));

function a(n) {
  if (n === 1) {
    return () => [1];
  }
  return () => undefined
}

console.log(a(1)?.()[0])
console.log(a(2)?.()?.[0])

