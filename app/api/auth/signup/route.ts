import { NextRequest ,NextResponse } from "next/server";
import db from '@/db'
import bcrypt from 'bcrypt';
import { RowDataPacket } from "mysql2";

interface formType{
    email : string;
    password : string;
    name : string;
    level ?: number;
    type ?: string;
    gender: string;
    id ?: number;
}

export const POST = async (
    req : NextRequest
) : Promise<NextResponse> => {
    if(req.method === 'POST'){

        let {email,password,name,gender,level,type,id} : formType = JSON.parse(await req.text());
        level = level === undefined ? 2 :level;
        if(type === 'edit'){
            const [chkMember] = await db.query<RowDataPacket[]>('select password from boarddata.member where email = ?',[email])
            if(password === chkMember[0].password){
                await db.query<RowDataPacket[]>('update boarddata.member set email = ?,name = ?,level = ? where id = ?',[email,name,level,id])
            }else{
                const hash = await bcrypt.hash(password,10);
                await db.query<RowDataPacket[]>('update boarddata.member set email = ?, password = ?,name = ?,level = ? where id = ?',[email,hash,name,level,id])
            }
            return NextResponse.json({message : "성공" , data : name})
        }  
        if(!email || !password || !name || !gender){
            return NextResponse.json({message : "데이터가 부족합니다."})
        }

        const hash = await bcrypt.hash(password, 10)
        // console.log(hash)

        const [checkMember] = await db.query<RowDataPacket[]>('select count(*) as cnt from boarddata.member where email = ?',[email])
        const memberCnt = checkMember[0].cnt

        if(memberCnt > 0){
            return NextResponse.json({message : "이미 사용중인 이메일입니다."})
        }else{
            await db.query('insert into boarddata.member (email,password,name,gender,level) values(?,?,?,?,?)',[email,hash,name,gender,level])
            const data = {
                email : email,
                name : name,
                password : password
            }
            return NextResponse.json({message : "성공" , data : data})
        }

    }else{
        return NextResponse.json({error : "실패"})
    }
}