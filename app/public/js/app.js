// Object that will store user data and answers
var user = {
    name: "",
    photo: "",
    scores: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}

$(document).ready(function(){

    $(".answer").on("click", function(ev){

        // loop through sibling divs, if the "missed" class is present, remove it and add the the btn-default class
        // also and remove "btn-primary" class 
        $(this).siblings().each(function(){
            if($(this).attr("class").includes("missed")){
                $(this).removeClass("missed")
                $(this).addClass("btn-default")
            };
            $(this).removeClass("btn-primary");
        });

        // Add class to selected button
        $(this).addClass("btn-primary");

        // grab question number and user answer
        var question = parseInt($(this).parent().attr("id").replace("q", "")) - 1;
        var answer = parseInt($(this).html());
        
        //set appropriate array element equal to the answer provided by user
        user.scores[question] = answer

    });

    $("#submit").on("click", function(){

        // Grab user input from form
        user.name = $("#name").val();
        user.photo = $("#photo").val();


        var validInput = true;

        // Ensure that all user questions have been answered by user
        if(user.name === ""){
            validInput = false;
            $("#name").addClass("missed");
            $("#name").attr("placholder", "Name is a required feild")
        }
        if(user.photo === ""){
            validInput = false;
            $("#photo").addClass("missed");
            $("#photo").attr("placholder", "Photo is a required feild")
        }
        for(i in user.scores){
            if(user.scores[i] === 0){
                validInput = false;
                let id = "#q" + (parseInt(i) + 1).toString()

                $(id).children().each(function(){
                    $(this).removeClass("btn-default");
                    $(this).addClass("missed");
                });

            }
        }
        if(validInput){
            $.post("api/friends", user).done(function(data){

                // Capitalize first letter in each word of data.name
                var nameArr = data.name.split(" ");
                nameArr.forEach(function(element, index, arr){
                    arr[index] = arr[index][0].toUpperCase() + arr[index].slice(1, arr[index].length);
                });
                var name = nameArr.join(" ");
                
                // Insert relevant data into modal and show modal;
                $("#new_best_friend").html(name);
                $("#friend_img").attr("src", data.photo);
                $(".modal").modal("toggle");
            });
        };
    });
});