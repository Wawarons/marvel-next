"use client"
import { React, useEffect, useState } from 'react'
import { getInfoId, getStoriesType } from '../../api/getDataApi'
import { InfinitySpin } from 'react-loader-spinner'
import Image from 'next/image'
import GetCharactersPresents from '../../Components/GetCharactersPresents'
import StoriesList from '../../Components/StoriesList'
import MoreDetails from '../../Components/MoreDetails'
import { parseDate, getFromUrl, getCreators, getImg } from '../../utils'

export default function Event({params: {eventId}}) {

    const [data, setData] = useState();
    const [storiesEvent, setStoriesEvent] = useState();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            
            setIsLoading(true);

            await getInfoId(eventId, "events").then((response) => {
                setData(response[0]);
            }).catch((errorMessage => {
                setError(true);
            }));

            await getStoriesType(eventId, "events").then((storiesResponse) => {
                setStoriesEvent(storiesResponse);
            });
            
            setIsLoading(false);

        }

        fetchData();
    }, [eventId])


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
                storiesEvent ?
                <div className="stories-container">
                    <StoriesList data={storiesEvent} />
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
 