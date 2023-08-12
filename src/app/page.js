"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getDataByType } from './api/getDataApi'
import CardStorie from './Components/CardStorie'
import {FaRandom} from 'react-icons/fa';
import { Oval } from 'react-loader-spinner'

export default function Home() {

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    let offsetRand = Math.floor(Math.random() * 200);
    const fetchData = async () => {
      const response = await getDataByType("stories", offsetRand);
      setData(response.slice(0, 5));
      setIsLoading(false);
    } 

    fetchData();
  }, []);

  const randomStories = async () => {
    setIsLoading(true);
    let offsetRand = Math.floor(Math.random() * 200);
    const response = await getDataByType("stories", offsetRand);
    setData(response.slice(0, 5));
    setIsLoading(false);
  }

  return (
    <>
    <div id='home-container'>
        <h1>Welcome to the ComiVerse</h1>
        <p>Here you can find a lot of informations about marvel&apos;s comics universe</p>
        <h3>How we can help you ?</h3>
        <nav id='home-nav'>
            <Link className="link-nav" href="/characters">Characters</Link>
            <Link className="link-nav" href="/comics">Comics</Link>
            <Link className="link-nav" href="/series">Series</Link>
            <Link className="link-nav" href="/events">Events</Link>
        </nav>
    </div>
    {data ?
    <div id='stories-home-container'>
    <div id='stories-title-container'>
      <h2>Random stories</h2>
      <FaRandom size="0.8em" id='icon-random' onClick={()=>randomStories()}/>
    </div>
    {!isLoading ? <div id='stories-home'>
      {data.map((storie, key)=> {
        return <CardStorie key={key} data={storie}/>
      })}
    </div>:<div className="center-loading"> <Oval width={50} height={50}/></div>}
    </div>:''}
    
    </>
  )
}
