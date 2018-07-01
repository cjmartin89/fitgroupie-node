const workoutModel = require('./models/workoutsModel');
const mActivityLevels = require('./data/manageActivityLevels');
const mWorkoutTypes = require('./data/manageWorkoutTypes');

const firebase = require('firebase-admin');

var serviceAccount = require('./serviceAccountKey.json');

// Initialize the default app
var app = firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://fitgroupie.firebaseio.com/'
});

//Firebase DB References
var dbActivityLevelRef = firebase.database().ref().child("Activity Level");
var dbWorkoutTypesRef = firebase.database().ref().child("Workout Types");
var dbWorkoutsRef = firebase.database().ref().child('Workouts');

//Data Arrays
var activityLevels = [];
var workoutTypes = [];
var workouts = [{}];

//Update Activity Levels

function retrieveActivityLevels () {
    dbActivityLevelRef.on('child_added', function(snapshot) {
        activityLevels.push(snapshot.val());
        console.log(`"${snapshot.val()}" Activity Level Added`)
    });
}

dbActivityLevelRef.on('child_removed', function(snapshot) {
    activityLevels = [];
    retrieveActivityLevels();
    console.log(`"${snapshot.val()}" Activity Level Removed`);
});

dbActivityLevelRef.on('child_changed', function(snapshot) {
    activityLevels = [];
    retrieveActivityLevels();
    console.log(`"${snapshot.val}" Activity Level Changed`)
});

// Update Workout Types

function retrieveWorkoutTypes () {
    dbWorkoutTypesRef.on('child_added', function(snapshot) {
        workoutTypes.push(snapshot.val());
        console.log(`Workout Type Added: ${snapshot.val()}`)
    });
}

dbWorkoutTypesRef.on('child_removed', function(snapshot) {
    workoutTypes = [];
    console.log(`Workout Type Removed ${snapshot.val()}`)
    retrieveWorkoutTypes();
});

dbWorkoutTypesRef.on('child_changed', function(snapshot) {
    workoutTypes = [];
    retrieveWorkoutTypes();

    setTimeout(() => {
        console.log(`Workout Types: ${workoutTypes}`)
    }, 2000);
});

//Update Workouts

function retrieveWorkouts() {
    dbWorkoutsRef.on('child_added', function(snapshot) {
        workouts.push(snapshot.val());
        console.log(`Workout Added`);
    });
};

dbWorkoutsRef.on('child_removed', function(snapshot) {
    workouts = [];
    retrieveWorkouts();
    console.log(`Workout Removed`);
});

dbWorkoutsRef.on('child_changed', function(snapshot) {
    workouts = [];
    retrieveWorkouts();
    console.log(`Workout Changed`);
});

// Add Workout

var newWorkout = new workoutModel.Workout('Professional', '25.793244', '-80.136165', '1755 meridian ave,Miami Beach,FL', 
                                    90, 'Node Js Test', '2018-06-21 20:00:02 +0000', 'American Football')

const workoutDictionary = {'Workout Name' : newWorkout.workoutName,
                            'Workout Type' : newWorkout.workoutType,
                            'Workout Address' : newWorkout.workoutAddress,
                            'Workout Time' : newWorkout.workoutTime,
                            'Workout Duration' : newWorkout.workoutDuration,
                            'Latitude' : newWorkout.latitude,
                            'Longitude' : newWorkout.longitude,
                            'Activity Level' : newWorkout.activityLevel
}


function addWorkout (workoutDictionary)  {
    dbWorkoutsRef.push().set(workoutDictionary, function(error) {
        if(error) {
            console.log('Unable to save workout!');
        } else {
            console.log(`Saved workout successfully!`);
        };
    });
}

//Function Calls

retrieveActivityLevels();
retrieveWorkoutTypes();
retrieveWorkouts();
addWorkout(workoutDictionary);


var getData = setTimeout(() => {
                console.log(`Activity Levels: ${activityLevels} Workout Types: ${workoutTypes}`)
                for (var workout in workouts) {
                    console.log(workouts[workout]);
                }
            }, 2000);

module.exports = {
    app,
    serviceAccount,
    dbActivityLevelRef 
}


