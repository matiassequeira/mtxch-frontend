import React from 'react';
import Image from 'next/image';

interface LoanActiveProps {
    src: any;
    loanAmount: number;
    APR: number;
    duration: number;
    health: number;
}

const LoanActive = (props: LoanActiveProps) => {
    const { src, loanAmount, APR, duration, health } = props;
    return (
        <>
            <div className="flex w-full ">
                <div className="flex">
                    <Image src={src} alt={''} width={150} height={150} />
                    <div className="flex flex-col justify-between ml-[40px]">
                        <h2>Loan Amount: {loanAmount} WETH</h2>
                        <h2>Duration: {duration} days</h2>
                        <h2>APR: {APR.toFixed(1)}%</h2>
                        <h2>Health: {health.toFixed(1)}%</h2>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoanActive;
