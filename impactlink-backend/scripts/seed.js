/**
 * ImpactLink — Database Seed Script
 * 
 * Drops all collections and creates realistic demo data:
 *   - 1 admin account
 *   - 6 users with full profiles
 *   - 8 campaigns (various statuses & progress)
 *   - 20+ donations linking users to campaigns
 *   - 5 contact form submissions
 * 
 * Usage: node scripts/seed.js
 */

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Models
const User = require("../models/User");
const Admin = require("../models/Admin");
const Campaign = require("../models/Campaign");
const Donation = require("../models/Donation");
const Contact = require("../models/Contact");
const Payment = require("../models/Payment");
const Token = require("../models/Token");

const MONGO_URI = process.env.MONGO_URI;

// ─── Helper ───
const daysFromNow = (d) => new Date(Date.now() + d * 86400000);
const daysAgo = (d) => new Date(Date.now() - d * 86400000);

async function seed() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("📦 Connected to MongoDB\n");

        // ═══════ DROP ALL COLLECTIONS ═══════
        console.log("🗑️  Dropping all collections...");
        const collections = ["users", "admins", "campaigns", "donations", "payments", "contacts", "tokens"];
        for (const name of collections) {
            try {
                await mongoose.connection.db.dropCollection(name);
                console.log(`   ✓ Dropped ${name}`);
            } catch (e) {
                // Collection doesn't exist yet, skip
            }
        }
        console.log("");

        // ═══════ ADMIN ═══════
        console.log("👤 Creating admin...");
        const admin = new Admin({ username: "admin", password: "admin123" });
        await admin.save();
        console.log("   ✓ admin / admin123\n");

        // ═══════ USERS ═══════
        console.log("👥 Creating users...");
        const usersData = [
            {
                name: "Atharva Shivari",
                email: "shivariatharva@gmail.com",
                password: "password123",
                bio: "Full-stack developer and founder of ImpactLink. Building technology to drive social change.",
                phone: "+91 99999 00000",
                avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
                settings: { emailNotifications: true, darkMode: false },
            },
            {
                name: "Priya Sharma",
                email: "priya@example.com",
                password: "password123",
                bio: "Social entrepreneur passionate about rural education. Founded two NGOs in Rajasthan.",
                phone: "+91 98765 43210",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
                settings: { emailNotifications: true, darkMode: false },
            },
            {
                name: "Arjun Patel",
                email: "arjun@example.com",
                password: "password123",
                bio: "Tech lead by day, environmental activist by evening. Believes in sustainable development.",
                phone: "+91 87654 32109",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                settings: { emailNotifications: true, darkMode: true },
            },
            {
                name: "Meera Krishnan",
                email: "meera@example.com",
                password: "password123",
                bio: "Doctor working in underserved communities. Running medical camps across Tamil Nadu since 2019.",
                phone: "+91 76543 21098",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
                settings: { emailNotifications: false, darkMode: false },
            },
            {
                name: "Rohan Gupta",
                email: "rohan@example.com",
                password: "password123",
                bio: "Freelance designer who volunteers for disaster relief coordination. Based in Mumbai.",
                phone: "+91 65432 10987",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
                settings: { emailNotifications: true, darkMode: false },
            },
            {
                name: "Ananya Desai",
                email: "ananya@example.com",
                password: "password123",
                bio: "Award-winning journalist covering social impact stories. Amplifying voices that need to be heard.",
                phone: "+91 54321 09876",
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
                settings: { emailNotifications: true, darkMode: true },
            },
            {
                name: "Vikram Singh",
                email: "vikram@example.com",
                password: "password123",
                bio: "Retired army officer dedicated to supporting veteran welfare and children's education in border areas.",
                phone: "+91 43210 98765",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                settings: { emailNotifications: false, darkMode: false },
            },
        ];

        const users = [];
        for (const data of usersData) {
            const user = new User(data);
            await user.save();
            users.push(user);
            console.log(`   ✓ ${data.name} (${data.email})`);
        }
        console.log("   All passwords: password123\n");

        // ═══════ CAMPAIGNS ═══════
        console.log("🎯 Creating campaigns...");
        const campaignsData = [
            {
                title: "Clean Water for 500 Villages in Rajasthan",
                description: "Access to clean drinking water remains a critical challenge in rural Rajasthan. Our initiative aims to install solar-powered water purification systems in 500 villages, serving over 200,000 people. Each system costs ₹25,000 and can purify 10,000 litres daily. We've already piloted this in 12 villages with a 98% satisfaction rate. The purifiers use UV filtration technology that requires minimal maintenance. Local communities are trained to operate and maintain the units, creating sustainable impact.",
                goalAmount: 500000,
                raisedAmount: 347500,
                creator: users[0]._id,
                image: "https://images.unsplash.com/photo-1541544741938-0af808871c12?w=800&auto=format&fit=crop",
                startDate: daysAgo(45),
                endDate: daysFromNow(45),
                status: "active",
                backers: [
                    { user: users[1]._id, amount: 25000 },
                    { user: users[2]._id, amount: 50000 },
                    { user: users[3]._id, amount: 15000 },
                    { user: users[4]._id, amount: 100000 },
                    { user: users[5]._id, amount: 75000 },
                ],
            },
            {
                title: "Digital Classrooms for Government Schools",
                description: "Bridging the digital divide in education. We are equipping 200 government schools across Karnataka with tablets, projectors, and internet connectivity. Each classroom setup includes a 55-inch smart display, 30 tablets for students, a teacher's laptop, and a year of curated educational content in Kannada and English. Our pilot in Bengaluru Rural showed a 40% improvement in learning outcomes.",
                goalAmount: 800000,
                raisedAmount: 612000,
                creator: users[1]._id,
                image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop",
                startDate: daysAgo(30),
                endDate: daysFromNow(60),
                status: "active",
                backers: [
                    { user: users[0]._id, amount: 200000 },
                    { user: users[2]._id, amount: 100000 },
                    { user: users[4]._id, amount: 150000 },
                    { user: users[5]._id, amount: 50000 },
                ],
            },
            {
                title: "Free Eye Care Camps Across Tamil Nadu",
                description: "Preventable blindness affects millions. Our team of 15 ophthalmologists conducts free eye examination camps, provides spectacles, and performs cataract surgeries at no cost. Last year we screened 45,000 patients and restored sight to 3,200 people. This campaign will fund 50 camps across rural Tamil Nadu, covering medical supplies, equipment, and logistics.",
                goalAmount: 300000,
                raisedAmount: 300000,
                creator: users[2]._id,
                image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop",
                startDate: daysAgo(90),
                endDate: daysAgo(5),
                status: "completed",
                backers: [
                    { user: users[0]._id, amount: 75000 },
                    { user: users[1]._id, amount: 50000 },
                    { user: users[3]._id, amount: 100000 },
                    { user: users[5]._id, amount: 75000 },
                ],
            },
            {
                title: "Rebuilding Homes After Assam Floods",
                description: "The 2025 Assam floods displaced over 1 million families. We are building 200 flood-resistant homes using bamboo composite technology — lightweight, durable, and 60% cheaper than concrete. Each home takes 15 days to construct and includes a raised foundation to prevent future flood damage. Families are involved in construction, learning skills they can use for livelihood.",
                goalAmount: 1000000,
                raisedAmount: 425000,
                creator: users[3]._id,
                image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&auto=format&fit=crop",
                startDate: daysAgo(20),
                endDate: daysFromNow(70),
                status: "active",
                backers: [
                    { user: users[0]._id, amount: 100000 },
                    { user: users[1]._id, amount: 75000 },
                    { user: users[4]._id, amount: 200000 },
                ],
            },
            {
                title: "Women's Skill Development Centre — Jaipur",
                description: "Empowering 1,000 women from low-income households with vocational training in tailoring, digital literacy, and beauty services. The 6-month program includes free childcare, a monthly stipend of ₹3,000, and guaranteed placement assistance. Our previous cohort of 200 women saw an average income increase of 280%. The centre will be operational 6 days a week.",
                goalAmount: 450000,
                raisedAmount: 128000,
                creator: users[4]._id,
                image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&auto=format&fit=crop",
                startDate: daysAgo(10),
                endDate: daysFromNow(80),
                status: "active",
                backers: [
                    { user: users[1]._id, amount: 50000 },
                    { user: users[3]._id, amount: 28000 },
                    { user: users[5]._id, amount: 50000 },
                ],
            },
            {
                title: "Veterans' Children Education Fund",
                description: "Supporting the education of children of fallen and disabled soldiers. This fund covers school fees, uniforms, books, and coaching for competitive exams from Class 6 through college. Currently 85 students are enrolled. We've produced 12 IIT/NIT graduates and 8 medical students. Every rupee goes directly to student support — zero administrative overhead.",
                goalAmount: 600000,
                raisedAmount: 510000,
                creator: users[5]._id,
                image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop",
                startDate: daysAgo(60),
                endDate: daysFromNow(30),
                status: "active",
                backers: [
                    { user: users[0]._id, amount: 150000 },
                    { user: users[1]._id, amount: 100000 },
                    { user: users[2]._id, amount: 80000 },
                    { user: users[3]._id, amount: 60000 },
                    { user: users[4]._id, amount: 120000 },
                ],
            },
            {
                title: "Solar Lights for Tribal Hamlets in Odisha",
                description: "Bringing light to 150 tribal hamlets in Odisha's Koraput district that have no grid electricity. Each hamlet receives 20 solar lanterns and a community charging station. Children can study after dark, women feel safer, and local businesses can extend working hours. The solar panels have a 10-year warranty and are maintained by trained local youth.",
                goalAmount: 250000,
                raisedAmount: 52000,
                creator: users[0]._id,
                image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop",
                startDate: daysAgo(5),
                endDate: daysFromNow(85),
                status: "active",
                backers: [
                    { user: users[2]._id, amount: 25000 },
                    { user: users[4]._id, amount: 27000 },
                ],
            },
            {
                title: "Ocean Plastic Cleanup — Goa Coastline",
                description: "Deploying 10 autonomous plastic collection barriers across Goa's most affected beaches and river mouths. The barriers collect floating plastic waste before it reaches the ocean. Collected plastic is recycled into construction bricks through our partner facility. Last year's pilot removed 8 tonnes of plastic from Baga Beach alone. This campaign extends the network to cover the entire South Goa coastline.",
                goalAmount: 350000,
                raisedAmount: 350000,
                creator: users[1]._id,
                image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800&auto=format&fit=crop",
                startDate: daysAgo(120),
                endDate: daysAgo(15),
                status: "completed",
                backers: [
                    { user: users[0]._id, amount: 80000 },
                    { user: users[2]._id, amount: 70000 },
                    { user: users[3]._id, amount: 100000 },
                    { user: users[5]._id, amount: 100000 },
                ],
            },
        ];

        const campaigns = [];
        for (const data of campaignsData) {
            const campaign = new Campaign(data);
            await campaign.save();
            campaigns.push(campaign);
            const pct = Math.round((data.raisedAmount / data.goalAmount) * 100);
            console.log(`   ✓ ${data.title.substring(0, 50)}... (${pct}% funded, ${data.status})`);
        }
        console.log("");

        // ═══════ DONATIONS ═══════
        console.log("💝 Creating donations...");
        const donations = [];

        for (const campaign of campaigns) {
            for (const backer of campaign.backers) {
                const donation = new Donation({
                    campaign: campaign._id,
                    donor: backer.user,
                    amount: backer.amount,
                    paymentStatus: "Completed",
                    date: new Date(campaign.startDate.getTime() + Math.random() * (Date.now() - campaign.startDate.getTime())),
                });
                await donation.save();
                donations.push(donation);
            }
        }
        console.log(`   ✓ Created ${donations.length} donations\n`);

        // ═══════ PAYMENTS ═══════
        console.log("💳 Creating payment records...");
        let paymentCount = 0;
        for (const donation of donations) {
            const payment = new Payment({
                donor: donation.donor,
                amount: donation.amount,
                campaign: donation.campaign,
                transactionId: `txn_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`,
                status: "success",
            });
            await payment.save();
            paymentCount++;
        }
        console.log(`   ✓ Created ${paymentCount} payment records\n`);

        // ═══════ CONTACT QUERIES ═══════
        console.log("📩 Creating contact queries...");
        const contactsData = [
            {
                name: "Rahul Mehta",
                email: "rahul.mehta@gmail.com",
                message: "Hi, I represent a corporate CSR initiative and would like to discuss bulk donations to multiple campaigns. Can someone from your partnerships team reach out?",
            },
            {
                name: "Sneha Iyer",
                email: "sneha.i@outlook.com",
                message: "I'm a college student and want to volunteer for campaign verification. Do you have a volunteer programme? I can commit 10 hours per week.",
            },
            {
                name: "Karthik Reddy",
                email: "karthik.r@yahoo.com",
                message: "One of the campaigns I donated to hasn't posted updates in 3 weeks. Can you check on the 'Clean Water for 500 Villages' campaign? I want to know if my donation is being used properly.",
            },
            {
                name: "Fatima Sheikh",
                email: "fatima.sheikh@hotmail.com",
                message: "I run an NGO in Bihar focused on girl child education. How do I get verified as a trusted campaign creator on ImpactLink? What documents are needed?",
            },
            {
                name: "Aditya Joshi",
                email: "aditya.j@gmail.com",
                message: "Your platform is fantastic! Small suggestion — it would be great to have a 'recurring donation' option so I can set up monthly contributions to my favourite campaigns.",
            },
        ];

        for (const data of contactsData) {
            const contact = new Contact(data);
            await contact.save();
            console.log(`   ✓ ${data.name}`);
        }
        console.log("");

        // ═══════ SUMMARY ═══════
        console.log("═".repeat(50));
        console.log("✅ Database seeded successfully!\n");
        console.log("📊 Summary:");
        console.log(`   Admins:     1  (admin / admin123)`);
        console.log(`   Users:      ${users.length}  (all passwords: password123)`);
        console.log(`   Campaigns:  ${campaigns.length}  (${campaigns.filter(c => c.status === "active").length} active, ${campaigns.filter(c => c.status === "completed").length} completed)`);
        console.log(`   Donations:  ${donations.length}`);
        console.log(`   Payments:   ${paymentCount}`);
        console.log(`   Contacts:   ${contactsData.length}`);
        console.log("═".repeat(50));

        await mongoose.disconnect();
        console.log("\n📦 Disconnected from MongoDB");
        process.exit(0);
    } catch (error) {
        console.error("❌ Seed failed:", error);
        process.exit(1);
    }
}

seed();
