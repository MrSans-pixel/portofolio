const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,?!'_-&@#$%*()/:<>|+= ";

function teksEncrypt(teks, kunci){
    let encryptedTeks = "";

    for(let i = 0; i < teks.length; i++){
        const charTeks = teks[i];
        const charKunci = kunci[i % kunci.length];

        const indexTeks = alphabet.indexOf(charTeks);
        const indexKunci = alphabet.indexOf(charKunci);

        if(indexTeks === -1){
            teksEncrypt += charTeks;
        }else{
            const indexBaru = (indexTeks + indexKunci) % alphabet.length;
            encryptedTeks += alphabet[indexBaru];
        }
    }

    return encryptedTeks;
}

function teksDecrypt(encryptedTeks, kunci){
    let decryptedTeks = "";

    for(let i = 0; i < encryptedTeks.length; i++){
        const charEncrypted = encryptedTeks[i];
        const charKunci = kunci[i % kunci.length];

        const encryptedIndex = alphabet.indexOf(charEncrypted);
        const indexKunci = alphabet.indexOf(charKunci);

        if(encryptedTeks === -1){
            decryptedTeks += charEncrypted;
        }else{
            let indexBaru = encryptedIndex - indexKunci;
            if(indexBaru < 0) indexBaru += alphabet.length;
            decryptedTeks += alphabet[indexBaru];
        }
    }

    return decryptedTeks;
}

function updateHasil(isEncrypting){
    const teks = document.getElementById("pesan").value;
    const kunci = document.getElementById("kunci").value;

    let hasil = "";

    if(isEncrypting){
        hasil = teksEncrypt(teks, kunci);
    }else{
        hasil = teksDecrypt(teks, kunci);
    }

    document.getElementById("hasil").textContent = hasil;
}

document.getElementById("tmb-enc").addEventListener('click', function() {
    updateHasil(true);
});

document.getElementById("tmb-dec").addEventListener('click', function() {
    updateHasil(false);
});