import Equipe from '../models/Equipe'
import State from '../State'

export tag Equipes
    def render
        <self .fadeIn .animated>
            <header .content__title>
                <h1>
                    "Equipes"
            <Crud>

tag Crud
    prop sort
    prop equipes
    prop target

    def mount
        sync

    def formClose
        target = null

    def sync
        equipes = await Equipe.all
        render

    def actionNew
        target = Equipe.new({competicaoId: State:competicao:id})

    def actionDestroy record
        await record.destroy
        sync

    def actionEdit record
        target = record

    def select rec
        trigger :select, rec

    def render
        <self>
            if target
                <Form 
                    :close.formClose
                    :update.sync
                    :create.sync
                    target=target 
                >
            <header .content__title>
                    <h1> 
                        title
                <div .card>
                    <div .card-body>
                        <div .table-responsive>
                            <div #data-table_wrapper .dataTables_wrapper .no-footer>
                                <button type="button" .btn .btn-link .button-add-record :tap.actionNew>
                                    <i .zmdi .zmdi-plus>
                                    " Adicionar {Equipe:name}"
                                <div .table-content>
                                    <table .table .dataTable>
                                        <thead>
                                            <tr>
                                                <th>
                                                    "Nome"
                                                <th .table-action> 
                                                    <a .zmdi .zmdi-delete>
                                                <th .table-action> 
                                                    <a .zmdi .zmdi-edit>
                                        <tbody>
                                            for equipe in equipes
                                                <tr :tap.select(equipe) .main_table_tr>
                                                    <td>
                                                        equipe:nome 
                                                    <td .table-action .table-action-destroy  title="Excluir" :tap.actionDestroy(equipe)>
                                                        <a .zmdi .zmdi-delete>
                                                    <td .table-action .table-action-update title="Editar" :tap.actionEdit(equipe)>
                                                        <a .zmdi .zmdi-edit>

tag Form
    prop target
    prop action
    prop loading
    prop errors default: {}

    def close_modal
        @closing = yes
        Imba.setTimeout 500, do
            target = null
            @closing = no
            trigger :close

    def clickOut e
        if e.event:target:classList.contains('modal')
            close_modal

    def submit
        loading = true
        if target:id 
            trigger :update, (await target.save)
        else
            trigger :create, (await target.save)
        loading = false
        close_modal

    def render
        <self>
            <div :mousedown.clickOut .modal .fadeIn .animated .show style="display: block;">
                <div .modal-dialog>
                    <div .modal-content .model-form-content .animated .fadeInUp .fadeOutDown=(@closing)>
                        <div .modal-header>
                            <h5 .modal-title>
                                (target:id ? 'Atualizar ' : 'Criar ') + "Equipe"
                        <div .modal-body>
                            <div .card>
                                <div .card-body>
                                    <form :submit.prevent>
                                        <div .form-row>
                                            <div .col>
                                                <div .form-group>
                                                    <label>
                                                        "Nome"
                                                    <input[target:nome] .form-control .form-control-lg placeholder="Nome" type="text">

                                                    if errors:nome
                                                        <small .validation-error>
                                                            errors:nome
                        <div .modal-footer>
                            <button type="button" .btn .btn-link :tap.submit>
                                target:id ? 'Atualizar ' : 'Criar '
                                if loading
                                    <i .zmdi .zmdi-spinner .zmdi-hc-spin>
                            <button type="button" .btn .btn-link :tap.close_modal>
                                'Cancelar'