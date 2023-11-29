import Image from 'next/image';
const CustomItem = (props) => {
    console.log("props",props)
    let pelicula = props.pelicula
    return(
        <li style={{borderStyle:'solid', borderWidth:1,borderRadius:8,padding:8,margin:8}}>
            <div style={{width: '100%', height:200, position:'relative'}}>
              <Image
                alt='Mountains'
                src='/images/pelicula.png'
                layout='fill'
              />
            </div>
            <div>
                <a style={{fontWeight:'bold'}}>{pelicula.nombre}</a>
            </div>
        </li>
    );
}
export default CustomItem;