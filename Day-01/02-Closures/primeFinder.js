/*Part - 1*/
function getPrimeFinder(){
    var cache = {};
    function findPrime(n){
        if (typeof cache[n] !== "undefined")
            return cache[n];
        console.log("processing");
        if (n <= 3){
            cache[n]= true;
        } else {
            cache[n] = true;
            for(var i=2; i <= (n/2); i++)
                if (n % i === 0) {
                    cache[n] = false;
                    break;
                }
        }
        return cache[n];
    }
    return findPrime;
}
/* **************** */
/* Part - 2*/
function getPrimeFinder(){

    var cache = {};

    function isPrime(n){
        console.log("processing");
        if (n <= 3) return true;
        for(var i=2; i <= (n/2); i++)
            if (n % i === 0) return false;
        return true;
    }
    return function(n){
        if (typeof cache[n] === "undefined")
            cache[n] = isPrime(n);
        return cache[n];
    }
}


function memorize(fn){
    var cache = {};
    return function(n){
        if (typeof cache[n] === "undefined")
            cache[n] = fn(n);
        return cache[n];
    }
}


function isPrime(n){
        console.log("processing");
        if (n <= 3) return true;
        for(var i=2; i <= (n/2); i++)
            if (n % i === 0) return false;
        return true;
    }

var cachedPrime = memorize(isPrime);

function isOddOrEven(n){
    console.log("processing");
    return n % 2 === 0 ? "even" : "odd";
}
var cachedOddEvenFinder = memorize(isOddOrEven);

/* ****************** */
/* Part - 3 */
function memorize(fn){
    var cache = {};
    return function(){
        var key = window.JSON.stringify(arguments);
        if (typeof cache[key] === "undefined")
            cache[key] = fn.apply(this,arguments);
        return cache[key];
    }
}


/* ************** */
/* Part - 4 */
function memorize(fn, keyGeneratorFn){
    var cache = {};
    return function(){
        var key = keyGeneratorFn.apply(this,arguments);
        if (typeof cache[key] === "undefined")
            cache[key] = fn.apply(this,arguments);
        return cache[key];
    }
}

var JSONKeyGernerator = function(){
    return window.JSON.stringify(arguments);
}

var add = function(x,y){
    console.log("processing");
    return x + y;
};

var cachedAdd = memorize(add, JSONKeyGernerator);
