class usuario {
	_nombre = '';
	_apellido = '';
	_nacimiento = '';

	get nombre() {
		return this._nombre;
	}
	set nombre(value) {
		this._nombre = value;
	}

	get apellido() {
		return this._apellido;
	}
	set apellido(value) {
		this._apellido = value;
	}

	get nacimiento() {
		return this._nacimiento;
	}
	set nacimiento(value) {
		this._nacimiento = value;
	}
}

module.exports = { usuario };
