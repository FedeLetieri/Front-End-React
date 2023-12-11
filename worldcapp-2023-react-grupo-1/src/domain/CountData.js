export class CountData{
    constructor(figuritasOfrecidas,
        figuritasFaltantes,
        puntosDeVenta,
        usuariosActivos){
            this.figuritasOfrecidas = figuritasOfrecidas
            this.figuritasFaltantes = figuritasFaltantes
            this.puntosDeVenta = puntosDeVenta
            this.usuariosActivos = usuariosActivos
    }

    static fromJSON(countDataJSON){
        return Object.assign(new CountData(
        countDataJSON.figuritasOfrecidas,
        countDataJSON.figuritasFaltantes,
        countDataJSON.puntosDeVenta,
        countDataJSON.usuariosActivos))
    }

}

