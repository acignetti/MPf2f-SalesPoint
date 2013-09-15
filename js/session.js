/**
 * Esta función se encarga de validar el usuario y el password contra
 * la base de datos y lo saca si falla
 */

$(function() {
	var user = readCookie('userID');
	var pass = readCookie('sessionKey');

	user = user.toUpperCase();
	/**
	 * Validación re pelotuda que impide que cualquier usuario
	 * distinto a test y con password testest ingrese a la sección
 	*/
	if(false) {
		//document.location.href='../';
		
	} else {
		$('#loggedUser').html(user);
	}
	/**
	 * Después de la validación controlamos el uso de las funciones
	 * que llama el usuario
	 */
	$('#qr').click(function() {
		showGenerateQR();
	});
	//Este es para el button que está comentado
	/*
	$('button#qr').click(function() {
		showGenerateQR();
	}); */
});