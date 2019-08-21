import Record from './Record'

export class Competicao < Record
    collection :competicoes

    fields 
        nome: {type: :String, human_name: "Nome"}

    inputs 
        nome: {type: :String, human_name: "Nome"}