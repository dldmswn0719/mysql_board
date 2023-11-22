import { faHammer } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Logout from "./logout";
import Login from "./login";

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
                    <div className="flex justify-between items-center mt-5">
                        <Link href="/">                        
                            <p className="md:text-3xl text-xl mt-0.5">은주의 게시판</p>
                        </Link>
                        <div className="flex flex-wrap justify-center items-center gap-x-2">
                            {/* {
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
                            } */}
                            {/* 관리자, 혹은 일반회원 출력 */}
                            <>
                                {
                                    session && session.user ?
                                    <>
                                        <p>{session && session.user?.name}님</p>
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