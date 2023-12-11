export class Jugador {
  constructor(
    id,
    nombre,
    nacimiento,
    casaca,
    seleccion,
    posicion,
    debut,
    altura,
    peso,
    esLider,
    cotizacion,
  ) {
    this.id = id
    this.nombre = nombre
    this.nacimiento = nacimiento
    this.casaca = casaca
    this.seleccion = seleccion
    this.posicion = posicion
    this.debut = debut
    this.peso = peso
    this.altura = altura
    this.esLider = esLider
    this.cotizacion = cotizacion
  }

  static fromJSON(jugadorJSON) {
    return new Jugador(
      jugadorJSON.id,
      jugadorJSON.nombre,
      jugadorJSON.nacimiento,
      jugadorJSON.nroCamiseta,
      jugadorJSON.seleccion.pais,
      jugadorJSON.posicion,
      jugadorJSON.agnoDebut,
      jugadorJSON.peso,
      jugadorJSON.altura,
      jugadorJSON.lider,
      jugadorJSON.precio,
    )
  }
}
