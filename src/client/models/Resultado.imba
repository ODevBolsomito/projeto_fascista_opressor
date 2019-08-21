import Record from './Record'

import Equipe from './Equipe'

export class Resultado < Record
    collection :resultados

    fields
        largada:   {type: :DateTime, human_name: 'Largada'   }
        letra:     {type: :String,   human_name: 'Letra'     }
        missao_1:  {type: :Integer,  human_name: 'Missao 1'  }
        missao_2:  {type: :Integer,  human_name: 'Missao 2'  }
        missao_3:  {type: :Integer,  human_name: 'Missao 3'  }
        chegada:   {type: :DateTime, human_name: 'Chegada'   }
        equipe:
            type: Equipe,  
            foreign_key: :equipeId  
            name: :nome  
            human_name: 'Equipe'

    inputs 
        equipe:
            type: Equipe,  
            foreign_key: :equipeId  
            name: :nome  
            human_name: 'Equipe'

    def self.placar_fields
        return ({
            missao_1:  {type: :Integer,  human_name: 'Bamboles'  }
            missao_2:  {type: :Integer,  human_name: 'Bola'  }
            missao_3:  {type: :Integer,  human_name: 'Placa'  }
            tempo:   {type: :DateTime, human_name: 'Tempo'   }
        })

    def tempo 
        console.log ('123 tempo 123')