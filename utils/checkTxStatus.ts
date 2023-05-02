import { toast } from 'react-toastify';

export async function checkTxStatus(provider: any, txHash: string) {
    const receipt = await provider.getTransactionReceipt(txHash);

    if (receipt == null) {
        // Transaction is not yet mined, wait for it to be mined
        const minedReceipt = await provider.waitForTransaction(txHash);
        if (minedReceipt.status == 1) {
            return true;
        } else {
            return false;
        }
    } else {
        // Transaction is already mined, check the status
        if (receipt.status == 1) {
            return true;
        } else {
            return false;
        }
    }
}
