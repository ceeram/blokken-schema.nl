let goToHome = function () {
    if (window.self !== window.top) {
        window.top.location.href=window.location.href;
    } else {
        window.location = '/';
    }
};

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
$('#act-modal').on('show.bs.modal', function (event) {
    if (clickingFav) {
        clickingFav = false;
        return false;
    }
    let url = $(event.relatedTarget).data('href');
    if (!url) {
        return false;
    }
    $('#show').attr('src', url);
}).on('hidden.bs.modal', function () {
    $('#show').attr('src', '');
});

$('#special-act-modal').on('show.bs.modal', function (event) {
    if (clickingFav) {
        clickingFav = false;
        return false;
    }
    let td = $(event.relatedTarget); // Button that triggered the modal
    let videoUrl = td.data('video-url');
    let modal = $(this);
    let video = modal.find('video');
    if (videoUrl) {
        video.html('<source src="' + videoUrl + '" type="video/mp4">');
        video.show();
    } else {
        video.html('');
        video.hide();
    }

    modal.find('#special-act-modal-label').text(td.data('title'));
    modal.find('#special-act-time').text(td.data('time'));
    modal.find('#special-act-location').text(td.data('location'));
    modal.find('.modal-body').find('.description').html(td.data('description'));
});
