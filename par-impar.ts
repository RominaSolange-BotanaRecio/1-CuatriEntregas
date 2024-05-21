function chequearNumero (numero: number):
string {
    if (numero == 0){
        return "El numero es 0.";
    } else if (numero % 2 == 0){
        return "El numero es par.";
    } else {
        return "El numero es impar.";
    }
}
//ejercicio
console.log(chequearNumero(7));
console.log(chequearNumero(4));
console.log(chequearNumero(0));



