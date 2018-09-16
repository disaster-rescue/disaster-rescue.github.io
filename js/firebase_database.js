var database = firebase.database();

function writeTo(path, value) {
    database.ref(path).set(value);
}

