'use client'
import { signIn ,signOut } from "next-auth/react"
import Link from "next/link"

interface userInfo{
    name : string;
    email : string;
    image : string;
}

interface PropsData{
    session?: userInfo | null
}

export default function Login({session} : PropsData){
    return(
        <>
            <div className="w-full px-5">
                <div className="max-w-7xl mx-auto">
                    <div className="py-5 flex justify-end space-x-3">
                        {
                            session && session.user.level === 10 ?
                            '관리자'
                            :
                            session && session.user !== null && '일반회원'
                        }
                        {console.log(session && session.user)}
                        {
                            session && session.user ?
                            <button onClick={()=>{signOut()}}>로그아웃</button>
                            :
                            <>
                                <Link href='/register'>회원가입</Link>
                                <Link href='/login'><button>로그인</button></Link>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>

    )
}