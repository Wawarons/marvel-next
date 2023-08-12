"use client"

import { useState, useEffect } from "react";
import { InfinitySpin } from "react-loader-spinner";
import ReactHtmlParser from 'react-html-parser'; 
import { getInfoId, getStoriesType } from "../../api/getDataApi";
import GetCharactersPresents from "../../Components/GetCharactersPresents";
import MoreDetails from '../../Components/MoreDetails';
import StoriesList from '../../Components/StoriesList';
import ImagesComic from '../../Components/ImagesComic';
import {GiBookPile} from 'react-icons/gi';
import moment from "moment";

export default function ComicInfo({params: {comicId}}) {
    
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [storiesComic, setStoriesComic] = useState();
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData(){
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


    function parseDate(date){
        const newDate = new Date(date);
        return moment(newDate).format("DD/MM/YYYY");
    }

    function getFromUrl(url, type){
        url = url.split('/');
        return `/${type}/${url[url.length-1]}`;

    }

    function getCreators(info) {
        let roles = {};
        let allCreators = "";
        info.creators.items.map((creator, index) => {
            if(roles[creator.role] && roles[creator.role].length <= 4){
               roles[creator.role].push(`<a href="${getFromUrl(creator.resourceURI, "creators")}">, ${creator.name}</a>`);
            }else{
                roles[creator.role] = [`<a href="${getFromUrl(creator.resourceURI, "creators")}">${creator.name}</a>`];
            }
        })
        for(let role in roles) {
            allCreators += `<li class="role"><strong>${role}: </strong>${roles[role].join('')}</li>`;
        }
        
        return (ReactHtmlParser(allCreators));
}


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