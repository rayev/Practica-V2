let txtError = "", txtPremio = "", nroPremiado, nroTerremoto, nroAJugar;
let objHoraJuegoSorteo;


document.getElementById('nuevoSorteo').onclick = function() {
//	let objHoraJuegoSorteo = new Date();

	if (objPartida.iniciada){

		if (objPartida.parque.length > 1) {

			//objPartida.objHoraJuegoSorteo = new Date();
			//funcion que devolvera si puede ha pasado una hora o no para poder jugar de nuevo.
			let puedeJugar = comprobarHora();

			if (puedeJugar){

				nroPremiado = Math.floor(Math.random() * 5) + 1;

				do {

					nroTerremoto = Math.floor(Math.random() * 5) + 1;

				} while (nroPremiado === nroTerremoto);

				console.log("El premio se encuentra tras la casilla " + nroPremiado + ", el terremoto tras la casilla " + nroTerremoto);

				nroAJugar = prompt("Introduzca elegir un número, entre 1 y 5...");
				nroAJugar = Number(nroAJugar);

				if (nroAJugar !== null && nroAJugar !== "") {

					if ( nroAJugar > 0 && nroAJugar < 6 ) {

						if ( nroAJugar === nroPremiado ){

							premio();
							success( txtPremio = "¡Enhorabuena!. Acabas de ganar 10.000$");

						} else if ( nroAJugar === nroTerremoto ) {

							terremoto();
							error( txtError = "Ohhhh El numero elegido ha provocado un terremoto que te ha destruido dos edificios....");

						} else {

							error( txtError = "¡ Te has quedado como estabas !. En 1 hora puedes volver a probar tu suerte..." );

						}

						// console.log(nroAJugar);
						// console.log(nroPremiado);	

					} else if (isNaN(nroAJugar) ){

							error( txtError = "Debe de introducir un número, no es valido otro caracter." );

						} else {
					
							error( txtError = 'Debe introducir un número entre 1 y 5' );
						}

				} else {

					error( txtError = 'Valor introducido incorrecto, vuelva intentarlo...' );

				}

				//Funcion para actualizar las horas nuevas del proximo juego.
				reiniciarHorasProximoSorteo();


			} else {

				error( txtError = "Debes esperar una hora entre un sorteo y otro. Podras participar de nuevo a partir las: " + objPartida.objHoraProximoSorteo.toLocaleTimeString() );

			}

		} else {

			error( txtError = 'Para participar en el sorteo debes tener al menos dos edificios construidos');

		}

	} else {

		error( txtError = 'Inicia una partida para poder particiar en el sorteo');

	}


}


//Funcion que comprueba si se ha jugado alguna vez y si no se ha jugado se permite jugar o si se ha jugado se comprueba si ha pasado una hora
function comprobarHora(){

	let puedeJugar;

	if(objPartida.esPrimerSorteo){
		puedeJugar = true;
		objPartida.esPrimerSorteo = false;
		return puedeJugar;
	}

	if ( new Date()  > objPartida.objHoraProximoSorteo){
		puedeJugar = true;
		return puedeJugar;
	}else {
		puedeJugar  = false;
		return puedeJugar;
	}

/*
	let juegoAhora = new Date();
	if(objPartida.objHoraProximoSorteo === "") {
		reiniciarHorasProximoSorteo(juegoAhora);
		objPartida.primerSorteo = true;
	}
	// let horaJugada = objPartida.objHoraJugadoSorteo.getHours()+objPartida.objHoraJugadoSorteo.getMinutes();
	// let proximaHora = objPartida.objHoraProximoSorteo.getHours()+objPartida.objHoraProximoSorteo.getMinutes();
	//if ( horaJugada > proximaHora || objPartida.objHoraProximoSorteo === "" ) {
	if ( juegoAhora > objPartida.objHoraProximoSorteo || objPartida.primerSorteo ) {
	//if (horaClick < objPartida.objHoraProximoSorteo) {
		objPartida.primerSorteo = false;
		puedeJugar = true;
		return puedeJugar;
	}else{
		puedeJugar = false;
		return puedeJugar;
	}
*/

	// if (objPartida.objHoraJugarSorteo.length == 0 || objPartida.objHoraJugarSorteo === "" || objPartida.objHoraJugarSorteo === null){

	// 	objPartida.objHoraJugarSorteo = new Date();
	// 	let tmp = new Date();
	// 	objPartida.objHoraProximoSorteo = new Date(tmp.setHours( tmp.getHours() + .01) );
	// 	puedeJugar = true;
	// 	return puedeJugar;

	// } else if (objHoraClick < objPartida.objHoraProximoSorteo){

	// 	puedeJugar = false;
	// 	return puedeJugar;

	// }
}


///Asignamos nueva hora a la varible que guarda la hora en que se ha jugado
function reiniciarHorasProximoSorteo(){
	objPartida.objHoraJugadoSorteo = new Date();;
	let tmp = new Date();
	//objPartida.objHoraProximoSorteo = new Date(tmp.setHours( tmp.getHours() + 1) );
	objPartida.objHoraProximoSorteo = new Date(tmp.setMinutes( tmp.getMinutes() + 2) );
}

function error(txt){
	msg('error', txt);
}


function success(txt) {
	msg('success', txt);
}


function premio(){

	// alert("hola premio");
	objPartida.saldo = (10000 + objPartida.saldo);
	document.getElementById('contadorSaldoActual').textContent = objPartida.saldo + "$";
}


function terremoto(){

	let celdasEdificadas = [], celdasDestruir = [];
	alert("hola terremoto");
	const celdasMapa = document.querySelectorAll('.celda');

	let celdas = document.querySelectorAll('.celda');

	for (let celda of celdas) {

		for (var x = 0; x < 2; x++) {
			if (objPartida.parque[x]._celda === celda.dataset.celda) {
				celda.dataset.edificio =  "vacia";
			}
		}
	}		

	objPartida.parque.shift();
	objPartida.parque.shift();
}