import Resultado from '../models/Resultado'
import Equipe from '../models/Equipe'
import Select from '../components/Select'

export tag Placar
    def render
        <self .fadeIn .animated>
            <header .content__title>
                <h1>
                    "Placar"

            <div .card>
                <div .card-body>
                    <IniciarPercurso>
                    <Tabela>

tag IniciarPercurso
    prop equipes
    prop letras default: ['A', 'B', 'C']
    prop letra_selecionada
    prop equipe_selecionada
    prop loading default: true

    def mount
        equipes = await Equipe.all
        @loading = false

    def changeEquipe e
        equipe_selecionada = e.data

    def changeLetra e
        letra_selecionada = e.data

    def iniciarPercurso
        let res = await Resultado.create
            letra: letra_selecionada
            equipe: equipe_selecionada

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
                <Select :change.changeLetra
                    default=({name: 'LETRA', value: null})
                    options=(letras) 
                    values=(letras)
                >
            <div .col>
                <button type="button" .btn .btn-link .button-add-record :tap.iniciarPercurso>
                    " INICIAR "
                    <i .zmdi .zmdi-hc-1x .zmdi-play>


tag Tabela
    prop resultados

    def mount
        schedule interval: 600
        resultados = await Resultado.all
        render

    def tick
        resultados = await Resultado.all
        render

    def render
        <self .table-responsive>
            <div #data-table_wrapper .dataTables_wrapper .no-footer>
                <div .table-content>
                    <table .table .table-bordered .mb-0>
                        <thead>
                            <tr>
                                for own field, config of Resultado.placar_fields
                                    <th>
                                        config:human_name
                                <th>
                        <tbody>
                            for record in resultados
                                <tr .main_table_tr>
                                    for own field, config of Resultado.placar_fields
                                        let cell = null
                                        if config:foreign_key
                                            cell = (do try return record[field][config:main_field])()
                                        else
                                            if config:type == :Date
                                                cell = (do try return formatDate(record[field]))()
                                            elif config:type == :DateTime
                                                cell = (do try return formatDateTime(record[field]))()
                                            else
                                                cell = (do try return record[field])()
                                        <td style="min-width: {cell and cell:length * 13}px">
                                            cell
                                    <td .table-action-destroy title='Cancelar' :tap=(do (record).destroy)>
                                        <i .zmdi .zmdi-hc-1x .zmdi-delete>