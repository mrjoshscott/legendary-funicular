"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./database");
const models_1 = require("./models");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.locals.apiBaseUrl = apiBaseUrl;
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', apiBaseUrl });
});
app.get('/api/config', (_req, res) => {
    res.json({ apiBaseUrl, port });
});
app.get(['/api/users', '/api/users/'], async (_req, res) => {
    const users = await models_1.User.find().lean();
    res.json(users);
});
app.post(['/api/users', '/api/users/'], async (req, res) => {
    const user = await models_1.User.create(req.body);
    res.status(201).json(user);
});
app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
    const teams = await models_1.Team.find().populate('members').lean();
    res.json(teams);
});
app.post(['/api/teams', '/api/teams/'], async (req, res) => {
    const team = await models_1.Team.create(req.body);
    res.status(201).json(team);
});
app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    const activities = await models_1.Activity.find().populate('userId').lean();
    res.json(activities);
});
app.post(['/api/activities', '/api/activities/'], async (req, res) => {
    const activity = await models_1.Activity.create(req.body);
    res.status(201).json(activity);
});
app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
    const leaderboard = await models_1.LeaderboardEntry.find().populate('userId').lean();
    res.json(leaderboard);
});
app.post(['/api/leaderboard', '/api/leaderboard/'], async (req, res) => {
    const entry = await models_1.LeaderboardEntry.create(req.body);
    res.status(201).json(entry);
});
app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
    const workouts = await models_1.Workout.find().lean();
    res.json(workouts);
});
app.post(['/api/workouts', '/api/workouts/'], async (req, res) => {
    const workout = await models_1.Workout.create(req.body);
    res.status(201).json(workout);
});
(0, database_1.connectToDatabase)()
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
