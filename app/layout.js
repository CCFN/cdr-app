import './css/globals.css'
import './css/login-uploads-style.css'
import '../public/vendor/bootstrap/css/bootstrap.css'
import '../public/vendor/fontawesome/css/all.min.css'
import { AuthProvider } from './(routes)/layouts/Provider'




export const metadata = {
  title: 'Caritas PL-CDR',
  description: 'A Patient-level data repository',
}

export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <head>
          <link rel='icon' href='/images/icon/favicon.ico' type="image/x-icon"/>
        </head>
        <body suppressHydrationWarning={true} >
          <AuthProvider>
                {children}
          </AuthProvider>
        </body>
      </html>
    )
}
