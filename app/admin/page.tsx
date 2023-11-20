import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ChartCom from "./chart";
import Modal from "@/components/modal";

interface userInfo {
    user : {
      name : string;
      email?: string;
      image?: string;
      level?: number;
    }
  }

export default async function Admin(){

    let sessions = await getServerSession(authOptions) as userInfo;
    if(!sessions && sessions || sessions?.user.level !== 10){
        return(
            <Modal error={"관리자만 접속 가능한 페이지 입니다."} address={"/login"} />
        )
    }
    return(
        <>
            <p>관리자 전용</p>
            <ChartCom />
        </>
    ) 

}