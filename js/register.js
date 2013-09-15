
/**
 * Carga la pantalla de registro de usuario y registra las funciones
 * que validan los campos y hacen la pegada al webservice para 
 * registrar un usuario en la Base de Datos
 * @return {VOID}
 */
function showRegisterUser() {
	$('div#actions').load('user/registeruser.html', function() {

		$('button#goFirstStep').click(function() {
			var user	= username.value;
			var pass	= password.value;
			var repeat	= passwordRepeat.value;
			var cname	= completeName.value;

			if (!user || user.length < 1) {
				$("input#username").focus();
				return false;
			};

			if (!pass || pass.length < 1) {
				$("input#password").focus();
				return false;
			} else {
				if (!repeat || repeat.length < 1) {
					$("input#passwordRepeat").focus();
					return false
				} else {
					if (pass != repeat) {
						$("input#passwordRepeat").focus();
						return false
					};
				}
			};

			if (!cname || cname.length < 1) {
				$("input#completeName").focus();
				return false;
			};

			$('div#stepOne').hide();
			$('div#stepTwo').show();
		});

		$('#goRegister').click(function() {
			var user		= username.value;
			var pass		= password.value;
			var cname 		= completeName.value;
			var cliid		= client_id.value;
			var clisecret	= client_secret.value;

			if (!cliid || cliid.length < 1) {
				$("input#client_id").focus();
				return false;
			}
	
			if (!clisecret || clisecret.length < 1) {
				$("input#client_secret").focus();
				return false;
			}

			$('div#stepTwo').hide();
			$('div#processing').show();

			$.ajax({
				dataType: "jsonp",
				url: "http://10.52.213.157/mp-ws/operaciones.php",
				data: {
					operacion: 'user_signup',
					username: user,
					password: pass,
					fullname: cname,
					client_id: cliid,
					client_secret: clisecret
				},
				success: function(dataStr) {
					data = JSON.parse(dataStr);
					if (data.status == true) {
						$('#processing').hide();
						$('#infoMP').html('http://10.52.213.157/mp-ws/operaciones.php?operacion=mp_ipn&user_id=' + data.user.user_id);
						$('#finishRegistration').show();
					} else {
						$('div#modal').click();
						$('div#errorregister').fadeIn(1500);
					}
				},
				error: function() {
					$('div#modal').click();
					$('div#errorgrave').fadeIn(1500);
				}
			});
			return false;
		});
		$('div#actions').show();
	})
}