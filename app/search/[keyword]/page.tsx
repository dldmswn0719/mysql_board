import db from "@/db";
import { RowDataPacket } from "mysql2";
import Link from "next/link";
import React from "react";

export default async function SearchResult({
    params
} : {
    params ?: {keyword ?: string}
}) {
    const keywords = params ?.keyword !== undefined ? params.keyword : "";

    const [results] = await db.query<RowDataPacket[]>('select * from boarddata.board where title like ?',[`%${decodeURIComponent(keywords)}%`])

    return(
        <div className="w-full">
            <div className="max-w-7xl mx-auto px-[3%]">
                <p>검색 결과 : {decodeURIComponent(keywords)}</p>
                {results.length === 0 && <p>검색결과가 없습니다.</p>}
                {
                    results && results.length > 0 && results.map((e,i)=>{
                        return(
                            <div className="border p-3 flex justify-between" key={i}>
                                <div>
                                    <Link href={`/post/${e.id}`}>
                                        <p>제목 : {e.title}</p>
                                    </Link>
                                </div>
                                <div>
                                    <p>내용 : {e.content}</p>
                                </div>
                                <div>
                                    <p>작성자 : {e.username}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}