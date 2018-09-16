var data = {
    "california": ["food", "water", "radio", "first-aid", "flashlight", "protective goggles"],
    "massachusetts": ["food", "water", "radio", "first-aid", "flashlight", "blankets"]
}

function onloadSave(){
  var winStorage = window.localStorage;
  var havesupplies = winStorage.getItem("havesupplies");
  console.log(havesupplies);
  var userId = sessionStorage.getItem("userid");
  firebase.database().ref('users/' + userId+'/supplies').set({
    have: supplieshave
  });
}

function generateSupplyList(val) {
    var listof = data['massachusetts'];
    doit(listof, val);
}

function doit(listof, supplies) {
    console.log(listof, supplies);

    for (var i = 0; i < listof.length; i++) {
        var data;
        if (supplies.includes(listof[i])) {
            data = "<li class='supply-item verified'><i>" + listof[i] + "</i> <i class='ti-check'></i></li>";
        } else {
            data = "<li class='supply-item'>" + listof[i] + "</li>";
        }
        $("#supplylist").append(data);
    }
}

function generateRequestedList(listof) {
    console.log(listof);
    for (var i = 0; i < listof.length; i++) {
        console.log(listof, listof[i]);
        var data = "<li class='supply-item'>" + listof[i] + "</li>";
        $(".requested").append(data);
    }
}

$(function() {
    var userid = localStorage.getItem('userid');
    var winStorage = window.localStorage;
    var havesupplies = winStorage.getItem("havesupplies");

    $("#sendit").click(function(){
        var txtval = $("#itemreq").val();
        $("#itemreq").val("");
        var data = "<li class='supply-item'>" + txtval + "</li>";
        $(".requested").append(data);
    });
    
    var data = {
        "california": ["food", "water", "radio", "first-aid", "flashlight", "protective goggles"],
        "massachusetts": ["food", "water", "radio", "first-aid", "flashlight", "blankets"]
    }
    var database = firebase.database();
    firebase.database().ref('states').once('value').then(function(snapshot) {
        if (snapshot.exists()) {
            data = snapshot.val();
            console.log(data);
        }
    });
    firebase.database().ref('/users/' + userid + "/name").once('value').then(function(snapshot) {
        if (snapshot.exists()) {
            var valu = snapshot.val();
            $("#heythere").html("Hey there, " + valu + ". Welcome back!");
        }
    });
    firebase.database().ref('/users/' + userid + "/supplies").once('value').then(function(snapshot) {
        var vals = [];
        if (snapshot.exists()) {
            var counts = [];
            snapshot.forEach(function(item) {
                var itemVal = item.val();
                console.log(itemVal);
                vals.push(itemVal);
            });
        }
        generateSupplyList(vals);
    });
    firebase.database().ref('/users/' + userid + "/requested").once('value').then(function(snapshot) {
        var vals = [];
        if (snapshot.exists()) {
            var counts = [];
            snapshot.forEach(function(item) {
                var itemVal = item.val();
                console.log(itemVal);
                vals.push(itemVal);
            });
        }
        generateRequestedList(vals);
    });


    Chart.defaults.scale.gridLines.display = false;
    var ctx = document.getElementById('bar-chart').getContext('2d');
    var bar = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Earthquakes", "Drought", "Wildfire"],
            datasets: [{
                label: "supplies owned / supplies needed",
                backgroundColor: ["#E87B48", "#4EA171", "#E8AD42"],
                data: [0.20, 0.60, 0.40]
            }]
        },
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Preparedness level'
            },
            xAxes: [{
                ticks: {
                    beginAtZero: true
                },
                gridLines: {
                    display: "none",
                }
            }],
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        min: 0
                    }
                }]
            },
            yAxes: [{

                gridLines: {
                    display: "none",
                }
            }]
        }
    });

});