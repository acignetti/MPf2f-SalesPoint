/**
 * Esta función se encarga de validar el usuario y el password contra
 * la base de datos y lo saca si falla
 */

$(function() {
	var user = readCookie('userID');
	var pass = readCookie('userSession');

	/**
	 * Validación re pelotuda que impide que cualquier usuario
	 * distinto a test y con password testest ingrese a la sección
	
 	*/
	if(user != 'test' || pass != 'testest') {
		//document.location.href='../';
	}
});