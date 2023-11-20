'use client'

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PostList {
    id : number;
    title : string;
    content : string;
    userid : string;
    username : string;
    date : string;
    count : string;
}

export default function Edit () {

    const params = useParams();
    const [post, setPost] = useState<PostList[]>([])
    const [formData, setFormData] = useState({
        // name: '',
        title: '',
        content: ''
      });

    useEffect(()=>{
        const fetchData = async () =>{
            // 배열의 마지막 값을 가지고 오는 방법 pop
            const res = await fetch(`/api/post/${params.id}`);
            const data = await res.json();
            console.log(data)
            setPost(data.data)
            setFormData({
                // name: data.data[0]?.username,
                title: data.data[0]?.title,
                content: data.data[0]?.content
              });
        }
        fetchData()
    },[params.id])
      
    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.name !== 'name') {
            setFormData({...formData,[e.target.name]: e.target.value});
          }
        // setFormData({...formData,[e.target.name]: e.target.value});
    };

    const EditPost = async (e : number) =>{
        try{
            const res = await fetch('/api/edit',{
                method : "POST",
                headers : {
                    'Content-Type' : 'application/json'
                },
                body:JSON.stringify({id : e, title: formData.title, content: formData.content})
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
    }

    return(
        <>
            {
                post.length > 0 && 
                <>
                    <div className="w-full">
                        <div className="max-w-7xl mx-auto px-[3%]">
                            <form method='post'>
                                <div className="flex justify-end mt-5">
                                    <Link className='bg-[#a6a7e0] text-white px-10 py-2 inline-block mr-2 rounded-xl shadow-md hover:bg-[#9394da] focus:outline-none' href="/">취소</Link>
                                    <button onClick={()=>{EditPost(post[0].id)}} className='bg-[#8082d3] text-white px-7 py-2 rounded-xl shadow-md hover:bg-[#6d6fcd] focus:outline-none'>수정 완료</button>
                                </div>
                                <div className="lg:mt-10 mt-5 border rounded-xl p-5">
                                    <div className='flex flex-wrap border-b'>
                                        <p className='text-base md:text-lg lg:text-xl lg:basis-[5%] basis-full mt-2 mr-1'>작성자</p>
                                        <p className='lg:basis-[90%] basis-full my-2 text-gray-700 mb-2 w-1/4 py-1 px-5'>{post && post[0].username}</p>
                                    </div>
                                    <div>
                                        <p className='mt-3 text-base md:text-lg lg:text-xl'>제목</p>
                                        <input className='shadow text-gray-700 text-sm mb-2 border w-full my-2 py-2 px-5 rounded-lg' type="text" name='title' defaultValue={formData.title} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <p className='text-base md:text-lg lg:text-xl'>내용</p>
                                        <textarea className='shadow text-gray-700 text-sm mb-2 border w-full my-2 py-2 px-5 rounded-lg' name="content"  defaultValue={formData.content} onChange={handleChange} ></textarea>
                                    </div>
                                </div>                
                            </form>
                        </div>
                    </div>
                </>
            }
        </>
    )
}