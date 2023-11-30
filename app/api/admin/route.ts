import db from '@/db';
import { NextRequest , NextResponse } from 'next/server';
import { RowDataPacket } from 'mysql2';

interface PostType{
    pathUrl ?: string;
    id ?: number;
}

interface MainType{
    totalCnt : number;
    todayCnt : number;
    writeCnt : number;
    commentCnt : number;
    visitCnt : number;
    visitTotalCnt : number;
}

export const POST = async(req:NextRequest) :
Promise<NextResponse> =>{
    const {pathUrl , id} : PostType = JSON.parse(await req.text());
     
    if(req.method === 'POST'){
        switch(pathUrl){
            case 'member' : 
            const [memberResult] = await db.query<RowDataPacket[]>('select * from boarddata.member order by date desc');
            return NextResponse.json({message : "성공" , data : memberResult})

            case 'edit' : 
            const [editResult] = await db.query<RowDataPacket[]>('select * from boarddata.member where id = ?',[id]);
            return NextResponse.json({message : "성공" , data : editResult})

            case 'mainChart_1':
                const [resultsChart_1] = await db.query<RowDataPacket[]>('select DATE(date) as date, count(*) as user_count from boarddata.member where date >= CURDATE() - interval 7 day group by DATE(date) order by date DESC');
                return NextResponse.json({ message: "성공", data: resultsChart_1 });
              case 'mainChart_2':
                const [visitResult] = await db.query<RowDataPacket[]>(`select agent, platform, DATE(CONVERT_TZ(visit_time, "+00:00", "+09:00")) as date, HOUR(CONVERT_TZ(visit_time, "+00:00", "+09:00")) as hour, count(*) as user_count from boarddata.visits where CONVERT_TZ(visit_time, "+00:00", "+09:00") >= CONVERT_TZ(CURDATE(), "+00:00", "+09:00") - INTERVAL 7 DAY  group by agent, platform,  DATE(CONVERT_TZ(visit_time, "+00:00", "+09:00")), HOUR(CONVERT_TZ(visit_time, "+00:00", "+09:00"))  order by date DESC, hour DESC;`);
                const [agentResult] = await db.query<RowDataPacket[]>(`SELECT 
                agent,
                COUNT(*) AS agent_count
              FROM 
                boarddata.visits 
              WHERE 
                CONVERT_TZ(visit_time, '+00:00', '+09:00') >= CONVERT_TZ(CURDATE(), '+00:00', '+09:00') - INTERVAL 7 DAY 
              GROUP BY 
                agent;`);
                const [platformResult] = await db.query<RowDataPacket[]>(`SELECT 
                platform,
                COUNT(*) AS platform_count
              FROM 
                boarddata.visits 
              WHERE 
                CONVERT_TZ(visit_time, '+00:00', '+09:00') >= CONVERT_TZ(CURDATE(), '+00:00', '+09:00') - INTERVAL 7 DAY 
              GROUP BY 
                platform;`);
                const dataResult = {
                  visitResult : visitResult,
                  agentResult : agentResult,
                  platformResult : platformResult
                }
                return NextResponse.json({ message: "성공", data: dataResult });

            case 'mainCnt' : 
            const [totalCnt] = await db.query<RowDataPacket[]>('select count(*) as cnt from boarddata.member');
            const [todayCnt] = await db.query<RowDataPacket[]>('select count(*) as cnt from boarddata.member where date >= CURDATE()');
            const [writeCnt] = await db.query<RowDataPacket[]>('select count (*) as cnt from boarddata.board where date >= CURDATE()');
            const [commentCnt] = await db.query<RowDataPacket[]>('select count (*) as cnt from boarddata.comment where date >= CURDATE()');
            const [visitCnt] = await db.query<RowDataPacket[]>('select count (*) as cnt from boarddata.visits where visit_time >= CURDATE()');
            const [visitTotalCnt] = await db.query<RowDataPacket[]>('select count (*) as cnt from boarddata.visits');
            // 총 방문자수

            const totalData : MainType = {
                totalCnt : totalCnt[0].cnt ?? 0,
                todayCnt : todayCnt[0].cnt ?? 0,
                writeCnt : writeCnt[0].cnt ?? 0,
                commentCnt : commentCnt[0].cnt ?? 0,
                visitCnt : visitCnt[0].cnt ?? 0,
                visitTotalCnt : visitTotalCnt[0].cnt ?? 0
            }
            return NextResponse.json({mesaage : "성공" , data : totalData})

            case 'mainNewMember' :
            const [todayMember] = await db.query<RowDataPacket[]>('select * from boarddata.member where date >= CURDATE()');
            return NextResponse.json({mesaage : "성공" , data : todayMember})

            case 'mainPost' :
            const [newPost] = await db.query<RowDataPacket[]>('select * from boarddata.board where date >= CURDATE()');
            const [newComment] = await db.query<RowDataPacket[]>('select * from boarddata.comment where date >= CURDATE()');
            const postData = {
                newPost : newPost ,
                newComment : newComment
            }
            return NextResponse.json({mesaage : "성공" , data : postData})

            default : 
            return NextResponse.json({error : "알 수 없는 에러가 발생하였습니다."})
        }
    }else{
        return NextResponse.json({error : "알 수 없는 에러가 발생하였습니다."})
    }
}