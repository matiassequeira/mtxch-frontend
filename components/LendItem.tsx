import Image from 'next/image';
import React, { FC, useContext, useEffect, useState } from 'react';
import Button from './Button';
import { useNft } from 'use-nft';
import { ethers } from 'ethers';
import { abi as metaxchgAbi } from '../contracts/metaxchg.json';
import UserContext, { UserContextType } from './UserContext';

export interface LendItemProps {
    src: any;
    loanAmount: number;
    APR: number;
    duration: number;
    nftAddress: string;
    tokenId: number;
    index: number;
}

let provider: any;
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    provider = new ethers.providers.Web3Provider(window.ethereum as any);
} else {
    provider = new ethers.providers.JsonRpcProvider(
        'https://goerli.infura.io/v3/49e9ff3061214414b9baa13fc93313a6',
    );
}

const LendItem: FC<LendItemProps> = (props) => {
    const { src, loanAmount, APR, duration, nftAddress, tokenId, index } = props;
    const { metaxchgAddress } = useContext(UserContext) as UserContextType;
    const [nftSrc, setNftSrc] = useState(src);

    const { loading, error, nft } = useNft(nftAddress, tokenId.toString());
    useEffect(() => {
        if (nft) {
            setNftSrc(nft.image);
        }
        console.log(nft);
    }, [nft]);

    const acceptOffer = async () => {
        const signer = provider.getSigner();
        const gasPrice = await provider.getGasPrice(); // Get the current gas price
        const gasLimit = 300000;
        const contract = new ethers.Contract(metaxchgAddress, metaxchgAbi, signer);
    };
    return (
        <>
            <div className="flex w-full ">
                <div className="w-[60%] flex">
                    <Image src={nftSrc} alt={''} width={150} height={150} />
                    <div className="flex flex-col justify-between py-[10px] ml-[40px]">
                        <h2>Loan Amount: {loanAmount} WETH</h2>
                        <h2>Duration: {duration} days</h2>
                        <h2>APR: {APR.toFixed(1)}%</h2>
                    </div>
                </div>
                <div className="flex items-center">
                    <Button color="black" text="Accept" onClick={acceptOffer} />
                </div>
            </div>
        </>
    );
};

export default LendItem;
