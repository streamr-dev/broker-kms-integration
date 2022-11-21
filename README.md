# Redstone integration


## Install

```
npm install
```

## Dependencies

Streamr Docker environment: see https://github.com/streamr-dev/streamr-docker-dev

CLI-tools: `npm install -g @streamr/cli-tools`


## Run

### 1. Start Streamr Docker environment

```
streamr-docker-dev start
```

### 2. Create a test stream and grant permissions

```
streamr stream create /test --dev --private-key=0x0000000000000000000000000000000000000000000000000000000000000001
```

```
streamr stream grant-permission /test public publish subscribe --dev --private-key=0x0000000000000000000000000000000000000000000000000000000000000001
```

### 3. Start application

```
npm run start
```

The application starts to publish messages.

### 4. Subscribe to the test stream

```
streamr stream subscribe 0x7e5f4552091a69125d5dfcb7b8c2659029395bdf/test --dev
```

CLI-tools receives the messages and prints the payloads to the console.