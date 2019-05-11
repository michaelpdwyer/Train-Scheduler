$("document").ready(function () {

    // Initialize Firebase
    var firebaseConfig = {
        apiKey: "AIzaSyAp_5Q37TLqwquuUl-DtzJRbZ_63TMkWeE",
        authDomain: "train-scheduler-6835d.firebaseapp.com",
        databaseURL: "https://train-scheduler-6835d.firebaseio.com",
        projectId: "train-scheduler-6835d",
        storageBucket: "train-scheduler-6835d.appspot.com",
        messagingSenderId: "551960596710",
        appId: "1:551960596710:web:7f1e758096db4057"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Variable for database
    var trainData = firebase.database();

    var trainName = "";
    var destination = "";
    var firstTrain = "";
    var frequency = 0;

    var timeFormat = "hh:mm";

    $("#addTrainBtn").on("click", function (event) {
        event.preventDefault();

        trainName = $("#trainNameInput").val().trim();
        destination = $("#destinationInput").val().trim();
        firstTrain = $("#firstTrainInput").val().trim();
        frequency = $("#frequencyInput").val().trim();
        console.log(trainName);

        firstTrain = moment(firstTrain, timeFormat).format(timeFormat);


        var newTrain = {
            name: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
        };

        trainData.ref().push(newTrain);

        alert("You added a train!");

        $("#trainNameInput").val("");
        $("#destinationInput").val("");
        $("#firstTrainInput").val("");
        $("#frequencyInput").val("");


        return false;

    });

    trainData.ref().on("child_added", function (snapshot) {
        var name = snapshot.val().name;
        var destination = snapshot.val().destination;
        var frequency = snapshot.val().frequency;
        var firstTrain = snapshot.val().firstTrain;

        var remainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
        var minutes = frequency - remainder;
        console.log(minutes);
        var arrival = moment().add(minutes, "m").format("hh:mm A");

        $("#trainTable > tBody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");
    });
});