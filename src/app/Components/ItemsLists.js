"use client";

import { useState, useEffect } from "react";
import { InfinitySpin, TailSpin } from "react-loader-spinner";
import { getDataByType, getByName } from "../server/getDataApi";
import {BsSortDown} from 'react-icons/bs'
import Link from "next/link";
import ReactHtmlParser from 'react-html-parser'; 
import Card from "./Card";
import CardStorie from "./CardStorie";

export default function ItemsLists({ type }) {

  const [data, setData] = useState();
  const [offset, setOffset] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const [moreDataButton, setMoreDataButton] = useState(true);
  const [sortType, setSortType] = useState((type=="comics" || type=="series") ? "title":type=="stories"?"id":"name");
  const options = {
    characters: {
      defaultValue: 'name',
      name:'name',
      modified:'modified'
    },
    comics: {
      defaultValue: 'title',
      focDate: 'focDate',
      onSaleDate:'on sale date',
      title: 'title',
      issueNumber:'issue number',
      modified: 'modified'
    },
    events:{
      defaultValue: 'name',
      name:'name',
      startDate:'start date',
      modified: 'modified'
    },
    series: {
      defaultValue: 'title',
      title:'title',
      modified:'modified',
      startYear: 'start year'
    },
    stories: {
      defaultValue:'id',
      id:'id',
      modified:'modified'
    }
  }

  useEffect(() => {
    
    async function fetchData() {
      const response = await getDataByType(type, 0, sortType);
      setData(response);
    }

    fetchData();
  }, [type, sortType]);
  

  async function addData() {
    setIsLoading(true);
    const response = await getDataByType(type, offset, sortType);
    setMoreDataButton(response.length > 0);
    setOffset(offset + 100);
    setData([...data, ...response]);
    setIsLoading(false);
  }
  
  async function handleChange(event, type) {
    let response = null;
    if (event.target.value === "") {
      response = await getDataByType(type, 0, sortType);
      setMoreDataButton(true);
    } else {
      response = await getByName(event.target.value, type, sortType);
      setMoreDataButton(false);
    }
    setData(response);
  }


  async function getValue() {
    setIsLoading(true);
    let sort = document.getElementById("sort-type").value;
    let reverseButton = document.getElementById("check-reverse").classList;
    sort = reverseButton.contains("checked") ? '-'+sort:sort;
    const response = await getDataByType(type, 0, sort);
    setIsLoading(false);
    setData(response);
    setSortType(sort);
  }
  
  function getReverse(event) {
    event.target.classList.toggle("checked");
    event.target.classList.toggle("box-shadow-inset");
    getValue();
  }

  function getOptions(options) {
    let optionsAll = ''
    for(let value in options){
      if(value != 'defaultValue')
        optionsAll += `<option value="${value}">${options[value]}</option>`;
    }

    return optionsAll;
}
  
  return (
    <main>
    <div className="search-container">
    {type != 'stories' ?<input name="name" id="search-bar" type="text" maxLength={250} placeholder="Spider-man..." onChange={(event) => handleChange(event, type)} />:''}
      <div>
        <select className="box-shadow-inset" name="sort" id="sort-type" onChange={getValue} defaultValue={options[type].defaultValue}>
            {ReactHtmlParser(getOptions(options[type]))}
        </select>
        <div className="box-shadow-inset" id="check-reverse" onClick={(event)=>{getReverse(event)}}><BsSortDown /></div>
        {isLoading ? <TailSpin height="20" width="20" color="#4fa94d" ariaLabel="tail-spin-loading" radius="1" visible={true} />:''}
        </div>
        </div>
      <h1 className="capitalize" style={{textAlign:'center'}}>{type}</h1>
      <div className="container-character-card">
        {data ? (
          data.map((res, key) => {
            if(type == "stories"){
                return (
                   <CardStorie info={res} key={`story-${key}`}/>
                )
            }else if (type == "characters") {
              const imgUrl = `${res.thumbnail.path}.${res.thumbnail.extension}`;
              return (
                <Card id={res.id} key={key} name={res.name} imgPath={imgUrl} type={type} />
              );
            } else {
              const imgUrl = `${res.thumbnail.path}.${res.thumbnail.extension}`;
              return (
                <Card id={res.id} key={key} name={res.title} imgPath={imgUrl} type={type} />
              );
            }
            })
        ) : <InfinitySpin className="loading" width="200" color="#4fa94d" />
        }
      </div>
           {moreDataButton ? <div className="more-data">{!isLoading ? <p className="box-shadow-inset" style={{cursor: 'pointer'}} onClick={addData}>+</p>:<InfinitySpin width='50' color="#4fa94d" />}</div>:''}
      <div id="go-top">
        <a href="#sort-type">⬆</a>
      </div>
    </main>
  );
}


        
        
        
        
        
        