window.onload =  function() {
    var btn_view = document.getElementById("view");
    var url = "./requestList.html"
    var areaCode = -1;

    btn_view.onclick = function() {
        areaCode = $('#area').children('option:selected').val();
        url = url + "?area=" + areaCode;
        window.location.href= url;
    }
};