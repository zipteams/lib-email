# lib-email
A library to send emails via Zipteams' email notification queue

### API
`SQSEmailProvider` - Email provider that uses AWS SQS.

`EmailClient` - Provides a client to send the email.
  - `setSender` - set the 'from' email address
  - `setToRecipients` - (optionally) set the 'to' email address(es)
  - `setReplyTo` - (optionally) set the 'reply-to' email address
  - `setCCRecipients` - (optionally) set the 'cc' email address(es)
  - `setSubject` - set the subject of the email
  - `setBody` - set the body of the email
  - `send` - send the composed email
  Note: You can set the 'to' or 'cc' email addresses, or both.

### Usage
```javascript
const { SQSEmailProvider, EmailClient } = require('@zipteams/email-client');

async function main() {

	const awsAccessKeyId = 'AWS_ACCESS_KEY_ID';
	const awsSecretKey = 'AWS_SECRET_ACCESS_KEY';
	const awsSQSURL = 'SQS_QUEUE_URL';

	const region = 'ap-south-1'; // region is optional, will default to ap-south-1

	const provider = new SQSEmailProvider(awsAccessKeyId, awsSecretKey, awsSQSURL, region);

	const client = new EmailClient(provider);

	const result = await client
		.setSender('info@zipteams.com')
		.setToRecipients(['customer@zipteams.com'])
		.setReplyTo('reply@zipteams.com')
		.setSubject('test mail')
		.setBody('this is a test mail')
		.send();

	console.log(result);
}

main();
```