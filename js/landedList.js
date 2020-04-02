var currentPage = 1;
var itemsPerPage = 10;
var lastPage = 0;


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

function buildLandedList(json) {
    $('#idLandedTable').empty();
    var indicePrimoItem = itemsPerPage * (currentPage - 1);
    var indiceUltimoItem = itemsPerPage * currentPage;
    lastPage = Math.ceil(json.length/itemsPerPage);
    var items = json.slice(indicePrimoItem,indiceUltimoItem);

    var tdId;
    var tdTratta;
    var tdStatus;
    var data;
    var tagRiga;

    $.each(items, function (key, val) {

        tdId = '<td>' + val._id + '</td>';
        tdTratta = '<td>' + val.tratta + '</td>';
        tdStatus = '<td>' + val.status + '</td>';
        if (val.status == 'FLYING') {
            tagRiga = '<tr style="background-color: orangered">';
            data = new Date(val.startDate).toLocaleString("it-IT");
            var tdDataPartenza = '<td>' + data + '</td>';
            var tdDataArrivo = '<td>' + "In Volo" + '</td>';
        } else {
            tagRiga = '<tr>';
            data = new Date(val.startDate).toLocaleString("it-IT");
            tdDataPartenza = '<td>' + data + '</td>';
            data = new Date(val.endDate).toLocaleString("it-IT");
            tdDataArrivo = '<td>' + data + '</td>';
        }

        $('#idLandedTable').append(tagRiga + tdId + tdTratta + tdStatus + tdDataPartenza + tdDataArrivo + '</tr>');
    });

}

function buildListOfPages(){
    var pages = '';
    var idPagine = $('#idPagine');
    for(i=1; i<=lastPage; i++){
        pages += '<option value='+ i +'>'+ i +'</option>';
    }

    idPagine.append(pages);

}

function changePageSelect(){
    currentPage = $('#idPagine').val();
    executeLandedList();
}

function goToNextPage(){
    if(currentPage < lastPage){
        currentPage ++;
        $('#idPagine option[value=' + currentPage +']').prop('selected', true);
        executeLandedList();
    }    
}

function goToPreviousPage(){
    if(currentPage > 1){
        currentPage --;
        $('#idPagine option[value=' + currentPage +']').prop('selected', true);
        executeLandedList();
    }
}

function goToFirstPage(){
    currentPage = 1;
    $('#idPagine option[value=' + currentPage +']').prop('selected', true);
    executeLandedList();
}

function goToLastPage(){
    currentPage = lastPage;
    $('#idPagine option[value=' + currentPage +']').prop('selected', true);
    executeLandedList();
}



function executeLandedList() {

    var url = "http://212.237.32.76:3001/status";

    doCall('GET', url, {}, function (result) {
        buildLandedList(result);
    }, function () {
        window.alert("Errore");
    });
}

function executeLandedListFirstTime(){
    var url = "http://212.237.32.76:3001/status";

    doCall('GET', url, {}, function(result){
        buildLandedList(result);
        buildListOfPages();
    }, function(){
        window.alert("Errore");
    });
}

$(document).ready(function () {
    executeLandedListFirstTime();
    setInterval(executeLandedList, 10000);
});