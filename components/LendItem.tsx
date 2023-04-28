import Image from 'next/image';
import React, { FC, useContext, useEffect, useState } from 'react';
import Button from './Button';
import { useNft } from 'use-nft';
import { ethers } from 'ethers';
import { abi as metaxchgAbi } from '../contracts/metaxchg.json';
import { erc20ABI } from 'wagmi';
import UserContext, { UserContextType } from './UserContext';

export interface LendItemProps {
    src: any;
    tokenValuation: number;
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
    const { src, tokenValuation, APR, duration, nftAddress, tokenId, index } = props;
    const { metaxchgAddress, wethAddress } = useContext(UserContext) as UserContextType;
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
        const signerAddress = signer.getAddress();

        const contract = new ethers.Contract(metaxchgAddress, metaxchgAbi, signer);
        const tokenContract = new ethers.Contract(wethAddress, erc20ABI, signer);

        const amount = ethers.utils.parseUnits('1000000000', 18);

        const isApproved = await tokenContract.allowance(signerAddress, metaxchgAddress);
        if (!isApproved) {
            const approveTx = {
                to: wethAddress,
                data: tokenContract.interface.encodeFunctionData('approve', [
                    metaxchgAddress,
                    amount,
                ]),
            };
            const approveTxResponse = await signer.sendTransaction(approveTx);
        }

        const gasLimit = 500000;
        const transaction = {
            to: metaxchgAddress,
            data: contract.interface.encodeFunctionData('acceptOffer', [index]),
            gasLimit: gasLimit,
        };
        const transactionResponse = await signer.sendTransaction(transaction);
    };
    return (
        <>
            <div className="flex w-full ">
                <div className="w-[60%] flex">
                    <Image src={nftSrc} alt={''} width={150} height={150} />
                    <div className="flex flex-col justify-between py-[10px] ml-[40px]">
                        <h2>Loan Amount: {tokenValuation} WETH</h2>
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
