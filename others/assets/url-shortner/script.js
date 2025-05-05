const tmbShort = document.getElementById('tmb-short');
const tmbReload = document.getElementById('tmb-reload');

tmbShort.addEventListener('click', shortenUrl);

function shortenUrl(){
    var originalUrl = document.getElementById("originalUrl").value;
    var apiUrl = "https://tinyurl.com/api-create.php?url=" + encodeURIComponent(originalUrl);
    const shortenedUrl = document.getElementById("shortenedUrl");

    fetch(apiUrl).then(response => response.text()).then(data =>{
        shortenedUrl.value = data;
    }).catch(error =>{
        shortenedUrl.value = "Error : Shortened URL Gagal!";
    });
}

tmbReload.addEventListener('click', () =>{
    location.reload();
});