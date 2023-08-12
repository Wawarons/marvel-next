import React from 'react'
import CardStorie from './CardStorie'

export default function StoriesList({data}) {
  return (
    data.map((storie, key) => {
        return (
            <CardStorie data={storie} key={`storie-card-${key}`}/>
        )
    })
  )
}
