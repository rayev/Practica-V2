let txtError = "", txtPremio = "", nroPremiado, nroTerremoto, nroAJugar;
let objHoraJuegoSorteo;


document.getElementById('nuevoSorteo').onclick = function() {

	if (objPartida.iniciada){

		if (objPartida.parque.length > 1) {

			//funcion que devolvera true o false para evaluar si puede jugar
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
							success( txtPremio = "¡Enhorabuena!. Acabas de ganar 10.000$. Vuelve a probar tu suerte en 1 hora.");

						} else if ( nroAJugar === nroTerremoto ) {

							terremoto();
							error( txtError = "Ohhhh El número elegido ha provocado un terremoto que ha destruido dos edificios....Prueba otra vez suerte en 1 hora.");

						} else {

							error( txtError = "¡ Te has quedado como estabas !. En 1 hora puedes volver a probar tu suerte..." );

						}

						// console.log(nroAJugar);
						// console.log(nroPremiado);	

					} else if (isNaN(nroAJugar) ){

							error( txtError = "Debe de introducir un número, no es valido otro caracter.. Prueba más suerte en 1 hora." );

						} else {
					
							error( txtError = 'Debe introducir un número entre 1 y 5. Prueba más suerte en 1 hora.' );
						}

				} else {

					error( txtError = 'Valor introducido incorrecto, vuelva intentarlo...Prueba más suerte en 1 hora.' );

				}

				//Una vez que se han completado las instrucciones del sorteo se llama a esta funciona para guardar la hora a la que ha jugado y la hora a la que puede volver a jugar.
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


//Funcion que comprueba si se ha jugado alguna vez y si no se ha jugado se permite jugar o si se ha jugado se comprueba la hora actual con la hora del proximo sorteo, si ha pasado una hora se retorna true y si no ha pasado una hora se retorna false
function comprobarHora(){

	let puedeJugar;

	if (objPartida.esPrimerSorteo) {

		puedeJugar = true;
		objPartida.esPrimerSorteo = false;
		return puedeJugar;

	} else if ( new Date()  > objPartida.objHoraProximoSorteo) {

		puedeJugar = true;
		return puedeJugar;

	} else {

		puedeJugar  = false;
		return puedeJugar;
	}
}


///****AHORA MISMO SE VALIDA EN 5MIN, PARA VALIDARLO EN UNA HORA SE TIENE QUE DESCOMENTAR LA LINEA 124 Y COMENTAR LA LINEA 125**///
// Asignamos nueva hora a la varible que guarda la hora en que se ha jugado, y se asigna la hora para el proximo sorteo
// Esto se hace en el Objeto Partida
function reiniciarHorasProximoSorteo(){
	objPartida.objHoraJugadoSorteo = new Date();;
	let tmp = new Date();
	//objPartida.objHoraProximoSorteo = new Date(tmp.setHours( tmp.getHours() + 1) );
	objPartida.objHoraProximoSorteo = new Date(tmp.setMinutes( tmp.getMinutes() + 1) );
}


function premio(){

	// alert("hola premio");
	objPartida.saldo = (10000 + objPartida.saldo);
	document.getElementById('contadorSaldoActual').textContent = objPartida.saldo + "$";
}


function terremoto(){

	//alert("hola terremoto");
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


function error(txt){
	msg('error', txt);
}


function success(txt) {
	msg('success', txt);
}