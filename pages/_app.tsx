import '@component/styles/globals.css';
import '@notifi-network/notifi-react-card/dist/index.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import Provider from '@component/components/Provider';
import Header from '@component/components/Header';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider>
            <Header />
            <Component {...pageProps} />
        </Provider>
    );
}
