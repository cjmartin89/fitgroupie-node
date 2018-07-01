"use strict"
function Workout (activityLevel, latitude, longitude, 
                workoutAddress, workoutDuration, workoutName,
                workoutTime, workoutType) {
                    this.activityLevel = activityLevel,
                    this.latitude = latitude,
                    this.longitude = longitude,
                    this.workoutAddress = workoutAddress,
                    this.workoutDuration = workoutDuration,
                    this.workoutName = workoutName,
                    this.workoutTime = workoutTime,
                    this.workoutType = workoutType
}


module.exports = {
    Workout
};