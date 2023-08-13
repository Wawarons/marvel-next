"use client"
import React from 'react'
import Image from 'next/image';
import { useState } from 'react';
import {FiCircle} from 'react-icons/fi'

export default function ImagesComic({images}) {

    const [imageNow, setImageNow] = useState(0);

    /**
     * 
     * @param {Array} images 
     * @returns comic's images.
     */
    const initImages = (images) => {
        const imagesInitied = [];
        if(images.images.length){
            images.images.map((img) => {
                imagesInitied.push(img.path+'.'+img.extension);
            })
        }else{
            imagesInitied.push(images.thumbnail.path+'.'+images.thumbnail.extension);
        }

            return imagesInitied;
        }
        
     /**
   * 
   * @param {Event} event 
   * @param {int} type 
   * Handle click event for change image.
   */    
    const handleChange = (event, index) => {
        setImageNow(index);
        document.querySelectorAll(".active-image").forEach((selecter) => {
            selecter.classList.remove('active-image');
        })
        event.target.classList.add("active-image");
    }
    

    let imagesComics  = initImages(images);

  return (
    <div id='presentation-img'>
    <Image id="img-selected" src={imagesComics[imageNow]} alt="" width={150} height={150}/>

    {imagesComics.length > 1 ? <div className='select-image'>
        {imagesComics.map((img, key) => {return <p className={`selecter-images ${key == 0 ? "active-image":''}`} key={key} onClick={(event)=>handleChange(event, key)}><FiCircle size="0.6em"/></p>})}
    </div>:''}
    </div>
  )
}
