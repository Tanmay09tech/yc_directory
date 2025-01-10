import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(
  //the first line is what type of keywords could be used for search by the user and the second line is the query

  // !defined($search) = checking whether search exists 

  // category match $search = if it matches the category

  // author->name match $search = if it matches the author name

  // title match $search = if it matches the title

   ` *[_type=="startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc) {
_id,
  title,
  slug,
  _createdAt,
  author->{
    _id,name,image,bio
  },
  views,
  description,
  category,
  image
}`
);
//This query will fetch the data from Sanity everytime the request is made


export const STARTUP_BY_ID_QUERY = defineQuery(
  `
  *[_type=="startup" && _id == $id][0]{
_id,
  title,
  slug,
  _createdAt,
  author->{
    _id,name,username,image,bio
  },
  views,
  description,
  category,
  image,
  pitch,
}
  `
);
//This query fetch Startup details for details page

export const STARTUP_VIEWS_QUERY = defineQuery(
  `
  *[_type=="startup" && _id == $id][0]{
  _id,views
  } `
);

export const AUTHOR_BY_GITHUB_ID_QUERY=defineQuery(
`
*[_type=="author" && id==$id][0]{
  _id,id,name,username,email,image,bio
}
`
)
;