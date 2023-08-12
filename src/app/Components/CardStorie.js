import React from 'react'
import Link from 'next/link'
import ReactHtmlParser from 'react-html-parser'; 

export default function CardStorie({data}) {

    function getComicId(data){
        return data.comics.items[0] ? data.comics.items[0].resourceURI.split('/').slice(-1):null;
    }

  return (
    <Link href={`/comics/${getComicId(data)}`} key={`link-storie-${data.id}`}>
    <div className="stories-card">
        <h3>{ReactHtmlParser(data.title)}</h3>
    </div>
    </Link>
  )
}
