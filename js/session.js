/**
 * Esta función se encarga de validar el usuario y el password contra
 * la base de datos y lo saca si falla
 */

function sessionGetUserData() {
	userData = {};

	userData.user	= readCookie('userID');
	userData.key	= readCookie('sessionKey');
	userData.name	= readCookie('name');
	userData.valid = (user == null || key == null);

	return userData;
});


/**
 * Ejecuta la operacion de cerrar sesion en el WS, elimina las 
 * cookies y vuelve al inicio.
 * @return {VOID}
 */
function sessionClose() {
	var user	= readCookie('userID');
	var key		= readCookie('sessionKey');
		
	$.ajax({
		dataType: "jsonp",
		url: "http://10.52.213.157/mp-ws/operaciones.php",
		data: {
			operacion: 'user_logout',
			username: user,
			session_key: key
			
		},
		success: function(dataStr) {
			data = JSON.parse(dataStr);
			document.location.href='../';
		},
		error: function() {
			document.location.href='../';
		}
	});
}