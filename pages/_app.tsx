import '@component/styles/globals.css';
import type { AppProps } from 'next/app';
import Provider from '@component/components/Provider';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider>
            <Component {...pageProps} />
        </Provider>
    );
}
