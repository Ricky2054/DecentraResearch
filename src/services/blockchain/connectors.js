import { InjectedConnector } from '@web3-react/injected-connector'

// Create a simple injected connector with minimal configuration
export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42] // Ethereum mainnet and testnets
})