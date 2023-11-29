import Link from 'next/link'
import Image from 'next/image'
const Cabecera = (props) => {
    return(
        <div style={{backgroundColor: 'red',width:'100%',height:60,alignItems:'center',display:'flex',padding:10, justifyContent:'space-between'}}>
            <a style={{color:'white',fontSize:20,fontWeight:'bold'}}>{props.nombre}</a>
            {
            	props.nombre=='Biblioteca'?
            	(<Link href="/formulario">
            		<Image
	                    width={30}
	                    height={30}
	                    src={'/icons/add-icon.svg'}
	                    style={{ filter: 'brightness(0) invert(1)'}}
	                    alt='Icono add'
                    />
                </Link>)
            	:
            	(<Link href="/">
            		<Image
	                    width={30}
	                    height={30}
	                    src={'/icons/home-icon.svg'}
	                    style={{ filter: 'invert(1)'}}
	                    alt='Icono hom'
                    />
                </Link>)
            }
            
        </div>
    );
}
export default Cabecera;
