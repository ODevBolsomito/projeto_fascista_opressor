const axios = require('axios')

import State from '../State'

export tag Login
    prop email
    prop password
    prop actions
    prop loading

    def login
        try
            let response = await axios
                url: "http://localhost:9000/login"
                method: 'POST'
                data:
                    email: email
                    password: password


            if response:data
                State:user = response:data
                console.log response:headers['access-token']
                window:sessionStorage.setItem('token', response:headers['access-token'])
                window:sessionStorage.setItem('user', JSON.stringify(State:user))
                window:location.assign '#/competicoes'
        catch e
            if e:response
                State:errors = [*State:errors, e:response:data]

    def toggle_actions
        actions = !actions

    def render
        <self> 
            <div .login>
                <div .login__block .active>
                    <div .login__block__header >
                        <i .zmdi .zmdi-account-circle>
                        "Olá! Por favor entre"

                        <div .actions .actions--inverse .login__block__actions :tap.toggle_actions>
                            <div .dropdown=(!actions) .dropdown_show=(actions) >
                                <i data-toggle="dropdown" .zmdi .zmdi-more-vert .actions__item>
                                <div .dropdown-menu .dropdown-menu-right .login-actions .show=(actions)>
                                    <a .dropdown-item :tap=(do window:location.assign '#/signup')>
                                        "Create an account"

                    <div .login__block__body>
                        <div .form-group>
                            <input[email] :keypress.enter.login type="email" .form-control .text-center placeholder="User">

                        <div .form-group>
                            <input[password] :keypress.enter.login type="password" .form-control .text-center placeholder="Password">

                        <a :tap.login .btn .btn--icon .login__block__btn>
                            if loading
                                <i .zmdi .zmdi-spinner .zmdi-hc-spin>
                            else
                                <i .zmdi .zmdi-long-arrow-right>