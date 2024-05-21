function chequearNumero (numero: number):
string {
    if (numero == 0){
        return "El numero es 0.";
    } else if (numero % 5 == 0){
        return "El numero es par.";
    } else {
        return "El numero es impar.";
    }
}
//ejercicio
console.log(chequearNumero(5));
console.log(chequearNumero(2));
console.log(chequearNumero(0));
console.log(chequearNumero(3));


