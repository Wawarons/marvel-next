"use client"

import { useState, useEffect } from "react";
import { InfinitySpin } from "react-loader-spinner";
import ReactHtmlParser from 'react-html-parser'; 
import { getInfoId } from "../../server/getDataApi";
import GetCharactersPresents from "../../Components/GetCharactersPresents";
import Image from "next/image";
import moment from "moment";

export default function ComicInfo({params: {comicId}}) {
    
    const [infos, setInfos] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchData(){
            setIsLoading(true);
            const response = await getInfoId(comicId, "comics");
            console.log(response);
            if(response){
                setInfos(response[0]);
            }else{
                throw new Error("No data.");
            }
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

    function getFromUrl(url){
        url = url.split('/');
        return '/creators/'+url[url.length-1];

    }

    function getCreators(info) {
        let roles = {};
        let allCreators = "";
        info.creators.items.map((creator) => {
            if(roles[creator.role] && roles[creator.role].length <= 4){
               roles[creator.role].push(`<a href="${getFromUrl(creator.resourceURI)}">, ${creator.name}</a>`);
            }else{
                roles[creator.role] = [`<a href="${getFromUrl(creator.resourceURI)}">${creator.name}</a>`];
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
        infos ?
            (!isLoading ? (
                <>
            <div id="presentation" className="box-shadow-inset">
            <div id="extern-links">
                {infos.urls.length ? 
                (infos.urls.map((url, key) => {
                    return <a key={key} href={url.url} target="_blank" rel="noopener">{url.type}</a>
                })):''
                }
            </div>
                <h1>{infos.title}</h1>
                <Image className="box-shadow-inset" src={getImg(infos)} alt={infos.title} width={150} height={250} />
                <p id="description">{ReactHtmlParser(infos.description)}</p>
                <div id="more-info">
                <p className="role"><strong>Published: </strong>{parseDate(infos.dates[0].date)}</p>
                    {getCreators(infos)}
                </div>
            </div>
            <GetCharactersPresents id={comicId} type="comics"/>
                    </>
                ):<div className="loading center-loading"><InfinitySpin width='250' color="#ff0000ad" /></div>):''      
        }
    </main>)
}