import MemberDelete from "@/components/admin/member/delete";
import Link from "next/link";

interface memberInfo{
    id : number;
    email :string;
    password : string;
    name : string;
    level : string;
    date : string;
}

async function getData() {
    const res = await fetch('https://mysql-board-ruby.vercel.app/api/admin',{
        cache : 'no-cache',
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            pathUrl : 'member'
        })
    })
    const data = res.json();
    // console.log(data)
    if(!res.ok){
        console.log("에러가 발생하였습니다.");
        return
    }
    return data;
}

export default async function AdminMember(){

    const resultData = await getData();
    const data = resultData.data;

    return(
        <>
            <div className="widget w-full overflow-hidden mb-5 p-4">
                <h3>회원 관리</h3>
            </div>
            <div className="widget w-full overflow-hidden">
                <ul className="flex justify-between text-center py-2 bg-gray-50 text-xs sm:text-sm md:text-base">
                    <li className="hidden md:list-item basis-1/12">번호</li>
                    <li className="basis-4/12 md:basis-2/12">이메일</li>
                    <li className="basis-4/12 md:basis-2/12">이름</li>
                    <li className="basis-1/12">레벨</li>
                    <li className="hidden md:list-item basis-3/12">가입날짜</li>
                    <li className="basis-2/12">수정 / 삭제</li>
                </ul>
                {
                    data && data.map((e:memberInfo,i:number)=>{
                        const date = new Date(e.date);
                        const year = date.getFullYear();
                        const month = (date.getMonth() + 1).toString().padStart(2,'0')
                        const day = date.getDate().toString().padStart(2,'0')
                        const formatDate = `${year}-${month}-${day}`
                        return(
                            <ul className="flex border-b last:border-0 justify-between text-center text-xs sm:text-sm md:text-base" key={i}>
                                <li className="py-1 hidden md:list-item basis-1/12">{data.length - i}</li>
                                <li className="py-1 basis-4/12 md:basis-2/12">{e.email}</li>
                                <li className="py-1 basis-4/12 md:basis-2/12">{e.name}</li>
                                <li className="py-1 basis-1/12">{e.level}</li>
                                <li className="py-1 hidden md:list-item basis-3/12">{formatDate}</li>
                                <li className="py-1 basis-2/12"><Link href={`/admin/member/edit/${e.id}`}>수정</Link> / <MemberDelete name={e.name} id={e.id} /></li>
                            </ul>
                        )
                    })
                }
            </div>
            <div className="flex justify-end mt-5">
                <Link href="/admin/member/add" className="bg-[#9394da] text-white px-4 py-2 rounded-md shadow-md hover:bg-[#8082d3]">회원추가</Link>
            </div>
        </>
    )
}