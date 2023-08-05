import { useState, useEffect } from "react";
import { getInfoId } from "../server/getDataApi";
import GetCharacterInfo from "./GetCharacterInfo";
import Image from "next/image";


export default function CharacterInfo({params: {characId}}) {
    const [info, setInfo] = useState();

    useEffect(() => {

        async function fetchData() {
            const response = await getInfoId(characId, "characters");
            setInfo(response[0]);
        }

        fetchData();
    }, [characId])

  return (
    <div>
        {
            info ? (
                <div id="character-presentation">
                    <h1>{info.name}</h1>
                    <Image className="poster box-shadow-inset" src={info.thumbnail.path+'.'+info.thumbnail.extension} alt={info.name} />
                    <p className="description">{info.description}</p>
                        <GetCharacterInfo id={characId} type="comics" />
                        <GetCharacterInfo id={characId} type="series" />
                        <GetCharacterInfo id={characId} type="events" />
                    </div>
            ):''
        }
    </div>
  )
}