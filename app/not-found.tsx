import{headers} from 'next/headers'

export default async function NotFound() {
    const headerList = headers();
    console.log(headerList.get('host'))
    const domain = headerList.get('referer')
    return(
        <>
            <p>입력하신 {domain}은 없는 페이지 입니다.</p>        
        </>
    )
}