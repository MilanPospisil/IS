import axios from 'axios';
import {useEffect} from 'react';
//import { Client } from 'pg';

class ClientFunc
{

    static host = "localhost";
    static port = 9000;

    static log(error)
    {
        console.log(error);
    }

    static post(path, obj)
    {
        return axios.post("http://" + ClientFunc.host + ":" + ClientFunc.port + path, obj, { withCredentials: true });
    }

    static get(path)
    {
        return axios.get("http://" + ClientFunc.host + ":" + ClientFunc.port + path, { withCredentials: true });
    }

    static readData(path, setFunc)
    {
        ClientFunc.get(path)
        .then(function (response) {
            setFunc(response.data);
        })
        .catch(function(error) {
           ClientFunc.log(error);
        });
    }

    static readUseEffect(path, setFunc, dependencies, allowed)
    {
        var a = useEffect;
        a(
            () => {
              if (allowed) ClientFunc.readData(path, setFunc);     
            },
            dependencies);
    }
}

export default ClientFunc;