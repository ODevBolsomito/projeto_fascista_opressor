const axios = require('axios')

export class Record
    prop collection
    prop fields
    prop inputs

    def self.collection collection
        @collection ||= collection

    def self.fields fields
        @fields ||= fields

    def self.inputs inputs
        @inputs ||= inputs

    def self.all
        let res = await axios
            url: "http://localhost:9000/{@collection}"
            method: 'GET'
            headers: 
                Access-Token: window:sessionStorage.getItem('token')

        for data in res:data
            self.new data

    def self.create data
        let res = await axios
            url: "http://localhost:9000/{@collection}"
            method: 'POST'
            data: data
            headers: 
                Access-Token: window:sessionStorage.getItem('token')
        self.new res:data


    def update
        let res = await axios
            url: "http://localhost:9000/{@collection}/{self:id}"
            method: 'PUT'
            data: self
            headers: 
                Access-Token: window:sessionStorage.getItem('token')
        return res


    def destroy
        let res = await axios
            url: "http://localhost:9000/{@collection}/{self:id}"
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
                url: "http://localhost:9000/{@collection}"
                method: 'POST'
                data: self
                headers: 
                    Access-Token: window:sessionStorage.getItem('token')
        return res


    def initialize
        fields = Record:caller.fields
        inputs = Record:caller.inputs
        collection = Record:caller.collection

        for k, v of inputs
            self[k] = null

        for k, v of fields
            self[k] = null

        for k, v of ($1) 
            self[k] = ($1)[k] if $1
