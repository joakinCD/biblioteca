

export default class Multimedia{
  id=0
  nombre=""
  type=''
  resumen=''
  imagen=''
  fecha= ''
  puntuacion='-'
  numeroValoraciones=0
  tuValoracion=-1
  timestamp=0
  constructor(obj) {
    this.id=obj.id || 0
    this.nombre=obj.nombre || ''
    this.type=obj.type || ''
    this.resumen=obj.resumen || ''
    this.imagen=obj.imagen || ''
    this.fecha=obj.fecha || ''
    this.puntuacion=obj.puntuacion ||  '-'
    this.numeroValoraciones=obj.numeroValoraciones ||  0
    this.tuValoracion=obj.tuValoracion
    this.getTimestamp()
  }
  getTimestamp(){
    let fechaSplit = this.fecha.split("-");
    let date = new Date( fechaSplit[0], fechaSplit[1] - 1, fechaSplit[2]);
    this.timestamp=date.getTime()
  }
} 