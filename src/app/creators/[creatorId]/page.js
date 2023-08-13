"use client"
import React from 'react'
import { useEffect, useState } from 'react'
import { getInfoId }  from '../../api/getDataApi'
import GetInfoType from '../../Components/GetInfoType'

export default function CreatorInfo({params: {creatorId}}) {
    
    const [data, setData] = useState();
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await getInfoId(creatorId, "creators");
            setData(response[0]);
        }
        fetchData();
    }, [creatorId])

  return (
    
    <main>
    { data ? 
        (   <>
            <h1 id="h1-realisation">{data.firstName} {data.lastName}</h1>
            <div>
                <GetInfoType forType="creators" id={creatorId} type="comics" />
                <GetInfoType forType="creators" id={creatorId} type="series" />
                <GetInfoType forType="creators" id={creatorId} type="events" />
            </div>
            </>
        ):''

    }
    </main>
  )
}