

export default class Multimedia{
  id=0
  nombre=""
  type=''
  resumen=''
  imagen=''
  fecha= ''
  puntuacion=0
  constructor(obj) {
    this.id=obj.id || 0
    this.nombre=obj.nombre || ''
    this.type=obj.type || ''
    this.resumen=obj.resumen || ''
    this.imagen=obj.imagen || ''
    this.fecha=obj.fecha || ''
    this.puntuacion=obj.puntuacion ||  0
  }
  
} 