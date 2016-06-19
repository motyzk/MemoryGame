const images = [ //TODO
    `http://archive.alternativenation.net/wp-content/uploads/2014/03/John-Frusciante-Enclosure.jpg`,
    `https://s-media-cache-ak0.pinimg.com/236x/fb/ff/87/fbff87538862bd19f3efb4da67970a29.jpg`,
    `http://www.grammy.com/files/styles/full_width/public/photos/drummerch_david_63047217_max.jpg?itok=QAxJGFxk`,
    `http://brougherprosound.com/wp-content/uploads/2013/03/flea-michael-balzary-tampa-bay-times-forum-florida-` +
    `march-29th-2012.jpg`,
    `http://www.alternativenation.net/wp-content/uploads/2016/05/anthonykiedishat.jpg`,
    `https://upload.wikimedia.org/wikipedia/commons/f/fc/HillelSlovak1983.jpg`,
    `http://rhcp.cl/CosmikMellowship/wp-content/uploads/2014/11/1915965_1503221344375_2037843_n.jpg`,
    `http://studionauta.zenfolio.com/img/s/v-3/p319385937-3.jpg`,
    `https://upload.wikimedia.org/wikipedia/en/2/28/Arik_Marshall.jpg`,
    `http://www4.pictures.zimbio.com/gi/Morrissey+In+Concert+VNKNUCnyrAil.jpg`
];
const swap = (array, i, j) => {
    let tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
};
const shuffle = array => {
    for (let i = array.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        swap(array, i - 1, j);
    }
};
const startGame = numOfPlayers => {
    let veiled = true;
    let firstCard = null;
    let player = 0; //who is the player playing now
    let playersPoints = new Array(numOfPlayers);
    let unveiled = 10;
    let timeouted = false;
    $(`#cont`).append(`<div class="points-block"></div><div class="points-block"></div>`);
    for (let i = 0; i < numOfPlayers; i++) {
        playersPoints[i] = 0;
        $(i < 5 ? `.points-block:first` : `.points-block:last`).append($(`<span>`).attr(`id`, `Player${i + 1}`)
                    .addClass(`player-points`).text(`Player${i + 1}: 0`));
    }
    $(`#cont`).append($(`<div>`).attr(`id`, `turn`).text(`Player1's turn`));
    for (let i = 0; i < 4; i++) {
        $(`#cont`).append($(`<div>`).addClass(`r`));
    }
    for (let i = 0; i < 5; i++) {
        $(`.r`).append($(`<div>`).addClass(`c d`).text(`?`));
    }
    let all = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`,
               `a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`];
    shuffle(all);
    $.each($(`.d`), function (i, j) {
        $(j).data(`character`, all[i]);
    });
    $(`#cont`).append($(`<button>`).addClass(`btn btn-primary`)
                .attr(`id`, `start-new`).attr(`type`, `button`).text(`start a new game!`));
    $(`#cont`).on(`click`, `.d`, function () {
        if (timeouted || (firstCard && firstCard.is($(this)))) {
            return;
        }
        veiled = !veiled;
        $(this).text($(this).data(`character`));
        if (!veiled) {
            firstCard = $(this);
            return;
        }
        if (firstCard.data(`character`) === $(this).data(`character`)) {
            unveiled -= 1;
            playersPoints[player] += 10;
            for (let i = 0; i < numOfPlayers; i++) {
                $(`#` + `Player${i + 1}`).text(`Player${i + 1}: ${playersPoints[i]}`);
            }
            if (unveiled === 0) { //game over
                let maxpoints = Math.max(...playersPoints);
                for (let i = 0; i < numOfPlayers; i++) {
                    $(`#Player${i + 1}`).text((`Player${i + 1}: `)
                        .concat(playersPoints[i] === maxpoints ? `win :)` : `loss :(`));
                }
                $('.d').removeClass('d');
                return;
            }
            $(this).removeClass(`d`);
            firstCard.removeClass(`d`);
        } else {
            player = (player + 1) % numOfPlayers;
        }
        firstCard = null;
        $('#turn').text(`Player${player + 1}'s turn`);
        timeouted = true;
        setTimeout(function() {
            $(`.d`).text(`?`);
            timeouted = false;
        }, 1000);
    });
};
$(() => {
    $(`.choose-num-of-players`).on(`click`, `button`, function () {
        $(`.choose-num-of-players`).hide();
        $(`#cont`).show();
        startGame(parseInt($(this).text()));
    });
    $(`body`).on(`click`, `#start-new`, () => {
        $(`#cont`).hide();
        $(`#cont`).empty();
        $(`.choose-num-of-players`).show();
    });
});