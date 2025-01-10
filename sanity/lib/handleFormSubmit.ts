  // handleFormSubmit.ts
    import { z } from "zod";
    import { formSchema } from "@/sanity/lib/validation";
    import { createPitch } from "@/sanity/lib/actions";
    
    
    export const handleFormSubmit = async (prevState: any, formData: FormData) => {
      try {
        const formValues = {
          title: formData.get("title") as string,
          description: formData.get("description") as string,
          category: formData.get("category") as string,
          link: formData.get("link") as string,
          pitch: formData.get("pitch") as string || "",
        };
    
        console.log("Form Values:", formValues); // Log the form values for debugging
    
        // Validate the form values against the schema
        await formSchema.parseAsync(formValues);
    
        const result = await createPitch(prevState, formData, formValues.pitch);
        return result;
      } catch (error) {
       
        throw error; // Re-throw other errors
      }
    };