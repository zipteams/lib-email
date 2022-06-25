import  { SendMessageCommand, SendMessageCommandInput, SQSClient, SQSClientConfig } from "@aws-sdk/client-sqs";
import { EmailProvider, EmailProviderConfig } from "..";

export class SQSEmailProvider implements EmailProvider {

	private _client: SQSClient | null = null;
	private _queue: string;

	constructor(accessKeyId: string, secretAccessKey: string, queue: string, region = 'ap-south-1') {
		const config: SQSClientConfig = {
			credentials: {
				accessKeyId,
				secretAccessKey,
			},
			region,
		};

		this._client = new SQSClient(config);
		this._queue = queue;
	}

	async send(config: EmailProviderConfig): Promise<boolean> {
		const params: SendMessageCommandInput = {
			MessageBody: JSON.stringify(config),
			QueueUrl: this._queue,
		};
		await this._client?.send(new SendMessageCommand(params));

		return true;
	}
}