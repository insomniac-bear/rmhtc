module.exports.getExt = (fileName) => {
  const m = fileName.match(/\.([^.]+)$/);
  return m && m[1];
}