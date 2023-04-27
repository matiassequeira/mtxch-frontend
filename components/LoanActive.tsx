import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useNft } from 'use-nft';

interface LoanActiveProps {
    src: any;
    loanAmount: number;
    APR: number;
    duration: number;
    health: number;
    nftAddress: string;
    tokenId: number;
}

const LoanActive = (props: LoanActiveProps) => {
    const { src, loanAmount, APR, duration, health, nftAddress, tokenId } = props;
    const [nftSrc, setNftSrc] = useState(src);
    const { loading, error, nft } = useNft(nftAddress, tokenId.toString());
    useEffect(() => {
        if (nft) {
            setNftSrc(nft.image);
        }
    }, [nft]);
    return (
        <>
            <div className="flex w-full ">
                <div className="flex">
                    <Image src={nftSrc} alt={''} width={150} height={150} />
                    <div className="flex flex-col justify-between ml-[40px]">
                        <h2>Loan Amount: {loanAmount} WETH</h2>
                        <h2>Duration: {duration} days</h2>
                        <h2>APR: {APR.toFixed(1)}%</h2>
                        <h2>Health: {'???'}%</h2>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoanActive;
