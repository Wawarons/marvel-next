import { useState, useEffect } from 'react';
import {getCharactersListFrom} from '../api/getDataApi';
import CharacterCard from './Card';

export default function CharatersIn({id, type}) {

    const [characters, setCharacters] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const response = await getCharactersListFrom(id, type);
            setCharacters(response);
        }

        fetchData();
    }, [id, type])
    
  return (
    <div>
    { characters && characters.length ?
        (
            <>
            <h2 className="rebrique-title" style={{textAlign: 'center'}}>Casting</h2>
            <div id="characters" className="gunmetal-color">
        {
             characters.map((charac, key) => {
                const imgUrl = `${charac.thumbnail.path}.${charac.thumbnail.extension}`;
                return <CharacterCard name={charac.name} id={charac.id} imgPath={imgUrl} key={`charac-${key}`}/>
            })
        }
        </div></>):''
    }
    </div>
  )
}