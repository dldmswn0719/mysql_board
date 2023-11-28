'use client'
import Link from "next/link"
import { useEffect, useState } from "react"

interface userType{
    email : string;
    password ?: string;
    name : string;
    level : number;
    gender: string;  
}

export default function AdminAdd(){

    const [formData,setFormData] = useState<userType>({
        email : '',
        password : '',
        name : '',
        level : 2,
        gender : ''
    })

    const changeEvent = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        setFormData({
            ...formData,[e.target.name] : e.target.value
        })
    }

    const submitEvent = async () =>{
        try{
            const res = await fetch('/api/auth/signup',{
                cache : 'no-cache',
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(formData)
            })
            if(res.ok){
                const result = await res.json();
                const data = result.data
                if(result.message === "성공"){
                    alert(data.name + "님을 추가 하였습니다.")
                    window.location.href ="/admin/member"
                }
            }
        }catch(error){
            alert(error)
        }
    }

    return(
        <>
            <div className="widget w-full overflow-hidden mb-5 p-4">
                <h3>회원 추가</h3>
            </div>
            <div className="widget w-full overflow-hidden mb-5 p-4">
                <div className="flex mb-4 items-center">
                    <label htmlFor="email" className="basis-3/12 text-xs sm:text-sm">이메일 : </label>
                    <input onChange={changeEvent} name="email" type="text" className="border text-sm p-2 rounded-md" />
                </div>
            </div>
            <div className="widget w-full overflow-hidden mb-5 p-4">
                <div className="flex mb-4 items-center">
                    <label htmlFor="email" className="basis-3/12 text-xs sm:text-sm">패스워드 : </label>
                    <input onChange={changeEvent} name ="password" type="password" className="border text-sm p-2 rounded-md" />
                </div>
            </div>
            <div className="widget w-full overflow-hidden mb-5 p-4">
                <div className="flex mb-4 items-center">
                    <label htmlFor="email" className="basis-3/12 text-xs sm:text-sm">이름 : </label>
                    <input onChange={changeEvent} name="name" type="text" className="border text-sm p-2 rounded-md" />
                </div>
            </div>
            <div className="widget w-full overflow-hidden mb-5 p-4">
                <div className="flex mb-4 items-center">
                    <label htmlFor="email" className="basis-3/12 text-xs sm:text-sm">성별 : </label>
                        <p className="mr-1">남자</p>
                        <input onChange={changeEvent} type="radio" name="gender" value="남자" className="mr-1" />
                        <p className="mr-1">여자</p>
                        <input onChange={changeEvent} type="radio" name="gender" value="여자" className="mr-1" />
                </div>
            </div>
            <div className="widget w-full overflow-hidden mb-5 p-4">
                <div className="flex mb-4 items-center">
                    <label htmlFor="email" className="basis-3/12 text-xs sm:text-sm">레벨 : </label>
                    <select onChange={changeEvent} name="level" className="border text-sm px-5 py-2 rounded-md">
                        {
                            [2,3,4,5,6,7,8,9].map((i)=>(
                                <option key={i} value={i}>{i}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className="flex justify-end gap-x-5">
                <Link href="/admin/member" className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600">취소</Link>
                <button onClick={submitEvent} className="bg-[#8082d3] text-white px-4 py-2 rounded shadow-md hover:bg-[#6d6fcd]">추가</button>
            </div>
        </>
    )
}