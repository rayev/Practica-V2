var objPartida = {
    iniciada: false,
    saldo: 13000,
    recaudacion: 0,
    visitantes: 0,
    detalles: {},
    parque: [],
    objHoraJugarSorteo: "",
    objHoraProximoSorteo: ""
};



// Ejecución paneles
document.getElementById('nuevaPartida').onclick = function (){ 

    if (!objPartida.iniciada) {

        open("paneles/nuevapartida.html", 'Nueva partida', 'scrollbars=yes,width=700,height=700,toolbar=yes');

    } else {

        msg('error', 'Ya has iniciado una partida previamente, no es posible crear una nueva partida');       
    }
}




document.getElementById('recaudarCaja').onclick = function (){ 

    if (objPartida.iniciada) {

        let ventana = window.open("paneles/recaudarEntradas.html", 'Recaudar Caja', 'scrollbars=yes,width=500,height=400'); 

    } else {

        msg('error', 'Imposible recaudar entradas: inicia una partida antes');
    }
}




let celdas = document.getElementsByClassName('celda');

for (let cadaCelda of celdas) {

    cadaCelda.onclick = function(){

        if (objPartida.iniciada) {

            if (cadaCelda.dataset.edificio === "vacia") {

                let edificios = open("paneles/nuevoEdificio.html", 'Crear', 'scrollbars=yes,width=500,height=800');
                
                edificios.onload = function() {

                    edificios.document.getElementById('numeroCelda').textContent = cadaCelda.dataset.celda;
                }

            } else {

                msg('error', 'Casilla ya edificada, ¡elige otra!');                    
            }
        
        } else {
            
            msg('error', 'Inicia una partida para edificar');       
        }
    }
}





// intervalo de actualización

let actualizador = setInterval( function(){    

    if (objPartida.iniciada) {

        for (let edificio of objPartida.parque) {

            if (edificio.tipo === 'atraccion') {

                objPartida.visitantes += Number(edificio.visitantes);
                objPartida.recaudacion += edificio.visitantes * .5;
            }

            if (edificio.tipo === 'puesto') {

                objPartida.saldo += Number(edificio.ingresos);
            }
        }

        document.getElementById('contadorEdificios').textContent = objPartida.parque.length + " edificio/s";
        document.getElementById('contadorVisitantes').textContent = objPartida.visitantes + " visitantes";
        document.getElementById('contadorRecaudacion').textContent = objPartida.recaudacion + "$ en entradas";
        document.getElementById('contadorSaldoActual').textContent = objPartida.saldo + "$";
    }

}, 100); 