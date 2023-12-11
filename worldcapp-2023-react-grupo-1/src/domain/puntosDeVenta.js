export class PuntoDeVenta {
    constructor(nombre, direccion, stockSobres, tipo, id) {
      this.nombre = nombre
      this.direccion = direccion
      this.stockSobres = stockSobres
      this.tipo = tipo
      this.id = id
    }
  
    // Método para serializar a JSON
    toJSON() {
      return {
        nombre: this.nombre,
        direccion: this.direccion.toJSON(), // Serializar la propiedad direccion
        stockSobres: this.stockSobres,
        tipo: this.tipo,
        id: this.id,
      }
    }
  
    // Método estático para crear una instancia desde un objeto JSON
    static fromJSON(puntoDeVentaJSON) {
      return new PuntoDeVenta(
        puntoDeVentaJSON.nombre,
        Direccion.fromJSON(puntoDeVentaJSON.direccion), // Deserializar la propiedad direccion
        puntoDeVentaJSON.stockSobres,
        puntoDeVentaJSON.tipo,
        puntoDeVentaJSON.id
      )
    }
  }
  
  export class Ubicacion {
    constructor(y, x) {
      this.y = y
      this.x = x
    }

    toJSON() {
        return {
            y: this.y,
            x: this.x,
        }
      }
  
    // Método estático para crear una instancia desde un objeto JSON
    static fromJSON(ubicacionJSON) {
      return new Ubicacion(ubicacionJSON.y, ubicacionJSON.x)
    }
  }
  
  export class Direccion {
    constructor(provincia, localidad, calle, numero, ubicacion) {
      this.provincia = provincia
      this.localidad = localidad
      this.calle = calle
      this.numero = numero
      this.ubicacion = ubicacion
    }
  
    // Método para serializar a JSON
    toJSON() {
      return {
        provincia: this.provincia,
        localidad: this.localidad,
        calle: this.calle,
        numero: this.numero,
        ubicacion: this.ubicacion ? this.ubicacion.toJSON() : null, // Serializar la propiedad ubicacion
      }
    }
  
    // Método estático para crear una instancia desde un objeto JSON
    static fromJSON(direccionJSON) {
      return new Direccion(
        direccionJSON.provincia,
        direccionJSON.localidad,
        direccionJSON.calle,
        direccionJSON.numero,
        direccionJSON.ubicacion ? Ubicacion.fromJSON(direccionJSON.ubicacion) : null // Deserializar la propiedad ubicacion
      )
    }
  }