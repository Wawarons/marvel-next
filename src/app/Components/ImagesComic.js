import React from 'react'
import Image from 'next/image';
import { useState } from 'react';
import {FiCircle} from 'react-icons/fi'

export default function ImagesComic({images}) {

    const [imageNow, setImageNow] = useState(0);
    const imagesInitied = [];

        const initImages = (images) => {
            images.map((img) => {
                imagesInitied.push(img.path+'.'+img.extension);
            })
        }
        
        const handleChange = (event, index) => {
            setImageNow(index);
            document.querySelectorAll(".active-image").forEach((selecter) => {
                selecter.classList.remove('active-image');
            })
            event.target.classList.add("active-image");
            document.querySelector("#img-selected").classList.remove("anim-img");
            document.querySelector('#img-selected').classList.add("anim-img");
        }

        initImages(images);

  return (
    <div id='presentation-img'>
    <Image id="img-selected" src={imagesInitied[imageNow]} alt="" width={150} height={150}/>

    {imagesInitied.length > 1 ? <div className='select-image'>
        {imagesInitied.map((img, key) => {return <p className={`selecter-images ${key == 0 ? "active-image":''}`} key={key} onClick={(event)=>handleChange(event, key)}><FiCircle size="0.6em"/></p>})}
    </div>:''}
    </div>
  )
}
