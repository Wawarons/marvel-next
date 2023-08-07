"use client"

import { useState, useEffect } from "react";
import { InfinitySpin } from "react-loader-spinner";
import ReactHtmlParser from 'react-html-parser'; 
import { LuBookPlus } from 'react-icons/lu';
import { getInfoId, getStoriesType } from "../../server/getDataApi";
import GetCharactersPresents from "../../Components/GetCharactersPresents";
import MoreDetails from '../../Components/MoreDetails';
import StoriesList from '../../Components/StoriesList';
import ImagesComic from '../../Components/ImagesComic';
import Image from "next/image";
import moment from "moment";

export default function ComicInfo({params: {comicId}}) {
    
    const [infos, setInfos] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [storiesComic, setStoriesComic] = useState();

    useEffect(() => {
        async function fetchData(){
            setIsLoading(true);
            const response = await getInfoId(comicId, "comics");
            const storiesResponse = await getStoriesType(comicId, "comics");
            response ? setInfos(response[0]):'';
            storiesResponse ? setStoriesComic(storiesResponse):''
            setIsLoading(false);
        }
        fetchData();
    }, [comicId])


    function parseDate(date){
        const newDate = new Date(date);
        return moment(newDate).format("DD/MM/YYYY");
    }

    function getImg(info){
        let urlImg = null;
        if(info.images[0]){
            urlImg = `${info.images[0].path}.${info.images[0].extension}`
        }else[
            urlImg = `${info.thumbnail.path}.${info.thumbnail.extension}`
        ]

        return urlImg;
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
        infos ?
            (!isLoading ? (
                <>
            <div id="presentation" className="box-shadow-inset">
                <h1>{infos.title}</h1>
                <ImagesComic images={infos.images} />
                <p id="description">{infos.description ? ReactHtmlParser(infos.description):"No description"}</p>
                <ul id="more-info">
                <li className="role"><strong>Published: </strong>{parseDate(infos.dates[0].date)}</li>
                    {getCreators(infos)}
                </ul>
                {
                infos.stories.returned > 0 ?
                <div className="stories-container">
                    <StoriesList info={storiesComic} />
                </div>:''
            }
                {infos.urls.length ? 
                (<MoreDetails urls={infos.urls}/>):''
                }
            </div>
            <GetCharactersPresents id={comicId} type="comics"/>
                    </>
                ):<div className="loading center-loading"><InfinitySpin width='250' color="#ff0000ad" /></div>):''      
        }
    </main>)
}