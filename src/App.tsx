import { useEffect, useRef, useState } from 'react'
import { getConnection, disconnect } from '@wagmi/core'
import { connectorPromise } from './connector'
import type { LuksoConnector } from '@lukso/up-modal'

export default function App() {
  const [address, setAddress] = useState<string | null>(null)
  const [ready, setReady] = useState(false)
  const connectorRef = useRef<LuksoConnector | null>(null)

  useEffect(() => {
    connectorPromise.then((connector) => {
      connectorRef.current = connector
      const { wagmiConfig } = connector

      const syncAddress = () => {
        const conn = getConnection(wagmiConfig)
        setAddress(conn?.isConnected ? conn.address ?? null : null)
      }

      syncAddress()
      setReady(true)

      const unwatch = wagmiConfig.subscribe(
        (s) => s.status,
        syncAddress,
      )
      return unwatch
    })
  }, [])

  function openModal() {
    connectorRef.current?.showSignInModal()
  }

  async function handleDisconnect() {
    const { wagmiConfig } = connectorRef.current!
    await disconnect(wagmiConfig)
    setAddress(null)
  }

  function truncate(addr: string) {
    return `${addr.slice(0, 6)}…${addr.slice(-4)}`
  }

  if (!ready) return null

  if (address) {
    return (
      <main>
        <div className="connected">
          <p className="label">Connected as</p>
          <p className="address" title={address}>{truncate(address)}</p>
          <button className="btn btn-secondary" onClick={handleDisconnect}>Disconnect</button>
        </div>
      </main>
    )
  }

  return (
    <main>
      <div className="disconnected">
        <button className="btn btn-primary" onClick={openModal}>Connect</button>
      </div>
    </main>
  )
}
