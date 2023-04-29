import React, { useContext } from 'react';
import { LendItemProps } from './LendItem';
import Image from 'next/image';
import Button from './Button';
import { ethers } from 'ethers';
import UserContext, { UserContextType } from './UserContext';
import { abi as metaxchgAbi } from '../contracts/metaxchg.json';

let provider: any;
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    provider = new ethers.providers.Web3Provider(window.ethereum as any);
} else {
    provider = new ethers.providers.JsonRpcProvider(
        // 'https://mainnet.infura.io/v3/49e9ff3061214414b9baa13fc93313a6',
        'https://goerli.infura.io/v3/49e9ff3061214414b9baa13fc93313a6',
    );
}

const LoanRequest = (props: LendItemProps) => {
    const { src, tokenValuation, APR, duration, index } = props;
    const { metaxchgAddress } = useContext(UserContext) as UserContextType;

    const cancelOffer = async () => {
        const signer = provider.getSigner();

        const contract = new ethers.Contract(metaxchgAddress, metaxchgAbi, signer);
        const gasLimit = 500000;
        const transaction = {
            to: metaxchgAddress,
            data: contract.interface.encodeFunctionData('cancelOffer', [index]),
            gasLimit: gasLimit,
        };

        const transactionResponse = await signer.sendTransaction(transaction);
    };

    return (
        <div className="flex w-full justify-between">
            <div className="flex">
                <Image src={src} alt={''} width={150} height={150} />
                <div className="flex flex-col justify-between py-[10px] ml-[40px]">
                    <h2>Loan Amount: {tokenValuation} WETH</h2>
                    <h2>Duration: {duration} days</h2>
                    <h2>APR: {APR.toFixed(1)}%</h2>
                </div>
            </div>
            <div className="flex self-center ">
                <Button text="cancel" color="black" onClick={cancelOffer} />
            </div>
        </div>
    );
};

export default LoanRequest;
