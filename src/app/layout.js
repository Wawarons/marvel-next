import NavBar from './Components/NavBar'
import './styles/index.css'
import { Roboto_Condensed } from 'next/font/google'
 
const roboto = Roboto_Condensed({
  weight: '400',
  subsets: ['latin'],
})
 

export const metadata = {
  title: 'ComiVerse',
  description: 'Marvel characters, comics, events. All informations about marvel universe',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
      <NavBar />
        {children}
      </body>
    </html>
  )
}
