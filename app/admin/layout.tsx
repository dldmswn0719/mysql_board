import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Modal from "@/components/modal";
import Logout from "@/components/logout";
import Link from "next/link";
import AdminNav from "@/components/admin/navbar/adminNav";

interface userInfo {
    user : {
      name : string;
      email?: string;
      image?: string;
      level?: number;
    }
  }

export default async function DashboardLayout({
    children
}:{
    children:React.ReactNode
}){

    let sessions = await getServerSession(authOptions) as userInfo;
    // if(!sessions && sessions || sessions?.user.level !== 10){
    //     return(
    //         <div className="min-h-[calc(100vh-78px)] flex items-center justify-center flex-wrap bg-[#f1f0f5]">
    //             <div className="widget p-4 text-center">
    //                 <p className="mb-4 text-lg font-semibold">관리자만 접속 가능한 페이지입니다.</p>
    //                 {
    //                     sessions ? <Logout /> : <Link href="/login">로그인</Link>
    //                 }
    //             </div>
    //         </div>
    //         // <Modal error={"관리자만 접속 가능한 페이지 입니다."} address={"/login"} />
    //     )
    // }
    return(
        <>
            <div className="bg-[#f1f0f5] flex justify-between px-[4%] md:px-[2%]">
                {/* 네비 */}
                <AdminNav />
                <div className="md:pl-48 pt-9 w-full">
                    {children}
                </div>
            </div>
        </>
    )
}