import { useState, useEffect } from "react"
import { InfinitySpin } from "react-loader-spinner";
import { getByTypeInfoId, searchByName} from "../api/getDataApi";
import {FaSearch} from 'react-icons/fa'
import { IconContext } from "react-icons";
import Link from "next/link";
import Image from "next/image";

export default function GetCharacterInfo({forType, id, type}) {

    const [data, setData] = useState();
    const [offset, setOffset] = useState(100);
    const [isLoading, setIsLoading] = useState(false);
    const [moreReal, setMoreReal] = useState(0);


    useEffect(() => {
        let response = null;
        async function fetchData() {
            response = await getByTypeInfoId(forType, id, type);
            setData(response.results);
            setMoreReal(response.total-100)

        }
        fetchData();
    }, [forType, id, type])
 

    async function addData(){
        setIsLoading(true);
        setOffset(offset+100);
        const response = await getByTypeInfoId(forType, id, type, offset);
        setData([...data, ...response.results])
        setMoreReal(moreReal-100);
        setIsLoading(false);

    }

    function handleClick(event){
        event.preventDefault();
        document.querySelector(`#input-${type}`).classList.toggle("hidden");
    }

    async function handleChange(event) {
        let response = null;
        if (event.target.value === "") {
          response = await getByTypeInfoId(forType, id, type);
          response = response.results;
        } else {
          response = await searchByName(event.target.value, id, forType, type);
        }
        response.length > 0 ? setData(response):"";
      }

    
    return (
        <>
        { data && data.length ? 
        (<div id={`${type}-parts`}>
            <h2 className="title-realisations box-shadow-inset capitalize" style={{textAlign:'center'}}>{type}</h2>
            <div className="realisations-container box-shadow-inset">
                <div className="search-bar-realisations">
                    <input type="text" id={`input-${type}`} name="searchName" placeholder="marvel..."  className="hidden bar-search" onChange={handleChange}/>
                    <IconContext.Provider value={{color:'red', size:'1.3em', className:'icon-search'}}>
                        <FaSearch onClick={handleClick}/>
                    </IconContext.Provider>
                </div>
            {data ? (
                data.map((info, key) => {
                    return (
                        <div className="realisations" key={`realisation-${key}`}>
                        <h3>{info.title}</h3>
                        <Link href={`../${type}/${info.id}`}>
                            <Image className="box-shadow-inset" src={info.thumbnail?.path+'.'+info.thumbnail?.extension} alt={info.title}  width={150} height={200} priority={true}/>
                        </Link>
                        </div>)
                })
            ):(
                <InfinitySpin width='200' color="#4fa94d" />
            )}
            {moreReal > 0 ? <div className="more-data">{!isLoading ? <p className="box-shadow-inset" onClick={addData} style={{cursor: 'pointer'}}>+</p>:<InfinitySpin width='50' color="#4fa94d" />}</div>:''}
            </div>
        </div>):''
        }
        </>
        )
    }