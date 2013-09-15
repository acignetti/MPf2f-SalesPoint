/**
 * Acá se encuentran declaradas todas las funciones principales que
 * interactúan con el webservices de MPF2F
 */

$(function() {
	userData = sessionGetUserData();

	/**
	 * Valido que las cookies existan, sino redirijo al index.
 	*/
	if(!userData.valid) {
		document.location.href='../';
	} else {
		$('#loggedUser').html(userData.name);
	}

	/**
	 * Inicializo el click de los botones
	 */
	$('button#qr').click(function() {
		showGenerateQR();
	});

	$('button#stats').click(function() {
		showPieChart();
	});

	$('button#transactions').click(function(){
		showTransactions(user, key);
	});

	/**
	 * Pantalla inicial.
	 */
	showTransactions(user, key);
});