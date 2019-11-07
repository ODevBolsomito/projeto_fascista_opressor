const axios = require('axios')

import Record from './Record'
import Equipe from './Equipe'
import State from '../State'

export class Resultado < Record
    collection :resultados

    fields
        equipeId: { type: :Integer,  human_name: 'EquipeId' }
        largada:  { type: :DateTime, human_name: 'Largada'  }
        arco1:    { type: :Integer,  human_name: 'Arco 1'   }
        arco2:    { type: :Integer,  human_name: 'Arco 2'   }
        placa1:   { type: :Integer,  human_name: 'Placa 1'  }
        placa2:   { type: :DateTime, human_name: 'Placa 2'  }
        golf:     { type: :DateTime, human_name: 'Golf'     }
        chegada:  { type: :DateTime, human_name: 'Chegada'  }

    def self.all
        let res = await axios
            url: "http://localhost:9000/competicoes/{State:competicao:id}/resultados"
            method: 'GET'
            headers: 
                Access-Token: window:sessionStorage.getItem('token')

        for data in res:data
            self.new data

    def self.create data
        let res = await axios
            url: "http://localhost:9000/competicoes/{State:competicao:id}/resultados"
            method: 'POST'
            data: data
            headers: 
                Access-Token: window:sessionStorage.getItem('token')
        self.new res:data

    def update
        let data = {}
        data[self:constructor:name.toLowerCase] = self
        let res = await axios
            url: "http://localhost:9000/competicoes/{State:competicao:id}/resultados/{self:id}"
            method: 'PUT'
            data: data
            headers: 
                Access-Token: window:sessionStorage.getItem('token')
        return res

    def destroy
        let res = await axios
            url: "http://localhost:9000/competicoes/{State:competicao:id}/resultados/{self:id}"
            method: 'DELETE'
            headers: 
                Access-Token: window:sessionStorage.getItem('token')
        return res

    def save
        let res
        if self:id
            res = await update
        else
            res = await axios
                url: "http://localhost:9000/competicoes/{State:competicao:id}/resultados"
                method: 'POST'
                data: self
                headers: 
                    Access-Token: window:sessionStorage.getItem('token')
        return res
