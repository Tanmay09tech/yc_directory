
import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { StartupTypeCard } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({searchParams}:{searchParams:Promise<{query:string}>}) {

//Extracting the query from the URL
const query = (await searchParams).query;

//retrieving the query and then filtering the results in fetch function later
const params={search:query|| null};

const session= await auth();

console.log(session?.id);

//STARTUPS_QUERY holds the data from Sanity
//Fetching the data from Sanity
const {data:post} = await sanityFetch({query:STARTUPS_QUERY,params});


//console.log(JSON.stringify(post,null,2));

//Dummy Database 
//const post= [{
  //_createdAt: new Date(),
 // views:55,
 // author:{
  //  _id:1,
 //   name:'Mark Manson'
 // },
 // _id:1,
 // description:'This is a Description',
 // image:'https://unsplash.com/photos/a-robot-flying-through-the-air-surrounded-by-gears-C4KspT2KypI',
 // category:'Robots',
 // title:'We Robots',
//}];

  return (
    <>
    <section className="pink_container">
    <h1 className="heading">Pitch Your Startup <br/> Connect With Entrepreneurs</h1>
    <p className="sub-heading !max-w-3xl">
     Submit Ideas,Vote on Pitches,and Get Noticed
    </p>
    {/*Search Form with query*/}
    <SearchForm query={query}/>

    
    </section>
   {/*Search Results*/}
    <section className="section_container">
     
     {/*Search Results Heading*/}
     <p className="text-30-semibold">
     {query ? `Showing results for : ${query}` : `All Startups`}
     </p>
     
     {/*Search Results List*/}
     <ul className="mt-7 card_grid">
     {
      post?.length>0?(
        post.map((post:StartupTypeCard, index:number) => (
          <StartupCard key={post?._id} post={post}/>
          
        ))
      ):(
     <p className="no-results">No results found</p>
      )
     }
     </ul>

    </section>
   
   <SanityLive/>
    </>
  );
}