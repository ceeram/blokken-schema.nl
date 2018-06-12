let goToHome = function () {
    if (window.self !== window.top) {
        window.top.location.href=window.location.href;
    } else {
        window.location = '/';
    }
};

let clickingFav = false;
$('i').on('click', function() {
    clickingFav = true;
    let i = $(this);
    i.toggleClass('far').toggleClass( 'fas' );
    i.parent().toggleClass('favorite');
    let act = $(this).data('favorite');
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
            let icon = $(this).find(`[data-favorite='${keys[i]}']`);
            icon.toggleClass( 'far' ).toggleClass( 'fas' );
            icon.parent().toggleClass('favorite');
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
}).on('hidden.bs.modal', function () {
    $(this).find('video').get(0).pause();
});

$('select[name=select-genre]').on('change', function() {
    let selected = $(this).val();
    $('td.timetable-col').each(function() {
        let td = $(this);
        td.removeClass('highlight');
        if (!selected) {
            return true;
        }
        let labels = td.data('labels');
        if (!labels) {
            return true;
        }
        if ($.inArray( selected, labels ) === -1) {
            return true;
        }
        td.addClass('highlight');
    });
});
