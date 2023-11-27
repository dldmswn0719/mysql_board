'use client'

import Link from "next/link"
import { useEffect, useState } from "react"

interface userType{
    email : string;
    password ?: string;
    // 비밀번호 있을수도 있고 없을수도 있다 -> 변경할수도있고 안할수도 있다
    name : string;
    nickname : string;
    level : number;
    type : string;
    id : number;
}

export default function MemberEdit({params} : {params : 
    {id:number}}){

    const [userData , setUserData] = useState<userType>();

    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const res = await fetch('https://mysql-board-ruby.vercel.app/api/admin',{
                    cache : 'no-cache',
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        pathUrl : 'edit',
                        id : params.id
                    })
                })
                if(res.ok){
                    const result = await res.json();
                    const data = result.data
                    setUserData(data[0])
                    // console.log(data)
                }
            }catch(error){
                alert(error)
            }
        }
        fetchData()
    },[params.id])

    return(
        <>
            <div className="widget w-full overflow-hidden mb-5 p-4">
                <h3>회원수정</h3>
            </div>
            <div className="widget w-full overflow-hidden mb-5 p-4">
                <div className="flex mb-4 items-center">
                    <label htmlFor="email" className="basis-3/12 text-xs sm:text-sm">이메일 : </label>
                    <input defaultValue={userData && userData.email} name="email" type="text" className="border text-sm p-2 rounded-md" />
                </div>
            </div>
            <div className="widget w-full overflow-hidden mb-5 p-4">
                <div className="flex mb-4 items-center">
                    <label htmlFor="email" className="basis-3/12 text-xs sm:text-sm">패스워드 : </label>
                    <input name ="password" type="password" className="border text-sm p-2 rounded-md" />
                </div>
            </div>
            <div className="widget w-full overflow-hidden mb-5 p-4">
                <div className="flex mb-4 items-center">
                    <label htmlFor="email" className="basis-3/12 text-xs sm:text-sm">이름 : </label>
                    <input defaultValue={userData && userData.name} name="name" type="text" className="border text-sm p-2 rounded-md" />
                </div>
            </div>
            <div className="widget w-full overflow-hidden mb-5 p-4">
                <div className="flex mb-4 items-center">
                    <label htmlFor="email" className="basis-3/12 text-xs sm:text-sm">레벨 : </label>
                    <select value={userData && userData.level} name="level" className="border text-sm px-5 py-2 rounded-md">
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
                <button className="bg-[#8082d3] text-white px-4 py-2 rounded shadow-md hover:bg-[#6d6fcd]">수정</button>
            </div>
        </>
    )
}