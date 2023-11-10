import { NextRequest ,NextResponse } from "next/server";
import db from '@/db'
import bcrypt from 'bcrypt';
import { RowDataPacket } from "mysql2";

interface formType{
    email : string;
    password : string;
    name : string;
}

export const POST = async (
    req : NextRequest
) : Promise<NextResponse> => {
    if(req.method === 'POST'){

        const {email,password,name} : formType = JSON.parse(await req.text());

        if(!email || !password || !name){
            return NextResponse.json({message : "데이터가 부족합니다."})
        }

        const hash = await bcrypt.hash(password, 10)
        // console.log(hash)

        const [checkMember] = await db.query<RowDataPacket[]>('select count(*) as cnt from boarddata.member where email = ?',[email])
        const memberCnt = checkMember[0].cnt

        if(memberCnt > 0){
            return NextResponse.json({message : "이미 사용중인 이메일입니다."})
        }else{
            const [results] = await db.query('insert into boarddata.member (email,password,name) values(?,?,?)',[email,hash,name])
            return NextResponse.json({message : "성공" , data : results})
        }

    }else{
        return NextResponse.json({error : "실패"})
    }
}