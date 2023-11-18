import React from 'react'
import '../css/globals.css'
import '../css/monitoring-style.css'
import '../../public/vendor/bootstrap/css/bootstrap.css'
import '../../public/vendor/fontawesome/css/all.min.css'
import ChildLayout from './layouts/childLayout'

export const metadata = {
    title: 'Caritas PL-CDR',
    description: 'A Patient-level data repository',
  }
  
export default function RootLayout( {children} ){
  return (
        <ChildLayout>
            { children }
        </ChildLayout>
  )
}

