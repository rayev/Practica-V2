let txtError = "", txtPremio = "", nroPremiado, nroTerremoto, nroAJugar;
// let fechaJugadaUltimoSorteo;
// let horaInicio, horaFin;
// let haJugado = false;
let puedeJugar;


document.getElementById('nuevoSorteo').onclick = function(e) {

	if (objPartida.iniciada){

		if (objPartida.parque.length > 1) {

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

				///Asignamos nuevos valores a las horas de juego.
				objPartida.objHoraJugarSorteo = new Date();
				let tmp = new Date();
				objPartida.objHoraProximoSorteo = new Date(tmp.setHours( tmp.getHours() + 1) );

			} else {

				error( txtError = "Debes esperar una hora entre un sorteo y otro.");

			}

		} else {

			error( txtError = 'Para participar en el sorteo debes tener al menos dos edificios construidos');

		}

	} else {

		error( txtError = 'Inicia una partida para poder particiar en el sorteo');

	}


}


function comprobarHora(){

	let puedeJugar;

	if (objPartida.objHoraJugarSorteo.length == 0 || objPartida.objHoraJugarSorteo === "" || objPartida.objHoraJugarSorteo === null){

		objPartida.objHoraJugarSorteo = new Date();
		let tmp = new Date();
		objPartida.objHoraProximoSorteo = new Date(tmp.setHours( tmp.getHours() + 1) );
		puedeJugar = true;
		return puedeJugar;

	} else if (objPartida.objHoraJugarSorteo < objPartida.objHoraProximoSorteo){

		puedeJugar = false;
		return puedeJugar;

	}
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
	console.log(celdasMapa);

	// for (let i of celdasMapa) {

	// 	if (i.dataset.edificio !== "vacia"){
	// 		celdasEdificadas.push(i.dataset.celda);
	// 	}

	// 	console.log(i.dataset.edificio);
	// 	console.log(i);
	// }





	console.log(objPartida.parque);
	//if (celdasEdificadas.length === 2){
	//if (objPartida.parque.length === 2){
		//destruirCasas(objPartida.parque);
		//objPartida.parque.shift();

		// let edificio1 = 0;
		// let edificio2 = 1;
		// destruirEdificios(edificio1, edificio2);


		let celdas = document.querySelectorAll('.celda');

		for (let celda of celdas) {

			for (var x = 0; x < 2; x++) {
				if (objPartida.parque[x]._celda === celda.dataset.celda) {
					celda.dataset.edificio =  "vacia";
				}
			}
		}		
	
		//objPartida.parque[0].destruir(0);
		//objPartida.parque[0].destruir(1);
		objPartida.parque.shift();
		objPartida.parque.shift();
	// }else{
	// 	celdasDestruir = calcularCeldas(objPartida.parque.length-1);
	// 	destruirEdificios(celdasDestruir);
	// }	

	console.log(celdasEdificadas);

}


function calcularCeldas(nroMaximo) {
	let celdasADestruir = [];
	let celda1, celda2;

	celda1 = Math.floor(Math.random() * nroMaximo) + 1;

	do {

		celda2 = Math.floor(Math.random() * nroMaximo) + 1;

	} while (celda1 === celda2);

	celda1  = (celda1 < 10) ? "0"+celda1.toString() : celda1.toString()
	celda2  = (celda2 < 10) ? "0"+celda2.toString() : celda2.toString()
	celdasADestruir.push(celda1);
	celdasADestruir.push(celda2);
	return celdasADestruir;

}


function destruirEdificios(nroCeldas) {
	//console.log(nroCeldas);

	let celdas = document.querySelectorAll('.celda');

	for (let celda of celdas) {
		console.log(celda);
		// for (var i = 0; i < objPartida.parque.length; i++) {
		// 	if(objPartida.parque[i]._celda === nroCeldas[0] || objPartida.parque[i]._celda === nroCeldas[1]){
		// 		celda.dataset.edificio = "vacia";
		// 		objPartida.parque.shift[objPartida.parque[i].celda, 1];
		// 	}
		// }
		for (var x = 0; x < objPartida.parque.length; x++) {
			for (let y = 0; y < nroCeldas.length; y++){
				if(objPartida.parque[x]._celda === nroCeldas[y].toString()){
					celda.dataset.edificio =  "vacia";
					objPartida.parque.shift(nroCeldas[y],1);
				}
			}
			if (objPartida.parque[x]._celda === celda.dataset.celda) {
				celda.dataset.edificio =  "vacia";
			}
		}
	}
	// objPartida.parque.shift(nroCeldas[0],1);
	// objPartida.parque.shift(nroCeldas[1],1);
	//let celdas = document.querySelectorAll('.celda');

	// for (let i of celdas) {

	// 	for (var j = 0; j < nroCeldas.length; j++) {

	// 		if(nroCeldas[j] === i.dataset.celda){
	// 			i.dataset.edificio = "vacia";
	// 		}
	// 	}
	// }
	// for (let i of objPartida.parque){
	// 	for (var j = 0; j < nroCeldas.length; j++) {
	// 		if(nroCeldas[j]._celda === i._celda){
	// 			i._celda = "vacia";
	// 		}
	// 	}
	// }



}