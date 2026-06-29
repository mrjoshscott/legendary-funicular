import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

const users = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@example.com', role: 'captain' },
];

const teams = [
  { id: 1, name: 'Velocity', members: [1] },
];

const activities = [
  { id: 1, userId: 1, type: 'run', duration: 30, distance: 5.2 },
];

const leaderboard = [
  { id: 1, userId: 1, points: 1200, rank: 1 },
];

const workouts = [
  { id: 1, title: 'HIIT Sprint', difficulty: 'intermediate', duration: 25 },
];

app.locals.apiBaseUrl = apiBaseUrl;

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', apiBaseUrl });
});

app.get('/api/config', (_req, res) => {
  res.json({ apiBaseUrl, port });
});

app.get(['/api/users', '/api/users/'], (_req, res) => {
  res.json(users);
});

app.post(['/api/users', '/api/users/'], (req, res) => {
  const user = { id: Date.now(), ...req.body };
  users.push(user);
  res.status(201).json(user);
});

app.get(['/api/teams', '/api/teams/'], (_req, res) => {
  res.json(teams);
});

app.post(['/api/teams', '/api/teams/'], (req, res) => {
  const team = { id: Date.now(), ...req.body };
  teams.push(team);
  res.status(201).json(team);
});

app.get(['/api/activities', '/api/activities/'], (_req, res) => {
  res.json(activities);
});

app.post(['/api/activities', '/api/activities/'], (req, res) => {
  const activity = { id: Date.now(), ...req.body };
  activities.push(activity);
  res.status(201).json(activity);
});

app.get(['/api/leaderboard', '/api/leaderboard/'], (_req, res) => {
  res.json(leaderboard);
});

app.post(['/api/leaderboard', '/api/leaderboard/'], (req, res) => {
  const entry = { id: Date.now(), ...req.body };
  leaderboard.push(entry);
  res.status(201).json(entry);
});

app.get(['/api/workouts', '/api/workouts/'], (_req, res) => {
  res.json(workouts);
});

app.post(['/api/workouts', '/api/workouts/'], (req, res) => {
  const workout = { id: Date.now(), ...req.body };
  workouts.push(workout);
  res.status(201).json(workout);
});

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

mongoose
  .connect(mongoUri)
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
