import{headers} from 'next/headers'
import NotPng from '@/public/404.png'
import Image from "next/image";

export default async function NotFound() {
    const headerList = headers();
    // console.log(headerList.get('host'))
    const domain = headerList.get('referer')
    return(
        <>
            <div className="w-full">
                <div className="max-w-7xl mx-auto px-[3%]">
                    <Image src={NotPng} alt="404이미지" width={400} height={200} />
                    <p>입력하신 {domain}은 없는 페이지 입니다.</p>        
                </div>
            </div>
        </>
    )
}