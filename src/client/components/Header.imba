export tag Header
    def mount
        window:addEventListener('scroll' do render)

    def unmount
        window:removeEventListener('scroll' do render)

    def toggle_sidebar
        trigger :toggle_sidebar

    def render
        <self>
            <header .header .header--scrolled=(window:scrollY)>
                <div .navigation-trigger .hidden-xl-up :tap.toggle_sidebar>
                    <i .zmdi .zmdi-menu>

                <div .logo .hidden-sm-down>
                    <h1>
                        <a>
                            "CCDC"