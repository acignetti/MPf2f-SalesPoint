/**
 * Esta función se encarga de validar el usuario y el password contra
 * la base de datos y lo saca si falla
 */

$(function() {
	var user = readCookie('userID');
	var key = readCookie('sessionKey');

	/**
	 * Validación re pelotuda que impide que cualquier usuario
	 * distinto a test y con password testest ingrese a la sección
 	*/
	if(user == null || key == null) {
		document.location.href='../';
	} else {
		user = user.toUpperCase();
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
	
	$('button#qr').click(function() {
		showGenerateQR();
	}); 

	createPaymentsTable(user, key, 'pending');
});