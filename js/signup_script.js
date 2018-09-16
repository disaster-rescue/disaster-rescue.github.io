//""signs up""" the user
var loc;
var user;
var database = firebase.database();

function signup(userid, name, password) {
    if("userid"==="") return;
    user = userid;
    database.ref("users/" + userid).set({
        name: name,
        password: password,
        setup: false
    });
    console.log("signed up!");
    $(".panel").hide();
    $(".location").show();
    $(".confirm").hide();
    $("#register-header").html("Fetching Location...");
    initialize();
}

function foundLocation(cityname, lat, lang){
    console.log(cityname, lat, lang);
    $(".loader").hide();
    $(".confirm").show();
    $("#register-header").html("Location Found!");
    $(".info").html("Looks like you are located in " + cityname + ". Is this correct?"); 
    loc = {
        name: cityname,
        lat: lat,
        lang: lang
    };
}

function checkUser(userid) {
    firebase.database().ref('/users/' + userid).once('value').then(function(snapshot) {
        if (snapshot.exists()) {
            var val = snapshot.val();
            console.log(val);
            if (val.setup) {
                goToDashboard(userid);
            } else {
                goToSetup(userid);
            }
        } else {
            signalNoUser();
        }
    });
}

function goToDashboard(userid) {
    window.localStorage.setItem("userid", userid);
    window.location.href = 'https://disaster-rescue.github.io/dashboard/template.html'
    //alert(userid + " going to dashboard");
}

function goToSetup(userid) {
    window.localStorage.setItem("userid", userid);
    //should go to "chatbot"
    window.localStorage.setItem("name",name);
    window.location.href = 'http://localhost:3000/'
}

function signalNoUser() {
    alert("Failed to log in! User does not exist.");
}

$(function() {
    $.fn.extend({
        toggleText: function(a, b) {
            return this.text(this.text() == b ? a : b);
        }
    });

    var login = window.localStorage.getItem("login");
    console.log(login);
    
    if(login!=null && login === "true"){
        $(".location").hide();
        $("#register").hide();
        $("#register-header").hide();
        $("#signin").show();
        $("#signin-header").show();
        $("#inputName").hide();
        $("#toggle").html('Make a new account');

    } else{

        $(".location").hide();
        $("#register").show();
        $("#register-header").show();
        $("#signin").hide();
        $("#signin-header").hide();
        $("#inputName").show();
        $("#toggle").html('Already have an account?');
    }
    

    $('#toggle').click(function() {
        $('#register').toggle();
        $('#signin').toggle();
        $("#register-header").toggle();
        $("#signin-header").toggle();
        $('#inputName').fadeToggle("slow", "linear");
        $("#toggle").toggleText('Already have an account?', 'Make a new account');
    })

    //event listeners
    $("#register").click(function() {
        var userid = $("#inputPhone").val();
        var password = $("#inputPassword").val();
        var name = $("#inputName").val();
        window.localStorage.setItem("name",name);
        signup(userid, name, password);
    });

    $('#signin').click(function() {
        var userid = $("#inputPhone").val();
        checkUser(userid);
    })

    $('#yes').click(function() {
        //do stuff to nagivate to set up
        database.ref("users/" + user + "/location").set(loc);
        window.localStorage.setItem("location",loc["name"]);
        window.localStorage.setItem("userid", user);
        console.log(window.localStorage);
    })
});