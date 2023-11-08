'use client'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect , useState } from 'react'

interface PostList {
    id : number;
    title : string;
    content : string;
    author : string;
    date : string;
    count : string;
}

export default function Post(){

    const [posts,setPosts] = useState<PostList[]>([]);
    const [totalCnt,setTotalCnt] = useState<number>(0);
    const [page,setPage] = useState<number>(1);
    const [isLoading,setIsLoading] = useState<boolean>(true);

    // const router = useRouter();
    // console.log(router)

    useEffect(()=>{
        const fetchData = async () =>{
            if(!page) return;
            const res = await fetch(`/api/post?page=${page}`)
            const data = await res.json();
            setPosts(data.results)
            // console.log(data)
            setTotalCnt(data.totalCnt);
            setIsLoading(false)
        }
        fetchData()
    },[page])

    const lastPage = Math.ceil(totalCnt / 15);
    // ceil 소수점 올림
    const totalPageCnt = 5;
    const startPage = Math.floor((page - 1) / totalPageCnt) * totalPageCnt + 1;
    // floor 소수점 버림
    const endPage = Math.min(lastPage, startPage + totalPageCnt - 1);
    const nextPage = () =>{
        const nextStart = Math.ceil(page / 5) * 5 + 1;
        setPage(nextStart)
    }

    const prevPage = () =>{
        const PrevStart = Math.floor((page - 1 ) / 5) * 5 - 4;
        setPage(PrevStart)
    }

    return(
        <>
            <div className="w-full bg-[#6d6fcd] sticky top-0 px-5">
                <div className="max-w-7xl mx-auto py-5">
                    <h1 className='text-2xl font-medium text-white'>자유 게시판</h1>
                </div>
            </div>
            <div className="w-full px-5">
                <div className="max-w-7xl mx-auto pt-3 sticky top-20">
                    <div className="flex justify-end">
                        <Link href="/write" className='bg-[#8082d3] text-lg text-white px-10 py-2 rounded-xl shadow-[0_0_0_1px_#dadcdf,0_4px_8px_0_rgba(0,0,0,.15)] hover:bg-[#6d6fcd]'>글쓰기</Link>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white shadow-md lg:my-10 my-5">
                        <div className="min-w-full">
                            <ul className="bg-[#8082d3] text-white flex justify-between">
                                <li className='px-6 md:basis-2/12 py-3 text-center'>번호</li>
                                <li className='px-6 md:basis-6/12 py-3 text-center'>제목</li>
                                <li className='px-6 md:basis-2/12 py-3 text-center'>작성자</li>
                                <li className='px-6 md:basis-2/12 py-3 text-center'>작성일</li>
                            </ul>
                            {
                                // posts && posts.length === 0 && !isLoading ?
                                // <p className='text-center text-lg py-3'>등록된 게시글이 없습니다.</p>
                                // :
                                posts && posts.map((e,i)=>{
                                    const date = new Date(e.date);
                                    const year = date.getFullYear();
                                    const month = (date.getMonth() + 1).toString().padStart(2,'0')
                                    const day = date.getDate().toString().padStart(2,'0')
                                    const formatDate = `${year}-${month}-${day}`
                                    return(                                     
                                        <ul key={i} className='flex justify-between'>
                                            <li className='px-6 md:basis-2/12 py-3 text-center'>{posts.length - i}</li>
                                            <li className='px-6 md:basis-6/12 py-3 text-center'>
                                                <Link href={`/post/${e.id}`}>
                                                    {e.title}
                                                </Link>
                                            </li>
                                            <li className='px-6 md:basis-2/12 py-3 text-center'>{e.author}</li>                                       
                                            <li className='px-6 md:basis-2/12 py-3 text-center'>{formatDate}</li>                                       
                                        </ul>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="flex justify-center gap-x-5 mb-4">
                    {page > 5 && <button className='bg-white border px-2.5 py-1 rounded text-sm' onClick={()=>setPage(1)}>&lt;&lt;</button>}
                    {page > 5 && <button className='bg-white border px-1.5 py-1 rounded text-sm' onClick={prevPage}>이전</button>}
                    {
                        Array(endPage - startPage + 1).fill(null).map((_,i)=>{
                            const pageNumber = i + startPage;
                            return(
                                <button className={`${ pageNumber === page ? 'bg-[#9394da] text-white' : 'bg-white text-black'} border px-1.5 py-1 rounded text-sm basis-8`} key={pageNumber} onClick={()=>{setPage(pageNumber)}}>{pageNumber}</button>
                            )
                        })
                    }
                    {page < lastPage && <button className='bg-white border px-1.5 py-1 rounded text-sm' onClick={nextPage}>다음</button>}
                    {page < lastPage && <button className='bg-white border px-2.5 py-1 rounded text-sm' onClick={()=>setPage(lastPage)}>&gt;&gt;</button>}
                </div>      
            </div>
        </>
    )
}