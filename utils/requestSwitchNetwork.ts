import { ethers } from 'ethers';

export const requestSwitchNetwork = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
        // 'https://mainnet.infura.io/v3/49e9ff3061214414b9baa13fc93313a6',
        "https://goerli.infura.io/v3/49e9ff3061214414b9baa13fc93313a6"
      );
      
    const network = await provider.getNetwork();

    if (network.name !== 'goerli') {
        try {
            await provider.send('wallet_switchEthereumChain', [{ chainId: '0x5' }]);
        } catch (error) {
            console.error('Failed to switch chains:', error);
        }
    }
};
