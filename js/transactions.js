
function showTransactions() {
	userData = sessionGetUserData();

	$('div#content').load('transactions.html', function() {
	$('button#transactions').prop("disabled",true);
	$('button#stats').attr("disabled", false);
	$('#transactions').show();    
	createPaymentsTable(userData.user, userData.key, 'pending', 'infoPending');
	createPaymentsTable(userData.user, userData.key, 'approved', 'infoCredited');
	createPaymentsTable(userData.user, userData.key, 'rejected', 'infoCancelled');

  }) ;
}
