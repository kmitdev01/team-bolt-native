import react from 'react'
import axios from 'axios'
import { getData } from './AsyncStorage'
import AsyncStorage from '@react-native-async-storage/async-storage'
const baseurl = 'https://team-bolt.herokuapp.com/api'
export const imgurl = 'https://team-bolt.herokuapp.com/images/'


export const LoginApi = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(`${baseurl}/login`, body)
            .then(response => {
                console.log(response, "Login Res");
                return resolve(response)
            })
            .catch(error => {
                return reject(error)
            });
    })
}

export const Getcategory = async () => {
    const token = await getData("token")
    console.log(token, "tokken get myy ............. ")

    return await axios.get(`${baseurl}/category`, {
        headers: {
            Authorization: token
        }
    })
        .then(response => {
            return (response)
        })
        .catch(err => {
            return (err)
        })

}

