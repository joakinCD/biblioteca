import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Formulario.module.css'
import React, { useState,useEffect } from "react"
import Cabecera from '../../../components/Cabecera'
import {useRouter} from 'next/navigation'
const inter = Inter({ subsets: ['latin'] })

import { useParams,useSearchParams } from 'next/navigation'

export default function Page() {
  const params = useParams()
   const router = useRouter()

 
  const [elementoSel, setElementoSel] = useState({});
  const [selectValue, setSelectValue] = useState('pelicula');
  const [indiceElemento, setIndiceElemento] = useState(-1);
  const [listadoMultimedia, setListadoMultimedia] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    resumen: "",
    fecha:""
  });
  const handleInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
  }
  
  const handleSelect = (e) => {
    setSelectValue(e.target.value);
  }
  const editarElemento = () => {
    if(formData.nombre.length>0){
      if(formData.resumen.length>0){
        if(formData.fecha.length>0){
          const elementoCopia = JSON.parse(JSON.stringify(elementoSel))
          elementoCopia.nombre=formData.nombre
          elementoCopia.resumen=formData.resumen
          elementoCopia.fecha=formData.fecha
          elementoCopia.type=selectValue
          listadoMultimedia[indiceElemento]=elementoCopia
          localStorage.setItem('listadoMultimedia',JSON.stringify(listadoMultimedia))
          alert('Elemento editado correctamente')
          router.replace('/')  
        }else{
          alert('Introduzca una fecha')
        }
      }else{
        alert('Introduzca un resumen')
      }
    }else{
      alert('Introduzca un título')
    }
    
  }
  
  useEffect(() => {
    let listadoMultimediaAux = JSON.parse(localStorage.getItem('listadoMultimedia'))

    setListadoMultimedia(listadoMultimediaAux)
    if(listadoMultimediaAux?.length>0){
      listadoMultimediaAux.map(function(item,index){
        if(params?.id==item?.id?.toString()){
          setElementoSel(item)
          setFormData({
            nombre: item.nombre,
            resumen: item.resumen,
            fecha:item.fecha
          })
          setSelectValue(item.type)
          setIndiceElemento(index)
          }
      })
    }
  }, [params])
 
  return (
    <>
      <Head>
        <title>Editar</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>

        <div style={{width:'100%',height:'100%'}}>
          <Cabecera nombre='Formulario'></Cabecera>
          {elementoSel.id?(
            <div style={{display:'flex', margin:10, alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
              <p style={{fontSize:24,fontWeight:'bold',color:'black',marginTop:30,marginBottom:30}}>Editar elemento</p>
              <form className={`${styles.form}`}>
                
                <div>
                  <label>Tipo</label>
                  <select name="select" onChange={handleSelect}>
                    <option selected={selectValue=='pelicula'} value="pelicula">Película</option>
                    <option selected={selectValue=='videojuego'} value="videojuego" >Videojuego</option>
                    <option selected={selectValue=='ebook'} value="ebook">Ebook</option>
                  </select>
                </div>
                <div >
                  <label>Título</label>
                  <input type="text" placeholder="Título" name="nombre" onChange={handleInput} value={formData.nombre} />
                </div>
                
                <div>
                  <label>Fecha</label>
                  <input type="date" name="fecha" onChange={handleInput} value={formData.fecha}/>
                </div>
                <div>
                  <label>Resumen</label>
                  <textarea type="text" placeholder="Resumen" name="resumen" onChange={handleInput} value={formData.resumen} />
                </div>
                
              

                
              </form>
              <button  className={`${styles.button}`} onClick={editarElemento}>Editar</button>
          </div>)
          :(
            <div style={{display:'flex', margin:10, alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
              <p style={{fontSize:24,fontWeight:'bold',color:'black',marginTop:30,marginBottom:30}}>No existe ese elemento</p>
            </div>
          )}
          
        </div>
      </main>
    </>
    
  )
}