export function debounce(fn, wait=300){
    let timer;
   return function(...args){
     if(timer) {
        clearTimeout(timer); // clear any pre-existing timer
     }
     const context = this; // get the current context
     timer = setTimeout(()=>{
        fn.apply(context, args); // call the function if time expires
     }, wait);
   }
}

export function throttle(fn, wait=300){
    let throttled = false;
    return function(...args){
        if(!throttled){
            fn.apply(this,args);
            throttled = true;
            setTimeout(()=>{
                throttled = false;
            }, wait);
        }
    }
}

export function clamp(num, min=0, max=100) { return Math.min(Math.max(num, min), max) }