import React from 'react'
import Link from 'next/link'
import ReactHtmlParser from 'react-html-parser'; 
import { getFromUrl } from '../utils';
export default function CardStorie({data}) {

    /**
     * 
     * @param {Object} data 
     * @returns Get the story's comic. 
     */
    const getComicId = (data) => {
        return data.comics.items[0] ? getFromUrl(data.comics.items[0].resourceURI, "comics"):null;
    }

  return (
    <Link href={`/comics/${getComicId(data)}`} key={`link-storie-${data.id}`}>
    <div className="stories-card">
        <h3>{ReactHtmlParser(data.title)}</h3>
    </div>
    </Link>
  )
}
