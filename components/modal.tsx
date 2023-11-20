'use client';

import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";


interface ModalProps {
    error: string;
    address : string;
}

export default function Modal({error , address}: ModalProps){
    const [isOpen, setIsOpen] = useState(true); 

    const handleClose = () => { 
        setIsOpen(false);
    }

    if (!isOpen) return null; 

    return(
        <div className='fixed top-0 left-0 w-full h-full bg-black/70 z-50 flex justify-center items-center'>
            <div className='basis-[360px] bg-white px-5 py-12 rounded-lg flex justify-center flex-wrap'>
                <FontAwesomeIcon className="text-red-500 text-6xl flex basis-full" icon={faCircleExclamation} />
                <p className='text-lg font-bold my-6'>{error}</p>
                <div className="w-full p-[10px] text-center rounded-md bg-[#8082d3] border-none text-white cursor-pointer hover:bg-[#6d6fcd]">
                    <Link href={address}>
                        <button onClick={handleClose} className="w-full">확인</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}