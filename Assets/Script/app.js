const audioPlayer = document.getElementById('audioPlayer');
const selectedMusic = document.getElementById('selectedMusic');

$(document).on("click", "td", function () {
    const data = `${Number($(this).data("x"))} ${Number($(this).data("y"))}`
    $(".cordinate-data").html(data);
    $(".time-data").html(pauseMusic());
    $(".song-data").html($("#mediaPlayer .body .selected").text())
    console.log(data)
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
    $("#userName").on("change input", function () {
        const nameValue = $(this).val();
        if (nameValue.length > 0) {
            $("#confirmName").attr('disabled', false);
        } else {
            $("#confirmName").attr('disabled', true);
        }
    });
    
    // $("#myModal").modal('show');

    $(".download-data").on("click", function () {
        let data = [
            {Name: $("#userName").val(), Song: $("span.song-data").text().trim(), Duration: $("span.time-data").html().trim(), Cordiante: $("span.song-data").text().trim()},
        ];

        function convertToCSV(json) {
            const header = Object.keys(json[0]);
            const rows = json.map(obj => header.map(fieldName => JSON.stringify(obj[fieldName], null, 0)).join(','));
            return [header.join(','), ...rows].join('\r\n');
        }

        const csv = convertToCSV(data);

        // CSV verisini Blob olarak oluştur ve indir
        const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
        const link = $("<a>")
            .attr("href", URL.createObjectURL(blob))
            .attr("download", "data.csv")
            .appendTo("body");
        link[0].click();
        link.remove();
    });
    
});
