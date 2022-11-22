import { createBroker } from 'streamr-broker'
import { CustomProvider } from './customProvider'
import { log } from './log'

class RedstoneProvider extends CustomProvider {
    async getAddress(): Promise<string> {
		// TODO: your KMS implementation here to retrieve the Ethereum address associated with private key
        return ...
    }

    async signHash(msgHash: Buffer): Promise<string> {
		// TODO: your AWS KMS implementation here to sign with a private key
        return ...
    }
}

const main = async () => {
    const broker = await createBroker({
        client: {
            auth: {
                ethereum: new RedstoneProvider()
            }
        },
        plugins: {
			// Add whatever interface plugins you want to use
			websocket: {
				port: 7170,
			}
        }
    })
    await broker.start()
}

main()
