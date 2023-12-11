import './home.css'
import { CardGrande } from "../../components/cardGrande/cardGrande"
import { faAddressCard, faUser,faStore} from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { useOnInit } from "../../customHooks/hooks"
import { CardData } from '../../domain/cardGrande'
import { Loading } from '../../components/loading/Loading'
import { countDataService } from '../../services/countDataService'

export const Home = () => {
    const [loadingState, setLoadingState] = useState('loading')
    const [countData, setCountData] = useState({
      figuritasFaltantes: null,
      figuritasOfrecidas: null,
      puntosDeVenta: null,
      usuariosActivos: null
    })

    useOnInit(async () => {
      setLoadingState('loading')
      setCountData(await countDataService.getCountData())
      setLoadingState(noElements() ? 'notFound' : 'loaded')
    })

    const noElements = () => {
      return countData.figuritasFaltantes == null &&
      countData.figuritasOfrecidas == null &&
      countData.puntosDeVenta == null &&
      countData.usuariosActivos == null
    }

    const cards = () => {
      const cards = [
        new CardData("Figuritas Ofrecidas", countData.figuritasOfrecidas, faAddressCard),
        new CardData("Figuritas Faltantes", countData.figuritasFaltantes, faAddressCard),
        new CardData("Puntos de Venta", countData.puntosDeVenta, faStore),
        new CardData("Usuarios Activos", countData.usuariosActivos, faUser)
      ]

      return (
        cards.map((card, index) => {
          return <CardGrande key={"cardGrande"+index} cantidad={card.amount} tituloInferior={card.title} icon={card.icon}/>
        })
      )
    }

    return (
      <>
        {(() => { return noElements() ?
                  <Loading itemsName='datos' state={loadingState}></Loading>
                  :
                  <div className='home-cards'>
                    {cards()}
                  </div>
                })()
        }
      </>
    )
}

/*

Ejemplo para cargar cardChica (Ejemplo de Figurita, Jugador y Punto de venta)

const datosFigurita = {
      titulo: 'René Higuita',
      tituloInferior: 'Valoraciones 678',
      color: '#765efa',
      icon: faIdBadge,
      taglist: [
        { icon: faHashtag, texto: '123' },
        { icon: faFire, texto: 'on fire' },
        { icon: faPrint, texto: 'medio' },
        // Agrega más objetos según sea necesario
      ],
    }
    const datosJugador = {
      titulo: 'Jorge Campos',
      tituloInferior: 'U$S 30.000.000',
      color: '#64b8f8',
      icon: faPersonWalking,
      taglist: [
        { texto: '15/10/1996' },
        { icon: faTShirt, texto: '1' },
        { icon: faFlag, texto: 'Mexico' },
        { texto: 'Arquero' },
        { icon: faArrowsUpDown, texto: '1.70' },
        { icon: faWeightScale, texto: '68 Kg' },
        // Agrega más objetos según sea necesario
      ],
    }
    const datoPuntoDeVenta = {
      titulo: 'Alto kiosko',
      tituloInferior: 'Tipo Kiosko',
      icon: faStore,
      color: '#765efa',
      taglist: [
        { icon: faLocationDot, texto: 'Av.Saraza 5555' },
        { icon: faIdBadge, texto: '100 sobres' },
        // Agrega más objetos según sea necesario
      ],
    }
    
<CardChica titulo={datosFigurita.titulo} tituloInferior={datosFigurita.tituloInferior} color={datosFigurita.color} icon={datosFigurita.icon} taglist={datosFigurita.taglist}/>
<CardChica titulo={datosJugador.titulo} tituloInferior={datosJugador.tituloInferior} color={datosJugador.color} icon={datosJugador.icon} taglist={datosJugador.taglist}/>
<CardChica titulo={datoPuntoDeVenta.titulo} tituloInferior={datoPuntoDeVenta.tituloInferior} color={datoPuntoDeVenta.color} icon={datoPuntoDeVenta.icon} taglist={datoPuntoDeVenta.taglist}/>
*/