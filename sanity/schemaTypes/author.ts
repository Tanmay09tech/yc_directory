import { defineType, defineField} from "sanity";
import { UserIcon } from 'lucide-react';


export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,

  //Datafields related to the author
  fields: [
    defineField({
      name: 'id',
      type: 'number',
    }),
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'username',
      type: 'string',
    }),
    defineField({
      name: 'email',
      type: 'string',
    }),
    defineField({
      name: 'image',
      type: 'url',
    }),
    defineField({
      name: 'bio',
      type: 'text',
    }),
  ],
  //This will allow us to select those authors by name in the preview
  preview: {
    select:{
      title: 'name',
    }
  } 
})