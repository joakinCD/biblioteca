import Image from 'next/image';
import { useState} from "react";
import Link from 'next/link'
const CustomItem = (props) => {
    const [isHovering, setIsHovered] = useState(false);
    const onMouseEnter = () => {
        setIsHovered(true)
    };
    const onMouseLeave = () => setIsHovered(false);
    const eliminar=() =>{
        if(window.confirm("¿Seguro que quieres eliminar este elemento?")){
            props.eliminarElemento()
        }
    }
    let elemento = props.multimedia
    let urlIcon = '/icons/film-icon.svg'
    switch(elemento.type){
        case 'pelicula':
            urlIcon = '/icons/film-icon.svg'
        break;
        case 'ebook':
            urlIcon = '/icons/ebook-icon.svg'
        break;
        case 'videojuego':
            urlIcon = '/icons/videojuego-icon.svg'
        break;
    }
    return(
        <li 
            style={{margin:8}} 
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}>
            <div style={{overflow:'hidden',width: 250,height:250,borderStyle:'solid', borderWidth:1,borderRadius:8,borderColor:'black',}}>
              <Image
                src='/images/pelicula.png'
                width={250}
                height={250}
                style={{borderRadius:8}}
                alt='Foto'
                priority
              />
            </div>
            <div style={{padding:8,borderRadius:8,height:60,width:250,transform:'translateY(-61px)',position:'absolute',background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 100%)',display:'flex',flexDirection:'row'}}>
                <div style={{display:'flex',flexDirection:'column',flex:1}}>
                    <div style={{display:'flex'}}>
                        <Image
                            width={22}
                            height={22}
                            src={urlIcon}
                            style={{ filter: 'invert(100%)'}}
                            alt='Icono'
                        />
                        <a style={{fontWeight:'bold',marginLeft:4,color:'white'}}>{elemento.nombre}</a>
                    </div>
                    <div style={{display:'flex'}}>
                        <Image
                            width={22}
                            height={22}
                            src={'/icons/fecha-icon.svg'}
                            style={{ filter: 'invert(100%)'}}
                            alt='Icono fecha'
                        />
                        <a style={{marginLeft:4,color:'white'}}>{elemento.fecha}</a>
                    </div>
                </div>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:50}}>
                    <div style={{background:'grey',width:40,height:40,borderRadius:8,display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <a style={{fontWeight:'bold',color:'white',fontSize:20}}>{elemento.puntuacion}</a>
                    </div>
                </div>
            </div>
            {isHovering?
                (
                    <div style={{borderRadius:8,opacity:0.9,position:'absolute',background:'black',width:250,height:250,transform:'translateY(-250px)'}}>
                        <div style={{margin:8,display:'flex', flexDirection:'column',height:'calc(100% - 16px)'}}>
                            <div style={{display:'flex'}}>
                                    <Image
                                        width={22}
                                        height={22}
                                        src={urlIcon}
                                        style={{ filter: 'invert(100%)'}}
                                        alt='Icono'
                                    />
                                    <a style={{fontWeight:'bold',marginLeft:4,color:'white'}}>{elemento.nombre}</a>
                                </div>
                            <a style={{color:'white',flex:1}}>{elemento.resumen}</a>
                            <div style={{height:50,display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
                                <Link href={"/formulario/"+elemento.id} style={{marginRight:8,background:'grey',width:40,height:40,borderRadius:8,display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <Image
                                        width={22}
                                        height={22}
                                        src={'/icons/editar-icon.svg'}
                                        style={{ filter: 'invert(100%)'}}
                                        alt='Icono editar'
                                    />
                                </Link>
                                <button onClick={eliminar} style={{background:'grey',width:40,height:40,borderRadius:8,display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <Image
                                        width={22}
                                        height={22}
                                        src={'/icons/eliminar-icon.svg'}
                                        style={{ filter: 'invert(100%)'}}
                                        alt='Icono eliminar'
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                )
                :
                (null)
            }
        </li>
    );
}
export default CustomItem;