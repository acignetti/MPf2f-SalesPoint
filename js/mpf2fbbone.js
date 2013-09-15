/**
 * El archivo contiene todas las funciones que interactúan con el
 * webservices de MPF2F
 */

/**
 * Carga la pantalla de generación de código QR además de la función
 * que se encarga luego de ejecutar el pedido de generación de venta
 * @return {VOID}
 */
function showGenerateQR() {
	$('div#actions').load('generateqr.html', function() {
		$('#goSale').click(function() {
			generateSale();
		});
		$('div#actions').show();
	})
}

/**
 * Genera un QR para ser mostrado en el campo correspondiente para
 * ser escaneado luego por un smartphone
 * @param {integer} saleID El id de la venta para generar el QR
 * @return {VOID}
 */
function generateQR(saleID) {
	$.ajax({
		dataType: "jsonp",
		url: "http://10.52.213.157/mp-ws/operaciones.php",
		data: {
			operacion: 'sales_qr',
			id: saleID
		},
		success: function(dataStr) {
			data = JSON.parse(dataStr);
			if (data.status == true) {
				$('#imgQR').attr('src', 'data:image/png;base64,' + data.qr);
				$('#processing').hide();
				$('#finishQR').show();
			} else {
				$('div#modal').click();
				$('div#errorqr').fadeIn(1500);
			}
		},
		error: function() {
			$('div#modal').click();
			$('div#errorgrave').fadeIn(1500);
		}
	});
}

/**
 * La función se encarga de generar la venta pasando el userID y el
 * sessionKey para validar que la sesión es la correcta. Cuando la
 * función recibe la respuesta, se fija si el status es true, en ese
 * caso pide la generación del código QR, en caso contrario muestra
 * el error correspondiente
 * @return {VOID}
 */
function generateSale() {
	var user = readCookie('userID');
	var sessionkey = readCookie('sessionKey');
	$('#qrGenerator').hide();
	$('#processing').show();
	$.ajax({
		dataType: "jsonp",
		url: "http://10.52.213.157/mp-ws/operaciones.php",
		data: {
			operacion: 'sales_create',
			description: description.value,
			price: price.value,
			username: user,
			session_key: sessionkey
		},
		success: function(dataStr) {
			data = JSON.parse(dataStr);
			if (data.status == true) {
				generateQR(data.item.sale_id);
			} else {
				$('div#modal').click();
				$('div#errorsale').fadeIn(1500);
			}
		},
		error: function() {
			$('div#modal').click();
			$('div#errorgrave').fadeIn(1500);
		}
	});
}