# ==== Fade In

# bounceIn
# bounceInDown
# bounceInLeft
# bounceInRight
# bounceInUp
# fadeIn
# fadeInDown
# fadeInDownBig
# fadeInLeft
# fadeInLeftBig
# fadeInRight
# fadeInRightBig
# fadeInUp
# fadeInUpBig
# flipInX
# flipInY
# lightSpeedIn
# rotateIn
# rotateInDownLeft
# rotateInDownRight
# rotateInUpLeft
# rotateInUpRight
# rollIn
# zoomIn
# zoomInDown
# zoomInLeft
# zoomInRight
# zoomInUp
# slideInDown
# slideInLeft
# slideInRight
# slideInUp

# ==== Fade Out

# bounceOut
# bounceOutDown
# bounceOutLeft
# bounceOutRight
# bounceOutUp
# fadeOut
# fadeOutDown
# fadeOutDownBig
# fadeOutLeft
# fadeOutLeftBig
# fadeOutRight
# fadeOutRightBig
# fadeOutUp
# fadeOutUpBig
# flipOutX
# flipOutY
# lightSpeedOut
# rotateOut
# rotateOutDownLeft
# rotateOutDownRight
# rotateOutUpLeft
# rotateOutUpRight
# rollOut
# zoomOut
# zoomOutDown
# zoomOutLeft
# zoomOutRight
# zoomOutUp
# slideOutDown
# slideOutLeft
# slideOutRight
# slideOutUp

# === Positions

# top
# top-left
# top-right
# bottom
# bottom-left
# bottom-right


var count = 0
var y_position = [15]

export tag Alert

    prop fading
    prop step
    prop top
    prop bottom
    prop index
    prop life
    prop position
    prop fade_out
    prop fade_in
    prop type

    def build
        y_position[count+1] = count * 70 + 15
        count++
        @index = count
        @step = 0
        @fade_out = no

    def mount
        @life     = data:life     or 5000
        @position = data:position or "top-right"
        @fade_out = data:fade_out or "slideOutUp"
        @fade_in  = data:fade_in  or "slideInDown"
        @type     = data:type

        if position.includes("top")
            top =    index === 1 ? 15 : index * 70 - 55
            bottom = no
        if position.includes("bottom")
            bottom = index === 1 ? 15 : index * 70 - 55
            top = no

        schedule interval: 1

    def unmount
        if index == count
            count = 0
        dequeue
        unschedule

    def dequeue
        y_position = y_position.map do |y, i|
            i > index ? y - 70 : y
        
        for y, i in y_position
            break if i > 1 and y > 15
            if y_position:length - 1 == i
                y_position = [15] 

    def tick
        if step == parseInt(life/4)
            fading = yes 
            unmount

        step++
        render

    def close
        fading = yes
        unmount

    def render
        <self 
              .alert 
              .alert--notify 
              .animated
              .alert-dismissible 
              .alert-inverse 
              .{"alert-{position}"}
              .{fade_out if fading}
              .{fade_in}
              .{"alert-{type}" if type}
              style="{top ? "top: {top}px" : "bottom: {bottom}px"}"
        >
            <span data-notify="message">
                data:message
            <a>
                <button .close .btn .btn-sm .btn-light type="button" >
                    <span :tap.close>
                        "×"