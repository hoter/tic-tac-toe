function bindReady(handler) {
    var called = false

    function ready() { // (1)
        if (called) {
            return
        }    
        called = true
        handler()
    }

    if (document.addEventListener) { // (2)
        document.addEventListener('DOMContentLoaded', function() {
            ready()
        }, false )
    } 
    else if (document.attachEvent) {  // (3)
        // (3.1)
        if (document.documentElement.doScroll && window == window.top) {
            function tryScroll() {
                if (called) {
                    return
                }    
                if (!document.body) {
                    return
                }    
                try {
                    document.documentElement.doScroll('left')
                    ready()
                } 
                catch(e) {
                    setTimeout(tryScroll, 0)
                }
            }
            tryScroll()
        }

        // (3.2)
        document.attachEvent('onreadystatechange', function() {
            if (document.readyState === 'complete') {
                ready()
            }
        })
    }

	// (4)
    if (window.addEventListener)
        window.addEventListener('load', ready, false)
    else if (window.attachEvent)
        window.attachEvent('onload', ready)
}

readyList = []

function onReady(handler) {
    if (!readyList.length) {
        bindReady(function() {
            for (var i = 0; i < readyList.length; i++) {
                readyList[i]()
            }
        })
    }

    readyList.push(handler)
}

