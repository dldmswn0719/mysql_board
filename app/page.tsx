import db from '@/db';
import {RowDataPacket} from 'mysql2/promise'
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

interface userInfo {
  user : {
    name : string;
    email?: string;
    image?: string;
    level?: number;
  }
}

export default async function Home() {

  const page = 1;
  const perPage = 15;
  const offset = (page - 1) * perPage;

  const [results] = await db.query<RowDataPacket[]>('SELECT * FROM boarddata.board order by date desc limit ? offset ?',[perPage,offset]);
  

  const [countResult] = await db.query<RowDataPacket[]>('select count(*) as cnt from boarddata.board')
  const totalCnt = countResult[0].cnt;
  // console.log(results)

  let sessions = await getServerSession(authOptions) as userInfo;
  console.log(sessions)

  return (
    <>
      <div className="w-full bg-[#6d6fcd] px-[3%]">
        <div className="max-w-7xl mx-auto py-5">
            <Link href='/'><h1 className='text-2xl font-medium text-white cursor-pointer'>자유 게시판</h1></Link>
        </div>
      </div>
      <div className="w-full px-[3%]">
          <div className="max-w-7xl mx-auto pt-3">
            {
              sessions &&
              <div className="flex justify-end">
                  <Link href="/write" className='bg-[#8082d3] text-lg text-white px-10 py-2 rounded-xl shadow-[0_0_0_1px_#dadcdf,0_4px_8px_0_rgba(0,0,0,.15)] hover:bg-[#6d6fcd]'>글쓰기</Link>
              </div>
            }
          </div>
          <div className="max-w-7xl mx-auto">
              <div className="bg-white shadow-md my-5">
                  <div className="min-w-full">
                      <ul className="bg-[#8082d3] text-white flex justify-between px-2">
                          <li className='basis-[15%] py-3 text-center'>번호</li>
                          <li className='basis-[65%] py-3 text-center'>제목</li>
                          <li className='basis-[20%] py-3 text-center'>작성자</li>
                          <li className='md:basis-[20%] py-3 text-center hidden md:block'>작성일</li>
                      </ul>
                      {
                          results && results.map((e,i)=>{
                              const date = new Date(e.date);
                              const year = date.getFullYear();
                              const month = (date.getMonth() + 1).toString().padStart(2,'0')
                              const day = date.getDate().toString().padStart(2,'0')
                              const formatDate = `${year}-${month}-${day}`
                              return(                                     
                                  <ul key={i} className='flex justify-between px-2'>
                                      <li className='basis-[15%] py-3 text-center'>{results.length - i}</li>
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
    </>
  )
}
