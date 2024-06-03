'use client'

import React, { useState } from 'react'
import { Nav } from './Nav'

import {
    ChevronLeft,
    ChevronRight,
    Folders,
    FolderPlus,
    Settings
  } from "lucide-react"
import { Button } from './ui/button';
import { useWindowWidth } from '@react-hook/window-size';
import Logo from './Logo';

type Props = {}


export default function SideNavBar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onlywidth = useWindowWidth();
  const mobilewidth = onlywidth < 768;

  function toggleSideBar () {
    setIsCollapsed(!isCollapsed)
  }
  return (
    <div className='relative border-r border-[#ADA7C3] px-3 pt-5 h-screen text-[16px]'>
        <Logo />
        
        <Nav
            isCollapsed={ mobilewidth ? true : isCollapsed}
            links={[
              {
                title: "Markets",
                icon: Folders,
                variant: "default",
                href: "/",
              },
              {
                title: "Create Market",
                icon: FolderPlus,
                variant: "ghost",
                href: "/create-market",
              },
              {
                title: "Settings",
                icon: Settings,
                variant: "ghost",
                href: "/settings",
              }
            ]}
          />
          <div className='absolute right-[-20px] bottom-14'>
            <Button onClick={toggleSideBar} variant={'secondary'} className='rounded-full p-2'>
              {isCollapsed ? <ChevronRight className=''/> : <ChevronLeft className=''/>}
            </Button>
          </div>
    </div>
  )
}