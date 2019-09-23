export class Prova 
    prop largada default: []
    prop arco1 default: []
    prop arco2 default: []
    prop arco3 default: []
    prop golf default: []
    prop placaX default: []
    prop placaY default: []
    prop placaZ default: []
    prop chegada default: []

    def detecta sensor
        switch sensor
            when :largada
                largada = [Date.new, process.hrtime()[1]]
            when :arco1
                arco1 = [Date.new, process.hrtime()[1]]
            when :arco2
                arco2 = [Date.new, process.hrtime()[1]]
            when :arco3
                arco3 = [Date.new, process.hrtime()[1]]
            when :golf
                golf = [Date.new, process.hrtime()[1]]
            when :placaX
                placaX = [Date.new, process.hrtime()[1]]
            when :placaY
                placaY = [Date.new, process.hrtime()[1]]
            when :placaZ
                placaZ = [Date.new, process.hrtime()[1]]
            when :chegada
                chegada = [Date.new, process.hrtime()[1]]

    def resultados
        console.log "largada",  largada[0],  largada[1]
        console.log "arco1",    arco1[0],    arco1[1]
        console.log "arco2",    arco2[0],    arco2[1]
        console.log "arco3",    arco3[0],    arco3[1]
        console.log "golf",     golf[0],     golf[1]
        console.log "placaX",   placaX[0],   placaX[1]
        console.log "placaY",   placaY[0],   placaY[1]
        console.log "placaZ",   placaZ[0],   placaZ[1]
        console.log "chegada",  chegada[0],  chegada[1]

    def tempo
        "TEMPO FINAL: {chegada[0] - largada[0]}" - "{chegada[1] - largada[1]}"