'use client'
import { useCustomSession } from "@/app/sessions";
import { faHammer } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
                            <div className="flex">
                                <FontAwesomeIcon className="pr-1 pt-1" icon={faHammer} />
                                <p>관리자</p>
                            </div>
                            :
                            session && session.user !== null &&
                            <div className="flex">
                                <FontAwesomeIcon className="pr-1 pt-1" icon={faUser} />
                                <p>일반회원</p>
                            </div>
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