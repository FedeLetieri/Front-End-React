import axios from 'axios'
import { REST_SERVER_URL } from './constant'

class AuthService{
    async authenticate(credentials){
        return axios.post(`${REST_SERVER_URL}/login`, credentials)
    }
}

export const authService = new AuthService()