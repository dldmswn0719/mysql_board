'use client';

import { useCustomSession } from "@/app/sessions";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface CommentProps{
    id : number
}

interface formType{
    parentid : number;
    userid : string;
    username : string;
    content : string;
}

interface CommentType {
    id : number;
    parentid : number;
    userid : string;
    username : string;
    content : string;
    date : string;
}

export default function Comment(props : CommentProps){
    const {id} = props;
    // alert(id)
    const {data : session} = useCustomSession();
    const [formData , setFormData] = useState<formType>({
        parentid : id,
        userid : session?.user?.email ?? '',
        username : session?.user?.name ?? '',
        content : ''
    })

    useEffect(()=>{
        setFormData({
            parentid : id,
            userid : session?.user?.email ?? '',
            username : session?.user?.name ?? '',
            content : ''
        })
    },[session?.user.name, session?.user.email , id])

    const [totalComment , setTotalComment] = useState<CommentType[]>();
    const commentValue = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setFormData({...formData , [e.target.name] : e.target.value});
        // console.log(formData)
    }
    const params = useParams();
    // console.log(params) 

    useEffect(()=>{
       const fetchData = async () =>{
        const res = await fetch(`/api/comment?id=${params.id}`)
        const data = await res.json();
        setTotalComment(data.result)
       } 
       fetchData()
    },[params.id])

    const cmtSubmit = async ()=>{
        try{
            const res = await fetch('/api/comment',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(formData)
            })
            if(res.ok){
                const data = await res.json();
                console.log(data)
                setTotalComment(data.result)
            }
        }catch(error){
            console.log(error)
        }
    }


    return(
        <>
            {
                session && session.user &&
                <>
                <div className="border p-5 rounded-xl mt-5">
                    <p>댓글 목록</p>
                    {
                        totalComment && totalComment.map((e,i)=>{
                            const date = new Date(e.date);
                            const year = date.getFullYear();
                            const month = (date.getMonth() + 1).toString().padStart(2,'0')
                            const day = date.getDate().toString().padStart(2,'0')
                            const hours = (date.getHours()+9).toString().padStart(2,'0');
                            const minutes = date.getMinutes().toString().padStart(2,'0');
                            const seconds = date.getSeconds().toString().padStart(2,'0')
                            const formatDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
                            return(
                                <div key={i} className="flex justify-between">
                                    <p>{e.content}</p>
                                    <p>{formatDate}</p>
                                </div>
                            )
                        })
                    }
                    <input name="content" onChange={commentValue} maxLength={200} type="text" className="border p-2 rounded-md w-full h-32" />
                    <div className="border-t mt-5 flex justify-between">
                        {/* <p className="mt-5">{comment.length}/200</p> */}
                        <button className="bg-[#a6a7e0] text-white mt-5 px-5 py-2 rounded-xl" onClick={cmtSubmit}>등록</button>
                    </div>
                </div>
                </>
            }        
        </>
    )
}

/*
    const {data : session} = useCustomSession();
    const data = {
        id : 5,
        name : "홍길동",
        email : "abcd@naver.com"
    }
    변수내에 중괄호가 {}가 들어가면 구조 분해 할당(destructuring assignment) > 해당 객체에서 그 속성을 추출해서 새로운 변수로 할당할때 사용
    예를 들어 ....data .id 이걸 변수로 저장을 따로 하고 싶다면
    const {id} = data >  const id = 5 값이 저장된다.
    data.id 로 사용가능 ...
*/