$(function () {
    $(".invalid-feedback").hide();
    $("#alert-msg").hide();
    fetchCategory();

    // SEARCH CHANGE TEXT
    $("#search").keyup(function () {
        if ($("#search").val()) {
            let search = $("#search").val();
            $.ajax({
                url: "search-category.php",
                type: "POST",
                data: { search },
                success: function (response) {
                    let categories = JSON.parse(response);
                    let template = "";
                    categories.forEach((category) => {
                        template += `
                    <tr >
                        <td>${category.Id}</td>
                        <td>${category.Name}</td>
                        <td>${category.Description}</td>
                        <td>
                            <a>edit</a>
                            <a>delete</a>
                        </td>
                    </tr>
                    `;
                    });
                    $("#tb-category").html(template);
                },
            });
        } else {
            fetchCategory();
        }
    });

    // ADD CATEGORY
    $("#form-cat").submit(function (e) {
        if (checkTextBox()) {
            console.log("Enviado..");
            viewAlert('alert alert-darnger fade show')

            e.preventDefault();


        } else {
            e.preventDefault();
        }
        /*
            if(($('#cat-name').val()) && ($('#cat-description').val())){
                console.log('Enviado..');
                const postCategory = {
                    name: $('#cat-name').val(),
                    description: $('#cat-description').val()
                };
                $.post('add-category.php', postCategory, function (response) {
                    fetchCategory();
                    $('#form-cat').trigger('reset');
                    $('#message').html(response);
                })
                
                
               e.preventDefault();
                $('.invalid-feedback').hide();
                $('#cat-name').removeClass('is-invalid')
    
            }else{
                $('.invalid-feedback').show();
                $('#cat-name').addClass('is-invalid')
                e.preventDefault();
            }
            */
    });

    // LIST CATEGORY
    function fetchCategory() {
        $.ajax({
            url: "list-category.php",
            type: "GET",
            success: function (response) {
                let categories = JSON.parse(response);
                let template = "";
                categories.forEach((category) => {
                    template += `
                    <tr >
                        <td>${category.Id}</td>
                        <td>${category.Name}</td>
                        <td>${category.Description}</td>
                        <td>
                            <a>edit</a>
                            <a>delete</a>
                        </td>
                    </tr>
                    `;
                });
                $("#tb-category").html(template);
            },
        });
    }

    //Show message if there are empty fields inside the labels
    function checkTextBox() {
        if ($("#cat-name").val() && $("#cat-description").val()) {
            $("#cat-name").removeClass("is-invalid");
            $("#cat-description").removeClass("is-invalid");
            return true;
        } else {
            if ($("#cat-name").val()) {
                $("#cat-name").removeClass("is-invalid");
                if ($("#cat-description").val()) {
                    $("#cat-description").removeClass("is-invalid");
                }
            } else {
                if ($("#cat-description").val()) {
                    $("#cat-description").removeClass("is-invalid");
                    if ($("#cat-name").val()) {
                        $("#cat-name").removeClass("is-invalid");
                    }
                }
            }

            if (!$("#cat-name").val()) {
                $("#cat-name").addClass("is-invalid");
                if (!$("#cat-description").val()) {
                    $("#cat-description").addClass("is-invalid");
                }
            } else {
                if (!$("#cat-description").val()) {
                    $("#cat-description").addClass("is-invalid");
                    if (!$("#cat-name").val()) {
                        $("#cat-name").addClass("is-invalid");
                    }
                }
            }
            return false;
        }
    }

    //Show alert for each action
    function viewAlert(type) {

        $("#alert-msg").addClass(type);
        $("#alert-msg").fadeTo(2000, 500).slideUp(500, function () {
            $("#alert-msg").slideUp(500);
        });

    }
});
