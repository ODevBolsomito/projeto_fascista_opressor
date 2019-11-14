import Resultado from '../models/Resultado'
import Equipe from '../models/Equipe'
import Select from '../components/Select'
import State from '../State'


var mili_sec = {
    mili: 0
    sec: 0
}

export tag Resultados
    prop equipes
    prop equipe_selecionada
    prop loading default: true

    def mount
        equipes = await Equipe.all
        @loading = false
        render

    def render
        <self .fadeIn .animated>
            <header .content__title>
                <h1>
                    "Resultados"

            <div .card>
                <div .card-body>
                    <IniciarPercurso equipes=equipes loading=loading>
                    <Tabela equipes=equipes>

tag IniciarPercurso
    prop equipes
    prop equipe_selecionada
    prop loading default: true

    def changeEquipe e
        equipe_selecionada = e.data

    def iniciarPercurso
        await Resultado.create({equipeId: equipe_selecionada})

    def render
        <self .row>
            <div .col>
                unless loading
                    <Select :change.changeEquipe
                        default=({name: 'EQUIPE', value: null})
                        options=(equipes.map do |e| e:nome ) 
                        values=(equipes.map do |e| e:id )
                    >
            <div .col>
                <button type="button" .btn .btn-link .button-add-record :tap.iniciarPercurso>
                    " INICIAR "
                    <i .zmdi .zmdi-hc-1x .zmdi-play>

tag Tabela
    prop resultados
    prop equipes
    prop loading
    prop counter

    prop show_counter

    def mount
        resultados = (await Resultado.all).filter(|r| r:competicaoId = State:competicao:id)
        Imba.setInterval(600, &) do
            resultados = (await Resultado.all).filter(|r| r:competicaoId = State:competicao:id)
        render


    def equipeFrom res
        (equipes or []).find do |e|
            e:id == res:equipeId


    def pontuacaoFrom res
        (res:arco1  and 10 or 0) +      
        (res:arco2  and 10 or 0) +      
        (res:placa1 and 10 or 0) +       
        (res:placa2 and 10 or 0) +       
        (res:golf   and 10 or 0)     


    def tempoFrom res
        if res:largada and res:chegada
            let chegada = JSON.parse(res:chegada)
            let largada = JSON.parse(res:largada)
            return "{(chegada - largada) / 1000}"
            

        elif res:largada
            unless show_counter
                counter = <Counter>
                show_counter=true
            return counter
        else
            "0.000"


    def render
        <self .table-responsive>
            <div #data-table_wrapper .dataTables_wrapper .no-footer>
                <div .table-content>
                    unless loading
                        <table .table .table-bordered .mb-0>
                            <thead>
                                <tr>
                                    <th>
                                        "Equipe"
                                    <th>
                                        "Pontuação"
                                    <th>
                                        "Tempo"
                                    <th>
                            <tbody>
                                for res, i in resultados
                                    <tr .main_table_tr>
                                        <td>
                                            (equipeFrom(res) or {}):nome
                                        <td>
                                            pontuacaoFrom(res)
                                        <td>
                                            tempoFrom(res)


                                        <td .table-action-destroy title='Cancelar' :tap=(do (res).destroy)>
                                            <i .zmdi .zmdi-hc-1x .zmdi-delete>

tag Counter
    def mount
        schedule interval: 10
        mili_sec = {
            sec: 0
            mili: 0
        }

    def tick
        mili_sec:mili+=10
        if mili_sec:mili > 999
            mili_sec:sec++
            mili_sec:mili = 0
        render

    def render
        <self>
            "{mili_sec:sec}.{mili_sec:mili}"