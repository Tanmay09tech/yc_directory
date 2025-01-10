    import React from "react";
    import { formatDate } from "@/lib/utils";
    import { EyeIcon } from "lucide-react";

    import Image from "next/image";
    import Link from "next/link";
    import { Button } from "./ui/button";
import { Author, Startup } from "@/studio-yc_directory/sanity.types";
    // Note: We cannot children Link elements i.e. we cannot use Link inside Link

    export type StartupTypeCard = Omit<Startup,"author"> & {author?: Author};

    const StartupCard = ({post}: {post: StartupTypeCard}) => {

      //Destructure properties coming out of post
    const {_createdAt, views, author, title, description, image, category, _id} = post;
    const authorId = author?._id;
    const name = author?.name;

      return (
    <li className="startup-card group">
      <div className="flex-between">
    <p className="startup_card_date"> 
    {formatDate(_createdAt)}
    </p>

    <div className="flex gap-1.5">

    <EyeIcon className="size-6 text-primary" />

    <span className="text-16-medium">
    {views}
    </span>

    </div>

      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
        <Link href={`/user/${authorId}`}>
        <p className="text-16-medium line-clamp-1">
        {name}
        </p>
        </Link>

        <Link href={`/startup/${_id}`}>
        <h3 className="text-26-semibold line-clamp-1">
        {title}
        </h3>
        </Link>
        </div>
      
        <Link href={`/user/${authorId}`}>
        {/* AvatarImage */}
        <Image src= "https://placehold.co/600x400" alt="placeholder" width={48} height={48} className="rounded-full" />
        </Link>
      </div>

    {/* Container for Startup details */}
      <Link href={`/startup/${_id}`}>
      <p className="startup-card_desc">
      {description}
      </p>
    {/* Startup Image */}
      <img src={image} alt="placeholder" className="startup-card_image" />
      </Link>

      {/* Footer of Startup Card */}
      <div className="flex-between gap-3 mt-5 ">

        {/*Update the query */}
      <Link href={`/?query=${category?.toLowerCase() || ''}`}>
      <p className="text-16-medium">
      {category || 'Uncategorized'}
      </p>
      </Link>
      {/* Details Button */}
      <Button className="startup-card_btn" asChild>
        {/* Link to Startup details page */}
        <Link href={`/startup/${_id}`}>
        Details
        </Link>
      </Button>
      </div>

    </li>
      );
    };

    export default StartupCard;