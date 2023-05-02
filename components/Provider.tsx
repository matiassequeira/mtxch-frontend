import React, { useEffect, useState } from 'react';
import UserContext from './UserContext';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { goerli } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NftProvider } from 'use-nft';
import { getDefaultProvider } from 'ethers';

import { infuraProvider } from 'wagmi/providers/infura';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

const projectId = '6b8bb11f0139a5d4e9e753fc752d7ac6';

const chains = [goerli];

const { provider } = configureChains(
    [goerli],
    [infuraProvider({ apiKey: '<https://goerli.infura.io/v3/49e9ff3061214414b9baa13fc93313a6>' })], // Get Infura apiKey at https://www.infura.io/
);

export const connector = new MetaMaskConnector({ chains });
const wagmiClient = createClient({
    autoConnect: true,
    connectors: [connector],
    provider: provider,
});

const client = createClient({
    autoConnect: true,
    connectors: [new MetaMaskConnector({ chains })],
    provider,
});

const ethersConfig = {
    provider: getDefaultProvider('https://goerli.infura.io/v3/49e9ff3061214414b9baa13fc93313a6'),
};

const Provider = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient());
    const [ready, setReady] = useState(false);
    const [walletConnected, setWalletConnected] = useState(false);
    const [userAddress, setUserAddress] = useState('');
    const metaxchgAddress = '0xe8C666d6a9965FdFF1A6Db2af8B1a9BF43670629';
    const wethAddress = '0x91Efc46E7C52ab1fFca310Ca7972AeA48891E5CD';
    const allowedCollections = [
        '0xFa97Df129fE2FfDFd63bc3F245dd769f52742Bad',
        '0x3775060CB5F84A3525a9a07c703B565228CcCA16',
    ]
        .join(',,,')
        .toLowerCase()
        .split(',,,');
    useEffect(() => {
        setReady(true);
    }, []);
    return (
        <QueryClientProvider client={queryClient}>
            <NftProvider fetcher={['ethers', ethersConfig]}>
                <UserContext.Provider
                    value={{
                        walletConnected,
                        setWalletConnected,
                        userAddress,
                        setUserAddress,
                        metaxchgAddress,
                        allowedCollections,
                        wethAddress,
                    }}>
                    {ready ? <WagmiConfig client={client}>{children}</WagmiConfig> : null}
                </UserContext.Provider>
            </NftProvider>
        </QueryClientProvider>
    );
};

export default Provider;
