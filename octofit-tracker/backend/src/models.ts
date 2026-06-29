import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    fitnessGoal: { type: String },
  },
  { timestamps: true },
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    sport: { type: String },
  },
  { timestamps: true },
);

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    distance: { type: Number },
    calories: { type: Number },
    notes: { type: String },
  },
  { timestamps: true },
);

const leaderboardSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
  },
  { timestamps: true },
);

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    difficulty: { type: String, required: true },
    duration: { type: Number, required: true },
    focus: { type: String },
    equipment: [{ type: String }],
  },
  { timestamps: true },
);

export const User = mongoose.models.User || model('User', userSchema);
export const Team = mongoose.models.Team || model('Team', teamSchema);
export const Activity = mongoose.models.Activity || model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.models.LeaderboardEntry || model('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.models.Workout || model('Workout', workoutSchema);
