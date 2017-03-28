const AWS = require('aws-sdk');
const green = require('chalk').green;
const config = require('./config');

module.exports = function(outputBuffer) {
  function deployToBucket(Bucket, s3) {
    if (!process.env.DEPLOY_S3) {
      console.log(green(`Skipped deploy to ${Bucket}/${config.aws.key}`));
      return;
    }
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
        console.log(green(`Deployed to ${Bucket}/${config.aws.key}`));
      }
    });
  }

  const s3 = new AWS.S3();
  config.aws.buckets.forEach((bucket) => deployToBucket(bucket, s3));
};
