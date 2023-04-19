import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';
import Counter from './Counter';
import Button from './Button';

export interface LendItemProps {
    src: any;
    loanAmount: number;
    APR: number;
    duration: number;
}

const LendItem: FC<LendItemProps> = (props) => {
    const { src, loanAmount, APR, duration } = props;
    const [openCounterMenu, setOpenCounterMenu] = useState(false);
    const [openAcceptMenu, setOpenAcceptMenu] = useState(false);

    const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        if (target.checked) {
            if (target.name === 'counter') setOpenCounterMenu(true);
            else setOpenAcceptMenu(true);
        }
    };

    const notifiOnClick = () => {
        alert('You have accepted the offer!');
    };

    const closeMenu = () => {
        setOpenCounterMenu(false);
        setOpenAcceptMenu(false);
    };

    return (
        <>
            <div className="flex w-full ">
                <div className="w-[60%] flex">
                    <Image src={src} alt={''} width={150} height={150} />
                    <div className="flex flex-col justify-between py-[10px] ml-[40px]">
                        <h2>Loan Amount: {loanAmount} WETH</h2>
                        <h2>Duration: {duration} days</h2>
                        <h2>APR: {APR.toFixed(1)}%</h2>
                    </div>
                </div>
                <div className="flex items-center">
                    <Button color="black" text="Accept" onClick={notifiOnClick} />
                    {/* <div>
                        <input
                            className="w-[15px] h-[15px] mr-2"
                            type="checkbox"
                            name="counter"
                            onClick={handleClick}
                        />
                        <label htmlFor="counter">Counter</label>
                    </div>
                    <div>
                        <input
                            className="w-[15px] h-[15px] mr-2"
                            type="checkbox"
                            name="accept"
                            onClick={handleClick}
                        />
                        <label htmlFor="accept">Accept</label>
                    </div> */}
                </div>
            </div>
            {/* {openCounterMenu ? <Counter closeMenu={closeMenu} {...props} /> : null} */}
        </>
    );
};

export default LendItem;
