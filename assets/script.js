let clickingFav = false;
$( 'i' ).click(function() {
    clickingFav = true;
    $( this ).toggleClass( 'far' ).toggleClass( 'fas' );
    let act = ($( this ).data('arg1') );
    let isFavorite = localStorage.getItem(act);
    if (isFavorite) {
        localStorage.removeItem(act);
    } else {
        localStorage.setItem(act, 'favorited')
    }
});

$(document).ready(function() {
    let values = [], keys = Object.keys(localStorage), i = keys.length;
    while ( i-- ) {
        let favorited = localStorage.getItem( keys[i] );
        if (favorited === 'favorited') {
            $(this).find(`[data-arg1='${keys[i]}']`).toggleClass( 'far' ).toggleClass( 'fas' );
        }
    }
});
$('#myModal').on('show.bs.modal', function (event) {
    if (clickingFav) {
        clickingFav = false;
        return false;
    }
    let url = $(event.relatedTarget).data('href');
    if (!url) {
        return false;
    }
    $('#show').attr('src', url);
});
