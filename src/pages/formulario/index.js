import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Formulario.module.css'
import React, { useState } from "react"
import Cabecera from '../../components/Cabecera'
const inter = Inter({ subsets: ['latin'] })
import {useRouter} from 'next/navigation'
import Multimedia from '../../objetos/Multimedia'
export default function Formulario() {
  const router = useRouter()
  const [selectValue, setSelectValue] = useState('pelicula');
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
  const addElemento = (e) => {
    let listadoMultimedia = JSON.parse(localStorage.getItem('listadoMultimedia'))
    if(formData.nombre.length>0){
      if(formData.resumen.length>0){
        if(formData.fecha.length>0){
          let nuevoElemento={
              id:new Date().getTime().toString(),
              nombre:formData.nombre,
              resumen:formData.resumen,
              fecha:formData.fecha,
              type:selectValue,
              puntuacion:'-',
              numeroValoraciones:0,
              tuValoracion:-1
            }
           
            listadoMultimedia.push(new Multimedia(nuevoElemento))
            localStorage.setItem('listadoMultimedia',JSON.stringify(listadoMultimedia))
            alert('Elemento creado correctamente')
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

  return (
    <>
      <Head>
        <title>Añadir</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>

        <div style={{width:'100%',height:'100%'}}>
          <Cabecera nombre='Formulario'></Cabecera>
          <div style={{display:'flex', margin:10, alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
              <p style={{fontSize:24,fontWeight:'bold',color:'black',marginTop:30,marginBottom:30}}>Añadir elemento</p>
              <form className={`${styles.form}`}>
                
                <div>
                  <label>Tipo</label>
                  <select name="select" onChange={handleSelect}>
                    <option selected value="pelicula">Pelicula</option>
                    <option value="videojuego" selected>Videojuego</option>
                    <option value="ebook">Ebook</option>
                  </select>
                </div>
                <div >
                  <label >Título</label>
                  <input type="text"  placeholder="Título" name="nombre" onChange={handleInput} value={formData.nombre} />
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
               <button  className={`${styles.button}`} onClick={addElemento}>Añadir</button>
          </div>
        </div>
      </main>
    </>
    
  )
}