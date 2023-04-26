import LendItem from '@component/components/LendItem';
import React, { useState } from 'react';
import img1 from '../../public/nftitem1.png';
import img2 from '../../public/nftitem2.png';
import img3 from '../../public/nftitem3.png';
import img4 from '../../public/nftitem4.png';
import metaxchContract from '../../contracts/metaxchg.json';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
// import erc721 from '../../contracts/ERC721.json';
// const erc721Abi = erc721.abi;
const metaxchgAbi = metaxchContract.abi;
const metaxchgAddress = '0xe8C666d6a9965FdFF1A6Db2af8B1a9BF43670629';
let provider: any;
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    provider = new ethers.providers.Web3Provider(window.ethereum as any);
} else {
    provider = new ethers.providers.JsonRpcProvider(
        'https://goerli.infura.io/v3/49e9ff3061214414b9baa13fc93313a6',
    );
}

const Lend = () => {
    const { address } = useAccount();
    const [offers, setOffers] = useState<any[]>([]);

    React.useEffect(() => {
        if (!address) return;
        console.log('useEffect');
        const getOffers = async () => {
            const contract = new ethers.Contract(metaxchgAddress, metaxchgAbi, provider);
            console.log('offers start');
            const offers = await contract.getOffers();
            setOffers(offers);
            console.log(offers, 'offers');
        };
        getOffers();
    }, []);

    if (offers.length) {
        const { TokenValuation } = offers[0];
        console.log(TokenValuation.toString());
    }
    console.log(offers[0]);
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
