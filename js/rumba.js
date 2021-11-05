    function chan(srcname) {
        var sr = srcname;
        document.getElementById("fg").src = srcname.replace('index.html', 'align.png').replace('http://rumba.space/', '');
        const regex = /item_\d+\/index.html/i;
        document.getElementById("bg").src = srcname.replace(regex, 'align.png').replace('http://rumba.space/', '');
        updateQueryStringParameter(window.location.href, "Song", encodeURIComponent(srcname))
    };

    function loadSong() {
        songname = getParameterByName('song');
        console.log(songname);
        if(songname != null){
            item = parseInt(songname.substring(songname.length - 2)).toString();
            seg = songname.substring(0, songname.length - 3);
            loc = seg + "/item_" + item + "/index.html";
            $('#rumbai').attr('src', loc);
        }
    };

    function updateQueryStringParameter(uri, key, value) {
        var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        } else {
            return uri + separator + key + "=" + value;
        }
    };

    function getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    };
    $(function() {
        $('button').on('click', function() {
            var rt = $("#RT option:selected").attr('value');
            var ts = $("#TS option:selected").attr('value');
            var tn = $("#TN option:selected").attr('value');
            var myTimeout = null;
            var seg = rt + ts + '/item_' + tn + '/';
            var src = seg + 'index.html';
            var srca = seg + 'audio.wav';
            var srci = seg + 'align.png';
            var srcalbi = rt + ts + '/align.png';

            // first we de-attach and re-attach an event load
            $('iframe[name="content"]').off('load').on('load', function() {
                myTimeout = setTimeout(function() {
                    clearTimeout(myTimeout);
                    $('iframe[name="content"]').off('load');

                    // you see, we concat '/admin' to the src
                    $('iframe[name="content"]').attr('src', src);
                    $('img[name="bg"]').attr('src', srcalbi);


                }, 1000);

            });

            // this will change the iframe src and load the page, triggering the iframe load event
            $('iframe[name="content"]').attr('src', src);

        });

    });
   