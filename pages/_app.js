import Head from 'next/head'
import '../styles/globals.css'
import { useState } from 'react'

function MyApp({ Component, pageProps }) {
  const [isLoading, setLoading] = useState(false)

  
  return (
    <>
      <Head>
        <title>Home</title>
        <meta charSet='utf-8'></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>
      <div>
      <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
