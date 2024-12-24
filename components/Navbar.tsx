import Link from 'next/link'
import Image from 'next/image'
import { auth } from '@/auth'
import { signIn, signOut } from '@/auth'
import { BadgePlus, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

/**
 * Asynchronous Navbar component that renders a navigation bar.
 * It displays a logo, a link to create a startup, and login/logout options.
 * If the user is authenticated, it shows the user's name and a logout button.
 * Otherwise, it shows a login button.
 */
const Navbar = async () => {
    const session = await auth();
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={33}/>
        </Link>
        <div className="flex items-center gap-5 text-black">
            {session && session?.user ? (
                <>
                <Link href="/startup/create">
                    <span  className="max-sm:hidden">Create</span>
                    <BadgePlus className="size-6 sm:hidden"/>

                </Link>
                <form action={async() => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                    }}>
                    <button type="submit" className="bg-black text-white top-1"> 
                    <span  className="max-sm:hidden">Logout</span>
                      <LogOut className="size-6 sm:hidden text-red-500"/>
                    </button>
                </form>

                <Link href={`/user/${session.id}`}>
                   <Avatar className="size-10">
                        <AvatarImage 
                        src={session?.user?.image || ""} 
                        alt={session?.user?.name  || ""}/>
                        <AvatarFallback>AV</AvatarFallback>

                    </Avatar>
                </Link>
                </>
       
            ) : (
                <form action={async() => {
                    "use server";
                    await signIn("github");
                    }}>
                    <button type="submit">
                        <span>Login</span>
                    </button>               
                </form>
            )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar