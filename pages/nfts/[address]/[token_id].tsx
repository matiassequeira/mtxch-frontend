import Button from '@component/components/Button';
import ListForm from '@component/components/ListForm';
import { NftItemInterface } from '@component/components/NftsPage';
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useAccount } from 'wagmi';

export interface Collection {}

export const getServerSideProps = async (context: any) => {
    const { address, token_id } = context.params;
    const response = await fetch(
        `https://testnets-api.opensea.io/api/v1/asset/${address}/${token_id}`,
    );
    const data = await response.json();

    return { props: { nftData: data } };
};

const LoanNft = (props: { nftData: NftItemInterface }) => {
    const [maxFloat, setMaxFloat] = useState(0);

    const { nftData } = props;

    const { image_url, token_id, asset_contract } = nftData;
    const { name } = asset_contract;
    const nftOwnerAddress = nftData.top_ownerships[0].owner.address;
    const slug = nftData.collection.slug;

    const { address } = useAccount();

    const { data }: any = useQuery(
        `collection/${slug}`,
        () => axios.get(`https://testnets-api.opensea.io/api/v1/collection/${slug}`),
        { keepPreviousData: true, retry: true, retryDelay: 1000 },
    );

    const floorPrice = data?.data?.collection?.stats.floor_price;
    React.useEffect(() => {
        if (floorPrice) setMaxFloat(floorPrice * 0.6);
    }, [floorPrice]);

    if (address?.toLowerCase() !== nftOwnerAddress.toLowerCase())
        return <div className="text-center">This is not your NFT</div>;
    return (
        <div className="px-[120px] flex mb-3">
            <div className=" w-[55%]">
                <Image
                    src={image_url || 'https://via.placeholder.com/300'}
                    alt={''}
                    width={400}
                    height={400}
                />
                <h1>
                    {name} #{token_id}
                </h1>
                <h1>Floor: {floorPrice}ETH</h1>
                {/* <h1>Max Loan: {maxFloat.toFixed(3)}ETH</h1> */}
            </div>

            <ListForm {...nftData} />
        </div>
    );
};

export default LoanNft;
