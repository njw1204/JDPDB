window.onload = function () {
    $("#upload").click(function () {
        event.preventDefault();

        var form = $("#file-upload-form")[0];
        var data = new FormData(form);

        if (!$("#create-form")[0].checkValidity()) {
            $("#form-submit").click();
            return;
        }

        if (document.getElementById("profile-file").files.length > 0) {
            $("#create-form").prop("readonly", true);
            $("#file-upload-form").prop("readonly", true);
            $("#upload").prop("disabled", true);
            $.ajax({
                type: "POST",
                enctype: "multipart/form-data",
                url: "/file",
                data: data,
                processData: false,
                contentType: false,
                cache: false,
                timeout: 600000,
                success: function (data) {
                    $("#upload").prop("disabled", false);
                    $("#create-form").prop("readonly", false);
                    $("#file-upload-form").prop("readonly", false);
                    if (data.id) {
                        $("#profile").val(data.id);
                        $("#create-form").submit();
                    }
                    else {
                        alert("파일 업로드 실패");
                    }
                },
                error: function (e) {
                    $("#upload").prop("disabled", false);
                    $("#create-form").prop("readonly", false);
                    $("#file-upload-form").prop("readonly", false);
                    console.log(e);
                    alert("파일 업로드 실패");
                }
            });
        }
        else {
            $("#create-form").submit();
        }
    });
}
