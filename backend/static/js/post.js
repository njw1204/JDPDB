function showImage(file, e, idx) {
    var id = "file-idx-" + idx;
    var template = '<div id="' + id + '" class="file-upload-content"><img class="file-upload-image" src="#" alt="your image"/><span class="image-title">Uploaded Images</span>  <div class="image-title-wrap"> </div></div>';
    var reader = new FileReader();

    reader.onload = function (e) {
        var elem = document.createElement("div");
        elem.innerHTML = template.trim();
        document.getElementById("uploads").appendChild(elem);

        $('#uploads #' + id + ' .file-upload-image').attr('src', e.target.result);
        $('#uploads #' + id).show();
        $('#uploads #' + id + ' .image-title').html(file.name);
    }

    reader.readAsDataURL(file);
}

function readURL(input) {
    if (!input.files || input.files.length < 1)
        return;

    $('.image-upload-wrap').hide();

    var i = 0;
    for (var file of input.files) {
        if (file) {
            var reader = new FileReader();

            reader.onload = function (file, i) {
                return function (e) {
                    showImage(file, e, i);
                };
            }(file, i);

            reader.readAsDataURL(file);
        }
        i++;
    }

    $('#remove-btn').css("visibility", "visible");
}

function removeUpload() {
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
    $('#uploads').html("");
    $('.image-upload-wrap').removeClass('image-dropping');
    $('#remove-btn').css("visibility", "hidden");
}

$('.image-upload-wrap').bind('dragover', function () {
    $('.image-upload-wrap').addClass('image-dropping');
});

$('.image-upload-wrap').bind('dragleave', function () {
    $('.image-upload-wrap').removeClass('image-dropping');
});
