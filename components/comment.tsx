'use client';

import { useCustomSession } from "@/app/sessions";
import { useState } from "react";

interface CommentProps{
    id : number
}

export default function Comment(props : CommentProps){
    const {id} = props;
    // alert(id)
    const [comment , setComment] = useState<string>('');
    const commentValue = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setComment(e.target.value)
    }

    const cmtSubmit = async ()=>{
        try{
            const res = await fetch('/api/comment',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(comment)
            })
        }catch(error){
            console.log(error)
        }
    }

    const {data : session} = useCustomSession();

    return(
        <>
            {
                session && session.user &&
                <>
                    <p>댓글 목록</p>
                    <div className="">
                        <input onChange={commentValue} type="text" className="border p-2 rounded" />
                        {comment}
                        <div className="border-t">
                            <button className="border bg-[#a6a7e0] text-white p-2" onClick={cmtSubmit}>등록</button>
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