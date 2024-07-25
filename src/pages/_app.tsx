import Head from 'next/head';
import '@/styles/colors.scss';
import '@/styles/reset.scss';

import { AppPropsWithLayout } from '@/types/nextLayoutWithPage';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}
