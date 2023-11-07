'use client'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect , useState } from 'react'

export default function Post(){

    const [posts,setPosts] = useState([]);
    const [totalCnt,setTotalCnt] = useState(0);
    const [page,setPage] = useState(1);

    // const router = useRouter();
    // console.log(router)

    useEffect(()=>{
        const fetchData = async () =>{
            if(!page) return;
            const res = await fetch(`/api/post?page=${page}`)
            const data = await res.json();
            setPosts(data.results)
            console.log(data)
            setTotalCnt(data.totalCnt);
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
        const nextStart = Math.ceil((page + 1) / 5) * 5 + 1;
        setPage(nextStart)
    }

    const PrevPage = () =>{
        const PrevStart = Math.ceil((page + 1) / 5) * 5 - 4;
        setPage(PrevStart)
    }

    return(
        <>
            <div className="mx-auto max-w-7xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className='text-2xl font-semibold'>게시판</h1>
                    <Link href="/write" className='bg-lime-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-lime-600'>글쓰기</Link>
                </div>
            </div>
            {
                posts && posts.map((e,i)=>{
                    return(
                        <React.Fragment key={i}>
                            <p>페이지 : {page}</p>
                            <p>가격 :  {e.amount}</p>
                            <p>결제일자 : {e.payment_date}</p>
                        </React.Fragment>
                    )
                })
            }
            <div className="flex justify-center gap-x-5 mb-4">
                {page > 5 && <button className='bg-white border px-1.5 py-1 rounded text-sm' onClick={()=>{setPage(page - 5)}}>이전</button>}
                {
                    Array(endPage - startPage + 1).fill(null).map((_,i)=>{
                        const pageNumber = i + startPage;
                        return(
                            <button className={`${ pageNumber === page ? 'bg-lime-400 text-white' : 'bg-white text-black'} border px-1.5 py-1 rounded text-sm basis-8`} key={pageNumber} onClick={()=>{setPage(pageNumber)}}>{pageNumber}</button>
                        )
                    })
                }
                {page < lastPage && <button className='bg-white border px-1.5 py-1 rounded text-sm' onClick={()=>{setPage(page + 5)}}>다음</button>}
            </div>      
        </>
    )
}