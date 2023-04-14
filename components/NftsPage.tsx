import React, { useState, useEffect } from 'react';
import Header from './Header';
import NftItem from './NftItem';
import { useAccount } from 'wagmi';

interface NftItem {
    image_url: string | null;
}

const NftsPage = () => {
    const { address } = useAccount();
    const [userNfts, setUserNfts] = useState<NftItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!address) return;
        async function fetchUserNfts(address: string) {
            const response = await fetch(
                `https://testnets-api.opensea.io/api/v1/assets?owner=${address}`,
            );
            const data = await response.json();
            const userNfts = data.assets;
            setUserNfts(userNfts);
        }
        fetchUserNfts(address);
        setLoading(false);
    }, [address]);

    if (!address) return null;

    return (
        <>
            <Header />
            {loading ? <div className="mx-[120px]">Your NFTs are being loaded...</div> : null}

            {userNfts.length && !loading ? (
                <div>
                    <div className="px-[120px] mb-3 space-y-6">
                        <h1>Choose NFT for Loan Request</h1>
                        <div className="grid grid-cols-4 gap-4 w-full ">
                            {userNfts.map((item) => {
                                if (item.image_url?.startsWith('ipfs://')) {
                                    item.image_url = `https://ipfs.io/ipfs/${
                                        item.image_url.split('ipfs://')[1]
                                    }`;
                                }

                                if (!item.image_url)
                                    item.image_url = 'https://via.placeholder.com/300';

                                return <NftItem imageSrc={item.image_url} key={Math.random()} />;
                            })}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="px-[120px]">You have no NFTs</div>
            )}
        </>
    );
};

export default NftsPage;
