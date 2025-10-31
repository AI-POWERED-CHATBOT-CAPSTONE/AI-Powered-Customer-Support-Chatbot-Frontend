"use server"

import { connect } from 'mongoose';
import {UserModel} from "@/database/models/user-model";
import {ai, tempStudent, tempSupport} from "@/lib/constants";

const connection = process.env.MONGO_DB_CONNECTION

let isConnected = false; // global connection state

export async function connectDB() {

    if (isConnected) {
        console.log("Database: Already Connected!!!");
        return
    }

    console.log("Database: Connecting...");

    try {
        const db = await connect(connection || "");
        isConnected = !!db.connections[0].readyState;
        console.log("✅ Database connected successfully");
        // --- Optional: seed users once on first connection ---
        await ensureSeedData();

    } catch (err) {
        console.error("❌ Database connection failed:", err);
    }
}


async function ensureSeedData() {
    console.log("Seeding initial users...");

    const usersToCreate = [
        { name: "MUNGPT", ...ai },
        { name: "Dominic", ...tempStudent },
        { name: "Sarah", ...tempSupport },
    ];

    for (const user of usersToCreate) {
        const existing = await UserModel.findOne({ extId: user.extId }).lean();
        if (!existing) {
            await UserModel.create(user).catch(console.error);
        }
    }
}


await connectDB().catch(console.error);

