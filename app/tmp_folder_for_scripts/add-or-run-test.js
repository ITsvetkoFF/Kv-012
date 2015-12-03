/**
 * Created by okozytc on 03.12.2015.
 */
//run-test
$(document).onload(
    $("#run-test-bug").on("click", function () {
    $("#run-test-buttons").css({"display": "none"});
    $("#run-test-form").append("Now you will add bug description");
        var add_btn = $(button);
        add_btn.attr({"type": "button", "class": "btn btn-primary"});
        add_btn.text = "Button";
        $("#run-test-form").append(add_btn);
}));

//************************************************************************************
//************************************************************************************
//add-test-case
