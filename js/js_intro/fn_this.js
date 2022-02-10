//https://www.w3schools.com/js/js_this.asp#:~:text=In%20JavaScript%2C%20the%20this%20keyword%20refers%20to%20an,different%20objects%20depending%20on%20how%20it%20is%20used%3A


(function fn(){
    console.log(this)
})()

//this is undefined in browser