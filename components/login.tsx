// 'use client'
// import { useCustomSession } from "@/app/sessions";
import { faHammer } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react"
import Link from "next/link"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface userInfo{
    user : {
        name : string;
        email?: string;
        image?: string;
        level?: number;
    }
}

export default async function Login(){
    // const {data : session , status} = useCustomSession();
    let session = await getServerSession(authOptions) as userInfo;
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
                                session && session.user ?
                                <>
                                    <p>{session && session.user?.name}님 반갑습니다.</p>
                                    <Link href='/logout'>
                                        <button>로그아웃</button>
                                    </Link>
                                </>
                                :
                                <>
                                    <Link href='/register'>회원가입</Link>
                                    <Link href='/login'>
                                        <button>로그인</button>
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