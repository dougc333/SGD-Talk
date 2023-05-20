

onmessage = (event) => {
    const { data } = event;
    const primes = findPrimeNumbers(parseInt(data));
    postMessage(primes);
};



function findPrimeNumbers(max) {
    return new Promise((resolve) => {
        console.log("starting findPrimeNumbers");
        let primes = [];
        for (let i = 0; i < max; i++) {
            if (i === 0 || i === 1) {
                continue;
            }
            let isPrime = true;
            for (let y = 2; y < i; ++y) {
                if (i % y === 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) {
                primes.push(i);
            }
        }
        console.log("prime numbers found");
        resolve(primes);
    });
}

