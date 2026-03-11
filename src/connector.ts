import { setupLuksoConnector, type LuksoConnector } from '@lukso/up-modal'

// Singleton promise — resolves to the connector once setup is complete
export const connectorPromise: Promise<LuksoConnector> = setupLuksoConnector({
  theme: 'light',
})
