//window.onload = function() {
  //  document.getElementById("audio.wav").play();
//};
async function fetchAsync(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
};
var audio = document.getElementById('audio.wav');
function aOP(track) {
    fetchAsync('align.json')
        .then(data => animateLyrics(data, track, this))
        .catch(reason => console.log(reason.message))
}


function animateLyrics(data, track, audio) {
    var animate = setInterval(function() {
        var time = Math.floor(audio.currentTime * 1722 / audio.duration);
        if (!(time == 0 || time == 1722)) {
            console.log(time);
            changeColor(data, track, audio, time);
        }
        if (audio.paused) {
            clearInterval(animate);
        }
    }, 50);
}

function changeColor(data, track, audio, time) {
    colors = data[time]
    for (i = 0; i < colors.length; i++) {
        character = document.getElementById(track + '/' + i.toString());
        c1 = Math.min(9 + 5 * colors[i], 127).toString();
        c2 = Math.min(9 + 10 * colors[i], 255).toString();
        rc = c1;
        gc = 10;
        bc = 10;
        character.style.color = 'rgb(' + rc + ',' + gc + ',' + bc + ')';
    }
}