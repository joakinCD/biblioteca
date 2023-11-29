import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import CustomItem from '../components/CustomItem'
import Cabecera from '../components/Cabecera'
const inter = Inter({ subsets: ['latin'] })
import { useState,useEffect} from "react";
export default function Home() {
  let items =[
    {
      id:1,
      type:'pelicula',
      nombre:'pelicula 1'
    }
    ,{
      id:2,
      type:'pelicula',
      nombre:'pelicula 2'
    }
    ,{
      id:3,
      type:'pelicula',
      nombre:'pelicula 3'
    }
    ,{
      id:4,
      type:'pelicula',
      nombre:'pelicula 4'
    }
    ,{
      id:5,
      type:'pelicula',
      nombre:'pelicula 5'
    }
    ,{
      id:6,
      type:'pelicula',
      nombre:'pelicula 6'
    }
    ,{
      id:7,
      type:'videojuego',
      nombre:'videojuego 7'
    }
    ,{
      id:8,
      type:'ebook',
      nombre:'ebook 8'
    }
    ,{
      id:9,
      type:'videojuego',
      nombre:'videojuego 9'
    }
  ]
  const [listadoElementos, setListadoElementos] = useState(items);
  const [buttonSel, setButtonSel] = useState("todos");
  function changeButtonSel(opcion){
    if(buttonSel==opcion){
      setButtonSel('todos')
    }else{
      setButtonSel(opcion)
    }
    
  }
  useEffect(() => {
    if(buttonSel=='todos'){
      setListadoElementos(items)
    }else{
      let itemsAux=[]
      items.map(function(item,index){
        if(item.type==buttonSel){
          itemsAux.push(item)
        }
      })
      setListadoElementos(itemsAux)
    }
  }, [buttonSel]);
  return (
    <>
      <Head>
        <title>Biblioteca</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div style={{width:'100%',height:'100%'}}>
          <Cabecera nombre='Biblioteca'></Cabecera>
            <div style={{display:'flex', marginTop:10}}>
              <button onClick={changeButtonSel.bind(this,'pelicula')} className={`${styles.contentTipo} ${buttonSel=='pelicula' || buttonSel=='todos'? styles.active : ''}`}>
                <a>Peliculas</a>
              </button>
              <button onClick={changeButtonSel.bind(this,'ebook')} className={`${styles.contentTipo} ${buttonSel=='ebook' || buttonSel=='todos'? styles.active : ''}`} >
                <a>e-books</a>
              </button>
              <button onClick={changeButtonSel.bind(this,'videojuego')} className={`${styles.contentTipo} ${buttonSel=='videojuego' || buttonSel=='todos'? styles.active : ''}`}>
                <a>Videojuegos</a>
              </button>
            </div>
            <ul style={{display: 'grid','grid-template-columns': 'repeat(3, minmax(33%, auto))',padding:10}}>
              {listadoElementos.map((item) => <CustomItem key={item.id} pelicula={item}/>)}
            </ul>
          </div>
      </main>
    </>
  )
}




