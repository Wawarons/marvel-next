"use client"
import { React, useEffect, useState } from 'react'
import { getInfoId, getStoriesType } from '../../api/getDataApi'
import { InfinitySpin } from 'react-loader-spinner'
import Image from 'next/image'
import GetCharactersPresents from '../../Components/GetCharactersPresents'
import StoriesList from '../../Components/StoriesList'
import moment from 'moment'
import ReactHtmlParser from 'react-html-parser'
import MoreDetails from '../../Components/MoreDetails'

export default function Event({params: {eventId}}) {

    const [data, setData] = useState();
    const [storiesEvent, setStoriesEvent] = useState();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const response = await getInfoId(eventId, "events").then((response) => {
                setData(response[0]);
            }).catch((errorMessage => {
                setError(true);
            }));
            const storiesResponse = await getStoriesType(eventId, "events");
            setStoriesEvent(storiesResponse);
            setIsLoading(false);

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
    data ?
    (
        <>
        <div id="presentation" className="box-shadow-inset"> 
            <div id='top'>
                {data.previous ? <a className="arrows" href={getFromUrl(data.previous.resourceURI, "events")}>{'<'}</a>:''}
                <h1>{data.title}</h1>
                {data.next ? <a className="arrows" href={getFromUrl(data.next.resourceURI, "events")}>{'>'}</a>:''}
            </div>
            <div id="presentation-img">
                <Image className="box-shadow-inset" src={getImg(data)} alt={data.title} width={150} height={250} />
            </div>
            <p id="description">{data.description}</p>
            <ul id="more-info">
                <li className="role"><strong>Published: </strong>{parseDate(data.start)} - {data.end ? parseDate(data.end):"Present"}</li>
                {getCreators(data)}
            </ul>
            <MoreDetails urls={data.urls} />
            {
                data.stories.returned > 0 ?
                <div className="stories-container">
                    <StoriesList info={storiesEvent} />
                </div>:''
            }
        </div>
            <GetCharactersPresents type="events" id={eventId}/>
                </>      
    ):(isLoading ? 
        <div className="loading center-loading">
            <InfinitySpin width='250' color="#ff0000ad"/>
            </div>:(error ? <h2 className='error'>Something went wrong !</h2>:''))
    }
</main>)
}
 