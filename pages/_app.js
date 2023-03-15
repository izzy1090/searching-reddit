import Head from 'next/head';
import '../styles/globals.css';
import '../styles/searchBar.css';
import '../styles/threads.css';
import '../styles/threadCount.css';


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Reddit Search Engine</title>
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
