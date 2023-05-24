import React, { ReactNode } from 'react';

interface ButtonProps {
    color: string;
    text?: string;
    onClick?: () => void;
    disabled?: boolean;
    children?: ReactNode
}

const Button: React.FC<ButtonProps> = ({ color, text, onClick, disabled, children }) => {
    
    return (
        <button
            className={` ${
            color === 'black' ? 'text-white bg-black' : color
            } flex items-center justify-center rounded-md w-[135px] py-[12px] text-[14px] border-black border-solid border-[2px] text-black hover:scale-105 active:scale-95  transition-all`}
            onClick={onClick}
            disabled={disabled}>
            {children || text}
        </button>
    );
};

export default Button;
