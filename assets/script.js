let clickingFav = false;
$( "i" ).click(function() {
    clickingFav = true;
    $( this ).toggleClass( "far" ).toggleClass( "fas" );
    let act = ($( this ).data("arg1") );
    let isFavorite = localStorage.getItem(act);
    if (isFavorite) {
        localStorage.removeItem(act);
    } else {
        localStorage.setItem(act, 'favorited')
    }
});

$("td").click(function() {
    if (clickingFav) {
        clickingFav = false;
        return;
    }
    let url = ($(this).data("href") );
    if (url) {
        $('#myModal').modal('show');
        $("#show").attr("src", url);
    }

});

$( document ).ready(function() {
    let values = [], keys = Object.keys(localStorage), i = keys.length;
    while ( i-- ) {
        let favorited = localStorage.getItem( keys[i] );
        if (favorited === 'favorited') {
            $(this).find(`[data-arg1='${keys[i]}']`).toggleClass( "far" ).toggleClass( "fas" );
        }
    }
});
