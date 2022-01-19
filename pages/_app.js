// import "../css/index.css";
import Layout from '@components/layout';
import 'firebase/auth';
import 'firebase/firestore';
import Head from 'next/head';
import React from 'react';
import { Fuego, FuegoProvider } from 'swr-firestore-v9';
import 'tailwindcss/tailwind.css';

const firebaseConfig = {
  apiKey: 'AIzaSyCE5_rHD2WSqkJEcS4meUl8G9wOIIEZxBU',
  authDomain: 'sankey-d7182.firebaseapp.com',
  projectId: 'sankey-d7182',
  storageBucket: 'sankey-d7182.appspot.com',
  messagingSenderId: '382965835236',
  appId: '1:382965835236:web:4d2a80244fe544a2b153f1',
  measurementId: 'G-SSSHEPD0Z3',
};
const fuego = new Fuego(firebaseConfig);

function MyApp({ Component, pageProps }) {
  return (
    <FuegoProvider fuego={fuego}>
      <Layout>
        <Head>
          <title>Next.js Starter Tailwind</title>
          <meta
            name="Description"
            content="A Next.js starter styled using Tailwind CSS."
          />
        </Head>

        <Component {...pageProps} />
      </Layout>
    </FuegoProvider>
  );
}

export default MyApp;
