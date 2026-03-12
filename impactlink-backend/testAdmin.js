const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const { getAllCampaigns, getAllUsers, getAllDonations } = require("./controllers/admindashController");

const runTest = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB.");
        
        // Mock res object
        const createRes = () => {
            return {
                json: function(data) {
                    console.log("Result length:", data.length);
                    // console.log(data);
                },
                status: function(code) {
                    console.log("Status:", code);
                    return this;
                }
            };
        };
        
        const req = {}; // empty
        
        console.log("Testing campaigns...");
        await getAllCampaigns(req, createRes());
        
        console.log("Testing users...");
        await getAllUsers(req, createRes());
        
        console.log("Testing donations...");
        await getAllDonations(req, createRes());
        
    } catch (e) {
        console.error("Error:", e);
    } finally {
        await mongoose.disconnect();
    }
};

runTest();
