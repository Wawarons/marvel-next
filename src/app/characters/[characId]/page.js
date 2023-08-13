"use client"

import { useState, useEffect } from "react";
import { getInfoId } from "../../api/getDataApi";
import GetInfoType from '../../Components/GetInfoType'
import Image from "next/image";

export default function CharactPage({params: {characId}}) {
  const [data, setData] = useState();
  const [error, setError] = useState(false);

    useEffect(() => {
         const fetchData = async () => {
            await getInfoId(characId, "characters").then((data) => {
              setData(data[0]);
            }).catch((errorMessage) => {
                setError(true);
            });
        }

        fetchData();
    }, [characId])

  return (
    <main>
        {
            data ? (
                <div>
                    <h1 className="capitalize" style={{textAlign:'center'}}>{data.name}</h1>
                    <Image className="poster box-shadow-inset" src={data.thumbnail.path+'.'+data.thumbnail.extension} alt="" width={350} height={250} priority/>
                    <p className="description">{data.description}</p>
                        <GetInfoType forType="characters" id={characId} type="comics" />
                        <GetInfoType forType="characters" id={characId} type="series" />
                        <GetInfoType forType="characters" id={characId} type="events" />
                    </div>
            ):(error ? <h2>Oops something went wrong !</h2>:'')
        }
    </main>
  )
}
