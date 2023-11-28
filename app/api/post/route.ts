import db from '@/db';
import { NextRequest,NextResponse } from 'next/server';
// import { NextApiRequest , NextApiResponse } from 'next';
import {RowDataPacket} from 'mysql2/promise'

export const POST = async (
    req : NextRequest,
    res : NextResponse
) : Promise<NextResponse> =>{


    if(req.method === 'POST'){
        const {postId , ip} = JSON.parse(await req.text());
        try{
            const [results] = await db.query<RowDataPacket[]>('select * from boarddata.board where id = ?', [postId])
            const post = results && results[0]

const [countResult] = await db.query<RowDataPacket[]>('select count(*) as cnt from boarddata.view_log where postid = ?',[postId,ip]);
    const totalCnt = countResult[0].cnt

    if(results.length > 0){
        if(totalCnt === 0){
            await db.query<RowDataPacket[]>('update boarddata.board set count = count + 1 where id = ?',[postId])
        }
        await db.query<RowDataPacket[]>('insert into boarddata.view_log(postid,ip_address,view_date) select ?,?,NOW() where not exists (select 1 from boarddata.view_log where postid =? and ip_address =? and view_date > now() - interval 1 second)',[postId,ip,postId,ip])
    }
            return NextResponse.json({message : "성공"})

        }catch(error){
            return NextResponse.json({error: error})
        }
    } 

    return NextResponse.json({error : "에러가 발생하였습니다."})
}