import Resultado from '../models/Resultado'
import Equipe from '../models/Equipe'
import Select from '../components/Select'
import State from '../State'

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

    def mount
        schedule interval: 600
        resultados = (await Resultado.all).filter(|r| r:competicaoId = State:competicao:id)
        render

    def tick
        resultados = (await Resultado.all).filter(|r| r:competicaoId = State:competicao:id)
        render

    def equipeFrom res
        equipes.find do |e|
            e:id == res:equipeId


    def pontuacaoFrom res
        (res:arco1  and 10 or 0) +      
        (res:arco2  and 10 or 0) +      
        (res:placa1 and 10 or 0) +       
        (res:placa2 and 10 or 0) +       
        (res:golf   and 10 or 0)     


    def tempoFrom res
        res:largada

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
                                for res in resultados
                                    <tr .main_table_tr>
                                        <td>
                                            equipeFrom(res):nome
                                        <td>
                                            pontuacaoFrom(res)
                                        <td>
                                            tempoFrom(res)

                                        <td .table-action-destroy title='Cancelar' :tap=(do (res).destroy)>
                                            <i .zmdi .zmdi-hc-1x .zmdi-delete>