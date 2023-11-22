'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCustomSession } from '../sessions';

interface formType {
    userid : string;
    username : string;
    title : string;
    content : string;
}

export default function Write(){
    const {data : session} = useCustomSession();
    const [formData,setFormData] = useState<formType>({
        userid : session?.user?.email ?? '',
        username : session?.user?.name ?? '',
        // ?? 조건문 왼쪽이 참 
        title : '',
        content : ''
    });

    const changeEvent = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        setFormData({...formData , [e.target.name] : e.target.value})
        // console.log(formData)
    }

    const submitEvent = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(formData.title.length === 0){
            alert("제목을 입력해주세요.")
            return;
        }else if(formData.content.length === 0){
            alert("내용을 입력해주세요.")
            return;
        }
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
            <div className="w-full">
                <div className="max-w-7xl mx-auto px-[3%]">
                    <form method='post' onSubmit={submitEvent}>
                        <div className="flex justify-end mt-5">
                            <Link className='bg-[#a6a7e0] text-white md:px-10 px-5 py-2 inline-block mr-2 rounded-xl shadow-md hover:bg-[#9394da] focus:outline-none' href="/">취소</Link>
                            <button className='bg-[#8082d3] text-white md:px-10 px-5 py-2 rounded-xl shadow-md hover:bg-[#6d6fcd] focus:outline-none'>등록</button>
                        </div>
                        <div className="mt-5 border rounded-xl p-5">
                            <div className="flex flex-wrap my-1 border-b py-1">
                                <p className="text-lg md:text-xl lg:text-2xl lg:basis-[10%] basis-full mt-1">작성자</p>
                                <p className="py-2 px-5 lg:basis-[90%] basis-full">{formData.username}</p>
                            </div>
                            <div>
                                <p className='text-base md:text-lg lg:text-xl'>제목</p>
                                <input onChange={changeEvent} className='shadow text-gray-700 mb-2 border w-full my-2 py-2 px-5 rounded-lg' type="text" name='title' defaultValue={formData.title} />
                            </div>
                            <div>
                                <p className='text-base md:text-lg lg:text-xl'>내용</p>
                                <textarea onChange={changeEvent} rows={15} className='shadow text-gray-700 mb-2 border w-full my-2 py-2 px-5 rounded-lg' name="content" defaultValue={formData.content}></textarea>
                            </div>
                        </div>                
                    </form>
                </div>
            </div>
        </>
    )
}