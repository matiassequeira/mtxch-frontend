import Image from 'next/image';
import React, { FC, useContext, useEffect, useState } from 'react';
import Button from './Button';
import { useNft } from 'use-nft';
import { ethers } from 'ethers';
import { abi as metaxchgAbi } from '../contracts/metaxchg.json';
import { erc20ABI, useSwitchNetwork } from 'wagmi';
import UserContext, { UserContextType } from './UserContext';
import { requestSwitchNetwork } from '@component/utils/requestSwitchNetwork';
import { toast } from 'react-toastify';
import { checkTxStatus } from '@component/utils/checkTxStatus';
import { notifiDirectPush } from '@component/utils/NotifiDirectPush';

let provider: any;
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    provider = new ethers.providers.Web3Provider(window.ethereum as any);
} else {
    provider = new ethers.providers.JsonRpcProvider(
        // 'https://mainnet.infura.io/v3/49e9ff3061214414b9baa13fc93313a6',
        'https://goerli.infura.io/v3/49e9ff3061214414b9baa13fc93313a6',
    );
}
export interface LendItemProps {
    src: any;
    tokenValuation: number;
    APR: number;
    duration: number;
    nftAddress: string;
    tokenId: number;
    index: number;
    loanValue: number;
    borrower: string;
}

const LendItem: FC<LendItemProps> = (props) => {
    const { src, tokenValuation, APR, duration, nftAddress, tokenId, index, loanValue, borrower } =
        props;
    const { metaxchgAddress, wethAddress } = useContext(UserContext) as UserContextType;
    const [nftSrc, setNftSrc] = useState(src);

    const name =
        nftAddress.toLowerCase() === '0xfa97df129fe2ffdfd63bc3f245dd769f52742bad'
            ? 'Bored Ape Yacht Club'
            : 'CRYPTOPUNKS';

    const { loading, error, nft } = useNft(nftAddress, tokenId.toString());
    useEffect(() => {
        if (nft) {
            setNftSrc(nft.image);
        }
    }, [nft]);

    const acceptOffer = async () => {
        const signer = provider.getSigner();
        const signerAddress = signer.getAddress();
        const network = await provider.getNetwork();

        if (network.name !== 'goerli') await requestSwitchNetwork();
        const contract = new ethers.Contract(metaxchgAddress, metaxchgAbi, signer);
        const tokenContract = new ethers.Contract(wethAddress, erc20ABI, signer);

        const isApproved = await tokenContract.allowance(signerAddress, metaxchgAddress);

        if (Number(isApproved) < tokenValuation) {
            const amount = ethers.utils.parseUnits('1000000000', 18);
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
        const success = await toast.promise(
            checkTxStatus(provider, transactionResponse.hash),
            {
                pending: 'Transaction is penging',
                success: 'Transaction was succeed',
                error: 'Transaction was failed',
            },
            { style: { fontSize: '18px' } },
        );
        if (success) {
            await notifiDirectPush(
                `
               Your Loan Request ${name} #${tokenId} Was Accepted
                `,
                borrower,
            );
        }
    };

    return (
        <div>
            <div className="sm:flex flex w-full ">
                <div className="w-[100%] lg:w-[60%] flex">
                    <Image src={nftSrc} alt={''} width={150} height={150} />
                    <div className="flex flex-col justify-between py-[10px] ml-[10px] sm:ml-[40px]">
                        <h2>Loan: {loanValue} WETH</h2>
                        <h2>Duration: {duration} days</h2>
                        <h2>APR: {APR.toFixed(1)}%</h2>
                    </div>
                </div>
                <div className="hidden sm:flex items-center">
                    <Button color="black" text="Accept" onClick={acceptOffer} />
                </div>
            </div>
            <h1 className=" sm:text-[16px]">{name}</h1>
            <div className="block mt-[20px] sm:hidden">
                <Button color="black" text="Accept" onClick={acceptOffer} />
            </div>
        </div>
    );
};

export default LendItem;
