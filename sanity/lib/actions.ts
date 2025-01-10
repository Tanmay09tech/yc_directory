  "use server";
  import { auth } from "@/auth";
  import { parseServerActionResponse } from "@/lib/utils";
  import { error } from "console";
  import slugify from "slugify";
  import { writeClient } from "./write-client";


  export const createPitch= async(state:any,form:FormData,pitch:string) =>{
  const session=await auth();
  //Checking if session exists
  if(!session){
    return parseServerActionResponse({status:"ERROR",error:"You need to be logged in to create a startup"})
  };
  //Destructuring the form
  const {title,description,category,link}=Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch")
  ); 
  //Creating a slug from the title 
  const slug=slugify(title as string, {lower: true,strict: true})

  //Taking all data and sending it to sanity
  try{
   const startup={
    title,
    description,
    category,
    image:link,
    slug:{
    _type:slug,
    current:slug
    },
    author:{
      _type:"reference",
      _ref:session?.id,
    },
    pitch,
  }

  //using writeClient to send the data to sanity to create the startup in the database
  const result=await writeClient.create({_type:"startup",...startup});

  return parseServerActionResponse({
  ...result,
    error:"",
    status:"SUCCESS"})
  }catch(error){
    console.log(error);

    return parseServerActionResponse({status:JSON.stringify(error),error:"Something went wrong"})
  }
  }

  