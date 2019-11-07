const axios = require('axios')

import Record from './Record'
import State from '../State'

export class Equipe < Record
    collection :equipes

    fields 
        nome: {type: :String, human_name: "Nome"}

    def self.all
        let res = await axios
            url: "http://localhost:9000/competicoes/{State:competicao:id}/equipes"
            method: 'GET'
            headers: 
                Access-Token: window:sessionStorage.getItem('token')

        for data in res:data
            self.new data

    def self.create data
        let res = await axios
            url: "http://localhost:9000/competicoes/{State:competicao:id}/equipes"
            method: 'POST'
            data: data
            headers: 
                Access-Token: window:sessionStorage.getItem('token')
        self.new res:data


    def update
        let data = {}
        data[self:constructor:name.toLowerCase] = self
        let res = await axios
            url: "http://localhost:9000/competicoes/{State:competicao:id}/equipes/{self:id}"
            method: 'PUT'
            data: data
            headers: 
                Access-Token: window:sessionStorage.getItem('token')
        return res


    def destroy
        let res = await axios
            url: "http://localhost:9000/competicoes/{State:competicao:id}/equipes/{self:id}"
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
                url: "http://localhost:9000/competicoes/{State:competicao:id}/equipes"
                method: 'POST'
                data: self
                headers: 
                    Access-Token: window:sessionStorage.getItem('token')
        return res
