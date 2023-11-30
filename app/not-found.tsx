import{headers} from 'next/headers'

export default async function NotFound() {
    const headerList = headers();
    const domain = headerList.get('referer')
    return(
        <>
            <div className="w-full">
                <div className="max-w-7xl mx-auto px-[3%]">
                    <p className='text-center text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>입력하신 {domain}은 없는 페이지 입니다.</p>        
                </div>
            </div>
        </>
    )
}