import { EmailProvider, EmailProviderConfig, SQSEmailProvider } from './providers';

export class EmailClient {

	private _provider : EmailProvider;
	private _from : string | undefined = undefined;
	private _to : string[] | undefined = undefined;
	private _replyTo: string | undefined = undefined;
	private _cc : string[] | undefined = undefined;
	private _subject : string | undefined = undefined;
	private _body : string | undefined = undefined;

	private _isValidEmail(email: string): boolean {
		// eslint-disable-next-line
		const validEmailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return validEmailPattern.test(email);
	}

	constructor(provider: EmailProvider) {
		this._provider = provider;
	}

	setSender(from: string): EmailClient {
		if (!this._isValidEmail(from)) throw new Error(`Sender email address is not valid : ${from}`);
		this._from = from;
		return this;
	}

	setToRecipients(to: string[]): EmailClient {
		for (const address of to) {
			if (!this._isValidEmail(address)) throw new Error(`To email address is not valid : ${address}`);
		}
		this._to = to;
		return this;
	}

	setReplyTo(replyTo: string): EmailClient {
		if (!this._isValidEmail(replyTo)) throw new Error(`Reply-to email address is not valid : ${replyTo}`);
		this._replyTo = replyTo;
		return this;
	}
	
	setCCRecipients(cc: string[]): EmailClient {
		for (const address of cc) {
			if (!this._isValidEmail(address)) throw new Error(`To email address is not valid : ${address}`);
		}
		this._cc = cc;
		return this;
	}

	setSubject(subject: string): EmailClient {
		this._subject = subject;
		return this;
	}

	setBody(body: string): EmailClient {
		this._body = body;
		return this;
	}

	send(): Promise<boolean> {

		if (!this._from ) 			throw new Error(`No sender found.`);
		if (!this._to && !this._cc) throw new Error(`Either To or CC are required as recipients. No recipients found.`);
		if (!this._subject ) 		throw new Error(`No subject found.`);
		if (!this._body ) 			throw new Error(`No body found.`);

		const config: EmailProviderConfig = {
			from: <string>this._from,
			subject: <string>this._subject,
			body: <string>this._body,
		};
		if (this._to) config.to = <string[]>this._to;
		if (this._cc) config.cc = <string[]>this._cc;
		if (this._replyTo) config.replyTo = <string>this._replyTo;

		return this._provider.send(config);
	}
}

export { SQSEmailProvider };