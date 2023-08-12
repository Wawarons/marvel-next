import Link from "next/link"

export default function Card({name, imgPath, id, type}) {
  
  return (
    <Link href={`/${type ? type:'characters'}/${id}`} style={{color: '#fff'}}>
    <div id={id} className="card box-shadow-inset" style={{backgroundImage: `url(${imgPath})`}}>
        <h3>{name}</h3>
    </div>
    </Link>
  )
}