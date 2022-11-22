import { CustomProvider } from './customProvider'
import { AwsKmsSigner, AwsKmsSignerCredentials } from 'ethers-aws-kms-signer'

export class KMSProvider extends CustomProvider {
	private signer: AwsKmsSigner

	constructor(credentials: AwsKmsSignerCredentials) {
		super()
		this.signer = new AwsKmsSigner(credentials)
	}

    async getAddress(): Promise<string> {
        return this.signer.getAddress()
    }

    async signMessage(message: Buffer): Promise<string> {
        return this.signer.signMessage(message)
    }
}