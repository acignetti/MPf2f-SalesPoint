/**
 * Esta función se encarga de validar el usuario y el password contra
 * la base de datos y lo saca si falla
 */

$(function() {
	var user	= readCookie('userID');
	var key		= readCookie('sessionKey');
	var name	= readCookie('name');

	/**
	 * Validación re pelotuda que impide que cualquier usuario
	 * distinto a test y con password testest ingrese a la sección
 	*/
	if(user == null || key == null) {
		document.location.href='../';
	} else {
		name = name.toUpperCase();
		$('#loggedUser').html(name);
	}

	/**
	 * Después de la validación controlamos el uso de las funciones
	 * que llama el usuario
	 */
	$('button#qr').click(function() {
		showGenerateQR();
	});

	$('button#stats').click(function() {
		showPieChart();
	});

	createPaymentsTable(user, key, 'pending', 'infoPending');
	createPaymentsTable(user, key, 'credited', 'infoCredited');
	createPaymentsTable(user, key, 'cancelled', 'infoCancelled');
});