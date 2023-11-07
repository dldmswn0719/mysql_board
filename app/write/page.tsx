'use client';

import Link from 'next/link';
import { useState } from 'react';

interface formType {
    name : string;
    title : string;
    content : string;
}

export default function Write(){
    const [formData,setFormData] = useState<formType>({
        name : '',
        title : '',
        content : ''
    });

    const changeEvent = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        setFormData({...formData , [e.target.name] : e.target.value})
        console.log(formData)
    }

    const submitEvent = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{
            const res = await fetch('/api/write',{
                method : "POST",
                headers : {
                    'Content-Type' : 'application/json'
                },
                body:JSON.stringify(formData)
            })
            if(res.ok){
                const data = await res.json();
                console.log(data.message);
            }else{
                const errorData = await res.json();
                console.log(errorData.error);
            }
        }catch(error){
            console.log(error)
        }
    }

    return(
        <>
            <form method='post'>
                <input onChange={changeEvent} className='shadow text-gray-700 text-sm mb-2 border' type="text" name='name' defaultValue={formData.name} />
                <input onChange={changeEvent} className='shadow text-gray-700 text-sm mb-2 border' type="text" name='title' defaultValue={formData.title} />
                <textarea onChange={changeEvent} className='shadow text-gray-700 text-sm mb-2 border' name="content" defaultValue={formData.content}></textarea>
                <Link className='bg-emerald-500 text-white px-4 py-2 inline-block mr-2 rounded-xl shadow-md hover:bg-emerald-600 focus:outline-none' href="/">취소</Link>
                <button className='bg-lime-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-lime-600 focus:outline-none'>등록</button>
            </form>
        </>
    )
}