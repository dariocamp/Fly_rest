function doCall(typeRequest, urlPath, parametri, callbackOnSuccess, callbackOnError) {

    $.ajax({
        type: typeRequest, // Metodo di chiamata da effettuare
        url: urlPath, // Url da chiamare
        data: parametri, // Eventuali parametri da passare NB: si posso
        // scrivere anche in questo {idFromHtml: valore}
        success: callbackOnSuccess,
        error: callbackOnError
    });
}

/*function buildList(json){
    var table = $('#voli');
    var voli = '';
    table.empty();

    var tableHead = "<tr><td><b>ID</b></td><td><b>Tratta</b></td>"
    table.append(tableHead);

    $.each(json,function(i,item){
        voli += '<tr><td>'+item._id+'</td><td>'+item.tratta+'</td></tr>'
    });
    table.append(voli);
}*/

function executeCreatedList(){

    var url = "http://212.237.32.76:3001/list"
    var startUrl = "http://212.237.32.76:3001/start/"

    doCall('GET', url, {}, function(result){
        buildCreatedList(result);
        $('#idButton').click(
            function startFly(){
                var id = $(this).attr('data-id');
                doCall('GET', startUrl+id, {}, function(){
                    executeLandedList();
                }, function(){
                    window.alert("Errore")
                });
            }
        )},function(){
        window.alert("Errore")
    });
}

function buildCreatedList(json) {
	$.each(json, function(key, val) {
		var tdId = '<td>' + val._id + '</td>';
        var tdTratta = '<td>' + val.tratta + '</td>';
        var tdStatus = '<td>' + val.status + '</td>';
        var tdBotton = '<td><button type="button" class="btn btn-success" data-id="'+val._id+'" id="idButton">FLY</button></td>';
		

		$('#idCreatedTable').append('<tr>' + tdId + tdTratta + tdStatus + tdBotton + '</tr>');

	});

}