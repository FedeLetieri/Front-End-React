export class Seleccion{
    constructor(id, pais, confederacion, copasDelMundo, copasConfederacion){
        this.id = id
        this.pais = pais
        this.confederacion = confederacion
        this.copasDelMundo = copasDelMundo
        this.copasConfederacion = copasConfederacion
    }

    static fromJSON(seleccionJSON){
        return Object.assign(new Seleccion(
            seleccionJSON.id,
            seleccionJSON.pais,
            seleccionJSON.confederacion,
            seleccionJSON.copasDelMundo,
            seleccionJSON.copasConfederacion
        ))
    }
}