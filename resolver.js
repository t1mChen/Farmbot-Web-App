// resolver.js
module.exports = function resolver(request, options) {
  if (request === 'math-intrinsics') {
    return null;  // Mock it by returning null, meaning it's ignored
  }
  return require.resolve(request);
};
