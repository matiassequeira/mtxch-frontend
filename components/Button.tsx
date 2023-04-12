import React, { ReactNode } from 'react';

interface ButtonProps {
    color: string;
    text: string;
    onClick?: () => void;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ color, text, onClick, disabled }) => {
    console.log(color);
    return (
        <button
            className={` ${
                color === 'black' ? 'text-white bg-black' : ''
            } rounded-md w-[135px] py-[12px] text-[14px] border-black border-solid border-[2px] text-black`}
            onClick={onClick}
            disabled={disabled}>
            {text}
        </button>
    );
};

export default Button;
