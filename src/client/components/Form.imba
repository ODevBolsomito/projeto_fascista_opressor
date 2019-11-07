export tag Form
    prop target
    prop model
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
                                (target:id ? 'Atualizar ' : 'Criar ') + "{model:name}"
                        <div .modal-body>
                            <div .card>
                                <div .card-body>
                                    <form :submit.prevent>
                                        for own col_name, col_config of model.inputs
                                            <div .form-row>
                                                <div .col>
                                                    <div .form-group>
                                                        <label>
                                                            col_config:human_name
                                                        if model.inputs[col_name]:type == :String
                                                            <input[target[col_name]] .form-control .form-control-lg placeholder=col_config:human_name type="text">
                                                        elif model.inputs[col_name]:type == :Number   
                                                            <input[target[col_name]] .form-control .form-control-lg placeholder=col_config:human_name type="number">
                                                        elif model.inputs[col_name]:type == :Password
                                                            <input[target[col_name]] .form-control .form-control-lg placeholder=col_config:human_name type="password">
                                                        # elif model.inputs[col_name]:foreign_key
                                                        #     <Select 
                                                        #         :change=(do |e| selectOption(e, model.inputs[col_name]:foreign_key)) 
                                                        #         options=(nested_options[col].map do |rec| rec[model.inputs[col_name]:main_field]) 
                                                        #         values=(nested_options[col].map do |rec| rec:id)
                                                        #         selection=( target[model.inputs[col_name]:foreign_key] )
                                                        #     >

                                                        if errors[col_name]
                                                            <small .validation-error>
                                                                errors[col_name]
                        <div .modal-footer>
                            <button type="button" .btn .btn-link :tap.submit>
                                target:id ? 'Atualizar ' : 'Criar '
                                if loading
                                    <i .zmdi .zmdi-spinner .zmdi-hc-spin>
                            <button type="button" .btn .btn-link :tap.close_modal>
                                'Cancelar'