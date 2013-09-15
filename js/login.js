/**
 * Esta función se encarga de validar el usuario y el password contra
 * la base de datos, en caso de ser exitosa, pasa a la sección de 
 * usuario conectado, sino lo deja en la página principal y le muestra
 * el error correspondiente
 */

$(function() {
	eraseCookie('userID');
	eraseCookie('userSession');
	$('#login').fadeIn(1000);	
	$(".alert").hide();
	$("#loginform").submit(function() {

		$(".alert-danger").hide();

		var user = $("input#user").val();
		if (!user || user.length < 1) {
			$("div#user_error").fadeIn(1000);
			$("input#user").focus();
			return false;
		}

		var pass = $("input#pass").val();
		if (!pass || pass.length < 1) {
			$("div#pass_error").fadeIn(1000);
			$("input#pass").focus();
			return false;
		}

		
		var dataString = 'operacion=user_login' + '&username='+ user + '&password=' + pass;
		$.ajax({
			dataType: "jsonp",
			url: "http://10.52.213.157/mp-ws/operaciones.php",
			data: dataString,
			success: function(dataStr) {
				data = JSON.parse(dataStr);
				if (data.status == true) {
					$('div#success').fadeIn(1500);
					$('loginform').hide();
					createCookie('userID', data.session.user, 1);
					createCookie('userSession', data.session.session_key, 1);
					document.location.href='user/';
				} else {
					$('div#errorlogin').fadeIn(1500);
				}
			},
			error: function(data) {
				$('div#errorgrave').fadeIn(1500);
			}
		});
		
		
		return false;
	});
});