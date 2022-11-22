import { ExternalProvider } from 'streamr-client'

const CHAIN_ID = 12345 // irrelevant for signing messages

/**
 * Abstract class to use as a starting point for writing a custom provider/signer to be passed to StreamrClient
 * Subclasses must implement only two functions:
 * - getting the address corresponding to the private key
 * - signing (the message hash) with the private key
 */
export abstract class CustomProvider implements ExternalProvider {

    public async request(request: any): Promise<any> {
        const { method, params } = request
        switch (method) {
            case 'eth_requestAccounts':
            case 'eth_accounts':
                const address = await this.getAddress()
                return [address]
            case 'personal_sign':
                const payloadHex = params[0]
                const payload = Buffer.from(payloadHex.substring(2), 'hex')
                return this.signMessage(payload)
            case 'eth_chainId':
                return CHAIN_ID
            default:
                throw new Error(`unknown method: ${method}`)
        }
    }

    abstract getAddress(): Promise<string>;
    abstract signMessage(message: Buffer): Promise<string>;
}
