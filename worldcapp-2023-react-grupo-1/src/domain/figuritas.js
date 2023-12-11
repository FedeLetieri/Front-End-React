export class Figurita {
    constructor(id,nombre,casaca,nacimiento,seleccion,
        copasMundiales,posicion,numero,peso,altura,precio,promesa,
        onFire,agnoDebut,confederacion,copasConf,lider,nivelImpresion,valorBase,valorTotal) { 
         this.id = id
         this.nombre = nombre
         this.casaca = casaca
         this.nacimiento = nacimiento
         this.seleccion = seleccion
         this.copasMundiales = copasMundiales
         this.posicion = posicion
         this.numero = numero
         this.peso = peso
         this.altura= altura
         this.precio = precio
         this.promesa = promesa
         this.onFire = onFire
         this.agnoDebut = agnoDebut
         this.confederacion = confederacion
         this.copasConf = copasConf
         this.lider = lider
         this.nivelImpresion = nivelImpresion
         this.valorBase = valorBase
         this.valorTotal = valorTotal
         this.duegno = null

    
    }

    static fromJSON(figuritaJSON) {
      const duegno = figuritaJSON.duegno ? new Duegno(figuritaJSON.duegno.id) : undefined
      return Object.assign(new Figurita(
          figuritaJSON.id,
          figuritaJSON.jugador.nombre,
          figuritaJSON.jugador.nroCamiseta,
          figuritaJSON.jugador.nacimiento,
          figuritaJSON.jugador.seleccion.pais,
          figuritaJSON.jugador.seleccion.copasMundiales,
          figuritaJSON.jugador.posicion,
          figuritaJSON.numero,
          figuritaJSON.jugador.peso,
          figuritaJSON.jugador.altura,
          figuritaJSON.jugador.precio,
          figuritaJSON.jugador.promesa,
          figuritaJSON.onFire,
          figuritaJSON.jugador.agnoDebut,
          figuritaJSON.jugador.seleccion.confederacion,
          figuritaJSON.jugador.seleccion.copasConf,
          figuritaJSON.jugador.lider,
          figuritaJSON.nivelImpresion,
          parseFloat(figuritaJSON.valorBase.toFixed(1)),
          parseFloat(figuritaJSON.valorTotal.toFixed(1)),
          duegno
      ), figuritaJSON)
  }

  esOnfire(){
    if (this.onFire) return "on fire"
    else return "no es on fire" 
  }

}


class Duegno {
    constructor(id, nombre) {
        this.id = id
        this.nombre = nombre
    }
}
