const Minio = require('minio');
const {
  STORAGE_USER,
  STORAGE_PASSWORD,
  STORAGE_ROUTE,
  STORAGE_PUBLIC_BUCKET,
  STORAGE_PRIVATE_BUCKET
} = require('../const');

const minioClient = new Minio.Client({
  endPoint: STORAGE_ROUTE,
  accessKey: STORAGE_USER,
  secretKey: STORAGE_PASSWORD,
});

module.exports.putObject = function (fileName, buffer, isPrivate = false) {
  const bucketName = isPrivate ? STORAGE_PRIVATE_BUCKET : STORAGE_PUBLIC_BUCKET;

  minioClient.putObject(bucketName, fileName, buffer, function (err, etag) {
    if (err) {
      return err;
    }
    return etag;
  });

  return `https://${STORAGE_ROUTE}/${bucketName}/${fileName}`
}

module.exports.presignetPutObject = function (fileName) {
  const bucketName = isPrivate ? STORAGE_PRIVATE_BUCKET : STORAGE_PUBLIC_BUCKET;

  return minioClient.presignedPutObject(bucketName, fileName, 24 * 60 * 60, function(err, presignedUrl) {
    if (err) {
      return err;
    }
    console.log(presignedUrl);
    return presignedUrl;
  })
}
