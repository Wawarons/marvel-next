"use client"

import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { getInfoId, getComicsSeries } from "../../../app/server/getDataApi";
import GetCharactersPresents from '../../../app/Components/GetCharactersPresents'
import ReactHtmlParser from 'react-html-parser'
import Image from "next/image";
import MoreDetails from '../../Components/MoreDetails';
import Card from "../../Components/Card";
import {MdArrowForwardIos, MdArrowBackIos} from 'react-icons/md';

export default function SeriesInfo({params: {seriesId}}) {
    const [info, setInfo] = useState();
    const [comics, setComics] = useState();

    useEffect(() => {
        async function fetchData(){
            const response = await getInfoId(seriesId, "series");
            const comicsResponse = await getComicsSeries(seriesId);
            console.log(comicsResponse);
            comicsResponse ? setComics(comicsResponse):''
            setInfo(response[0]);
        }

        fetchData();
    }, [seriesId])

    function getFromUrl(url, type){
        url = url.split('/');
        return `/${type}/${url[url.length-1]}`;
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

    function getCreators(info) {
        let roles = {};
        let allCreators = "";
        info.creators.items.map((creator) => {
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
        info ?
         (
            <>
                <div id="presentation">
                <div id="top">
                {info.previous ? <a className="arrows" href={getFromUrl(info.previous.resourceURI, "series")}><MdArrowBackIos /></a>:''}
                <h1 >{info.title}</h1>
                {info.next ? <a className="arrows" href={getFromUrl(info.next.resourceURI, "series")}><MdArrowForwardIos /></a>:''}
                </div>
                <Image className="box-shadow-inset" src={info.thumbnail.path+'.'+info.thumbnail.extension} alt="" width={150} height={200} priority={true} />
                <p id="description">{info.description}</p>
                <ul id="more-info">
                <li className="role"><strong>Published: </strong>{info.startYear} - {info.endYear ? info.endYear:"Present"}</li>
                    {getCreators(info)}
                </ul>
                {info.urls.length ? (<MoreDetails urls={info.urls}/>):''}
                </div>
                <div className="comics-container">

                {
                    comics ? (
                        comics.map((comic, key) => {
                            return (<Card name={comic.title} imgPath={getImg(comic)} id={comic.id} type="comics" key={`${comic.title}-${key}`}/>)
                        })
                    ):''
                }
                </div>
                <GetCharactersPresents id={seriesId} type="series"/>
            </>
        ):(<div className="loading center-loading"><InfinitySpin 
                        width='250'
                        color="#ff0000ad"
                        /></div>)
        }
    </main>)
}