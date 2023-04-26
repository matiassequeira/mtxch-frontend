import React from 'react';
import img1 from '../../public/nftitem1.png';
import img2 from '../../public/nftitem2.png';
import img3 from '../../public/nftitem3.png';
import img4 from '../../public/nftitem4.png';
import LoanRequest from '@component/components/LoanRequest';
import LoanActive from '@component/components/LoanActive';

const Loans = () => {
    return (
        <div className="px-[100px] ">
            <div className=" flex mb-4">
                <div className="w-[50%] space-y-[25px]">
                    <h1 className="text-center font-bold">Loan Request</h1>
                </div>
                <div className="w-[50%] space-y-[25px]">
                    <h1 className="font-bold">Active Loans</h1>
                    <LoanActive src={img1} loanAmount={0.6} APR={25} duration={30} health={100} />
                    <LoanActive src={img2} loanAmount={0.6} APR={30} duration={60} health={125} />
                    <LoanActive src={img3} loanAmount={0.6} APR={20} duration={180} health={85} />
                    <LoanActive src={img4} loanAmount={0.6} APR={16} duration={90} health={75} />
                </div>
            </div>
        </div>
    );
};

export default Loans;
