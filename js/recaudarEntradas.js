// gestión de venta de unidades
document.getElementById('recaudar').onclick = function() {

    let beneficioTotal = opener.objPartida.recaudacion - 200;

    opener.objPartida.saldo += beneficioTotal;    

    opener.objPartida.recaudacion = 0;

    opener.msg('success', 'Has ingresado ' + beneficioTotal + '$');

    window.close();

}