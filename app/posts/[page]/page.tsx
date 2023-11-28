import db from '@/db';
import {RowDataPacket} from 'mysql2/promise'
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Search from '@/components/search';

interface userInfo {
  user : {
    name : string;
    email?: string;
    image?: string;
    level?: number;
  }
}

export default async function PostsList({
    params,
}: {
    params?:{page ?: number}
}) {
    // console.log(params)
    const currentPage = params?.page !== undefined ? params.page : 1;
    //현재 파라미터가 값이 없다면 1페이지가 되고 그게 아니라면 해당 페이지로 접속

    const perPage = 10;
    const offset = (currentPage - 1) * perPage;

    const [results] = await db.query<RowDataPacket[]>('SELECT * FROM boarddata.board order by date desc limit ? offset ?',[perPage,offset]);
    

    const [countResult] = await db.query<RowDataPacket[]>('select count(*) as cnt from boarddata.board')
    const totalCnt = countResult[0].cnt;

    const lastPage = Math.ceil(totalCnt/perPage)
    const totalPageCnt = 5;
    const startPage = Math.floor((currentPage - 1)/totalPageCnt) * totalPageCnt + 1;
    const endPage = Math.min(lastPage,startPage + totalPageCnt - 1);
    let prevStart = Math.floor((currentPage - 1)/5) * 5 -4;
    let nextStart = Math.ceil((currentPage) / 5) * 5 + 1;

    let sessions = await getServerSession(authOptions) as userInfo;
    // console.log(sessions)

    return (
        <>  
            <div className="w-full">
                <div className={`max-w-7xl mx-auto px-[3%] ${sessions ? 'mt-5' : 'mt-10'}`}>
                    {
                        sessions &&
                        <div className="flex justify-end">
                            <Link href="/write" className='bg-[#8082d3] md:text-lg text-base text-white md:px-10 px-5 py-2 rounded-xl shadow-[0_0_0_1px_#dadcdf,0_4px_8px_0_rgba(0,0,0,.15)] hover:bg-[#6d6fcd]'>글쓰기</Link>
                        </div>
                    }
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
                                <p className='text-center text-lg py-3'>등록된 게시글이 없습니다.</p>
                                :
                                results && results.map((e,i)=>{
                                    const date = new Date(e.date);
                                    const year = date.getFullYear();
                                    const month = (date.getMonth() + 1).toString().padStart(2,'0')
                                    const day = date.getDate().toString().padStart(2,'0')
                                    const formatDate = `${year}-${month}-${day}`
                                    const number = totalCnt - ((currentPage - 1) * perPage + i)
                                    return(                                     
                                        <ul key={i} className='flex justify-between px-2'>
                                            <li className='basis-[15%] py-3 text-center'>{number}</li>
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
                </div>
            </div>  
            <div className="flex justify-center gap-x-5 mb-5">
                {
                    currentPage > 5 && <Link href={`/posts/${prevStart}`} className='bg-white border px-2 py-1 text-sm rounded'>이전</Link>
                }
                {
                    Array(endPage - startPage + 1).fill(null).map((_,i)=>{
                        const pageNumber = i + startPage;
                        return(
                            <Link key={i} href={`/posts/${pageNumber}`} className={` border px-3 py-1 text-sm rounded ${Number(currentPage) === pageNumber
                          ? 'bg-[#6d6fcd] text-white': 'bg-white'}`}>{pageNumber}</Link>  
                        )
                    })
                }
                {
                    nextStart <= lastPage && <Link href={`/posts/${nextStart}`} className='bg-white border px-2 py-1 text-sm rounded'>다음</Link>
                }
            </div>
            <Search />   
        </>
    )
}
