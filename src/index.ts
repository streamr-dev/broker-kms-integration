import { Wallet } from 'ethers'
import fetch from 'node-fetch'
import { createBroker } from 'streamr-broker'
import { ConfigTest } from 'streamr-client'
import { CustomProvider } from './customProvider'
import { log } from './log'
import { signHashed } from './signingUtils'

const STREAM_ID = '0x7e5f4552091a69125d5dfcb7b8c2659029395bdf/test'
const PRIVATE_KEY = '0x0000000000000000000000000000000000000000000000000000000000000001'
const HTTP_PLUGIN_PORT = 7171

class RedstoneProvider extends CustomProvider {
    async getAddress(): Promise<string> {
        return new Wallet(PRIVATE_KEY).address
    }

    async signHash(msgHash: Buffer): Promise<string> {
        return signHashed(msgHash, PRIVATE_KEY)
    }
}

const publishMessage = async () => {
    const response = await fetch(`http://localhost:${HTTP_PLUGIN_PORT}/streams/${encodeURIComponent(STREAM_ID)}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            foo: new Date().toISOString()
        })
    })
    log(`Published message to ${STREAM_ID}, response status: ${response.status}`)
}

const main = async () => {
    const broker = await createBroker({
        client: {
            ...ConfigTest,
            auth: {
                ethereum: new RedstoneProvider()
            }
        },
        plugins: {
            http: {
                port: HTTP_PLUGIN_PORT
            }
        }
    })
    await broker.start()

    setInterval(async () => {
        publishMessage()
    }, 1000)
}

main()
