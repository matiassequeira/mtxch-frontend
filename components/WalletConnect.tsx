import { useWeb3Modal } from '@web3modal/react';
import { useContext, useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import Button from './Button';
import Link from 'next/link';
import UserContext, { UserContextType } from './UserContext';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
export default function WalletConnect() {
    const [loading, setLoading] = useState(false);
    const { open } = useWeb3Modal();
    const { isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const label = isConnected ? 'Disconnect' : 'Connect Wallet';
    const account = useAccount();
    const { setWalletConnected, setUserAddress } = useContext(UserContext) as UserContextType;

    const route = useRouter();
    const { pathname } = route;
    async function onOpen() {
        setLoading(true);
        await open();
        setLoading(false);
    }

    function onClick() {
        if (isConnected) {
            disconnect();
        } else {
            onOpen();
        }
    }
    useEffect(() => {
        if (!isConnected) return;
        const requestSwitchNetwork = async () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum as any);
            const network = await provider.getNetwork();
            if (window === undefined || window.ethereum === undefined) return;
            if (network.name !== 'goerli') {
                // Ask user to switch to Goerli network
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x5' }], // Goerli chain ID
                });
                console.log('Please switch to the Goerli network');
            }
        };
        requestSwitchNetwork();
    }, [pathname]);
    useEffect(() => {
        isConnected ? setWalletConnected(true) : setWalletConnected(false);
        if (isConnected && account.address) {
            setWalletConnected(true);
            setUserAddress(account.address);
        } else {
            setWalletConnected(false);
            setUserAddress('');
        }
    }, [isConnected, account, setUserAddress, setWalletConnected]);

    if (!isConnected)
        return (
            <Button
                onClick={onClick}
                disabled={loading}
                text={loading ? 'Loading...' : label}
                color="black"></Button>
        );
    return (
        <>
            <div className="space-x-[10px]">
                {pathname === '/' ? (
                    <>
                        <Link
                            href={'/nfts'}
                            className="rounded-md inline-block text-center w-[135px] py-[12px] text-[14px] border-black border-solid border-[2px]">
                            Go To App
                        </Link>
                        <div className="hidden sm:inline-block">
                            <Button
                                onClick={onClick}
                                disabled={loading}
                                text={loading ? 'Loading...' : label}
                                color="black"
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="">
                            <Button
                                onClick={onClick}
                                disabled={loading}
                                text={loading ? 'Loading...' : label}
                                color="black"
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
