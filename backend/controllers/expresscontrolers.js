const Expert = require("../models/tempExpert");

// GET /api/experts
exports.getExperts = async (req, res, next) => {
  try {
    const { page = 1, limit = 5, search, category } = req.query;

    let query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    const experts = await Expert.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Expert.countDocuments(query);

    res.json({
      experts,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page)
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/experts/:id
exports.getExpertById = async (req, res, next) => {
  try {
    const expert = await Expert.findById(req.params.id);
    if (!expert) {
      return res.status(404).json({ message: "Expert not found" });
    }
    res.json(expert);
  } catch (error) {
    next(error);
  }
};

// POST /api/experts
exports.createExpert = async (req, res, next) => {
  try {
    const expert = await Expert.create(req.body);
    res.status(201).json(expert);
  } catch (error) {
    next(error);
  }
};