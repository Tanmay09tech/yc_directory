"use client";
        //StartupForm.tsx
    import React, { useActionState } from "react";
    import { Input } from "@/components/ui/input";
    import { useState } from "react";
    import MDEditor from "@uiw/react-md-editor";
    import { Button } from "@/components/ui/button";
    import { Send } from "lucide-react";
    import { Description } from "@radix-ui/react-toast";
    import { formSchema } from "@/sanity/lib/validation";
    import { z } from "zod";
    import { useToast } from "@/hooks/use-toast";
    import { useRouter } from "next/navigation";
    import { createPitch } from "@/sanity/lib/actions";
    import { handleFormSubmit } from "../sanity/lib/handleFormSubmit";
    
    
  
    const StartupForm =  () => {
    
       
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsPending(true); // Set loading state

    const formData = new FormData(event.target as HTMLFormElement);
    const result = await handleFormSubmit({}, formData); // Call the form submit function

   
      
      
     if (result.status === "SUCCESS") {
      toast({
        title: "Success",
        description: "Your Startup pitch has been submitted",
      });
      router.push(`/startups/${result._id}`);
    } else {
      setErrors(result.errors); // Set errors from handleFormSubmit
    }

    setIsPending(false); // Reset loading state
  };

      return (
        <form onSubmit={handleSubmit} className="startup-form"> 
        <div>
          <label htmlFor="title" className="startup-form_label">
            Title
          </label>
          <Input
            type="text"
            name="title"
            id="title"
            className="startup-form_input"
            required 
            placeholder="startup title"
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="description" className="startup-form_label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="block w-full border border-gray-300 rounded-lg p-2 text-gray-700 resize-none"
            required 
            placeholder="startup description"
          />
          {errors.description && <p className="text-red-500">{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="category" className="startup-form_label">
            Category
          </label>
          <Input
            type="text"
            name="category"
            id="category"
            className="startup-form_input"
            required 
            placeholder="startup category [Tech,Healthcare,Education,etc.]"
          />
          {errors.category && <p className="text-red-500">{errors.category}</p>}
        </div>

        <div>
          <label htmlFor="link" className="startup-form_label">
            Image URL
          </label>
          <Input
            type="text"
            name="link"
            id="Link"
            className="startup-form_input"
            placeholder="startup image URL"
          />
          {errors.link && <p className="text-red-500">{errors.link}</p>}
        </div>

        <div data-color-mode="light">
          <label htmlFor="pitch" className="startup-form_label">
            Pitch
          </label>
          <MDEditor
            value={pitch}
            onChange={(value) => setPitch(value as string || "")}
            id="pitch"
            preview="edit"
            height={300}
            style={{borderRadius:20,overflow:"hidden"}}
            textareaProps={{
              placeholder:"briefly describe your idea and what problem you are solving",
            }}
            previewOptions={{
              disallowedElements:["style"],
            }}
          />
          {errors.pitch && <p className="text-red-500">{errors.pitch}</p>}
        </div>
        <Button type="submit" className="startup-form_btn"
        disabled={isPending}>
          {isPending ? "Submitting..." : "Submit"}
          <Send className="size-6 ml-1"/>
        </Button>

        </form>
      );
    };

    export default StartupForm;