const apiKey = '9c830ae7f3bbd7d26fb320d4f5e988c3';
const tmbLok = document.querySelector('.tmb-lokasi');
const infoSkr = document.querySelector('.info-sekarang');
const ikonCuacaSkr = document.querySelector('.cuaca-sekarang i');
const temper = document.querySelector('.temper');
const listHari = document.querySelector('.list-hari');

const mapIkonCuaca = {
    '01d': 'sun',
    '01n': 'moon',
    '02d': 'sun',
    '02n': 'moon',
    '03d': 'cloud',
    '03n': 'cloud',
    '04d': 'cloud',
    '04n': 'cloud',
    '09d': 'cloud-rain',
    '09n': 'cloud-rain',
    '10d': 'cloud-rain',
    '10n': 'cloud-rain',
    '11d': 'cloud-lightning',
    '11n': 'cloud-lightning',
    '13d': 'cloud-snow',
    '13n': 'cloud-snow',
    '50d': 'water',
    '50n': 'water'
};

function fetchDataCuaca(lokasi){
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${lokasi}&appid=${apiKey}&units=metric`;

    fetch(apiUrl).then(response => response.json()).then(data =>{
        const cuacaSkr = data.list[0].weather[0].description;
        const temperatur = `${Math.round(data.list[0].main.temp)}°C`;
        const kodeIkonCuacaSkr = data.list[0].weather[0].icon;

        infoSkr.querySelector('h2').textContent = new Date().toLocaleDateString('id', {weekday: 'long'});
        infoSkr.querySelector('span').textContent = new Date().toLocaleDateString('id', {day: 'numeric', month: 'long', year: 'numeric'});
        ikonCuacaSkr.className = `bx bx-${mapIkonCuaca[kodeIkonCuacaSkr]}`;
        temper.textContent = temperatur;

        const eleLokasi = document.querySelector('.info-sekarang > div > span');
        eleLokasi.textContent = `${data.city.name}, ${data.city.country}`;

        const eleDeskCuaca = document.querySelector('.cuaca-sekarang > h3');
        eleDeskCuaca.textContent = cuacaSkr;

        const curahHujanSkr = `${data.list[0].pop}%`;
        const kelembabanSkr = `${data.list[0].main.humidity}%`;
        const cepatAnginSkr = `${data.list[0].wind.speed} km/h`;

        const kontaInfoHari = document.querySelector('.info-hari');
        kontaInfoHari.innerHTML = `
            <div>
            <span class="judul">CURAH HUJAN</span>
            <span class="nilai">${curahHujanSkr}</span>
            </div>
            <div>
                <span class="judul">KELEMBABAN</span>
                <span class="nilai">${kelembabanSkr}</span>
            </div>
            <div>
                <span class="judul">CEPAT ANGIN</span>
                <span class="nilai">${cepatAnginSkr}</span>
            </div>
        `;

        const skr = new Date();
        const dataBesok = data.list.slice(1);

        const hariUnik = new Set();
        let hitung = 0;
        listHari.innerHTML = '';
        for(const dataSkr of dataBesok){
            const tglPerkiraan = new Date(dataSkr.dt_txt);
            const singkatan = tglPerkiraan.toLocaleDateString('id', {weekday: 'short'});
            const tempHari = `${Math.round(dataSkr.main.temp)}°C`;
            const kodeIkon = dataSkr.weather[0].icon;

            if(!hariUnik.has(singkatan) && tglPerkiraan.getDate() !== skr.getDate()){
                hariUnik.add(singkatan);
                listHari.innerHTML += `

                    <li>
                        <i class='bx bx-${mapIkonCuaca[kodeIkon]}'></i>
                        <span>${singkatan}</span>
                        <span class="day-temp">${tempHari}</span>
                    </li>
                    
                `;
                hitung++;
            }

            if(hitung === 4) break;
        }
    }).catch(error =>{
        alert(`Error fetching data cuaca: ${error} (Api Error)`);
    });
}

document.addEventListener('DOMContentLoaded', () =>{
    const lokasiDefault = 'Kunduran';
    fetchDataCuaca(lokasiDefault);
});

tmbLok.addEventListener('click', () =>{
    const lokasi = prompt('Masukkan lokasi :');
    if(!lokasi) return;

    fetchDataCuaca(lokasi);
});