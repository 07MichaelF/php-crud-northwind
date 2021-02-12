$(function () {
    $(".invalid-feedback").hide();
    //$("#alert").hide();
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
            };
            $.post("add-category.php", postCategory, function (response) {
                $.jGrowl(response, { life: 2500, theme: 'add' });

                $("#form-cat").trigger("reset");
                fetchCategory();
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
                            <button id="${category.Id}" class="delete btn btn-danger">
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
        //if (confirm('Are you sure you want to delete it?')) {
        const element = $(this)[0].activeElement.parentElement.parentElement;
        const id = $(element).attr("categoryId");
        $.post("delete-category.php", { id }, (response) => {

            $.jGrowl(response, { life: 2500, theme: 'delete' });
            fetchCategory();
        });

        //   }
    });
});
