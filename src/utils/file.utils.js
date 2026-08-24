const fs = require("fs");
const path = require("path");

const outputsDir = path.join(__dirname, "../../outputs");

const ensureOutputDirectory = () => {
    if (!fs.existsSync(outputsDir)) {
        fs.mkdirSync(outputsDir, { recursive: true });
    }
};

const getOutputPath = () => {
    ensureOutputDirectory();

    const filename = `Combined-${Date.now()}.xlsx`;

    return {
        filename,
        path: path.join(outputsDir, filename)
    };
};

const deleteFile = (filePath) => {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
};

module.exports = {
    ensureOutputDirectory,
    getOutputPath,
    deleteFile
};