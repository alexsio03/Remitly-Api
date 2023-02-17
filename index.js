console.log("Hello World");
fetch('http://api.nbp.pl/api/exchangerates/rates/a/gbp/?format=json').then(res => {
    console.log(res);
})