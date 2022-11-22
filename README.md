# Using AWS KMS to sign Streamr messages

This repo contains an example of running a Streamr Broker that signs messages using a private key stored on AWS KMS.

The Broker is started programmatically by the [index.ts](src/index.ts) wrapper. The wrapper passes to the Broker a [custom provider that signs with KMS](src/kmsProvider.ts).

## Setting up on AWS

- Create an IAM user if needed. Make note of their Access Key ID and Secret Access Key.
- Create a KMS key of type `ECC_SECG_P256K1` and give the IAM user permissions to use the key. Make note of the key's ID (arn).

## Dependencies

- node.js 16+


## Installing

Clone the repository, then in the repository root:

```
git@github.com:streamr-dev/kms-integration.git
cd kms-integration
npm install
```

## Running

Pass the AWS credentials and KMS key id in the following environment variables to `npm start`:

- `AWS_ACCESS_KEY_ID` - the access key id for the IAM user with permission to use the KMS key
- `AWS_SECRET_ACCESS_KEY` - the secret access key for the same user
- `AWS_REGION` - the region where the KMS key is
- `AWS_KEY_ARN` - the arn of the KMS key, for example `arn:aws:kms:us-east-1:765457315199:key/16606223-2774-4535-a1af-af80cdcb6f51`

For example:

```
AWS_ACCESS_KEY_ID=... AWS_SECRET_ACCESS_KEY=... AWS_REGION=... AWS_KEY_ARN=... npm start
```

If everything works, the Broker will print on startup the Ethereum address associated with the private key stored in KMS:

```
Starting broker with Ethereum address [...] in KMS
```
