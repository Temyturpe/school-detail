import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='general bg-gray-900 text-gray-100 px-3 md:px-20'>
      <div className='topbar fixed top-0 left-0 w-full px-3 md:px-20 py-3 bg-gray-900 z-10'>
        <div className='inner flex justify-between'>
        <Link href='/'><div className='logo text-lg md:text-3xl font-semibold'>PleatueMed</div></Link>
        <div className='links flex gap-2 md:gap-10 items-center text-sm md:text-2xl font-semibold'>
        <Link href='/students'><div className='student bg-gray-50 text-gray-700 rounded-md shadow-xl hover:bg-gray-200 px-2 md:px-8 py-1 md:py-2'>Students</div></Link>
        <Link href='/teachers'><div className='teacher bg-gray-50 text-gray-700 rounded-md shadow-xl hover:bg-gray-200 px-2 md:px-8 py-1 md:py-2'>Teachers</div></Link>
        </div>
        </div>
        
      </div>
      <div className='children pt-20 overflow-hidden'>{children}</div>
      </div>
        </body>
    </html>
  )
}
