const images = [
    'http://archive.alternativenation.net/wp-content/uploads/2014/03/John-Frusciante-Enclosure.jpg',
    'https://s-media-cache-ak0.pinimg.com/236x/fb/ff/87/fbff87538862bd19f3efb4da67970a29.jpg',
    'http://www.grammy.com/files/styles/full_width/public/photos/drummerch_david_63047217_max.jpg?itok=QAxJGFxk',
    'http://brougherprosound.com/wp-content/uploads/2013/03/flea-michael-balzary-tampa-bay-times-forum-florida-' +
    'march-29th-2012.jpg',
    'http://www.alternativenation.net/wp-content/uploads/2016/05/anthonykiedishat.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/f/fc/HillelSlovak1983.jpg',
    'http://rhcp.cl/CosmikMellowship/wp-content/uploads/2014/11/1915965_1503221344375_2037843_n.jpg',
    'http://studionauta.zenfolio.com/img/s/v-3/p319385937-3.jpg',
    'https://upload.wikimedia.org/wikipedia/en/2/28/Arik_Marshall.jpg',
    'http://www4.pictures.zimbio.com/gi/Morrissey+In+Concert+VNKNUCnyrAil.jpg'
];
const swap = function (array, i, j) {
    let tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
}
const shuffle = function (array) {
    for (let i = array.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        swap(array, i - 1, j);
    }
}
let flipBack = true; //no globals
let first;
$(function () {
    for (let i = 0; i < 4; i++) {
        $('#cont')
            .append("<div class='r'></div>");
    }
    for (let i = 0; i < 5; i++) {
        $('.r') //.append($('<div>')).addClass('c d').text('?')
            .append("<div class='c d'>?</div>");
    }
    let all = new Array(20);
    for(let i = 0; i < 20; i++) {
        all[i] = i;
    }
    shuffle(all);
    $.each($('.c'), function (i, j) {
        $(j).attr('num', all[i] % 2 === 0 ? all[i]/2 : (all[i] - 1)/2); //data()
    });
    console.log(all);
    $('#cont').on('click', '.c', function () {
        flipBack = !flipBack;
        if (!flipBack) {
            first = $(this);
        }
        $(this).text($(this).attr('num')); //data()
        if (flipBack) {
            if (first.attr('num') === $(this).attr('num')) {
                $(this).removeClass('d');
                first.removeClass('d');
                console.log($(this));
            }
            setTimeout(function() {
                $('.d').text('?');
            }, 1300);
        }
    });
});
