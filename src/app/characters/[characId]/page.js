"use client"

import { useState, useEffect } from "react";
import { getInfoId } from "../../server/getDataApi";
import GetInfoType from '../../Components/GetInfoType'
import Image from "next/image";

export default function CharactPage({params: {characId}}) {
  const [info, setInfo] = useState();

    useEffect(() => {

        async function fetchData() {
            const response = await getInfoId(characId, "characters");
            response ? setInfo(response[0]):'';
        }

        fetchData();
    }, [characId])

  return (
    <main>
        {
            info ? (
                <div>
                    <h1>{info.name}</h1>
                    <Image className="poster box-shadow-inset" src={info.thumbnail.path+'.'+info.thumbnail.extension} alt="" width={350} height={250} />
                    <p className="description">{info.description}</p>
                        <GetInfoType forType="characters" id={characId} type="comics" />
                        <GetInfoType forType="characters" id={characId} type="series" />
                        <GetInfoType forType="characters" id={characId} type="events" />
                    </div>
            ):''
        }
    </main>
  )
}
