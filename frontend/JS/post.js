function readURL(input) {
    var template = '<div class="file-upload-content"><img class="file-upload-image" src="#" alt="your image"/><span class="image-title">Uploaded Images</span>  <div class="image-title-wrap"> </div></div>';

    if (!input.files)
        return;
    else
        $('#remove-btn').css("visibility", "visible");

    for (var file of input.files) {
        if (file) {
            (function () {
                var reader = new FileReader();

                reader.onload = function (e) {
                    console.log(e);
                    var elem = document.createElement("div");
                    elem.innerHTML = template.trim();
                    document.getElementById("uploads").appendChild(elem);

                    $('.image-upload-wrap').hide();
                    $('#uploads div:last-child .file-upload-image').attr('src', e.target.result);
                    $('#uploads div:last-child .file-upload-content').show();
                    $('#uploads div:last-child .image-title').html(file.name);
                };

                reader.readAsDataURL(file);


            })();
        } else {
            removeUpload();
        }
    }

}

function removeUpload() {
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
    $('#remove-btn').css("visibility", "hidden");
}

$('.image-upload-wrap').bind('dragover', function () {
    $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function () {
    $('.image-upload-wrap').removeClass('image-dropping');
});

window.onload = function () {
    $("#upload-button").click(function () {

        //preventDefault 는 기본으로 정의된 이벤트를 작동하지 못하게 하는 메서드이다. submit을 막음
        event.preventDefault();

        // Get form
        var form = $('#fileUploadForm')[0];

        // Create an FormData object
        var data = new FormData(form);

        // disabled the submit button
        $("#upload-button").prop("disabled", true);

        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "http://animals.njw.kr/file2",
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function (data) {
                alert("complete");
                console.log(data);
                $("#btnSubmit").prop("disabled", false);
            },
            error: function (e) {
                console.log("ERROR : ", e);
                $("#btnSubmit").prop("disabled", false);
                alert("fail");
            }
        });
    });
}