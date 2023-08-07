import React from 'react'
import CardStorie from './CardStorie'

export default function StoriesList({info}) {
  return (
    info.map((storie, key) => {
        return (
            <CardStorie info={storie} key={`storie-card-${key}`}/>
        )
    })
  )
}
