import React, { useState } from 'react';

const WalletPopUp = () => {
    const [showPopup, setShowPopup] = useState(false);
    console.log(showPopup);
    return (
        <div className="relative">
            <button
                className=" rounded-md w-[135px] py-[12px] text-[14px] border-black border-solid border-[2px] text-black"
                onMouseEnter={() => setShowPopup(true)}
                onMouseLeave={() => setShowPopup(false)}>
                0x8d87...b474
            </button>
            {showPopup ? (
                <div
                    className="space-y-[50px] absolute rounded-md w-[300px] text-[14px] bg-white border-black border-solid border-[2px] text-black"
                    onMouseEnter={() => setShowPopup(true)}
                    onMouseLeave={() => setShowPopup(false)}>
                    <div className="p-[10px] border-black border-solid border-b-[2px]">
                        Injective Address: inj1...23sk
                    </div>
                    <div>Injective WETH: 40</div>
                </div>
            ) : null}
        </div>
    );
};

export default WalletPopUp;
