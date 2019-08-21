import Equipe from '../models/Equipe'
import Crud from '../components/Crud'

export tag Equipes
    def render
        <self .fadeIn .animated>
            <header .content__title>
                <h1>
                    "Equipes"
            <Crud model=Equipe>