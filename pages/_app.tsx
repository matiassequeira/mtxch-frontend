import '@component/styles/globals.css';
import '@component/styles/notifi.css';
import type { AppProps } from 'next/app';
import Provider from '@component/components/Provider';
import Header from '@component/components/Header';
import Footer from '@component/components/Footer';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider>
            <Header />
            <Component {...pageProps} />
        </Provider>
    );
}
