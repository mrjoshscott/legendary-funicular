import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './db';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

dotenv.config();

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

app.locals.apiBaseUrl = apiBaseUrl;

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', apiBaseUrl });
});

app.get('/api/config', (_req, res) => {
  res.json({ apiBaseUrl, port });
});

app.get(['/api/users', '/api/users/'], async (_req, res) => {
  const users = await User.find().lean();
  res.json(users);
});

app.post(['/api/users', '/api/users/'], async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
  const teams = await Team.find().populate('members').lean();
  res.json(teams);
});

app.post(['/api/teams', '/api/teams/'], async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json(team);
});

app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
  const activities = await Activity.find().populate('userId').lean();
  res.json(activities);
});

app.post(['/api/activities', '/api/activities/'], async (req, res) => {
  const activity = await Activity.create(req.body);
  res.status(201).json(activity);
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find().populate('userId').lean();
  res.json(leaderboard);
});

app.post(['/api/leaderboard', '/api/leaderboard/'], async (req, res) => {
  const entry = await LeaderboardEntry.create(req.body);
  res.status(201).json(entry);
});

app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
  const workouts = await Workout.find().lean();
  res.json(workouts);
});

app.post(['/api/workouts', '/api/workouts/'], async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json(workout);
});

connectToDatabase()
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Backend listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  });
