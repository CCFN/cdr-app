
import { useRouter } from 'next/router'
import BodyLayout from './layouts/childLayout'
import { AuthProvider } from './layouts/Provider'


export const metadata = {
  title: 'Caritas PL-CDR',
  description: 'A Patient-level data repository',
}

export default function RootLayout({ children }) {
  const router = useRouter()
  if(router.pathname === '/'){
    
  }
  return (
    <div suppressHydrationWarning={true}>
      <BodyLayout>
        {children}
      </BodyLayout>

    </div>
  )
}
