window.onload = function() {
    var url = document.URL;

    var pos = url.indexOf('area');
    var area = -1;

    if(pos != -1) {
        area = url.substring(pos+5);
    }

    var options = document.getElementById('area').getElementsByTagName('option');
    for(var i=0;i<options.length; i++) {
        if(options[i]['value']==(area)) {
            options[i]['selected'] = 'selected';
        }
        else {
            options[i]['selected'] = '';
        }
    }
};