# Hacks/Hackers events aggregator

Runs on AWS Lambda to combine event feeds from Hacks/Hackers local groups into a single feed, then deploys to the `hh-sandbox`, `hh-staging`, and `hh-production` S3 buckets.

## Running locally

First, set up the [AWS SDK](http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-started-nodejs.html#getting-started-nodejs-install-sdk) for Node.

Because AWS Lambda automatically includes the SDK, it is not included in this `package.json`. So it's best to install the SDK globally on your machine before setting up the rest of the project:

```
# Make sure you have your AWS creds set up then install the SDK
$ npm install -g aws-sdk
# Install the rest of the npm package
$ npm install
# Add the AWK SDK to project
$ npm link aws-sdk
# Run the aggregator
$ node -e "require('./index').init()"
```

## Deploying to AWS Lambda

```
# Delete your node_modules dir
$ rm -rf node_modules
# Reinstall excluding the AWS SDK
$ npm install
# Make a zip archive
$ zip -r aggregator *
# Reinstall the AWS SDK
$ npm link aws-sdk
```

Then upload `aggregator.zip` to Lambda.
