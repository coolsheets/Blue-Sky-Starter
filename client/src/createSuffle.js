function createSuffle($parentEl, images) {

    const parentWidth = $parentEl.width();
    const parentHeight = $parentEl.height();
    
    for (let i = 0; i < images.length; i++) {
    
        const shuffleHtml = 
            '<div id="shuffle' + (i + 1) + '" class="shuffle">' +
            '    <img id="img' + (i + 1) + '" class="photo" />' +
            '    <img src="Images/shuffle_2.png" class="shuffle_photo" />' +
            '</div>';
    
        $parentEl.append(shuffleHtml);
        const $shuffle = $('#shuffle' + (i + 1));
        const $img = $('#img' + (i + 1));
    
        const width = $shuffle.width();
        const height = $shuffle.height();
    
        $img.attr('src', images[i]);
        $shuffle.css('z-index', 1000);
    }
    for (let i = 0; i < images.length; i++) {
        const $el = $('#shuffle' + (i + 1));
        const windowWidth = $(window).width();
        const windowHeight = $(window).height();
        const offset = (windowWidth - windowHeight) / 2;
        const width = $el.width();
        const height = $el.height();
        const rotation = Math.random() * maxRotationAngle * 2 - maxRotationAngle;
        const left = offset + Math.random() * (parentHeight - width);
        const top = Math.random() * (parentHeight - height);
        // ...
    }
    for (const i = 0; i < images.length; i++) {
        // ...
        shuffles[i] = new shuffle(i + 1, $el, $parentEl, minScale, 
                       rotation, left, top, width / 2, height / 2, i);
    }
}

function shuffleid(id, $el, $parentEl, scale, rotation, left, 
    top, xTransOrigin, yTransOrigin, zIndex) {
this.id = id;
this.$el = $el;
this.$parentEl = $parentEl;
this.scale = scale;
this.rotation = rotation;
this.originalScale = scale;
this.originalRotation = rotation;
this.originalLeft = left;
this.originalTop = top;
this.originalZIndex = zIndex;
this.startRotation = rotation;
this.left = left;
this.top = top;
this.xTransOrigin = xTransOrigin
this.yTransOrigin = yTransOrigin;
this.interval = null;
this.isMoving = false;
this.zIndex = zIndex;
this.xOffset = 0;
this.yOffset = 0;
}