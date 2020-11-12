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

    static readData(path, setFunc, method)
    {
        if (method == null) method = "get";

        var m_f = ClientFunc.get;
        if (method == "post") m_f = ClientFunc.post; 

        m_f(path)
        .then(function (response) {
            if (response.data.success)
            {
                setFunc(response.data.data);
            }
        })
        .catch(function(error) {
           ClientFunc.log(error);
        });
    }

    static readUseEffect(path, setFunc, dependencies, allowed, method)
    {
        // this is because of linter
        var a = useEffect;
        a(
            () => {
              if (allowed) ClientFunc.readData(path, setFunc, method);     
            },
            dependencies);
    }

    static entity_op(setFunc, dependencies, allowed, entity_name, entity_operation, query, method)
    {
        var path = "/entity?entity_name="+entity_name+"&entity_operation="+entity_operation;
        if (query) path += "&query="+JSON.stringify(query);
        this.readUseEffect(path, setFunc, dependencies, allowed, method);
    }
}

export default ClientFunc;