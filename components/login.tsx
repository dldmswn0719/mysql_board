'use client'
import Image from "next/image"
import kakaologin from '@/public/kakao.png'
import naverlogin from '@/public/naver.png'
import githublogin from '@/public/github.png'
import googlelogin from '@/public/google.png'
import { signIn ,signOut } from "next-auth/react"

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
                            session && session.user?.email ?
                            <button onClick={()=>{signOut()}}>로그아웃</button>
                            :
                            <>
                                <button onClick={()=>{signIn('kakao')}}><Image width={40} height={40} src={kakaologin} alt="카카오로그인" /></button>       
                                <button onClick={()=>{signIn('naver')}}><Image width={40} height={40} src={naverlogin} alt="네이버로그인" /></button>       
                                <button onClick={()=>{signIn('github')}}><Image width={40} height={40} src={githublogin} alt="깃허브로그인" /></button>       
                                <button onClick={()=>{signIn('google')}}><Image width={40} height={40} src={googlelogin} alt="구글로그인" /></button>       
                            </>
                        }
                    </div>
                </div>
            </div>
        </>

    )
}