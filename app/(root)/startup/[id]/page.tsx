//we need this route to show a dynamic startup page for each startup based on the id in the URL

import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";

const md = new markdownit();
export const experimental_ppr = true;

//Destructuring params 
const Page= async ({params}:{params: Promise<{id:string}>}) => {

  const {id} =await params;

  const post = await client.fetch(STARTUP_BY_ID_QUERY,{id});

  if(!post){
    return notFound();
  }

  const parsedContent=md.render(post?.pitch || "");
  return(
    <>
    <section className="pink_container !min-h-[230px]">
     <p  className="tag">
    {formatDate(post?._createdAt)}
     </p>
     <h1 className="heading">{post.title}</h1>
     <p className="subheading !max-w-5xl !text-white">{post.description}</p>
    </section>
    
    <section className="section_container">
    <img  src={post.image} alt="thumbnail" className="w-full h-auto rounded-xl" />
    <div className="space-y-5 mt-10 max-w-4xl mx-auto">
      <div className="flex between gap-5">
      <Link href={`/user/${post.author?._id}`} className="flex gap-2 items-center mb-3">
      <Image src={post.author.image} alt={post.author.name} width={64} height={64} className="rounded-full drop-shadow-lg" />
      <div>
      <p className="text-20-medium">{post.author.name}</p>
      <p className="text-16-medium !text-black-300">@{post.author.username}</p>
      </div>
      </Link>
      </div>
      <p className="category-tag">
        {post.category}
      </p>
      <h3 className="text-30-bold">
        Pitch Details
      </h3>
      {parsedContent?(
        <article className="prose max-w-4xl font-work-sans break-all" 
        dangerouslySetInnerHTML={{__html:parsedContent}}
        />

      ):(
        <p className="no-result">
          No pitch yet
        </p>
      )}
      </div>
      <hr className="divider"/>
      {/*RECOMMENDED STARTUPS*/}

      <Suspense fallback={<Skeleton className="view_skeleton"/>}>
       <View id={id}/>
      </Suspense>
      
    </section>
   
    </>
  );
}
export default Page