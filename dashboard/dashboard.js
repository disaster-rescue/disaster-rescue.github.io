var data = {
        "california": ["food", "water", "radio", "first-aid", "flashlight", "protective goggles"],
        "massachusetts": ["food", "water", "radio", "first-aid", "flashlight", "blankets"]
    }
function generateSupplyList(val) {
    var listof = data['massachusetts'];
    doit(listof, val);
}

function doit(listof, supplies){
    
    for (var i = 0; i < listof.length; i++) {
        var data;
        if(supplies.includes(listof[i])){
            data = "<li class='supply-item verified'><i>" + listof[i] + "</i> <i class='ti-check'></i></li>";
        } else {
            data = "<li class='supply-item'>" + listof[i] + "</li>";
        }
        $("#supplylist").append(data);
    }
}

function generateRequestedList(val){
    
    for (var i = 0; i < listof.length; i++) {
        var data;
        if(supplies.includes(listof[i])){
            data = "<li class='supply-item verified'><i>" + listof[i] + "</i> <i class='ti-check'></i></li>";
        } else {
            data = "<li class='supply-item'>" + listof[i] + "</li>";
        }
        $("#supplylist").append(data);
    }
}

$(function() {
    var userid = sessionStorage.getItem('userid');

    var data = {
        "california": ["food", "water", "radio", "first-aid", "flashlight", "protective goggles"],
        "massachusetts": ["food", "water", "radio", "first-aid", "flashlight", "blankets"]
    }
    var database = firebase.database();
    firebase.database().ref('/users/' + userid + "/name").once('value').then(function(snapshot) {
        if (snapshot.exists()) {
            var valu = snapshot.val();
            $("#heythere").html("Hey there, " + valu + ". Welcome back!");    
        }
    });
    firebase.database().ref('/users/' + userid + "/supplies").once('value').then(function(snapshot) {
        if (snapshot.exists()) {
            var counts = [];
            var vals = [];
            snapshot.forEach(function(item) {
                var itemVal = item.val();
                console.log(itemVal);
                vals.push(itemVal);
            });
            generateSupplyList(vals);
        } else {
            //do nothing
        }
    });

});