"use client"

import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { getInfoId } from "../../../app/server/getDataApi";
import GetCharactersPresents from '../../../app/Components/GetCharactersPresents'
import ReactHtmlParser from 'react-html-parser'
import Image from "next/image";
import moment from "moment";

export default function SeriesInfo({params: {seriesId}}) {
    const [info, setInfo] = useState();

    useEffect(() => {
        async function fetchData(){
            const response = await getInfoId(seriesId, "series");
            setInfo(response[0]);
            console.log(response);
        }

        fetchData();
    }, [seriesId])

    function getFromUrl(url, type){
        url = url.split('/');
        return `/${type}/${url[url.length-1]}`;
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
            allCreators += `<div class="role"><strong>${role}: </strong>${roles[role].join('')}</div>`;
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
                {info.previous ? <a className="arrows" href={getFromUrl(info.previous.resourceURI, "series")}>{'<'}</a>:''}
                <h1 >{info.title}</h1>
                {info.next ? <a className="arrows" href={getFromUrl(info.next.resourceURI, "series")}>{'>'}</a>:''}
                </div>
                <Image className="box-shadow-inset" src={info.thumbnail.path+'.'+info.thumbnail.extension} alt="" width={150} height={200} priority={true} />
                <p id="description">{info.description}</p>
                <div id="more-info">
                <p className="role"><strong>Published: </strong>{info.startYear} - {info.endYear ? info.endYear:"Present"}</p>
                    {getCreators(info)}
                </div>
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