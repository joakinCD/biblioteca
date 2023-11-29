import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import CustomItem from '../components/CustomItem'
import Cabecera from '../components/Cabecera'
import Multimedia from '../objetos/Multimedia'


import { useState,useEffect,useReducer} from "react";
import { useWindowSize } from '../hooks/myHooks';

const inter = Inter({ subsets: ['latin'] })
function reducer(state, action) {
   

  
  let listadoMultimediaAux;
  switch (action.type) {
    case "addElemento":
      listadoMultimediaAux = state.listadoMultimedia.slice();
      listadoMultimediaAux.push(action.elemento)
      return {
        listadoMultimedia: listadoMultimediaAux
      };
    break;
    case "deleteElemento":
      listadoMultimediaAux = state.listadoMultimedia.slice();
      let indice = -1
      listadoMultimediaAux.map(function(item,index){
        if(item.id==action.elemento.id){
          indice=index
        }
      })
      if(indice!=-1){
        listadoMultimediaAux.splice(indice, 1);
      }
      localStorage.setItem('listadoMultimedia',JSON.stringify(listadoMultimediaAux))
      return {
        listadoMultimedia: listadoMultimediaAux
      };
    break;
    case "setListado":
      let listadoElementos=action.listadoElementos
      return {
        listadoMultimedia: listadoElementos
      };
    break;
  }
}

export default function Home() {

  const size = useWindowSize();

  const [listadoElementos, setListadoElementos] = useState([]);
  const [elementosBuscador, setElementosBuscador] = useState([]);
  const [buttonSel, setButtonSel] = useState("todos");
  const [textoBuscador, setTextoBuscador] = useState("");
  const [width, setWidth] = useState(0);
  const [state, dispatch] = useReducer(reducer, { listadoMultimedia: [] });
  useEffect(() => {
    setWidth(window.width)
    let listadoMultimediaAux = JSON.parse(localStorage.getItem('listadoMultimedia'))
    if(!listadoMultimediaAux){
      listadoMultimediaAux=cargarDatosIniciales()
      localStorage.setItem('listadoMultimedia',JSON.stringify(listadoMultimediaAux))
    }else{
      for(let i=0;i<listadoMultimediaAux.length;i++){
        listadoMultimediaAux[i]=new Multimedia(listadoMultimediaAux[i])
      }
    }
    dispatch({ type: 'setListado',listadoElementos:listadoMultimediaAux})
  }, [])

  useEffect(() => {
    if(buttonSel=='todos'){
      setListadoElementos(state.listadoMultimedia)
      setElementosBuscador(state.listadoMultimedia)
    }else{
      let itemsAux=[]
      state.listadoMultimedia.map(function(item,index){
        if(item.type==buttonSel){
          itemsAux.push(item)
        }
      })
      setListadoElementos(itemsAux)
      setElementosBuscador(itemsAux)
    }
  }, [buttonSel]);

  useEffect(() => {
    updateSearch(textoBuscador)
  }, [textoBuscador]);

  useEffect(() => {
    setListadoElementos(state.listadoMultimedia)
    setElementosBuscador(state.listadoMultimedia)
  }, [state.listadoMultimedia]);

  function cargarDatosIniciales(){
    let items = []
    for(let i=1;i<10;i++){
      let tipoAux =''
      switch (Math.floor(Math.random() * 3)) {
        case 0:
          tipoAux='pelicula'
        break;
        case 1:
          tipoAux='ebook'
        break;
        case 2:
          tipoAux='videojuego'
        break;
      }
      let obj = {
        id:i,
        type:tipoAux,
        nombre:tipoAux+' '+i,
        fecha:'2023-12-0'+i,
        puntuacion:Math.floor(Math.random() * 10)+1,
        resumen:'resumen resumen  resumen  resumen  resumen  resumen  resumen  resumen '
      }
      let multimedia = new Multimedia(obj)
      items.push(multimedia)
    }
    return items;
  }
  
  function changeButtonSel(opcion){
    if(buttonSel==opcion){
      setButtonSel('todos')
    }else{
      setButtonSel(opcion)
    }
    
  }
  
  function updateSearch(textoBuscador){
      if(textoBuscador.length > 0){
        let search = textoBuscador.toUpperCase();
        const elementosFiltrados = listadoElementos.filter(item => {
          let titulo = item.nombre
          let fecha = item.fecha
          return (titulo.toUpperCase().indexOf(search) > -1 || fecha.toUpperCase().indexOf(search) > -1);
        });
        setElementosBuscador(elementosFiltrados.slice())

      }else{
        setElementosBuscador(listadoElementos.slice())
       
      }
    }
  
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
            <div className={`${styles.buttonContainer}`}>
              <div style={{display:'flex',flex:1}}>
                <button onClick={changeButtonSel.bind(this,'pelicula')} className={`${styles.contentTipo} ${buttonSel=='pelicula' || buttonSel=='todos'? styles.active : ''}`}>
                  <Image
                    width={22}
                    height={22}
                    src={'/icons/film-icon.svg'}
                    style={{ filter: 'invert(100%)'}}
                    alt="Icono pelicula"
                  />

                  <a>Peliculas</a>
                </button>
                <button onClick={changeButtonSel.bind(this,'ebook')} className={`${styles.contentTipo} ${buttonSel=='ebook' || buttonSel=='todos'? styles.active : ''}`} >
                  <Image
                    width={22}
                    height={22}
                    src={'/icons/ebook-icon.svg'}
                    style={{ filter: 'invert(100%)'}}
                    alt="Icono ebook"
                  />
                  <a>e-books</a>
                </button>
                <button onClick={changeButtonSel.bind(this,'videojuego')} className={`${styles.contentTipo} ${buttonSel=='videojuego' || buttonSel=='todos'? styles.active : ''}`}>
                  <Image
                    width={22}
                    height={22}
                    src={'/icons/videojuego-icon.svg'}
                    style={{ filter: 'invert(100%)'}}
                    alt="Icono videojuego"
                  />
                  <a>Videojuegos</a>
                </button>
              </div>
              <div className={`${styles.buscardorContainer}`}>
                <input 
                  placeholder='Buscar'
                  value={textoBuscador}
                  onChange={e => { setTextoBuscador(e.currentTarget.value); }}
                 />
              </div>
            </div>
            <ul style={{display: 'grid','gridTemplateColumns': 'repeat('+parseInt(size.width/260)+',auto)',padding:10,justifyContent: 'center'}}>
              {elementosBuscador.map((item) => <CustomItem key={item.id} multimedia={item} eliminarElemento={dispatch.bind(this,{ type: 'deleteElemento',elemento:item})}/>)}
            </ul>
          </div>
      </main>
    </>
  )
}




