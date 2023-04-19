import React from 'react';
import { LendItemProps } from './LendItem';
import Image from 'next/image';
const LoanRequest = (props: LendItemProps) => {
    const { src, loanAmount, APR, duration } = props;

    return (
        <>
            <div className="flex w-full ">
                <div className="flex">
                    <Image src={src} alt={''} width={150} height={150} />
                    <div className="flex flex-col justify-between py-[10px] ml-[40px]">
                        <h2>Loan Amount: {loanAmount} WETH</h2>
                        <h2>Duration: {duration} days</h2>
                        <h2>APR: {APR.toFixed(1)}%</h2>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoanRequest;
