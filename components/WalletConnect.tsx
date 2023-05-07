import { useContext, useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import Button from './Button';
import Link from 'next/link';
import UserContext, { UserContextType } from './UserContext';
import { useRouter } from 'next/router';

import { useConnect } from 'wagmi';
import { ethers } from 'ethers';
import { requestSwitchNetwork } from '@component/utils/requestSwitchNetwork';
import NotifiBell from './NotifiBell';
import WalletStrategyComponent from './WalletStrategy';

export default function WalletConnect() {
    let provider: any;
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
        provider = new ethers.providers.Web3Provider(window.ethereum as any, 'any');
    } else {
        provider = new ethers.providers.JsonRpcProvider(
            // 'https://mainnet.infura.io/v3/49e9ff3061214414b9baa13fc93313a6',
            'https://goerli.infura.io/v3/49e9ff3061214414b9baa13fc93313a6',
        );
    }

    const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
    const { isConnected, address } = useAccount();
    const { disconnect } = useDisconnect();

    const label = address
        ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
        : 'Connect Wallet';
    const account = useAccount();
    const { setIsGoerliNetwork, isGoerliNetwork } = useContext(UserContext) as UserContextType;

    const route = useRouter();
    const { pathname } = route;
    async function onOpen() {
        for (let connector of connectors) {
            connect({ connector });
        }
    }

    function onClick() {
        if (isConnected) {
            disconnect();
        } else {
            onOpen();
        }
    }
    useEffect(() => {
        if (error) {
            if (error.name === 'ConnectorNotFoundError') {
                window.open('https://metamask.io/download/', '_blank');
            }
        }
    }, [error]);

    useEffect(() => {
        const { ethereum } = window as any;

        if (ethereum && ethereum.on && isConnected) {
            const provider = new ethers.providers.Web3Provider(ethereum, 'any');
            const requestSwitchNetwork = async () => {
                try {
                    await provider.send('wallet_switchEthereumChain', [{ chainId: '0x5' }]);
                } catch (error) {
                    console.error('Failed to switch chains:', error);
                }
            };

            const getNetwork = async () => {
                const network = await provider.getNetwork();

                if (network.name === 'goerli') {
                    setIsGoerliNetwork(true);
                    return;
                }
                setIsGoerliNetwork(false);
                requestSwitchNetwork();
            };

            getNetwork();

            const handleChainChanged = async (newNetwork: any, oldNetwork: any) => {
                if (newNetwork.name === 'goerli') {
                    setIsGoerliNetwork(true);
                    return;
                }
                setIsGoerliNetwork(false);
                getNetwork();
            };

            provider.on('network', handleChainChanged);

            return () => {
                if (ethereum.removeListener) {
                    ethereum.removeListener('chainChanged', handleChainChanged);
                }
            };
        }
    }, [isConnected]);

    if (!isConnected)
        return (
            <Button
                onClick={onClick}
                disabled={isLoading}
                text={isLoading ? 'Connecting...' : 'Connect Wallet'}
                color="white"></Button>
        );
    return (
        <>
            <div className="space-x-[10px]">
                {pathname === '/' ? (
                    <div className="space-x-[20px] flex items-center">
                        <NotifiBell />
                        <Link
                            href={'/nfts'}
                            className="rounded-md inline-block text-center w-[135px] py-[12px] text-[14px] border-black  border-solid border-[2px]">
                            Go To App
                        </Link>
                        <div className="hidden sm:inline-block">
                            <WalletStrategyComponent disconnect={onClick} />
                        </div>
                    </div>
                ) : (
                    <div className="space-x-[50px] flex items-center">
                        <NotifiBell />
                        <div className="">
                            <WalletStrategyComponent disconnect={onClick} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
