"use client"
import { React, useEffect, useState } from 'react'
import { getInfoId, getStoriesType } from '../../server/getDataApi'
import { InfinitySpin } from 'react-loader-spinner'
import Image from 'next/image'
import GetCharactersPresents from '../../Components/GetCharactersPresents'
import StoriesList from '../../Components/StoriesList'
import moment from 'moment'
import ReactHtmlParser from 'react-html-parser'
import MoreDetails from '../../Components/MoreDetails'

export default function Event({params: {eventId}}) {

    const [infos, setInfos] = useState();
    const [storiesEvent, setStoriesEvent] = useState();

    useEffect(() => {
        async function fetchData() {
            const response = await getInfoId(eventId, "events");
            const storiesResponse = await getStoriesType(eventId, "events");
            setStoriesEvent(storiesResponse);
            setInfos(response[0]);
        }

        fetchData();
    }, [eventId])
    
    function parseDate(date){
      const newDate = new Date(date);
      return moment(newDate).format("DD/MM/YYYY");
  }

  function getImg(info){
      let urlImg = null;
      if(info.images && info.images[0]){
          urlImg = info.images[0].path+'.'+info.images[0].extension
      }else[
          urlImg = info.thumbnail.path+'.'+info.thumbnail.extension
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
      info.creators.items.map((creator) => {
          if(roles[creator.role] && roles[creator.role].length <= 4){
             roles[creator.role].push(`<a href="${getFromUrl(creator.resourceURI, "creators")}">, ${creator.name}</a>`);
          }else if(!roles[creator.role]){
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
    (
        <>
        <div id="presentation" className="box-shadow-inset"> 
            <div id='top'>
                {infos.previous ? <a className="arrows" href={getFromUrl(infos.previous.resourceURI, "events")}>{'<'}</a>:''}
                <h1>{infos.title}</h1>
                {infos.next ? <a className="arrows" href={getFromUrl(infos.next.resourceURI, "events")}>{'>'}</a>:''}
            </div>
            <Image className="box-shadow-inset" src={getImg(infos)} alt={infos.title} width={150} height={250} />
            <p id="description">{infos.description}</p>
            <ul id="more-info">
                <li className="role"><strong>Published: </strong>{parseDate(infos.start)} - {infos.end ? parseDate(infos.end):"Present"}</li>
                {getCreators(infos)}
            </ul>
            <MoreDetails urls={infos.urls} />
            {
                infos.stories.returned > 0 ?
                <div className="stories-container">
                    <StoriesList info={storiesEvent} />
                </div>:''
            }
        </div>
            <GetCharactersPresents type="events" id={eventId}/>
                </>      
    ):(
        <div className="loading center-loading">
            <InfinitySpin width='250' color="#ff0000ad"/>
        </div>)
    }
</main>)
}
 