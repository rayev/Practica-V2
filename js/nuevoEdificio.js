class Edificio {

	constructor(celda, nombre){
		this._celda = celda;
		this._nombre = nombre;
	}

	inicializar() {

		let celdas = opener.document.querySelectorAll('.celda');

		for (let i of celdas) {

			if (i.dataset.celda === this._celda) {

				i.dataset.edificio = this._nombre;
			}
		}
	}

	get tipo() {

		return this._tipo;
	}

}

class Atraccion extends Edificio {

	constructor(celda, nombre, visitantes) {

		super(celda, nombre);
		this._visitantes = visitantes;
		this._tipo = "atraccion";
	}

	get visitantes() {
		return this._visitantes;
	}
}

class Puesto extends Edificio {

	constructor(celda, nombre, ingresos) {

		super(celda, nombre);
		this._ingresos = ingresos;
		this._tipo = "puesto";
	}

	get ingresos() {
		return this._ingresos;
	}
}


const edificios = document.querySelectorAll('.edificio');

for (let i of edificios) {

	i.onclick = function(){

		if (this.dataset.coste <= opener.objPartida.saldo) {

			let nombre = this.dataset.nombre;
			let celda = document.getElementById('numeroCelda').innerText;

			if (this.dataset.tipo === 'atraccion') {

				let visitantes = this.dataset.visitantes;
				const atraccion = new Atraccion(celda, nombre, visitantes);
				atraccion.inicializar();
				opener.objPartida.parque.push(atraccion);
			}		

			if (this.dataset.tipo === 'puesto') {

				let ingresos = this.dataset.ingresos;		
				const puesto = new Puesto(celda, nombre, ingresos);
				puesto.inicializar();
				opener.objPartida.parque.push(puesto);
			}

			opener.objPartida.saldo -= this.dataset.coste;
			opener.msg("success", "¡Edificio creado!");
			window.close();

		} else {

			msg('error', 'Saldo actual insuficiente (' + opener.objPartida.saldo + '$ restantes)');

		}
	}
}



// const troncos = new Atraccion(02, 'troncos', 8);