'use client'

import Image from "next/image"
import kakaologin from '@/public/kakao.png'
import naverlogin from '@/public/naver.png'
import githublogin from '@/public/github.png'
import googlelogin from '@/public/google.png'
import { signIn } from "next-auth/react"
import { useState } from "react"
import { faEyeSlash,faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link"


export default function Login(){

    const [email,setEmail] = useState<string>("");
    const [pw,setPw] = useState<string>("")

    const [showPw, setShowPw] = useState<boolean>(false);

    const ShowPassword = () => {
        setShowPw(!showPw);
    };

    const handleLogin = () => {
        signIn('credentials', { 
          email: email, 
          password: pw 
        });
      }

    return(
        <>
            <div className="w-full bg-[#6d6fcd] sticky top-0 px-5">
                <div className="max-w-7xl mx-auto py-5">
                    <Link href='/'>
                        <h1 className='text-2xl font-medium text-white cursor-pointer'>자유 게시판</h1>
                    </Link>
                </div>
            </div>
            <div className="w-full px-5 bg-[#f5f5f5]">
                <div className="flex justify-center h-[calc(100vh-136px)] items-center">
                    <div className="p-5 shadow-[0px_0px_10px_rgba(0,0,0,0.1)] bg-white rounded-xl">
                        <div className="text-2xl text-center mb-5">로그인</div>
                        <div className="mb-5">
                            <p>이메일 주소</p>
                            <input onChange={(e)=>{setEmail(e.target.value)}} type="text" name="email" placeholder="예) test@naver.com" required className="w-full py-3 mb-2 border-b focus:outline-none border-[#ddd]" />
                        </div>
                        <div className="mb-5 relative">
                            <p>비밀번호</p>
                            <input onChange={(e)=>{setPw(e.target.value)}} type={showPw ? "text" : "password"} name="password" required className="focus:outline-none w-full py-3 mb-2 border-b border-[#ddd]" />
                            <div onClick={ShowPassword} className="absolute right-2 top-1/2 cursor-pointer">
                                <FontAwesomeIcon icon={showPw ? faEye : faEyeSlash} />
                            </div>                           
                        </div>
                        <button className="w-full p-3 rounded-md bg-[#6d6fcd] border-none text-white cursor-pointer" type="submit" onClick={handleLogin}>확인</button>                     
                        <Link href='/register'>
                            <p className="text-center mt-5 cursor-pointer">회원가입</p>
                        </Link>
                        <div className="py-5">
                            <div className="justify-center flex space-x-5">
                                <button className="flex justify-center items-center" onClick={()=>{('kakao')}}>
                                    <Image width={40} height={40} src={kakaologin} alt="카카오로그인" />
                                    <p className="pl-2">카카오 로그인</p>
                                </button>       
                                <button className="flex justify-center items-center" onClick={()=>{signIn('naver')}}>
                                    <Image width={40} height={40} src={naverlogin} alt="네이버로그인" />
                                    <p className="pl-2">네이버 로그인</p>
                                </button>       
                                <button className="flex justify-center items-center" onClick={()=>{signIn('github')}}>
                                    <Image width={40} height={40} src={githublogin} alt="깃허브로그인" />
                                    <p className="pl-2">깃허브 로그인</p>
                                </button>       
                                <button className="flex justify-center items-center" onClick={()=>{signIn('google')}}>
                                    <Image width={40} height={40} src={googlelogin} alt="구글로그인" />
                                    <p className="pl-2">구글 로그인</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}