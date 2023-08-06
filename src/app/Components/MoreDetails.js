import React from 'react'
import {RiInformationLine} from 'react-icons/ri';
import {FiDollarSign} from 'react-icons/fi';
import {AiOutlineRead} from 'react-icons/ai';

export default function MoreDetails({urls}) {
  return (
    <div id="extern-links">{
    urls.map((url, key) => {
        let icon = null;
        switch (url.type) {
            case 'detail':
                icon = <RiInformationLine />
                break;
            case 'reader':
                icon = <AiOutlineRead />
                break;
            case 'purchase':
                icon = <FiDollarSign />
                break;
            default:
                break;
        }
        return <a key={key} href={url.url} target="_blank" rel="noopener">{icon}</a>
    })
    }
    </div>
  )
}
