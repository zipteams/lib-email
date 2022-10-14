import { SQSEmailProvider } from "./sqs";

export type EmailProviderConfig = {
	from: string,
	to?: string[],
	replyTo?: string;
	cc?: string[],
	subject: string,
	body: string,
};

export interface EmailProvider {
	send(config: EmailProviderConfig): Promise<boolean>
}

export { SQSEmailProvider };