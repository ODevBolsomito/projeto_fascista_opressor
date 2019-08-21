tag Search < input
    def mount
        dom.focus

    def render
        <self>

tag Option < li
    attr aria-selected
    prop value
    prop name
    prop mouse_over default: false
    prop selected default: false


    def mount
        aria-selected="{selected}"

    def onmouseover
        mouse_over=true

    def onmouseout
        mouse_over=false

    def render
        <self 
            .select2-results__option 
            .select2-results__option--highlighted=(mouse_over or selected)
        >
            name


export tag Select
    attr multiple
    prop default
    prop options
    prop values
    prop selection
    prop placeholder
    prop show_dropdown
    prop default_value
    prop onchange
    prop boundings
    prop filter default: ''

    def mount
        selection = default_value
        boundings = dom.getBoundingClientRect

    def toggle_dropdown
        let els = document.getElementsByClassName('select-backdrop')
        Array.from(els).forEach do |el|
            el.click
        show_dropdown = !show_dropdown
        render

    def selectOption val
        if multiple
            selection ||= []
            if selection.includes val
                var index = selection.indexOf(val)
                selection.splice(index, 1) if (index !== -1)
            else
                selection.push val
        else
            selection = val
        trigger('change', selection)

        show_dropdown = false

    def checkSelection val
        if multiple
            selection.includes(val)
        else
            selection == val

    def changeFilter e
        filter = e.event:target:value

    def matchFilter opt
        opt and opt.toString.toLowerCase.includes filter.toLowerCase

    def closeDropdown e
        if e.event:target:classList.contains('select-backdrop')
            let els = document.getElementsByClassName('select-backdrop')
            show_dropdown = no
            Array.from(els).forEach do |el|
                el.click

    def render  
        return unless options
        <self>
            <span :tap.toggle_dropdown 
                .select2 
                .select2-container 
                .select2-container--default 
                .select2-container--below 
                .select2-container--focus style="width: 100%;">
                <span .selection>
                    <span .select2-selection .select2-selection--single>
                        <span .select2-selection__rendered #select2-wfcr-container title="Scion">
                            options[values.indexOf(selection or default_value)] or (default and default:name) or placeholder or "Selecione"
                        <span .select2-selection__arrow role="presentation">
                            <b role="presentation">
                <span .dropdown-wrapper>

            if show_dropdown
                <div .select-backdrop :tap.closeDropdown>
                <span 
                    .select2-container 
                    .select2-container--default 
                    .select2-container--open 
                    style="position: absolute; top: {dom:offsetTop + boundings:height}px; left: {dom:offsetLeft}px;">
                    <span 
                        .select2-dropdown 
                        .select2-dropdown--below 
                        style="width: auto; min-width: {boundings:width}px; position: relative;">
                        <span .select2-search .select2-search--dropdown>
                            <Search :keyup.changeFilter .select2-search__field>
                        <span .select2-results>
                            <ul .select2-results__options>
                                if default
                                    <Option 
                                        name=(default:name) 
                                        value=(default:value) 
                                        selected=(checkSelection(null)) 
                                        :tap=(do selectOption(null))>
                                for opt, i in options
                                    if matchFilter(opt)
                                        <Option 
                                            name=(opt) 
                                            value=(values[i]) 
                                            selected=(checkSelection(values[i])) 
                                            :tap=(do selectOption(values[i]))>


