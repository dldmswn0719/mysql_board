import db from '@/db';
import { RowDataPacket } from 'mysql2';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import Comment from '@/components/comment';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import EditDelete from './editDelete';

interface userInfo {
    user : {
        name : string;
        email ?: string;
        image ?: string;
        level ?: number;
    }
}

interface propsType{
    results : {
        id : number;
        userid : string;
        title ?: string;
        content ?: string;
        username ?: string;
        count ?: number;
        date ?: string;
    }
}

async function Getip() {
    const res = await fetch('https://mysql-board-ruby.vercel.app/api/get-ip');
    const data = res.json();
    if(!res.ok){
        alert("에러가 발생하였습니다.");
        return;
    }
    return data;
}

export default async function Detatil({
    params
} : {
    params ?: {id?: number}
}){
    const getIp = await Getip();
    const userIp = getIp.data
    console.log(userIp)
    const postId = params?.id !== undefined ? params.id : 1;
    const [results] = await db.query<RowDataPacket[]>('select * from boarddata.board where id = ?', [postId])
    const post = results && results[0]
    let session = await getServerSession(authOptions) as userInfo;

    const [countResult] = await db.query<RowDataPacket[]>('select count(*) as cnt from boarddata.view_log where postid = ?',[postId,userIp]);
    const totalCnt = countResult[0].cnt
    console.log(totalCnt + "개")

    if(results.length > 0){
        if(totalCnt === 0){
            await db.query<RowDataPacket[]>('update boarddata.board set count = count + 1 where id = ?',[postId])
        }
    }
    await db.query<RowDataPacket[]>('insert into boarddata.view_log(postid,ip_address,view_date) select ?,?,NOW() where not exists (select 1 from boarddata.view_log where postid =? and ip_address =? and view_date > now() - interval 24 hour)',[postId,userIp,postId,userIp])
    // select 1 존재 여부를 확인하기 위해 사용 > 1이라는건 상수 값으로 실제 데이터는 중요하지 않으며 , 존재 여부를 확인하기 위함
    //내가 원하는 테이블에서 어떠한 조건 즉 and 까지 포함한 3가지 조건이 모두 충족하는 조건을 찾는다.
    // 어떠한 행도 반환하지 않을 때만 참이 된다 . 즉 3가지 조건이 모두 참일 때 혹은 데이터가 없을때 쿼리가 실행

    return(
        <>
        {
            results.length > 0 && (
                <>
                    <div className="w-full">
                        <div className="max-w-7xl mx-auto px-[3%]">
                            <div className="flex justify-end mt-5">
                                <EditDelete results={post as propsType['results']} />  
                            </div>
                            <div className="lg:mt-8 mt-5 border rounded-xl md:p-5 p-3">
                                <div className="py-1">
                                    <p className="py-2 lg:basis-[95%] basis-full my-3 lg:my-0 text-2xl text-center font-bold">{post?.title}</p>
                                </div>
                                <div className="flex justify-between border-y px-2 py-3 bg-[#f9f9f9]">
                                    <div className="flex">
                                        <p className="mr-5 font-bold">작성자</p>
                                        <p>{post?.username}</p>
                                    </div>
                                    <div className="flex">
                                        <p className="mr-3 font-bold">조회수</p>
                                        <p>{post?.count}</p>
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <p>{post?.content}</p>
                                </div>                
                                {
                                    session ?
                                    <Comment id={post?.id} />
                                    :
                                    <div className="block border p-4 text-center my-5 rounded-xl">
                                        <Link href="/login">
                                            <p>로그인 이후 댓글을 작성할 수 있습니다.</p>
                                        </Link>
                                    </div>
                                }          
                            </div>
                            <div className='flex justify-end mt-2 mb-5'>
                                <Link href="/">
                                    <p className="text-base border py-2 px-5 bg-[#6d6fcd] text-white rounded-xl">목록</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
        </>
    )
}