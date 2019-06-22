function sumNotPrime(x, n){
    var sum = 0;
    for(var i = x; i <= n; i++){
        for(var j = 2; j < i; j++){
            if( i % j === 0){
                sum = sum + i;
                break;
            }
        }
    }
    var z = 2;
    var count = 0;
    for(var i = x; i <= n; i++){
        var count = 0;
        for(var j = 2; j < i; j++){
            if( i % j === 0){
                break;
                }
            else{
                count += 1;
            }
            if(count === (i-2)){ 
                z = z + " " + i.toString();   
        }
        }
    }
     console.log("Niza na prosti broevi e: " + z);   
     console.log("Suma na Neprosti broevi e " + sum);
}
sumNotPrime(1, 30);