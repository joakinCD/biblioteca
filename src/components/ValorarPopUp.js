import styles from '@/styles/ValorarPopUp.module.css'
import { useState} from "react"
import { Range } from 'react-range'; 
const ValorarPopUp = (props) => {
	let elemento = props.multimedia
	let valoracion = 0
	if(elemento.tuValoracion!=-1){
		valoracion=elemento.tuValoracion
	}
	const [values, setValues] = useState([valoracion]);
	function cambiarValoracion(values){
		setValues(values)
	}
	const valorar=() =>{
        props.valorar(values[0],elemento)
        props.cambiarValorar(false)
    }
    return(
    	<div style={{position:'absolute',width: '100%',height:'100%'}}>
	        <div style={{position:'absolute',background:'black',opacity:0.5,width: '100%',height:'100%'}}></div>
	        <div className={`${styles.container}`}>
	        	<div className={`${styles.center}`} style={{width:300,height:300,background:'white',borderRadius:8,padding:10}}>
	        		
	        	
	        		<div style={{flex:1,width:240}}>
	        			<div style={{position:'absolute',width:240,display:'flex',justifyContent:'flex-end'}}>
	        				<button style={{background:'transparent',height:30,width:30,borderColor:'black', borderRadius:30,borderStyle:'solid',borderWidth:1}} onClick={props.cambiarValorar.bind(this,false)}>X</button>
	        			</div>
		        		<p className={`${styles.titulo}`}>Valorar</p>
		        		<div className={`${styles.center}`}>
		        				<p>{elemento.nombre}</p>
		        		</div>
		        		<div className={`${styles.separator}`}></div>
		        		<p className={`${styles.titulo}`}>Valoracion general</p>
		        		<div className={`${styles.center}`} style={{alignItems:'flex-start'}}>
		        				<p>Numero de valoraciones: {elemento.numeroValoraciones}</p>
		        				<p>Media: {elemento.puntuacion}</p>
		        		</div>
		        		<div className={`${styles.separator}`}></div>
		        		<p className={`${styles.titulo}`}>Tú valoración</p>
		        		<div className={`${styles.center}`}>
			        		 <Range 
						        step={1} 
						        min={0} 
						        max={10} 
						        values={values} 
						        onChange={(values) => {cambiarValoracion(values)}} 
						        renderTrack={({ props, children }) => ( 
						          <div 
						            {...props} 
						            style={{ 
						              height: '6px', 
						              width: '100%', 
						              backgroundColor: 'red'
						            }} 
						          > 
						            {children} 
						          </div> 
						        )} 
						        renderThumb={({ props }) => ( 
						          <div 
						            {...props} 
						            style={{ 
						              height: '42px', 
						              width: '42px', 
						              backgroundColor: 'white',
						              borderRadius:8,
						              borderStyle:'solid',
						              borderColor:'red',
						              justifyContent:'center',
						              display:'flex',
						              alignItems:'center'
						            }} 
						          ><p style={{color:'red', fontWeight:'bold',}}>{values[0]}</p></div>
						        )} 
						      /> 
		        		</div>
	        		</div>
	        		 <button onClick={valorar} className={`${styles.button}`}>Valorar</button>
	        	</div>
	        </div>
        </div>
    );
}
export default ValorarPopUp;
