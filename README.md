# Token Swapping in DeFi Applications

An example ERC-20 swap application built on [Next.js App Router](https://nextjs.org/docs) with [0x Swap API](https://0x.org/docs/0x-swap-api/introduction) and [RainbowKit](https://www.rainbowkit.com/).

Swap API enables your users to easily and conveniently trade tokens at the best prices directly in your app. With one simple integration, 0x unlocks thousands of tokens on the most popular blockchains and aggregated liquidity from 100+ AMMs and professional market makers.

This demo app covers best practices for how to use the 0x Swap API's [/price](https://0x.org/docs/0x-swap-api/api-references/get-swap-v1-price) endpoint for indicative pricing and the [/quote](https://0x.org/docs/0x-swap-api/api-references/get-swap-v1-quote) endpoint for firm quotes.

> [!WARNING]  
> This is a demo, and is not ready for production use. The code has not been audited and does not account for all error handling. Use at your own risk.
> 

<img width="432" alt="Screenshot 2024-04-19 at 1 59 24 PM" src="https://github.com/0xProject/token-swap-dapp-course-code/assets/8042156/85588b68-13a1-49f4-9ebc-937b07f88750">


## Getting Started

1. Setup the required API keys

| **API Keys**           | **Description**                                                                                                        | **Code**                                                                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| alchemyId              | Alchemy API key (create one [here](https://docs.alchemy.com/docs/alchemy-quickstart-guide#1key-create-an-alchemy-key)) | Add [here](https://github.com/0xProject/0x-nextjs-demo-app/blob/main/pages/_app.tsx#L14)                                      |
| walletConnectProjectId | WalletConnect's SDK to help with connecting wallets (create one [here](https://cloud.walletconnect.com/sign-in))       | Add [here]                                                                                                                    |
| 0x                     | 0x API key (create one [here](https://0x.org/docs/introduction/getting-started))                                       | Add for /price [here](https://github.com/0xProject/0x-nextjs-demo-app/blob/main/pages/api/price.ts#L18) and for /quote [here] |

2. Install project dependencies

```
npm install
```

3. Start the Next.js development server

```
npm run dev
```

4. Navigate to [http://localhost:3000](http://localhost:3000)

```
open http://localhost:3000
```

## Supported Networks

Swap API is supported on the following chains. Access liquidity from the chain you want by using the corresponding chain URI when making a request:

- Ethereum (Mainnet): https://api.0x.org/
- Ethereum (Sepolia): https://sepolia.api.0x.org/
- Arbitrum: https://arbitrum.api.0x.org/
- Avalanche: https://avalanche.api.0x.org/
- Base https://base.api.0x.org/
- Binance Smart Chain: https://bsc.api.0x.org/
- Celo: https://celo.api.0x.org/
- Fantom: https://fantom.api.0x.org/
- Optimism: https://optimism.api.0x.org/
- Polygon: https://polygon.api.0x.org/

Read more accessing the [API endpoints](https://0x.org/docs/0x-swap-api/api-references/overview).
