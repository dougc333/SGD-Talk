


const c = document.getElementById('mygraph');
const ctx = c.getContext('2d');
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(window.innerHeight, window.innerWidth)
ctx.stroke();


function getAsynchData("http://localhost:8000/data",callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const foo = callback(this.responseText);
            console.log(foo);
        }
    };
    xhttp.open("GET", "http://localhost:8000/data", true);
    xhttp.send();
}
