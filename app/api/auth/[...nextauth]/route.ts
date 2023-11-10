import NextAuth from "next-auth/next";
import Github from "next-auth/providers/github";
import KaKaoProvider from 'next-auth/providers/kakao'
import NaverProvider from 'next-auth/providers/naver'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import db from '@/db'
import { RowDataPacket } from "mysql2";

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
        clientSecret :  `${process.env.NAVER_PW}`
       }),
       GoogleProvider({
        clientId :  `${process.env.GOOGLE_ID}`,
        clientSecret :  `${process.env.GOOGLE_PW}`
       }),
       CredentialsProvider({
        name: "Credentials",
        credentials: {
            email : {label : "email" , type : "text"},
            password: { label: "password", type: "password" },
        },
        // 로그인 요청시 실행되는 코드 디비와 비교 이후 맞으면 return user 정보를 보내고 틀리면 return null
        async authorize(credentials, req) {
            const [results] = await db.query<RowDataPacket[]>('select * from boarddata.member where email =?',[credentials?.email])
            console.log(results[0].email)
            if(!results[0].email){
                console.log("해당 사용자가 없습니다.");
                return null
            }
            const pwCheck = await bcrypt.compare(credentials?.password,results[0].password)
            console.log(pwCheck)
            if(!pwCheck){
                console.log("비밀번호가 틀렸습니다.")
                return null
            }
            return results[0]
        }
      })
    ],
    pages : {
        signIn : '/login'
    },
    // jwt 만료일 설정
    session : {
        strategy  : "jwt",
        maxAge : 24 * 60 * 60
        // maxAge : 24 * 60 * 60 * 30 한달
    },
    // jwt 만들때 실행되는 코드 , 토큰 발급
    callbacks : {
        jwt : async ({token,user}) => {
            if(user){
                token.user = {};
                token.user.name = user.name
                token.user.email = user.email
                token.user.level = user.level
            }
            return token
        },
        // 유저 세션이 조회될때마다 실행되는 코드
        session : async({session,token})=>{
            session.user = token.user;
            return session
        }
    },
    secret : `${process.env.SECRET}`
}

const handler = NextAuth(authOptions);
export {handler as GET , handler as POST}