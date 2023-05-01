import React, { useState } from 'react';
import Image from 'next/image';

const PendingTx = (props: { txHash: string; closeMenu: () => void }) => {
    const { txHash, closeMenu } = props;

    return (
        <div
            className="pt-[50px] pl-[50px] absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] z-50 bg-white shadow-2xl w-[800px] h-[500px] rounded-xl flex flex-col
        items-center space-y-[30px]">
            {/* Pending */}
            <div className="">Your transaction is pending...</div>
            <div>
                <Image
                    alt={''}
                    src={
                        'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGE2MWUxMzA2MjlkYjU5MTk3NTU3MjVhYjM4NmJmNTk2NjlhMDg0OCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/l4FGmO3MZkGng9Bp6/giphy.gif'
                    }
                    width={400}
                    height={400}
                    unoptimized={true}
                />
            </div>

            {/* Failed */}

            {/* Success */}

            <div className="absolute left-[50%] translate-x-[-50%] bottom-[16px] text-[16px] text-[#6593c3] hover:text-[#067dc5] hover:cursor-pointer">
                <a href={`https://goerli.etherscan.io/tx/${txHash}`} target="_blank">
                    View your transaction on etherscan
                </a>
            </div>
            <svg
                className="hover:cursor-pointer absolute right-4 top-4 w-8 h-8 hover:w-10 hover:h-10 hover:right-3 hover:top-3"
                onClick={closeMenu}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z"
                    fill="#000000"
                />
            </svg>
        </div>
    );
};

export default PendingTx;
