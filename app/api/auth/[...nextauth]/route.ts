import NextAuth from "next-auth/next";
import Github from "next-auth/providers/github";
import KaKaoProvider from 'next-auth/providers/kakao'
import NaverProvider from 'next-auth/providers/naver'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
    providers : [
       Github({
        clientId : `${process.env.GITHUB_ID}`,
        clientSecret : `${process.env.GITHUB_PW}`
       }),
       KaKaoProvider({
        clientId : `${process.env.KAKAO_ID}`,
        clientSecret : `${process.env.KAKAO_PW}`
       }),
       NaverProvider({
        clientId :  `${process.env.NAVER_ID}`,
        clientSecret :  `${process.env.NAVER_ID}`
       }),
       GoogleProvider({
        clientId :  `${process.env.GOOGLE_ID}`,
        clientSecret :  `${process.env.GOOGLE_ID}`
       })
    ],
    secret : `${process.env.SECRET}`
}

const handler = NextAuth(authOptions);
export {handler as GET , handler as POST}