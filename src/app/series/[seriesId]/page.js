"use client"

import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { getInfoId, getComicsSeries } from "../../api/getDataApi";
import GetCharactersPresents from '../../Components/GetCharactersPresents'
import ReactHtmlParser from 'react-html-parser'
import Image from "next/image";
import MoreDetails from '../../Components/MoreDetails';
import Card from "../../Components/Card";
import {MdArrowForwardIos, MdArrowBackIos} from 'react-icons/md';

export default function SeriesInfo({params: {seriesId}}) {
    const [data, setData] = useState();
    const [comics, setComics] = useState();
    const [isLoading, setIsLoading]  = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData(){
            setIsLoading(true);
            const response = await getInfoId(seriesId, "series").then((response) => {
                setData(response[0]);
            }).catch(errorMessage => {
                setError(true);
            }) 
            const comicsResponse = await getComicsSeries(seriesId);
            comicsResponse ? setComics(comicsResponse):''
            setIsLoading(false);
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
        data ?
         (
            <>
                <div id="presentation">
                <div id="top">
                {data.previous ? <a className="arrows" href={getFromUrl(data.previous.resourceURI, "series")}><MdArrowBackIos /></a>:''}
                <h1 >{data.title}</h1>
                {data.next ? <a className="arrows" href={getFromUrl(data.next.resourceURI, "series")}><MdArrowForwardIos /></a>:''}
                </div>
                <div id="presentation-img">
                <Image className="box-shadow-inset" src={data.thumbnail.path+'.'+data.thumbnail.extension} alt="" width={150} height={200} priority={true} />
                </div>
                <p id="description">{data.description}</p>
                <ul id="more-info">
                <li className="role"><strong>Published: </strong>{data.startYear} - {data.endYear ? data.endYear:"Present"}</li>
                    {getCreators(data)}
                </ul>
                {data.urls.length ? (<MoreDetails urls={data.urls}/>):''}
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
        ):(isLoading ? <div className="loading center-loading"><InfinitySpin width='250' color="#ff0000ad"/></div>:(error ? <h2 className="not-found">Something went wrong !</h2>:''))
        }
    </main>)
}