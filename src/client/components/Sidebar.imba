import State from '../State'

export tag Sidebar

    prop toggle
    prop user_actions
    prop current_page default: :dashboard

    def toogle_user_actions
        user_actions = !user_actions

    def logout
        State:user = no
        window:sessionStorage.setItem('user', State:user)
        window:location.assign '/'

    def change_page page
        current_page = page
        window:location.assign "/#/{page}"

    def close
        trigger :close

    def render
        console.log State:competicao
        <self>
            <div :tap.close .sa-backdrop> if toggle
            <aside .sidebar .toggled=(toggle)>
                <div .scrollbar-inner>

                    <div .user :tap.toogle_user_actions>
                        <div .user__info data-toggle="dropdown">
                            <div>
                                <div .user__data style='font-size: 15'>
                                    (do try return State:competicao:nome)()
                                <div .user__name>
                                    (do try return State:user:nome)()
                                <div .user__data>
                                    (do try return State:user:email)()
                            
                        <div .dropdown-menu .show=(user_actions)>
                            <a :tap.logout .dropdown-item>
                                "Sair"

                    <ul .navigation>
                        <li .navigation__active=(current_page == :placar)>
                            <a :tap=(do change_page(:placar))>
                                <i .zmdi .zmdi-chart>
                                " Placar"

                        <li .navigation__active=(current_page == :equipes)>
                            <a :tap=(do change_page(:equipes))>
                                <i .zmdi .zmdi-format-list-bulleted>
                                " Equipes"

                        <li .navigation__active=(current_page == :competicoes)>
                            <a :tap=(do change_page(:competicoes))>
                                <i .zmdi .zmdi-local-bar>
                                " Competições"
                                