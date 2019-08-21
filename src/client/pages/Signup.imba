import State from '../State'

const axios = require('axios')

export tag Signup
    prop email
    prop password
    prop nome
    prop actions
    prop loading

    def signup
        let response = await axios
            url: "http://localhost:9000/signup"
            method: 'post'
            data: 
                email: email
                password: password
                nome: nome

        if response:data
            if response:data:errors
                State:errors = [*State:errors, *response:data:errors]
            else
                State:success = [*State:success, 'Registrado com sucesso!']
                window:location.assign "/#/login"

        elif response:response
            State:errors = [*State:errors, response:response:data:errors]


    def toggle_actions
        actions = !actions

    def render
        <self> 
            <div .login>
                <div .login__block .active>
                    <div .login__block__header >
                        <i .zmdi .zmdi-account-circle>
                        "Olá! Por favor cadastre-se"

                        <div .actions .actions--inverse .login__block__actions :tap.toggle_actions>
                            <div .dropdown=(!actions) .dropdown_show=(actions)>
                                <i data-toggle="dropdown" .zmdi .zmdi-more-vert .actions__item>
                                <div .dropdown-menu .dropdown-menu-right .login-actions .show=(actions)>
                                    <a .dropdown-item :tap=(do window:location.assign '#/login')>
                                        "Login"

                    <div .login__block__body>

                        <div .form-group>
                            <input[nome] :keypress.enter.signup type="text" .form-control .text-center placeholder="User Name">

                        <div .form-group>
                            <input[email] :keypress.enter.signup type="email" .form-control .text-center placeholder="Email">

                        <div .form-group>
                            <input[password] :keypress.enter.signup type="password" .form-control .text-center placeholder="Password">

                        <a :tap.signup .btn .btn--icon .login__block__btn>
                            if loading
                                <i .zmdi .zmdi-spinner .zmdi-hc-spin>
                            else
                                <i .zmdi .zmdi-long-arrow-right>