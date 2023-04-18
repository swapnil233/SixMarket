const morgan = require("morgan");

// Choose a format (combined, common, dev, short, or tiny) or create a custom format
const format = "combined";

// Create the logger middleware
const logger = morgan(format);

module.exports = logger;
