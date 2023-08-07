import React from 'react'
import Link from 'next/link'
import ReactHtmlParser from 'react-html-parser'; 

export default function CardStorie({info}) {

    function getComicId(info){
        return info.comics.items[0].resourceURI.split('/').slice(-1);
    }

  return (
    <Link href={`/comics/${getComicId(info)}`} key={`link-storie-${info.id}`}>
    <div className="stories-card">
        <h3>{ReactHtmlParser(info.title)}</h3>
    </div>
    </Link>
  )
}
