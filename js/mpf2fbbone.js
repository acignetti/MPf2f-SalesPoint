/**
 * El archivo contiene todas las funciones que interactúan con el
 * webservices de MPF2F
 */

function showGenerateQR() {
	$('div#actions').load('generateqr.html', function() {
		$('#goSale').click(function() {
			generateSale();
		});
		$('div#actions').show();

	})
}

function generateQR(saleID) {
	var dataString = 'operacion=sales_qr' + '&id=' + saleID;
	$.ajax({
		dataType: "jsonp",
		url: "http://10.52.213.157/mp-ws/operaciones.php",
		data: dataString,
		success: function(dataStr) {
			data = JSON.parse(dataStr);
			if (data.status == true) {
				$('#imgQR').attr('src', 'data:image/png;base64,' + data.qr);
				$('#qrGenerator').hide();
				$('#processing').show();
			} else {
				$('div#errorqr').fadeIn(1500);
			}
		},
		error: function(data) {
			$('div#errorgrave').fadeIn(1500);
		}
	});
}

function generateSale() {
	var dataString = 'operacion=sales_create' + '&description='+ description + '&price=' + price;
	$.ajax({
		dataType: "jsonp",
		url: "http://10.52.213.157/mp-ws/operaciones.php",
		data: dataString,
		success: function(dataStr) {
			data = JSON.parse(dataStr);
			if (data.status == true) {
				generateQR(data.item.sale_id);
			} else {
				$('div#errorsale').fadeIn(1500);
			}
		},
		error: function(data) {
			$('div#errorgrave').fadeIn(1500);
		}
	});
}