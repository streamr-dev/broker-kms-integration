import { createBroker } from 'streamr-broker'
import { KMSProvider } from './kmsProvider'
import { log } from './log'

const kmsProvider = new KMSProvider({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
	region: process.env.AWS_REGION || '',
	keyId: process.env.AWS_KEY_ARN || '',
})

const main = async () => {
	log(`Starting broker with Ethereum address ${await kmsProvider.getAddress()} in KMS`)

    const broker = await createBroker({
        client: {
            auth: {
                ethereum: kmsProvider,
            }
        },
        plugins: {
			// Add whatever interface plugins you want to use
			http: {},
			websocket: {},
        }
    })
    await broker.start()
}

main()
