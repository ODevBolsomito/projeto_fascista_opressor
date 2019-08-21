import State from './State'

import Login         from './pages/Login'
import Signup        from './pages/Signup'
import Competicoes   from './pages/Competicoes'

import Placar   from './pages/Placar'
import Equipes   from './pages/Equipes'

import Sidebar from './components/Sidebar'
import Header  from './components/Header'
import Alert   from './components/Alert'

tag App
    def handle_url url
        if State:user
            window:location.assign '#'+url.replace(/\#/g, '')
        elif url != '#/signup'
            window:location.assign '#/login'

    def render
        handle_url window:location:hash
        <self .app style="min-height: {window:innerHeight};background-image: url(img/bg.jpg); background-size: cover; background-repeat: no-repeat;background-attachment: fixed;"> # 👎
            <main .main>
                for msg in State:errors
                    <Alert[{
                        message: msg,
                        position: "top-right", 
                        fade_out: "fadeOutRight", 
                        fade_in: "bounceIn", 
                        type: "danger"
                    }]>
                for msg in State:success
                    <Alert[{
                        message: msg,
                        position: "top-right", 
                        fade_out: "fadeOutRight", 
                        fade_in: "bounceIn", 
                        type: "success"
                    }]>
                if window:location:hash == "#/login"
                    <Login>  
                elif window:location:hash == "#/signup"
                    <Signup> 
                elif window:location:hash == "#/competicoes"
                    <Competicoes>
                else
                    <Header :toggle_sidebar=(do @sidebar = not @sidebar)>
                    <Sidebar :close=(do @sidebar = false) toggle=@sidebar>
                    <section .content>
                        <Placar>  if ['#/', '#/placar'].includes window:location:hash
                        <Equipes> if ['#/equipes'].includes window:location:hash
            
Imba.mount <App>