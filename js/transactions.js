
function showTransactions(user, key) {
  $('div#content').load('transactions.html', function() {
  	$('button#transactions').prop("disabled",true);
  	$('button#stats').attr("disabled", false);
    $('#transactions').show();    
    createPaymentsTable(user, key, 'pending', 'infoPending');
    createPaymentsTable(user, key, 'approved', 'infoCredited');
    createPaymentsTable(user, key, 'rejected', 'infoCancelled');

  }) ;
}
