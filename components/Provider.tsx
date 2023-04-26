import React, { useEffect, useState } from 'react';
import UserContext from './UserContext';
import { Web3Modal } from '@web3modal/react';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { goerli } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NftProvider } from 'use-nft';
import { getDefaultProvider } from 'ethers';

const projectId = '6b8bb11f0139a5d4e9e753fc752d7ac6';
const chains = [goerli];

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({ version: 1, chains, projectId }),
    provider,
});
const ethersConfig = {
    provider: getDefaultProvider('https://goerli.infura.io/v3/49e9ff3061214414b9baa13fc93313a6'),
};
const ethereumClient = new EthereumClient(wagmiClient, chains);

const Provider = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient());
    const [ready, setReady] = useState(false);
    const [walletConnected, setWalletConnected] = useState(false);
    const [userAddress, setUserAddress] = useState('');

    useEffect(() => {
        setReady(true);
    }, []);
    return (
        <QueryClientProvider client={queryClient}>
            <NftProvider fetcher={['ethers', ethersConfig]}>
                <UserContext.Provider
                    value={{ walletConnected, setWalletConnected, userAddress, setUserAddress }}>
                    {ready ? <WagmiConfig client={wagmiClient}>{children}</WagmiConfig> : null}

                    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
                </UserContext.Provider>
            </NftProvider>
        </QueryClientProvider>
    );
};

export default Provider;
