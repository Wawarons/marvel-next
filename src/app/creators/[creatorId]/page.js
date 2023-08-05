"use client"
import React from 'react'
import { useEffect, useState } from 'react'
import { getInfoId }  from '../../server/getDataApi'
import GetInfoType from '../../Components/GetInfoType'

export default function CreatorInfo({params: {creatorId}}) {
    
    const [infos, setInfos] = useState();
    
    useEffect(() => {
        async function fetchData() {
            const response = await getInfoId(creatorId, "creators");
            setInfos(response[0]);
        }
        fetchData();
    }, [creatorId])

  return (
    <main>
    { infos ? 
        (   <>
            <h1 id="h1-realisation">{infos.firstName} {infos.lastName}</h1>
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