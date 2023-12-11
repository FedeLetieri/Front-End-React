import axios from 'axios'
import { REST_SERVER_URL } from './constant'
import { CountData } from '../domain/CountData'

class CountDataService{
    async getCountData(){
        const countData = await axios.get(`${REST_SERVER_URL}/countData?userId=${localStorage.getItem('userId')}`)
        return CountData.fromJSON(countData.data)
    }
}

export const countDataService = new CountDataService()