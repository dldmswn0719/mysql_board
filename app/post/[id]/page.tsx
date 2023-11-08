'use client'
import { useParams } from "next/navigation"
import React, { useEffect , useState } from 'react';

interface PostList {
    id : number;
    title : string;
    content : string;
    author : string;
    date : string;
    count : string;
}

export default function Detatil(){
    const params = useParams();
    const [post, setPost] = useState<PostList[]>([])
    const [isLoading,setIsLoading] = useState<boolean>(true);
    console.log(params)

    useEffect(()=>{
        const fetchData = async () =>{
            // 배열의 마지막 값을 가지고 오는 방법 pop
            const res = await fetch(`/api/post/${params.id}`);
            const data = await res.json();
            console.log(data)
            setPost(data.data)
            setIsLoading(false)
        }
        fetchData()
    },[params.id])

    const deletePost = async (e : number) =>{
        if(window.confirm("정말로 이 게시글을 삭제하시겠습니까?")){
            try{
                const res = await fetch('/api/delete',{
                    method : "POST",
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body:JSON.stringify({id : e})
                })
                if(res.ok){
                    const data = await res.json();
                    console.log(data.message);
                    alert(data.message)
                    window.location.href = '/';
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
        <>
        {isLoading && <Loading />}
        {
            post.length > 0 && (
                <>
                    <div className="w-full bg-[#6d6fcd] sticky top-0 px-5">
                        <div className="max-w-7xl mx-auto py-5">
                            <h1 className='text-2xl font-medium text-white'>게시판</h1>
                        </div>
                    </div>
                    <div className="w-full px-5">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex justify-end mt-5">
                                <button className="bg-[#8082d3] text-white px-10 py-2 mr-2 rounded-xl shadow-md hover:bg-[#6d6fcd] focus:outline-none">수정</button>
                                <button onClick={()=>{deletePost(post[0].id)}} className="bg-[#a6a7e0] text-white px-10 py-2 inline-block rounded-xl shadow-md hover:bg-[#9394da] focus:outline-none">삭제</button>
                            </div>
                            <div className="lg:mt-10">
                                <div className="flex flex-wrap">
                                    <p className="text-lg md:text-xl lg:text-2xl lg:basis-[5%] basis-full mt-1">제목</p>
                                    <p className="border rounded-xl py-2 px-5 lg:basis-[95%] basis-full my-3 lg:my-0">{post && post[0]?.title}</p>
                                </div>                
                                <p className="text-lg md:text-xl lg:text-2xl">내용</p>
                                <div className="border rounded-xl py-2 px-5 w-full mt-3 h-auto">
                                    <p>{post && post[0]?.content}</p>
                                </div>                
                            </div>
                        </div>
                    </div>
                </>
            )
        }
        </>
    )
}

function Loading(){
    return(
    <div className="fixed w-full h-full top-0 left-0 z-50">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <g transform="rotate(0 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#8082d3`}>
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
                </rect>
                </g><g transform="rotate(30 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#8082d3`}>
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
                </rect>
                </g><g transform="rotate(60 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#8082d3`}>
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
                </rect>
                </g><g transform="rotate(90 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#8082d3`}>
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
                </rect>
                </g><g transform="rotate(120 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#8082d3`}>
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
                </rect>
                </g><g transform="rotate(150 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#8082d3`}>
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
                </rect>
                </g><g transform="rotate(180 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#8082d3`}>
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
                </rect>
                </g><g transform="rotate(210 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#8082d3`}>
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
                </rect>
                </g><g transform="rotate(240 50 50)">#
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#8082d3`}>
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
                </rect>
                </g><g transform="rotate(270 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#8082d3`}>
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
                </rect>
                </g><g transform="rotate(300 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#8082d3`}>
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
                </rect>
                </g><g transform="rotate(330 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#8082d3`}>
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
                </rect>
                </g>
            </svg>
        </div>
    </div>
    )
}