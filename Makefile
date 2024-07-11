deploy:
	npm install && npm run build
	AWS_REGION=us-east-2 aws-vault exec skymavis --no-session -- cdk deploy RoutingAPIStack
