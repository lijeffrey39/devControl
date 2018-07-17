window.onload = function() {
    var url = document.URL;

    var pos = url.indexOf('area');
    var area = '-1';

    if(pos != -1) {
        area = url.substring(pos+5);
    }
    
    if(area == "1") {
        document.getElementById("requestArea").innerHTML = "IM Area Request";
    }
    else if(area == "2") {
        document.getElementById("requestArea").innerHTML = "Anelva Area Request";
    }
    else if(area == "3") {
        document.getElementById("requestArea").innerHTML = "Photo Area Request";
    }
    else if(area == "4") {
        document.getElementById("requestArea").innerHTML = "MR AreaRequest";
    }
    else if(area == "5") {
        document.getElementById("requestArea").innerHTML = "Metro Area Request";
    }
    else if(area == "6") {
        document.getElementById("requestArea").innerHTML = "Insp Area Request";
    }
    else if(area == "7") {
        document.getElementById("requestArea").innerHTML = "CMP Area Request";
    }
    else if(area == "8") {
        document.getElementById("requestArea").innerHTML = "NiFe/Etch Area Request";
    }
    else if(area == "9") {
        document.getElementById("requestArea").innerHTML = "Metals Area Request";
    }
    else {
        document.getElementById("requestArea").innerHTML = "Photo Area Request";
    }
};