import React from 'react';
import nftitem1 from '../public/punk1.png';
import nftitem2 from '../public/punk2.png';
import nftitem3 from '../public/punk3.png';
import nftitem4 from '../public/punk4.png';
import nftitem5 from '../public/nftitem1.png';
import nftitem6 from '../public/nftitem2.png';
import nftitem7 from '../public/nftitem3.png';
import nftitem8 from '../public/nftitem4.png';
import nftitem9 from '../public/nftitem5.png';
import NftItem from './NftItem';

const nftItemsArr = [
    nftitem1,
    nftitem2,
    nftitem3,
    nftitem4,
    nftitem5,
    nftitem6,
    nftitem7,
    nftitem8,
    nftitem9,
];

const NftList = () => {
    return (
        <div className="px-[120px] mt-6 space-y-6">
            <h1>Choose NFT for Loan Request</h1>
            <div className="grid grid-cols-4 gap-4 w-full">
                {nftItemsArr.map((item) => {
                    return <NftItem imageSrc={item} key={Math.random()} />;
                })}
            </div>
        </div>
    );
};

export default NftList;
