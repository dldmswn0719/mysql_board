'use client';

import { useState,useRef } from "react";

export default function Search(){
    const [keyword , setKeyword] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);
    const searchValue = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setKeyword(e.target.value)
    }
    // useRef = 해당 요소에 접근하기 위해 / 해당 요소의 값의 참조를 저장하기 위해 사용하며 , useRef 는 current속석을 가진 객체를 반환
    // useRef의 특징 : 참조값이 변경되어도 컴포넌트가 재랜더링 되지않는다.
    const searchSubmit = () =>{
        if(keyword === ''){
            inputRef.current?.focus();
            alert("검색어를 입력해주세요");
            return;
        }else{
            window.location.href = `/search/${keyword}`
        }
    }

    return(
        <div className="w-full">
            <div className="max-w-7xl mx-auto px-[3%]">
                <div className="flex justify-center gap-x-2 mb-5">
                    <input placeholder="제목을 입력해주세요." ref={inputRef} onChange={searchValue} type="text" className="border py-2 px-2 w-3/5 md:w-2/5" />
                    <button className="bg-[#8082d3] text-white px-4 rounded-lg" onClick={searchSubmit}>검색</button>
                </div>
            </div>
        </div>
    )
}