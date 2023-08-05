import Image from "next/image"
import Link from "next/link"

export default function NavBar() {
  return (
    <header>
    <Image src="/Images/Marvel_Logo.png" alt="" width={200} height={200}/>
    <nav>
        <Link className = "link-nav" href="../characters">Characters</Link>
        <Link className = "link-nav" href="../comics">Comics</Link>
        <Link className = "link-nav" href="../events">Events</Link>
        <Link className = "link-nav" href="../series">Series</Link>
        <Link className = "link-nav" href="../stories">Stories</Link>
    </nav>
    </header>
  )
}
