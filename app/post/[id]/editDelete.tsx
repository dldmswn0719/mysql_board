'use client';

import { useCustomSession } from "@/app/sessions";
import Link from "next/link";
import React from "react";

interface propsType{
    results : {
        id : number;
        userid : string;
        title ?: string;
        content ?: string;
        username ?: string;
        count ?: number;
        date ?: string;
    }
}

export default function EditDelete({results} : propsType){
    const {data : session} = useCustomSession();

    const deletePost = async(e:number) =>{
        if(window.confirm("정말로 이 게시글을 삭제하시겠습니까?")){
            try{
                const res = await fetch('/api/delete',{
                    method : 'POST',
                    headers : {
                        'Content-type' : 'application/json'
                    },
                    body : JSON.stringify({id : e})
                })
                if(res.ok){
                    const data = await res.json();
                    console.log(data.message);
                    alert(data.message);
                    window.location.href = "/"
                }else{
                    const errorData = await res.json();
                    console.log(errorData.error);
                }
            }catch(error){
                console.log(error)
            }
        }else{
            console.log("사용자가 게시글 삭제를 취소했습니다.");
        }
    }  

    return(
        <React.Fragment>
            {
                session && session.user && (
                    (results && results && session.user.email === results.userid) || session.user.level === 10
                ) &&
                <>
                    <div>
                        <Link href={`/edit/${results.id}`}>
                            <button className="bg-[#8082d3] text-white px-10 py-2 mr-2 rounded-xl shadow-md hover:bg-[#6d6fcd] focus:outline-none">수정</button>
                        </Link>
                        <button onClick={()=>{deletePost(results.id)}} className="bg-[#a6a7e0] text-white px-10 py-2 inline-block rounded-xl shadow-md hover:bg-[#9394da] focus:outline-none">삭제</button>
                    </div>                                        
                </>
            }
        </React.Fragment>
    )
}