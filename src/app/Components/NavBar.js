"use client"
import Link from "next/link"
import { RiMenuUnfoldLine } from 'react-icons/ri'
import { MdOutlineLightMode, MdOutlineNightlight } from 'react-icons/md'

export default function NavBar() {

  function hideBar(){
    let navBar = document.querySelector('nav');
    let menuIcon = document.getElementById("menu-icon");
    menuIcon.classList.toggle('compact');
    navBar.classList.toggle('hide-nav-bar');
    navBar.classList.toggle('show-nav-bar');
    document.querySelector('header').classList.toggle("shadow-bottom");

  }

  return (
    <header className="shadow-bottom">
    <div className="theme-choose">
      <MdOutlineLightMode />
      <MdOutlineNightlight />
    </div>
    <h1>ComiVerse</h1>
    <div id="menu-icon" onClick={hideBar} className="">
        <RiMenuUnfoldLine size='1.5em'/>
    </div>
    <nav className="show-nav-bar">
        <Link className = "link-nav" href="../characters">Characters</Link>
        <Link className = "link-nav" href="../comics">Comics</Link>
        <Link className = "link-nav" href="../events">Events</Link>
        <Link className = "link-nav" href="../series">Series</Link>
        <Link className = "link-nav" href="../stories">Stories</Link>
    </nav>
    </header>
  )
}
