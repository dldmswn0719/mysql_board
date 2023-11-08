import { NextRequest , NextResponse } from "next/server";
import db from '@/db'

interface PostData {
    name : string;
    title : string;
    content : string;
}

export const POST = async (
    req : NextRequest,
) : Promise<NextResponse> =>{

    if(req.method === 'POST'){
        try{
            const {name , title , content} : PostData = JSON.parse(await req.text());
            console.log(name , title , content)
            if(!name || !title || !content ){
                return NextResponse.json({message : "데이터가 부족합니다."})
            }else{
                // select - 선택
                // insert - 입력
                // delete - 삭제
                // update - 수정
                const [results] = await db.query(
                    'insert into boarddata.board(author,title,content) values (? , ? , ?)' , [name , title , content]
                )
                return NextResponse.json({message : "정상적으로 글이 등록되었습니다." , result : results})
            }
        }catch(error){
            return NextResponse.json({error : "에러"})
        }
    }else{
        return NextResponse.json({error : "정상적인 데이터가 아닙니다."})
    }
}