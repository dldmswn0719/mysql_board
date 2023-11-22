import db from "@/db";
import { RowDataPacket } from "mysql2";
import Link from "next/link";
import React from "react";

export default async function SearchResult({
    params
} : {
    params ?: {keyword ?: string}
}) {
    const keywords = params ?.keyword !== undefined ? params.keyword : "";

    const [results] = await db.query<RowDataPacket[]>('select * from boarddata.board where title like ? order by date desc',[`%${decodeURIComponent(keywords)}%`])

    return(
        <div className="w-full">
            <div className="max-w-7xl mx-auto px-[3%]">
                <p className="mt-5">검색 결과 ({results.length}개) : {decodeURIComponent(keywords)}</p>
                <div className="bg-white shadow-md my-5">
                    <div className="min-w-full">
                        <ul className="bg-[#8082d3] text-white flex justify-between px-2">
                            <li className='basis-[15%] py-3 text-center'>번호</li>
                            <li className='basis-[65%] py-3 text-center'>제목</li>
                            <li className='basis-[20%] py-3 text-center'>작성자</li>
                            <li className='md:basis-[20%] py-3 text-center hidden md:block'>작성일</li>
                        </ul>                                
                        {
                            results && results.length === 0 ?
                            <p className='text-center text-lg py-3'>검색결과가 없습니다.</p>
                            :
                            results && results.length > 0 && results.map((e,i)=>{
                                const date = new Date(e.date);
                                const year = date.getFullYear();
                                const month = (date.getMonth() + 1).toString().padStart(2,'0')
                                const day = date.getDate().toString().padStart(2,'0')
                                const formatDate = `${year}-${month}-${day}`
                                return(
                                    <ul key={i} className='flex justify-between px-2'>
                                        <li className='basis-[15%] py-3 text-center'>{i+1}</li>
                                        <li className='px-2 basis-[65%] py-3 text-center'>
                                            <Link href={`/post/${e.id}`}>
                                                {e.title}
                                            </Link>
                                        </li>
                                        <li className='basis-[20%] py-3 text-center'>{e.username}</li>                                       
                                        <li className='md:basis-[20%] py-3 text-center hidden md:block'>{formatDate}</li>                                       
                                    </ul>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='flex justify-end mt-2'>
                    <Link href="/">
                        <p className="text-base border py-2 px-5 bg-[#6d6fcd] text-white rounded-xl">목록</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}