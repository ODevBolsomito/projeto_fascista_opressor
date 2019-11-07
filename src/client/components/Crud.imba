import Form from './Form'

export tag Crud
    prop model
    prop sort
    prop records
    prop target

    def mount
        sync

    def formClose
        target = null

    def sync
        records = await model.all
        render

    def actionNew
        target = (model).new

    def actionDestroy record
        await record.destroy
        sync

    def actionEdit record
        target = record
        sync

    def render
        <self>
            if target
                <Form 
                    :close.formClose
                    :update.sync
                    :create.sync
                    target=target 
                    model=model
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
                                    " Adicionar {model:name}"
                                <div .table-content>
                                    <table .table .dataTable>
                                        <thead>
                                            <tr>

                                                for own field, config of model.fields
                                                    <th>
                                                        config:human_name
                                                <th .table-action> 
                                                    <a .zmdi .zmdi-delete>
                                                <th .table-action> 
                                                    <a .zmdi .zmdi-edit>
                                        <tbody>
                                            for record in records
                                                <tr .main_table_tr>
                                                    for own field, config of model.fields
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
                                                        <td :tap.trigger(:select, record) style="min-width: {cell and cell:length * 13}px">
                                                            cell
                                                    <td .table-action .table-action-destroy  title="Excluir" :tap=(do actionDestroy record)>
                                                        <a .zmdi .zmdi-delete>
                                                    <td .table-action .table-action-update title="Editar" :tap=(do actionEdit record)>
                                                        <a .zmdi .zmdi-edit>