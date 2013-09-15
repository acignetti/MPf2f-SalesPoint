/**
 * Esta función se encarga de validar el usuario y el password contra
 * la base de datos y lo saca si falla
 */

function sessionGetUserData() {
	userData = {};

	userData.user	= readCookie('userID');
	userData.key	= readCookie('sessionKey');
	userData.name	= readCookie('name');
	userData.invalid = (userData.user == null || userData.key == null);

	return userData;
};


/**
 * Ejecuta la operacion de cerrar sesion en el WS, elimina las 
 * cookies y vuelve al inicio.
 * @return {VOID}
 */
function sessionClose() {
	userData = sessionGetUserData();
	if (userData.valid) {
		
		$.ajax({
			dataType: "jsonp",
			url: "http://10.52.213.157/mp-ws/operaciones.php",
			data: {
				operacion: 'user_logout',
				username: userData.user,
				session_key: userData.key
				
			},
			success: function(dataStr) {
				data = JSON.parse(dataStr);
				document.location.href='../';
			},
			error: function() {
				document.location.href='../';
			}
		});
	} else {
		document.location.href='../';
	}
}