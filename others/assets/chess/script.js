document.addEventListener('DOMContentLoaded', () =>{
    let papan = null;
    const game = new Chess();
    const historiGerak = document.getElementById('histori-gerakan');
    let hitungGerak = 1;
    let warnaUser = 'w';

    const buatRandomGerak = () =>{
        const gerakMungkin = game.moves();

        if(game.game_over()) {
            alert("Skakmat!");
        }else{
            const randomIdx = Math.floor(Math.random() * gerakMungkin.length);
            const gerak = gerakMungkin[randomIdx];
            game.move(gerak);
            papan.position(game.fen());
            rekamGerak(gerak, hitungGerak);
            hitungGerak++;
        }
    };

    const rekamGerak = (gerak, hitung) =>{
        const diformatGerak = hitung % 2 === 1 ? `${Math.ceil(hitung / 2)}. ${gerak}` : `${gerak} -`;
        historiGerak.textContent += diformatGerak + ' ';
        historiGerak.scrollTop = historiGerak.scrollHeight;
    };

    const onDragStart = (sumber, piece) =>{
        return !game.game_over() && piece.search(warnaUser) === 0;
    };

    const onDrop = (sumber, target) =>{
        const gerak = game.move({
            from: sumber,
            to: target,
            promotion: 'q',
        });

        if(gerak === null) return 'snapback';

        window.setTimeout(buatRandomGerak, 250);
        rekamGerak(gerak.san, hitungGerak);
        hitungGerak++;
    };

    const onSnapEnd = () =>{
        papan.position(game.fen());
    };

    const configPapan = {
        showNotation: true,
        draggable: true,
        position: 'start',
        onDragStart,
        onDrop,
        onSnapEnd,
        moveSpeed: 'fast',
        snapBackSpeed: 500,
        snapSpeed: 100,
    };

    papan = Chessboard('papan', configPapan);

    document.querySelector('.main-lagi').addEventListener('click', () =>{
        game.reset(),
        papan.start(),
        historiGerak.textContent = '';
        hitungGerak = 1;
        warnaUser = 'w';
    });

    document.querySelector('.atur-pos').addEventListener('click', () =>{
        const fen = prompt("Masukkan notasi FEN untuk posisi yang diinginkan!");
        if(fen !== null){
            if(game.load(fen)){
                papan.position(fen);
                historiGerak.textContent = '';
                hitungGerak = 1;
                warnaUser = 'w';
            }else{
                alert("Notasi FEN tidak valid. Silakan coba lagi.");
            }
        }
    });

    document.querySelector('.putar-papan').addEventListener('click', () =>{
        papan.flip();
        buatRandomGerak();
        warnaUser = warnaUser === 'w' ? 'b' : 'w';
    });
});