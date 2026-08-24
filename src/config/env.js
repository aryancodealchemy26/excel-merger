require("dotenv").config();

const config = {
    port: Number(process.env.PORT) || 5000,
    nodeEnv: process.env.NODE_ENV || "development",
    maxFileSizeMB: Number(process.env.MAX_FILE_SIZE_MB) || 10
};

module.exports = config;