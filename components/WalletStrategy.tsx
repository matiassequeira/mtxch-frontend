import React from 'react';
import {
    getInjectiveAddress,
    ChainRestBankApi,
    PaginationOption,
    ChainGrpcBankApi,
} from '@injectivelabs/sdk-ts';
// import {} from '@injectivelabs/token-metadata'
import { getNetworkEndpoints, Network } from '@injectivelabs/networks';
import { useAccount } from 'wagmi';

const endpoints = getNetworkEndpoints(Network.Mainnet);
const chainGrpcBankApi = new ChainGrpcBankApi(endpoints.grpc);

const chainRestBankApi = new ChainRestBankApi(endpoints.rest);

const WalletStrategyComponent = () => {
    const { address } = useAccount();
    const [injAddress, setInjAddress] = React.useState('');

    React.useEffect(() => {
        if (!address) return;
        const injAddress = getInjectiveAddress(address);
        setInjAddress(address);
        const fn = async () => {
            const balances = await chainRestBankApi.fetchBalances(injAddress);
            console.log(balances);
            // console.log(moduleParams);
        };
        fn();
    }, [address]);

    return null;
};

export default WalletStrategyComponent;
