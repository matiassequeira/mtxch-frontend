import '@component/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

import { Web3Modal } from '@web3modal/react';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, goerli } from 'wagmi/chains';

const modalConfig = {
    ethereum: {
        appName: '',
        chains: [goerli],
        providers: [],
        autoconnect: true,
    },
    prjectId: '',
};

const projectId = '6b8bb11f0139a5d4e9e753fc752d7ac6';
const chains = [mainnet, goerli];

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({ version: 1, chains, projectId }),
    provider,
});

const ethereumClient = new EthereumClient(wagmiClient, chains);

export default function App({ Component, pageProps }: AppProps) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setReady(true);
    }, []);

    return (
        <>
            {ready ? (
                <WagmiConfig client={wagmiClient}>
                    <Component {...pageProps} />
                </WagmiConfig>
            ) : null}

            <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        </>
    );
}
