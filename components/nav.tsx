
import { faHammer } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Logout from "./logout";
import Login from "./login";
import Image from "next/image";
import Logo from '@/public/logo.png'

interface userInfo{
    user : {
        name : string;
        email?: string;
        image?: string;
        level?: number;
    }
}

export default async function Nav(){
    let session = await getServerSession(authOptions) as userInfo;

    return(
        <>
            <div className="w-full">
                <div className="max-w-7xl mx-auto px-[3%]">
                    <div className="flex justify-between">
                        <div>
                            <Link href="/">
                                <Image src={Logo} alt="로고" width={200} height={40} />
                            </Link>
                        </div>
                        <div className="flex flex-wrap justify-center items-center space-x-3">
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
                                        <Logout />
                                    </>
                                    :
                                    <>
                                        <Link href='/register'>회원가입</Link>
                                        <Login />
                                    </>
                                }
                            </>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}