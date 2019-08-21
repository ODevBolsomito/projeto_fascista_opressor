import Record from './Record'

export class Equipe < Record
    collection :equipes

    fields 
        nome: {type: :String, human_name: "Nome"}

    inputs 
        nome: {type: :String, human_name: "Nome"}
