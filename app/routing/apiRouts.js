//Import dependencies
var path = require("path");
var friends = require("../data/friends.js");

//function that returns the index of the smallest element in an array
function minIndex(arr){
    var minimum = arr[0];
    var index;

    for(var i = 1; i < arr.length; i++){
        if(arr[i] < minimum){
            minimum = arr[i];
            index = i
        };
    };

    return index;
};

// Function that returns an array of the differences between the user and the friends stored on the server
function compareFriends(friendsArr, userObj){
    var diffs = [];
    for(i in friendsArr){
        var diff = 0;
        for(k in userObj.scores){
            diff += Math.abs(friends[i].scores[k] - userObj.scores[k]); 
        }
        diffs.push(diff);
    }
    return diffs;
}


module.exports = function(app){

    app.get("/api/friends", function(req, res){

        res.json(friends);
    });

    app.post("/api/friends", function(req, res){

        var diffs = compareFriends(friends, req.body)
 
        res.send(friends[minIndex(diffs)]);

    });
};