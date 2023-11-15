"use client"
import Header from './header';
import Footer from './footer';
import axios from 'axios'
//import { FacilityContextProvider } from '../monitoring/context/facilityListContext';

import {useSession } from 'next-auth/react';
import { AuthProvider } from './Provider';
import { FacilityContextProvider } from '../monitoring/context/facilityListContext';


function ChildLayout({children}) {  
    const { data: session } = useSession()
    const user = session?.user;
    if(user){
      axios.defaults.headers.common.Authorization = `Bearer ${user.accessToken}`;
    }
    
      return (
          <>
            <Header />
            <FacilityContextProvider>
              {children}
            </FacilityContextProvider>
            <Footer />
          </>
    
        
      )
}

export default ChildLayout;