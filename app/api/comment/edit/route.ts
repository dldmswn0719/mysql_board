import { NextRequest , NextResponse } from "next/server";
import db from '@/db'

interface EditData {
    id : number;
    content: string;
}

export const POST = async (
    req : NextRequest,
) : Promise<NextResponse> =>{

    if(req.method === 'POST'){
        try{
            const {id, content} : EditData = JSON.parse(await req.text());
            console.log(id, content)
            if(!id || !content){
                return NextResponse.json({message : "데이터가 부족합니다."})
            }else{
                await db.query('update boarddata.comment set content = ? where id = ?' , [content, id]) 
                return NextResponse.json({message : "댓글이 정상적으로 수정되었습니다."})
            }
        }catch(error){
            return NextResponse.json({error : "에러"})
        }
    }else{
        return NextResponse.json({error : "정상적인 데이터가 아닙니다."})
    }
}