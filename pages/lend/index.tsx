import LendItem from '@component/components/LendItem';
import React, { useState } from 'react';
import img1 from '../../public/nftitem1.png';
import img2 from '../../public/nftitem2.png';
import img3 from '../../public/nftitem3.png';
import img4 from '../../public/nftitem4.png';
import metaxchContract from '../../contracts/metaxchg.json';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import axios from 'axios';
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
    // const { loading, error, nft } = useNft(
    //     '0xd07dc4262bcdbf85190c01c996b4c06a461d2430', // NFT contract address
    //     '90473', // token ID
    // );
    React.useEffect(() => {
        if (!address) return;

        const getOffers = async () => {
            const contract = new ethers.Contract(metaxchgAddress, metaxchgAbi, provider);

            const offers = await contract.getOffers();
            const loans = await contract.getLoans();
            console.log(loans);
            setOffers(offers);
        };
        getOffers();
    }, []);

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
                {offers.length
                    ? offers.map((offer) => {
                          const duration = Number(offer['duration'].toString()) / 86400;
                          const apr = Number(offer['interestRate'].toString());
                          const loanValue = Number(ethers.utils.formatEther(offer['loanValue']));
                          const tokenValuation = Number(
                              ethers.utils.formatEther(offer['tokenValuation']),
                          );
                          const tokenId = Number(offer['tokenId'].toString());
                          const nftAddress = offer['nftAddress'];

                          return (
                              <LendItem
                                  key={`${nftAddress}/${tokenId}`}
                                  src={img1}
                                  loanAmount={loanValue}
                                  APR={apr}
                                  duration={duration}
                                  nftAddress={nftAddress}
                                  tokenId={tokenId}
                              />
                          );
                      })
                    : null}
            </div>
        </div>
    );
};

export default Lend;
