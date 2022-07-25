import axios from 'axios';
import { API_URL, GET_TOKEN } from './FirstApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { resetAuthAsyncStorage, setAuthAsyncStorage } from "./getAuthAsyncStorage";
import qs from 'qs'

export async function getToken() {

  return new Promise(() => {
    let body = {
      UserName: "FSO",
      Password: "123@erptest",
      grant_type: "password"
    }
    axios.post(`${API_URL}/${GET_TOKEN}`, qs.stringify(body)).then(async (response) => {
      //console.log(response.data);
      try {
        console.log(response.data.access_token);
        await setAuthAsyncStorage(response.data);

      } catch (e) { }
    }).catch((err) => {
      console.log(err)
    });
  });
}

