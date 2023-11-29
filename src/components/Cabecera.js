
const Cabecera = (props) => {
    return(
        <div style={{backgroundColor: 'red',width:'100%',height:60,alignItems:'center',display:'flex',padding:10}}>
            <a style={{color:'white',fontSize:20,fontWeight:'bold'}}>{props.nombre}</a>
        </div>
    );
}
export default Cabecera;
