import { defineType, defineField} from "sanity";




export const startup = defineType({
  name: 'startup',
  title: 'Startup',
  type: 'document',
  

  //Datafields related to the author
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug', 
      options: {
        source: 'title'

      }
    }),
    
    defineField({
      name: 'author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'views',
      type: 'number',
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'category',
      type: 'string',
      //This will allow us to select those startups by name in the preview
      validation: (Rule) => Rule.min(1).max(20).required().error('Category is required'),
    }),
    defineField({
      name: 'image',
      type:'url',
      //This sets the rule that the image is required
      validation: (Rule) => Rule.required().error('Image is required'),
    }),
    defineField({
      name: 'pitch',
      type:'markdown',
      //This sets the rule that the image is required
      validation: (Rule) => Rule.required().error('Image is required'),
    }),
  ],
  
  } 
)