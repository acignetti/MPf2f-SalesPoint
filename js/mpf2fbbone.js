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
	});
}


/**
 * Genera un QR para ser mostrado en el campo correspondiente para
 * ser escaneado luego por un smartphone
 * @param {integer} saleID El id de la venta para generar el QR
 * @return {VOID}
 */
function generateQR(saleID, userID, sessionKey) {
	$.ajax({
		dataType: "jsonp",
		url: "http://10.52.213.157/mp-ws/operaciones.php",
		data: {
			operacion: 'sales_qr',
			id: saleID,
			username: userID,
			session_key: sessionKey
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
				generateQR(data.item.sale_id,user,sessionkey);
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

/**
 * Función que se encarga de crear una tabla para ser mostrada en la
 * página principal. La tabla contiene el tipo de operación que 
 * @param  {varchar} type El tipo de pagos a buscar
 * @return {VOID}
 */
function createPaymentsTable(user, key, type, table) {
	$('#'+table+'Processing').show();	
	$.ajax({
		dataType: "jsonp",
		url: "http://10.52.213.157/mp-ws/operaciones.php",
		data: {
			operacion: 'sales_list',
			status: type,
			start: 0,
			limit: 20,
			username: user,
			session_key: key
		},
		success: function(dataStr) {
			data = JSON.parse(dataStr);
			if (data.status == true) {
				tableCreate(data.sales,table);
				$('#'+table+'Processing').hide();	
				$('#'+table).fadeIn(1000);				
			} else {
				$('#'+table+'Processing').fadeOut(1500);
			}
		},
		error: function() {
			$('div#errorgrave').fadeIn(1500);
		}
	});
}

function tableCreate(data,table){
	var body = $('#'+table);
	var tbl = document.createElement('table');
	tbl.setAttribute('class','table table-hover');
	// Esto se hace una vez, es la cabecera de la tabla
	var thead = document.createElement('thead');
	var tr = document.createElement('tr');

	var th = document.createElement('th');
	th.appendChild(document.createTextNode('#'));
	tr.appendChild(th);
	var th = document.createElement('th');
	th.appendChild(document.createTextNode('Descripción'));
	tr.appendChild(th);
	var th = document.createElement('th');
	th.appendChild(document.createTextNode('Monto'));
	tr.appendChild(th);
	var th = document.createElement('th');
	th.appendChild(document.createTextNode('Fecha'));
	tr.appendChild(th);
	var th = document.createElement('th');
	th.appendChild(document.createTextNode('Ver QR'));

	tr.appendChild(th);
	thead.appendChild(tr);
	tbl.appendChild(thead);

	var tbdy = document.createElement('tbody');
	for (var i = 0; i < data.length; i++) {
		data[i]
		var tr = document.createElement('tr');
		
		var td = document.createElement('td');
		td.appendChild(document.createTextNode(i + 1));
		tr.appendChild(td);
		var td = document.createElement('td');
		td.appendChild(document.createTextNode(data[i].name));
		tr.appendChild(td);
		var td = document.createElement('td');
		td.appendChild(document.createTextNode(data[i].ammount));
		tr.appendChild(td);
		var td = document.createElement('td');
		td.appendChild(document.createTextNode(data[i].date));
		tr.appendChild(td);
		var td = document.createElement('td');
		var tmp = createButton(data[i].sale_id);
		td.appendChild(tmp);
		tr.appendChild(td);
		 
		tbdy.appendChild(tr);
	};	
	tbl.appendChild(tbdy);
	body.append(tbl);
}

/**
 * Genera un botón que llama a la funciónn showPreviousQR
 * @param  {integer} id El identificador del QR
 * @return {object}
 */
function createButton(id) {
	var elem = document.createElement('button');
	elem.setAttribute('href', "#modal");
	elem.setAttribute('type', "button");
	elem.setAttribute('class', "btn btn-default");
	elem.setAttribute('data-toggle', "modal");
	elem.setAttribute('id', "btnQR"+id);
	elem.setAttribute('onclick', "showPreviousQR('" + id + "')");
	
	elem.appendChild(document.createTextNode("Generar QR"));
	return elem;
}

/**
 * Función llamada por un botón para mostrar un QR anterior
 * @param  {integer} id Identificador del QR
 * @return {VOID}
 */
function showPreviousQR(id) {
	var user = readCookie('userID');
	var sessionkey = readCookie('sessionKey');
	$('div#actions').load('generateqr.html', function() {
		$('#qrGenerator').hide();
		$('#processing').show();
		generateQR(id,user,sessionkey);
	})
}