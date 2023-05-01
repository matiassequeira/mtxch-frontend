import React, { useEffect, useRef, useState } from 'react';
import NotifiCard from './NotifiCard';

const NotifiBell = () => {
    const [openMenu, setOpenMenu] = useState(false);

    const notifiRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!openMenu) return;
        function handleClickOutside(event: MouseEvent) {
            if (notifiRef.current && !notifiRef.current.contains(event.target as Node)) {
                setOpenMenu(false);
            }
        }
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openMenu]);

    return (
        <div className="relative" ref={notifiRef}>
            <svg
                className="hover:cursor-pointer"
                onClick={() => {
                    setOpenMenu((prev) => !prev);
                }}
                version="1.0"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="30px"
                height="30px"
                viewBox="0 0 64 64"
                enableBackground="new 0 0 64 64"
                xmlSpace="preserve">
                <g>
                    <path
                        fill="#231F20"
                        d="M56,44c-1.832,0-4-2.168-4-4V20C52,8.973,43.027,0,32,0S12,8.973,12,20v20c0,1.793-2.207,4-4,4
		c-2.211,0-4,1.789-4,4s1.789,4,4,4h48c2.211,0,4-1.789,4-4S58.211,44,56,44z"
                    />
                    <path
                        fill="#231F20"
                        d="M32,64c4.418,0,8-3.582,8-8H24C24,60.418,27.582,64,32,64z"
                    />
                </g>
            </svg>
            {openMenu ? (
                <div className="absolute left-[50%] translate-x-[-50%] z-50 top-[40px]">
                    <NotifiCard />
                </div>
            ) : null}
        </div>
    );
};

export default NotifiBell;
