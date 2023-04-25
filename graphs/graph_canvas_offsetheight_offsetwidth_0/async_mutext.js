//https://stackoverflow.com/questions/73202786/does-this-javascript-example-create-race-conditions-to-the-extent-that-they
const lock = new WeakMap();
async function using(resource, then) {
  while (lock.has(resource)) {
    try {
      await lock.get(resource);
    } catch {}
  }

  const promise = Promise.resolve(then(resource));
  lock.set(resource, promise);

  try {
    return await promise;
  } finally {
    lock.delete(resource);
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

let x = 1;
const mutex = {};

async function foo() {
  await delay(500);
  await using(mutex, async () => {
    let y = x;
    await delay(500);
    x = y + 1;
  });
  await delay(500);
}

async function main() {
  console.log(`initial x = ${x}`);
  await Promise.all([foo(), foo(), foo()]);
  console.log(`final x = ${x}`);
}

main();