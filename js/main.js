/**
 * Acá se encuentran declaradas todas las funciones principales que
 * interactúan con el webservices de MPF2F
 */

$(function() {
	userData = sessionGetUserData();

	/**
	 * Valido que las cookies existan, sino redirijo al index.
 	*/
	if(userData.invalid) {
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
		showTransactions();
	});

	$('a#menubarSessionClose').click(function(){
		sessionClose();
	});

	/**
	 * Pantalla inicial.
	 */
	showTransactions();
});