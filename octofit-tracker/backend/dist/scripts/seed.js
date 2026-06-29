"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const models_1 = require("../models");
// Seed the octofit_db database with test data.
async function seed() {
    console.log('Seed the octofit_db database with test data');
    await (0, db_1.connectToDatabase)();
    await Promise.all([
        models_1.User.deleteMany({}),
        models_1.Team.deleteMany({}),
        models_1.Activity.deleteMany({}),
        models_1.LeaderboardEntry.deleteMany({}),
        models_1.Workout.deleteMany({}),
    ]);
    const users = await models_1.User.create([
        {
            name: 'Ada Lovelace',
            email: 'ada@example.com',
            role: 'captain',
            fitnessGoal: 'marathon training',
        },
        {
            name: 'Grace Hopper',
            email: 'grace@example.com',
            role: 'member',
            fitnessGoal: 'strength building',
        },
        {
            name: 'Katherine Johnson',
            email: 'katherine@example.com',
            role: 'member',
            fitnessGoal: 'mobility',
        },
    ]);
    await models_1.Team.create([
        {
            name: 'Velocity',
            sport: 'running',
            members: [users[0]._id, users[1]._id],
        },
        {
            name: 'Momentum',
            sport: 'cross-training',
            members: [users[2]._id],
        },
    ]);
    await models_1.Activity.create([
        {
            userId: users[0]._id,
            type: 'run',
            duration: 35,
            distance: 7.8,
            calories: 420,
            notes: 'Morning tempo run',
        },
        {
            userId: users[1]._id,
            type: 'strength',
            duration: 45,
            calories: 310,
            notes: 'Upper body focus',
        },
        {
            userId: users[2]._id,
            type: 'yoga',
            duration: 30,
            calories: 180,
            notes: 'Flow session',
        },
    ]);
    await models_1.LeaderboardEntry.create([
        { userId: users[0]._id, points: 1420, rank: 1 },
        { userId: users[1]._id, points: 1180, rank: 2 },
        { userId: users[2]._id, points: 1050, rank: 3 },
    ]);
    await models_1.Workout.create([
        {
            title: 'HIIT Sprint Circuit',
            difficulty: 'intermediate',
            duration: 25,
            focus: 'cardio',
            equipment: ['cones', 'timer'],
        },
        {
            title: 'Core and Mobility Flow',
            difficulty: 'easy',
            duration: 20,
            focus: 'mobility',
            equipment: ['mat'],
        },
    ]);
    console.log('Database seeded successfully');
    process.exit(0);
}
seed().catch((error) => {
    console.error('Seeding failed', error);
    process.exit(1);
});
