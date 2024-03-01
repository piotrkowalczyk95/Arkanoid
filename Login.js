onmessage = function (e) {
    var loginURL = "https://uczelnia.secdev.pl/Testing/Login?login=" + e.data[0] + "&password=" + e.data[1];
    var request = new XMLHttpRequest();
    request.open('POST', loginURL);
    request.responseType = 'blob';
    console.log(request);
}
