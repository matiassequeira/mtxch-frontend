import React, { ReactNode } from 'react';

interface ButtonProps {
    color: string;
    text: string;
    onClick?: () => void;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ color, text, onClick, disabled }) => {
    return (
        <button
            className={`bg-${color} ${
                color === 'black' ? 'text-white' : ''
            } rounded-md w-[135px] py-[12px] text-[14px] border-black border-solid border-[2px]`}
            onClick={onClick}
            disabled={disabled}>
            {text}
        </button>
    );
};

export default Button;
