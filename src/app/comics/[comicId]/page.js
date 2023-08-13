"use client"

import { useState, useEffect } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { getInfoId, getStoriesType } from "../../api/getDataApi";
import { GiBookPile } from 'react-icons/gi';
import { parseDate, getFromUrl, getCreators } from "../../utils";
import ReactHtmlParser from 'react-html-parser';
import GetCharactersPresents from "../../Components/GetCharactersPresents";
import MoreDetails from '../../Components/MoreDetails';
import StoriesList from '../../Components/StoriesList';
import ImagesComic from '../../Components/ImagesComic';

export default function ComicInfo({params: {comicId}}) {
    
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [storiesComic, setStoriesComic] = useState();
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const response = await getInfoId(comicId, "comics").then((data) => {
                setData(data[0]);
              }).catch((errorMessage) => {
                  setError(true);
              });;
            const storiesResponse = await getStoriesType(comicId, "comics");
            response ? setData(response[0]):'';
            storiesResponse ? setStoriesComic(storiesResponse):''
            setIsLoading(false);
        }
        fetchData();
    }, [comicId])
    


  return (
      <main>
      {
        data ?
            (!isLoading ? (
                <>
            <div id="presentation" className="box-shadow-inset">

                <h1>{data.title}</h1>
                <ImagesComic images={data} />
                <p id="description">{data.description ? ReactHtmlParser(data.description):"No description"}</p>
                
                <ul id="more-info">
                    <li className="role"><strong>Published: </strong>{parseDate(data.dates[0].date)}</li>
                    {getCreators(data)}
                </ul>

                {data.stories.returned > 0 ?
                <div className="stories-container">
                    <StoriesList data={storiesComic} />
                </div>:''}

                {data.urls.length ? (<MoreDetails urls={data.urls}/>):''}

                <a href={getFromUrl(data.series.resourceURI, "series")} className="series"><GiBookPile /></a>
            </div>
            <GetCharactersPresents id={comicId} type="comics"/>
                    </>
                ):<div className="loading center-loading"><InfinitySpin width='250' color="#ff0000ad" /></div>):(error ? <h2 className="error">Something went wrong !</h2>:'')      
        }
    </main>)
}