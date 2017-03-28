const AWS = require('aws-sdk');
const green = require('chalk').green;
const config = require('./config');

module.exports = function(outputBuffer) {
  function deployToBucket(Bucket, s3) {
    s3.putObject({
        Bucket,
        Key: config.aws.key,
        Body: outputBuffer,
        ACL: 'public-read',
        ContentType: 'text/calendar',
    }, (err, data) => {
      if (err) {
        console.log(err, err.stack)
      } else {
        console.log(green(`Uploaded to ${Bucket}/${config.aws.key}`));
      }
    });
  }

  const s3 = new AWS.S3();
  config.aws.buckets.forEach((bucket) => deployToBucket(bucket, s3));
};
