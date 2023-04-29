import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useNft } from 'use-nft';

interface LoanActiveProps {
    src: any;
    tokenValuation: number;
    APR: number;
    duration: number;
    nftAddress: string;
    tokenId: number;
    initialFloorPrice: string;
    loanValue: number;
}

const LoanActive = (props: LoanActiveProps) => {
    const {
        src,
        tokenValuation,
        APR,
        duration,
        nftAddress,
        tokenId,
        initialFloorPrice,
        loanValue,
    } = props;

    const floor =
        nftAddress.toLowerCase() === '0xfa97df129fe2ffdfd63bc3f245dd769f52742bad' ? 45 : 17;

    const healthValue = tokenValuation * (floor / Number(initialFloorPrice)) * 0.6;

    const [color, setColor] = useState('');
    const [health, setHealth] = useState('???');
    const [nftSrc, setNftSrc] = useState(src);
    const { loading, error, nft } = useNft(nftAddress, tokenId.toString());

    useEffect(() => {
        if (!healthValue || !loanValue) return;
        if (healthValue / loanValue < 1) {
            setHealth('liquidatin');
            setColor('text-[#ff0000]');
        } else if (healthValue / loanValue < 1.1) {
            setHealth('low');
            setColor('text-[#ff0000]');
        } else if (healthValue / loanValue < 1.3) {
            setHealth('medium');
            setColor('text-[#ffa500]');
        } else {
            setHealth('high');
            setColor('text-[#008000]');
        }
    }, [healthValue, loanValue]);
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
                        <h2>Loan Amount: {tokenValuation} WETH</h2>
                        <h2>Duration: {duration} days</h2>
                        <h2>APR: {APR.toFixed(1)}%</h2>
                        <h2>
                            Health: <p className={`inline ${color}`}>{health}</p>
                        </h2>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoanActive;
