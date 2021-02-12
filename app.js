$(function () {
    $(".invalid-feedback").hide();
    let edit = false;
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
                            <a class="btn btn-warning">
                                <i class="fas fa-marker"></i>
                            </a>
                            <a class="btn btn-danger">
                                <i class="far fa-trash-alt"></i>
                            </a>
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
        e.preventDefault();
        if (checkTextBox()) {
            const postCategory = {
                name: $("#cat-name").val(),
                description: $("#cat-description").val(),
                id: $("#cat-id").val()
            };
            const url = edit === false ? 'add-category.php' : 'update-category.php';
            $.post(url, postCategory, function (response) {
                edit === false ? $.jGrowl(response, { life: 2500, theme: 'add' }) : $.jGrowl(response, { life: 2500, theme: 'update' });
               // $.jGrowl(response, { life: 2500, theme: 'add' });
                $("#form-cat").trigger("reset");
                fetchCategory();
                edit=false;
            });
        }
    });

    // List a category
    function fetchCategory() {
        $.ajax({
            url: "list-category.php",
            type: "GET",
            success: function (response) {
                let categories = JSON.parse(response);
                let template = "";
                categories.forEach((category) => {
                    template += `
                    <tr categoryId="${category.Id}">
                        <td>${category.Id}</td>
                        <td>${category.Name}</td>
                        <td>${category.Description}</td>
                        <td>
                            <button class="edit btn btn-warning">
                                <i class="fas fa-marker"></i>
                            </button>
                            <button class="delete btn btn-danger">
                                <i class="far fa-trash-alt"></i>
                            </button>
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

    $(document).on("click", ".delete", (e) => {
        if (confirm('Are you sure you want to delete it?')) {
            const element = $(this)[0].activeElement.parentElement.parentElement;
            const id = $(element).attr("categoryId");
            console.log(element);
            $.post("delete-category.php", { id }, (response) => {

                $.jGrowl(response, { life: 2500, theme: 'delete' });
                fetchCategory();
            });
        }
    });


    $(document).on("click", ".edit", (e) => {
        //if (confirm('Are you sure you want to delete it?')) {
        //e.preventDefault
         
        const element = $(this)[0].activeElement.parentElement.parentElement;
        let id = $(element).attr("categoryId");

        $.post("single-category.php", {id}, (response) =>{
            console.log(response);
            let category = JSON.parse(response);
            $('#cat-id').val(category.Id);
            $('#cat-name').val(category.Name);
            $('#cat-description').val(category.Description);
            edit = true;
        });
        e.preventDefault();
        
    });
});
