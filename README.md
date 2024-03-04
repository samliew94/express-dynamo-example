# ExpressJS + Amazon DynamoDB 
How to make Express talk to Amazon DynamoDB (localhost docker image)

# Setup Docker (Amazon DynamoDB image)
1. Install and run Docker Desktop.
2. Execute `docker pull amazon/dynamodb-local`
3. Download [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) (_needed point dynamodb container to localhost_)
4. Execute `docker run -d -p8000:8000 --name dynamo amazon/dynamodb-local`
5. Point container to localhost `aws dynamodb list-tables --endpoint-url http://localhost:8000`
6. execute `npm run start`.
7. see `dynamo.ts` file for db setup.

# Misc
1. Using AWS SDK 3 libaries for dynamo