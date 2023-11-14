'use client'
import { useCustomSession } from "@/app/sessions";
import { signIn ,signOut } from "next-auth/react"
import Link from "next/link"

interface userInfo{
    name : string;
    email : string;
    image : string;
}

export default function Login(){
    const {data : session , status} = useCustomSession();
    const redirectTo = () =>{
        sessionStorage.setItem('preUrl' , window.location.href);
        window.location.href = "/login"
    }

    return(
        <>
            <div className="w-full px-5">
                <div className="max-w-7xl mx-auto">
                    <div className="py-5 flex justify-end space-x-3">
                        {
                            session && session.user.level === 10 ?
                            <p>관리자</p>
                            :
                            session && session.user !== null && <p>일반회원</p>
                        }
                        <>
                            {
                                status !== 'loading' && session && session.user?.email ?
                                <>
                                    <p>{session && session.user?.name}님 반갑습니다.</p>
                                    <button onClick={()=>{signOut()}}>로그아웃</button>
                                </>
                                :
                                <>
                                    <Link href='/register'>회원가입</Link>
                                    <Link href='/login'>
                                        <button onClick={redirectTo}>로그인</button>
                                    </Link>
                                </>
                            }
                        </>
                    </div>
                </div>
            </div>
        </>

    )
}