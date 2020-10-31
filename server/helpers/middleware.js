const jwt = require("jsonwebtoken");

function paginate(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const query = req.query.q || "";

    const start = (page - 1) * limit;
    const end = page * limit;
    const total = await model.countDocuments().exec();
    const pages = Math.ceil(total / limit);

    const result = { total, pages };

    if (start > 0) result.previous = start - 1;
    if (end < total) result.next = start + 1;

    try {
      result.data = await model
        .find({ name: { $regex: `.*${query}.*` } })
        .limit(limit)
        .skip(start)
        .exec();
      res.paginated = result;
      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

function authenticate(req, res, next) {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Unauthorized" });
  }
}

module.exports = { paginate, authenticate };
