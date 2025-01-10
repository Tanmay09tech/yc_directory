  //Importing
  import Link from 'next/link';
  import React from 'react';
  import Image from 'next/image';
  import { auth, signIn} from '@/auth';
  import { Session } from 'next-auth';
  import { getProviders, signOut } from 'next-auth/react';
  import { LoginButton, LogoutButton } from './AuthButtons';  // Using relative import

  const Navbar = async () => {
    //Look into user session coming directly from nextAuth to check if user is logged in
      const session= await auth();
    
    return (
      <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
        <nav className="flex justify-between items-center">
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={144} height={30} />
          </Link>
          <div className="flex items-center gap-5 text-black">
            {/*Within here, We only want to render things if the user is logged in*/}
            {session && session?.user ? (
              <>
                {/* Add your authenticated user content here */}

                {/*redirecting to the create page*/}
                <Link href="/startup/create">
                <span>Create</span>
                </Link>
                {/*logout button*/}
               <LogoutButton/>
                {/*user profile*/}
                <Link href={`/user/${session?.user?.id}`}>
                <span>{session?.user?.name}</span>
                </Link>

                {/**/}
              </>
            ) : 
            (
              // if not logged in, show the login button
            <LoginButton/>
              )}
          </div>
        </nav>
      </header> 
    );
  };
 
  export default Navbar;