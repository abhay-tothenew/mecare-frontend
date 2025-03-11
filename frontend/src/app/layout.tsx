import '../styles/globals.css'
import { Inter } from 'next/font/google'
import styles from './layout.module.css'
import ResponsiveContainer from '@/components/layouts/ResponsiveContainer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Healthcare Platform',
  description: 'Book appointments with doctors online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={styles.html}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={`${inter.className} ${styles.body}`}>
        <div className={styles.wrapper}>
          {children}
        </div>
      </body>
    </html>
  )
} 