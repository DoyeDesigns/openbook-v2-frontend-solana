'use client'

import React from 'react'
import { useLogo } from '@/context-api/logoContextProvider'
import Image from 'next/image'


function Logo() {
    const {logoUrl} = useLogo();
  return (
    <div className='flex justify-center'>
        <Image src={logoUrl} height={100} width={100} alt='logo' className='h-14 w-14'/>
    </div>
  )
}

export default Logo