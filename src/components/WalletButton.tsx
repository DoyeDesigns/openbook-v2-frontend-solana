'use client'

import React from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useFont } from '@/context-api/fontContextProvider'

function WalletButton() {
  const {font} = useFont();

  return (
    <WalletMultiButton className="btn w-full h-full"  style={{fontFamily: font }}/>
  )
}

export default WalletButton