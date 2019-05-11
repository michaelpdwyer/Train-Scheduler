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

  $("#addTrainBtn").on("click", function(){
    

    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10,"years").format("X");
    var frequency = $("#frequencyInput").val().trim();

   
    var newTrain = {
      name: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    }

    trainData.ref().push(newTrain);

    alert("Your train is added!");

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

    
    return false;

  });

  trainData.ref().on("child_added", function(snapshot) {
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain), "minutes")%frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes,"m").format("hh:mm A");

    $("#trainTable > tBody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");
  });