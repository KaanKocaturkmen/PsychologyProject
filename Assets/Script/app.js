const audioPlayer = document.getElementById('audioPlayer');
const selectedMusic = document.getElementById('selectedMusic');

$(document).on("click", "td", function () {
    const data = `${Number($(this).data("x"))} ${Number($(this).data("y"))}`
    $(".cordinate-data").html(data);
    $(".time-data").html(pauseMusic());
    $(".song-data").html($("#mediaPlayer .body .selected").text())
});

$(document).on("click", "#expandMediaBtn", function () {
    $("#mediaPlayer").slideToggle('fast', () => {
        if ($("#mediaPlayer").css('display') === 'block') {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
    });
});

$(document).on("click", ".expandData", function () {
    $(".dataContainer").slideToggle('fast', () => {
        if ($(".dataContainer").css('display') === 'block') {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
    });
});

$(document).on("click", ".media-track button", function () {
    $("#selectedMusic").text($(this).attr('value'))
});

function selectSong(songFile, elem) {
    audioPlayer.src = `./Assets/Media/${songFile}`;
    selectedMusic.textContent = songFile.replace('_', ' ');
    audioPlayer.currentTime = 0;
    $(".media-track button").removeClass('selected');
    $(elem).addClass('selected');
    playMusic();
}

function playMusic() {
    audioPlayer.play();
}

function pauseMusic() {
    audioPlayer.pause();
    const currentTime = audioPlayer.currentTime;
    return `${Math.floor(currentTime / 60)}:${Math.floor(currentTime % 60)}`
}

audioPlayer.onended = () => {
    console.log("Şarkı bitti.");
};

$(document).ready(function () {
    $("#myModal").modal('show');
});