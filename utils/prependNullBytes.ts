export function prependNullBytes(address: string) {
    // Remove the '0x' prefix if it exists
    const cleanedAddress = address.startsWith('0x') ? address.slice(2) : address;

    // Check if the cleaned address is a valid EVM address
    if (cleanedAddress.length !== 40) {
        throw new Error('Invalid EVM address');
    }

    // Prepend 12 null bytes (24 zeros) to the cleaned address
    const paddedAddress = '0x' + '0'.repeat(24) + cleanedAddress;

    return paddedAddress;
}
