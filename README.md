# Hacks/Hackers events aggregator

Runs on AWS Lambda to combine event feeds from Hacks/Hackers local groups into a single feed, then deploys to the `hh-sandbox`, `hh-staging`, and `hh-production` S3 buckets.

After extensive investigation, we are only pulling from group events inside EventBrite.

The MeetUp API at last check was paid. An earlier version of the application scraped data from the MeetUp site, but this strategy is not recommended as a long-term solution, as any change to the MeetUp website introduces breaking changes to our app. (While paid, the MeetUp API would very likely be versioned, and would allow us to coordinate updates to the site when we are able to). 
The Facebook API does not provide an automatable way to continually download event information. (I.E. In order for the application to function, it would be required for a user to manually approve the access on a regular basis.)

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

# Required Environment Variables
LONDON_EVENTBRITE_TOKEN: Eventbrite API token for the London Hacks/Hackers group

# Additional Required Environment Deployment Variables
AWS_ACCESS_KEY: AWS Secret Access key that allows access to S23 storage accounts
DEPLOY_S3: Variable present indicating whether to deploy to the S3 accounts or not. If this variable is set, deployment will happen. If not, deployment will be skipped.
