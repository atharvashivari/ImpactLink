const asyncHandler = require('express-async-handler');
const Campaign = require("../models/Campaign");
const Donation = require("../models/Donation");
const { getRedisClient } = require('../config/redis');
const logger = require('../utils/logger');

const CACHE_KEY = 'campaigns:all';
const CACHE_TTL = 3600; // 1 hour

/**
 * Helper: Invalidate campaign cache
 */
async function invalidateCache() {
  const redis = getRedisClient();
  if (redis) {
    try {
      await redis.del(CACHE_KEY);
      logger.info('🗑️ Campaign cache invalidated');
    } catch (err) {
      logger.warn(`⚠️ Cache invalidation failed: ${err.message}`);
    }
  }
}

// Create a campaign
exports.createCampaign = asyncHandler(async (req, res) => {
  const { title, description, goalAmount, image, startDate, endDate, category } = req.body;
  const creator = req.user.id;

  if (!title || !description || !goalAmount || !image || !startDate || !endDate) {
    res.status(400);
    throw new Error("All fields are required (title, description, goalAmount, image, startDate, endDate)");
  }

  if (new Date(startDate) >= new Date(endDate)) {
    res.status(400);
    throw new Error("Start date must be before end date");
  }

  if (goalAmount <= 0) {
    res.status(400);
    throw new Error("Goal amount must be greater than 0");
  }

  const newCampaign = new Campaign({
    title: title.trim(),
    description: description.trim(),
    goalAmount,
    raisedAmount: 0,
    creator,
    image: image.trim(),
    startDate,
    endDate,
    ...(category && { category: category.trim() }),
  });

  await newCampaign.save();
  await invalidateCache();
  res.status(201).json(newCampaign);
});

// Get all campaigns (with Redis caching)
exports.getAllCampaigns = asyncHandler(async (req, res) => {
  const redis = getRedisClient();

  // Check cache first
  if (redis) {
    try {
      const cached = await redis.get(CACHE_KEY);
      if (cached) {
        logger.info('⚡ Cache HIT: campaigns:all');
        return res.json(JSON.parse(cached));
      }
      logger.info('💨 Cache MISS: campaigns:all');
    } catch (err) {
      logger.warn(`⚠️ Cache read failed: ${err.message}`);
    }
  }

  // Query MongoDB
  const campaigns = await Campaign.find().populate("creator", "name email");

  // Store in cache
  if (redis) {
    try {
      await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(campaigns));
    } catch (err) {
      logger.warn(`⚠️ Cache write failed: ${err.message}`);
    }
  }

  res.json(campaigns);
});

// Get campaign details by ID
exports.getCampaignById = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findById(req.params.id).populate("creator", "name email");

  if (!campaign) {
    res.status(404);
    throw new Error("Campaign not found");
  }

  res.json(campaign);
});

// Update a campaign (creator only)
exports.updateCampaign = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findById(req.params.id);

  if (!campaign) {
    res.status(404);
    throw new Error("Campaign not found");
  }

  if (campaign.creator.toString() !== req.user.id && req.user.role !== "admin") {
    res.status(403);
    throw new Error("You can only edit your own campaigns");
  }

  const { title, description, goalAmount, image, startDate, endDate, category } = req.body;

  if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
    res.status(400);
    throw new Error("Start date must be before end date");
  }

  if (goalAmount !== undefined && goalAmount <= 0) {
    res.status(400);
    throw new Error("Goal amount must be greater than 0");
  }

  if (title) campaign.title = title.trim();
  if (description) campaign.description = description.trim();
  if (goalAmount) campaign.goalAmount = goalAmount;
  if (image) campaign.image = image.trim();
  if (startDate) campaign.startDate = startDate;
  if (endDate) campaign.endDate = endDate;
  if (category) campaign.category = category.trim();

  await campaign.save();
  await invalidateCache();
  res.json(campaign);
});

// Delete a campaign (creator only)
exports.deleteCampaign = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findById(req.params.id);

  if (!campaign) {
    res.status(404);
    throw new Error("Campaign not found");
  }

  if (campaign.creator.toString() !== req.user.id && req.user.role !== "admin") {
    res.status(403);
    throw new Error("You can only delete your own campaigns");
  }

  if ((campaign.raisedAmount || 0) > 0) {
    res.status(400);
    throw new Error("Cannot delete a campaign that has received donations. Contact support for help.");
  }

  await Campaign.findByIdAndDelete(req.params.id);
  await invalidateCache();
  res.json({ message: "Campaign deleted successfully" });
});

// Get donations for a specific campaign (creator only)
exports.getCampaignDonations = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findById(req.params.id);

  if (!campaign) {
    res.status(404);
    throw new Error("Campaign not found");
  }

  // Ensure only the creator or admin can view the donations
  if (campaign.creator.toString() !== req.user.id && req.user.role !== "admin") {
    res.status(403);
    throw new Error("You do not have permission to view this campaign's donations");
  }

  const donations = await Donation.find({ campaign: req.params.id })
    .populate("donor", "name email")
    .sort({ date: -1 });

  res.json(donations);
});
