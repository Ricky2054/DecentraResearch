import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setUser, logout } from '../../store/authSlice'

const WalletConnector = () => {
  const dispatch = useDispatch()
  
  // Mock wallet connection for demo purposes
  const connectWallet = () => {
    const mockAccount = '0x' + Math.random().toString(16).substring(2, 14) + '...'
    dispatch(setUser({ address: mockAccount }))
    alert(`Connected with mock wallet: ${mockAccount}`)
  }
  
  const disconnectWallet = () => {
    dispatch(logout())
    alert('Wallet disconnected')
  }
  
  // Check if we're in "connected" state from localStorage
  const isConnected = localStorage.getItem('isWalletConnected') === 'true'
  
  if (isConnected) {
    return (
      <Button variant="outline-light" onClick={disconnectWallet}>
        Disconnect Mock Wallet
      </Button>
    )
  }
  
  return (
    <Button variant="primary" onClick={connectWallet}>
      Connect Wallet
    </Button>
  )
}

export default WalletConnector