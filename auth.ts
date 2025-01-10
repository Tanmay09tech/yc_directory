import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"
import { client } from "./sanity/lib/client"
import { writeClient } from "./sanity/lib/write-client";

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    })
  ],
  callbacks: {
    //To check if user already exists in our database or not
    async signIn({ user:{name,email,image},profile }) {
      const existingUser = await client.withConfig({useCdn : false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY,{
      id:profile?.id,
      });
      if(!existingUser){
        await writeClient.create({
       _type:'author',
       id:profile?.id,
       name,
       username:profile?.login,
       email,
       image,
       bio:profile?.bio||"",
        })
      }
      return true;
    },
    async jwt({token,account,profile}){

      if(account && profile){
        const user=await client.withConfig({useCdn : false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY,{
          id:profile?.id
        });
        if(user){
        token.id=user?._id;
      }
      
    }
    return token;
  },
    async session({session,token}){
      Object.assign(session,{id:token.id});
      return session;
    },
}
})

