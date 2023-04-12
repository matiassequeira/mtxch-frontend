import React, { useContext, useState } from 'react';
import Web3 from 'web3';
import UserContext, { UserContextType } from './UserContext';
import axios from 'axios';
import Header from './Header';
import NftList from './NftList';
const web3 = new Web3('https://mainnet.infura.io/v3/49e9ff3061214414b9baa13fc93313a6'); // Replace YOUR-PROJECT-ID with your own Infura project ID

const erc721ABI: any = [
    // /* ERC-721 contract ABI goes here */
]; // You can find the ABI from Etherscan or another trusted source
const nftCollections = ['0xE29F8038d1A3445Ab22AD1373c65eC0a6E1161a4'];

const NftsPage = () => {
    const { userAddress } = useContext(UserContext) as UserContextType; // Replace with the address you want to check
    const [tokenIds, setTokenIds] = useState<number[]>([]);

    //     if (!userAddress) return null;
    //     const getTokenIdsOwnedByAddress = async (contract: any, address: any) => {
    //         try {
    //             const balance = await contract.methods.balanceOf(address).call();

    //             if (balance > 0) {
    //                 const totalSupply = await contract.methods.totalSupply().call();
    //                 const ownedTokenIds = [];

    //                 for (let tokenId = 1; tokenId <= totalSupply; tokenId++) {
    //                     const tokenOwner = await contract.methods.ownerOf(tokenId).call();

    //                     if (tokenOwner.toLowerCase() === address.toLowerCase()) {
    //                         ownedTokenIds.push(tokenId);
    //                     }
    //                 }

    //                 return ownedTokenIds;
    //             }
    //         } catch (error) {
    //             console.error(error);
    //         }

    //         return [];
    //     };

    // async function checkUserTokens(userAddress: string, nftCollections: string[]) {
    // for (const nftCollectionAddress of nftCollections) {

    // const nftContract = new web3.eth.Contract(erc721ABI, nftCollectionAddress);
    // const tokenIds = await getTokenIdsOwnedByAddress(nftContract, userAddress);

    // if (tokenIds.length > 0) {
    //     console.log(
    //         `Token IDs owned by ${userAddress} in the collection ${nftCollectionAddress}:`,
    //         tokenIds,
    //     );
    //     setTokenIds(tokenIds);
    // }
    // }
    // }

    // checkUserTokens(userAddress, nftCollections);

    // async function getNFTImageURL(contract: any, tokenId: number[]) {
    //     try {
    //         const tokenURI = await contract.methods.tokenURI(tokenId).call();
    //         const response = await axios.get(tokenURI);
    //         const metadata = response.data;

    //         if (metadata && metadata.image) {
    //             return metadata.image;
    //         }
    //     } catch (error) {
    //         console.error(`Failed to fetch image URL for token ID ${tokenId}:`, error);
    //     }

    //     return null;
    // }
    return (
        <>
            <Header />
            <NftList />
        </>
    );
};

export default NftsPage;
