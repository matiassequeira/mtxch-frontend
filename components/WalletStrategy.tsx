import React, { useContext, useRef } from 'react';
import Image from 'next/image';

import {
    getInjectiveAddress,
    ChainRestBankApi,
} from '@injectivelabs/sdk-ts';
import { getNetworkEndpoints, Network } from '@injectivelabs/networks';
import { useAccount, useDisconnect } from 'wagmi';
import { ethers } from 'ethers';
import { erc20ABI } from 'wagmi';
import UserContext, { UserContextType } from './UserContext';
import { toast } from 'react-toastify';
import punk1 from '../public/punk1.png';

const endpoints = getNetworkEndpoints(Network.Mainnet);
const chainRestBankApi = new ChainRestBankApi(endpoints.rest);

const provider = new ethers.providers.JsonRpcProvider(
    // 'https://mainnet.infura.io/v3/49e9ff3061214414b9baa13fc93313a6',
    "https://goerli.infura.io/v3/49e9ff3061214414b9baa13fc93313a6"
  );

const WalletStrategyComponent = ({closeMenu}: {closeMenu: ()=>void}) => {
    const { address } = useAccount();
    const [injAddress, setInjAddress] = React.useState('');
    const [injBalance, setInjBalance] = React.useState(0);
    const [wethBalance, setWethBalance] = React.useState(0);
    const { wethAddress, isGoerliNetwork } = useContext(UserContext) as UserContextType;
    const { disconnect } = useDisconnect()
    const modalRef = useRef<HTMLDivElement>(null)

    const disconnectWallet = ()=>{
        closeMenu()
        disconnect()
    }

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
        if (!address) return;


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
    }, [address]);

    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                closeMenu()
            }
        }
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (!address) return null;
    return (
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-[#00000060]">
            <div ref={modalRef} className='relative bg-white w-[500px] rounded-xl py-[25px] text-[20px] font-bold'>
            <svg onClick={closeMenu} className='absolute right-2 top-2 hover:cursor-pointer hover:scale-125 active:scale-95 transition-all' width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="Menu / Close_MD">
<path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</svg>

<svg onClick={disconnectWallet} className='absolute right-[35px] top-2 hover:cursor-pointer hover:scale-125 active:scale-95 transition-all' width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.9908 7.82251C16.2897 7.5357 16.7644 7.54547 17.0512 7.84433L20.541 11.4807C20.8195 11.7709 20.8195 12.2291 20.541 12.5193L17.0512 16.1557C16.7644 16.4545 16.2897 16.4643 15.9908 16.1775C15.692 15.8907 15.6822 15.4159 15.969 15.1171L18.2404 12.7502L11.2727 12.7502C10.8585 12.7502 10.5227 12.4144 10.5227 12.0002C10.5227 11.586 10.8585 11.2502 11.2727 11.2502L18.2408 11.2502L15.969 8.88295C15.6822 8.58409 15.692 8.10932 15.9908 7.82251Z" fill="#000000"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.25 4C3.25 3.58579 3.58579 3.25 4 3.25H13.4545C13.8688 3.25 14.2045 3.58579 14.2045 4V7C14.2045 7.41421 13.8688 7.75 13.4545 7.75C13.0403 7.75 12.7045 7.41421 12.7045 7V4.75H4.75V19.25H12.7045V17C12.7045 16.5858 13.0403 16.25 13.4545 16.25C13.8688 16.25 14.2045 16.5858 14.2045 17V20C14.2045 20.4142 13.8688 20.75 13.4545 20.75H4C3.58579 20.75 3.25 20.4142 3.25 20V4Z" fill="#000000"/>
</svg>
                <div className='flex flex-col items-center space-y-[10px]'>

             
            <Image
                        src={punk1}
                        className=' rounded-[50%]'
                        alt={''}
                        width={100}
                        height={100}
                        placeholder="blur"
                    />
                <div className='hover:cursor-pointer'  onClick={() => {
                    navigator.clipboard.writeText(address);
                    handleCopyAddress();
                }}>{` ${address.substring(0, 4)}...${address.substring(
                    address.length - 4,
                )}`}</div>

                <div className='hover:cursor-pointer'  onClick={() => {
                    navigator.clipboard.writeText(injAddress);
                    handleCopyAddress();
                }}>{` ${injAddress.substring(0, 4)}...${injAddress.substring(
                    injAddress.length - 4,
                )}`}</div>
                   </div>

                   <div className='flex justify-center space-x-[10px] mt-[50px]'>
                    <div className='w-[200px] py-[16px] text-center border-2 border-slate-950 rounded-xl hover:scale-105 active:scale-95'>
                        Goerli: {wethBalance} WETH
                    </div>
                    <div className='w-[200px] py-[16px] text-center border-2 border-slate-950 rounded-xl hover:scale-105 active:scale-95'>
                        Injective: {injBalance} INJ
                    </div>
                   </div>
            </div>
        </div>
    );
};

export default WalletStrategyComponent;
