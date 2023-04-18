import LendItem from '@component/components/LendItem';
import React from 'react';
import img1 from '../../public/nftitem1.png';
import img2 from '../../public/nftitem2.png';
import img3 from '../../public/nftitem3.png';
import img4 from '../../public/nftitem4.png';

const Lend = () => {
    return (
        <div className="px-[120px] ">
            <div className=" flex mb-4">
                <div className="w-[60%]">
                    <h1 className="text-center font-bold">Requests</h1>
                </div>
                <div>
                    <h1 className="font-bold">Open Offers</h1>
                </div>
            </div>
            <div className="space-y-[25px]">
                <LendItem src={img1} loanAmount={0.6} APR={20} duration={30} />
                <LendItem src={img2} loanAmount={0.6} APR={10} duration={60} />
                <LendItem src={img3} loanAmount={0.6} APR={15} duration={180} />
                <LendItem src={img4} loanAmount={0.6} APR={20} duration={90} />
            </div>
        </div>
    );
};

export default Lend;
