'use client';
import { useState } from "react";
import { faEyeSlash,faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { signIn } from "next-auth/react";

interface formType{
    email : string;
    password : string;
    confirmPassword: string;
    name : string;
}

export default function Register(){

    const [formData,setFormData] = useState<formType>({
        email : '',
        password : '',
        confirmPassword: '',
        name : ''
    })

    const [message,setMessage] = useState<string>("");

    const changeEvent = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setFormData({
            ...formData,[e.target.name] : e.target.value
        })
        // console.log(formData)
    }

    const submitEvent = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(formData.password !== formData.confirmPassword) {
            setMessage('비밀번호가 일치하지 않습니다.');
            return; 
        }
        try{
            const res = await fetch('/api/auth/signup',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(formData)
            })
            if(res.ok){
                const data = await res.json();
                const result = data.data;
                if(data.message === "성공"){
                    alert("회원가입이 완료되었습니다.")
                    // window.location.href='/';
                    signIn('credentials',{
                        email : result.email,
                        password : result.password,
                        callbackUrl : '/'
                    })
                }
                // console.log(data)
                setMessage(data.message)
            }
        }catch(error){  
            console.log(error)
        }
    }

    const [showPw, setShowPw] = useState([false, false]);

    const ShowPassword = (index : number) => {
        const newShowPw = [...showPw];
        newShowPw[index] = !newShowPw[index];
        setShowPw(newShowPw);
    };

    return(
        <>
            <div className="w-full bg-[#6d6fcd] sticky top-0 px-5">
                <div className="max-w-7xl mx-auto py-5">
                    <Link href='/'><h1 className='text-2xl font-medium text-white cursor-pointer'>자유 게시판</h1></Link>
                </div>
            </div>
            <div className="w-full px-5 bg-[#f5f5f5]">
                <div className="flex justify-center h-[calc(100vh-136px)] items-center">
                    <div className="lg:basis-1/3 md:basis-1/2 basis-full p-5 shadow-[0px_0px_10px_rgba(0,0,0,0.1)] bg-white rounded-xl">
                    <form onSubmit={submitEvent} action="/api/auth/signup" method="POST">
                        <p className="text-2xl text-center mb-5">회원가입</p>
                        <div className="mb-5">
                            <p>이름</p>
                            <input onChange={changeEvent} type="text" name="name" placeholder="홍길동" required className="focus:outline-none w-full py-3 mb-2 border-b border-[#ddd]" />
                        </div>
                        <div className="mb-5">
                            <p>이메일 주소</p>
                            <input onChange={changeEvent} type="text" name="email" placeholder="예) test@naver.com" required className="w-full py-3 mb-2 border-b focus:outline-none border-[#ddd]" />
                        </div>
                        <div className="mb-5 relative">
                            <p>비밀번호</p>
                            <input onChange={changeEvent} type={showPw[0] ? "text" : "password"} name="password" required className="focus:outline-none w-full py-3 mb-2 border-b border-[#ddd]" />
                            <div onClick={()=>ShowPassword(0)} className="absolute right-2 top-1/2 cursor-pointer">
                                <FontAwesomeIcon icon={showPw[0] ? faEye : faEyeSlash} />
                            </div>             
                        </div>
                        <div className="mb-5 relative">
                            <p>비밀번호 확인</p>
                            <input onChange={changeEvent} type={showPw[1] ? "text" : "password"} name="confirmPassword" required className="focus:outline-none w-full py-3 mb-2 border-b border-[#ddd]" />
                            <div onClick={()=>ShowPassword(1)} className="absolute right-2 top-1/2 cursor-pointer">
                                <FontAwesomeIcon icon={showPw[1] ? faEye : faEyeSlash} />
                            </div>             
                        </div>
                        <button className="w-full p-3 rounded-md bg-[#6d6fcd] border-none text-white cursor-pointer" type="submit">가입</button>
                    </form>
                    <p className="py-2">{message}</p>
                    </div>
                </div>
            </div>
        </>
    )
}