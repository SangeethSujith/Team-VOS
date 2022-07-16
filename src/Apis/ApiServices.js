import axios from 'axios';
import { API_URL, GET_INVOICES } from './FirstApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import qs from 'qs'

export async function getInvoices() {
    //const url = require("url");
    // const params = {
    //     FromDate: "01-03-2022",
    //     ToDate: "31-03-2022",
    //     CustomerCode: "C08954",
    //     Offset: "0",
    //     Limit: "0"
    // };
    //const param = new url.URLSearchParams(params);
    const token = await AsyncStorage.getItem('userToken');

    let headers = {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    };
    axios.get(`${API_URL}/${GET_INVOICES}?Offset=0&Limit=0&FromDate=09-04-2021&ToDate=31-03-2022&CustomerCode=C08954`,
        headers).then(async (response) => {
            //console.log(response.data);
            return {
                response: response.data
            };
        }).catch((err) => {
            console.log(err)
        });
}