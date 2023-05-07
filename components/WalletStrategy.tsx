import React, { useContext } from 'react';
import {
    getInjectiveAddress,
    ChainRestBankApi,
    PaginationOption,
    ChainGrpcBankApi,
} from '@injectivelabs/sdk-ts';
import { getNetworkEndpoints, Network } from '@injectivelabs/networks';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { erc20ABI } from 'wagmi';
import UserContext, { UserContextType } from './UserContext';
import { toast } from 'react-toastify';
const endpoints = getNetworkEndpoints(Network.Mainnet);
const chainGrpcBankApi = new ChainGrpcBankApi(endpoints.grpc);

const chainRestBankApi = new ChainRestBankApi(endpoints.rest);

let provider: any;
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    provider = new ethers.providers.Web3Provider(window.ethereum as any, 'any');
} else {
    provider = new ethers.providers.JsonRpcProvider(
        // 'https://mainnet.infura.io/v3/49e9ff3061214414b9baa13fc93313a6',
        'https://goerli.infura.io/v3/49e9ff3061214414b9baa13fc93313a6',
    );
}

const WalletStrategyComponent = ({ disconnect }: { disconnect: () => void }) => {
    const [showPopup, setShowPopup] = React.useState(false);
    const { address } = useAccount();
    const [injAddress, setInjAddress] = React.useState('');
    const [injBalance, setInjBalance] = React.useState(0);
    const [wethBalance, setWethBalance] = React.useState(0);
    const { wethAddress, isGoerliNetwork } = useContext(UserContext) as UserContextType;

    const handleCopyAddress = () =>
        toast.success('Address copied', {
            position: 'bottom-right',
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            style: { fontSize: '18px' },
        });

    React.useEffect(() => {
        if (!address || !isGoerliNetwork) return;
        const injAddress = getInjectiveAddress(address);

        setInjAddress(injAddress);
        const getInjBalance = async () => {
            const balances = await chainRestBankApi.fetchBalances(injAddress);
            if (!balances.balances.length) return;
            const wei = balances.balances.filter((item) => item.denom === 'inj')[0].amount;
            const amount = ethers.utils.formatEther(wei);
            if (!amount) return;
            setInjBalance(Number(amount));
        };
        const getWethBalance = async () => {
            const tokenContract = new ethers.Contract(wethAddress, erc20ABI, provider);
            try {
                const wethBalance = await tokenContract.balanceOf(address);
                setWethBalance(Number(ethers.utils.formatEther(wethBalance)));
            } catch (e) {
                return;
            }
        };
        getInjBalance();
        getWethBalance();
    }, [address, isGoerliNetwork]);
    if (!address) return null;
    return (
        <div className="relative">
            <button
                className={`rounded-md w-[135px] py-[12px] text-[14px] border-black border-solid border-[2px] text-black ${
                    showPopup ? 'rounded-b-none border-b-0' : ''
                }`}
                onMouseEnter={() => setShowPopup(true)}
                onMouseLeave={() => setShowPopup(false)}
                onClick={() => {
                    navigator.clipboard.writeText(address);
                    handleCopyAddress();
                }}>
                {`${address.substring(0, 6)}...${address.substring(address.length - 6)}`}
            </button>
            {showPopup ? (
                <div
                    className="text-[18px] left-[-165px] absolute rounded-xl rounded-tr-none w-[300px] bg-white border-black border-solid border-[2px] text-black shadow-black "
                    onMouseEnter={() => setShowPopup(true)}
                    onMouseLeave={() => setShowPopup(false)}>
                    <div className="hover:bg-slate-200 hover:cursor-pointer rounded-tl-xl p-[10px] border-black border-solid border-b-[2px]">
                        Injective Address:
                        <p
                            className="inline hover:cursor-pointer"
                            onClick={() => {
                                navigator.clipboard.writeText(injAddress);
                                handleCopyAddress();
                            }}>{` ${injAddress.substring(0, 6)}...${injAddress.substring(
                            injAddress.length - 6,
                        )}`}</p>
                    </div>
                    <div className="hover:bg-slate-200 hover:cursor-pointer p-[10px] border-black border-solid border-b-[2px]">
                        Injective Balance: {injBalance}inj
                    </div>
                    <div className="hover:bg-slate-200 hover:cursor-pointer p-[10px] border-black border-solid border-b-[2px]">
                        Injective WETH: 35WETH
                    </div>
                    <div className="hover:bg-slate-200 hover:cursor-pointer p-[10px] border-black border-solid border-b-[2px]">
                        Goerli WETH: {wethBalance}WETH
                    </div>
                    <div
                        className="p-[10px] border-black hover:cursor-pointer rounded-b-xl hover:bg-slate-200 cursor:pointer"
                        onClick={disconnect}>
                        Disconnect
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default WalletStrategyComponent;
