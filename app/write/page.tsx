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
        // console.log(formData)
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
                alert(data.message)
                window.location.href = '/';
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
            <div className="w-full bg-[#6d6fcd] sticky top-0 px-5">
                <div className="max-w-7xl mx-auto py-5">
                    <h1 className='text-2xl font-medium text-white'>게시판</h1>
                </div>
            </div>
            <div className="w-full px-5">
                <div className="max-w-7xl mx-auto">
                    <form method='post' onSubmit={submitEvent}>
                        <div className="flex justify-end mt-5">
                            <Link className='bg-[#a6a7e0] text-white px-10 py-2 inline-block mr-2 rounded-xl shadow-md hover:bg-[#9394da] focus:outline-none' href="/">취소</Link>
                            <button className='bg-[#8082d3] text-white px-10 py-2 rounded-xl shadow-md hover:bg-[#6d6fcd] focus:outline-none'>등록</button>
                        </div>
                        <div className="lg:mt-10 mt-5">
                            <div className='flex flex-wrap'>
                                <p className='text-base md:text-lg lg:text-xl lg:basis-[5%] basis-full mt-2 mr-1'>작성자</p>
                                <input onChange={changeEvent} className='lg:basis-[90%] basis-full my-2 shadow text-gray-700 mb-2 border w-1/4 py-1 px-5 rounded-lg' type="text" name='name' defaultValue={formData.name} />
                            </div>
                            <div>
                                <p className='text-base md:text-lg lg:text-xl'>제목</p>
                                <input onChange={changeEvent} className='shadow text-gray-700 text-sm mb-2 border w-full my-2 py-2 px-5 rounded-lg' type="text" name='title' defaultValue={formData.title} />
                            </div>
                            <div>
                                <p className='text-base md:text-lg lg:text-xl'>내용</p>
                                <textarea onChange={changeEvent} className='shadow text-gray-700 text-sm mb-2 border w-full my-2 py-2 px-5 rounded-lg' name="content" defaultValue={formData.content}></textarea>
                            </div>
                        </div>                
                    </form>
                </div>
            </div>
        </>
    )
}