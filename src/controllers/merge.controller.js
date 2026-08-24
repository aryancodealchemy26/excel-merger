const XLSX = require("xlsx");

const {
    validateFiles,
    validateHeaders
} = require("../services/validation.service");

const {
    readExcelFile,
    mergeExcelFiles
} = require("../services/excel.service");

const {
    getOutputPath,
    deleteFile
} = require("../utils/file.utils");

const mergeFiles = (req, res, next) => {
    try {
        validateFiles(req.files);

        const workbooks = req.files.map(file => {
            return readExcelFile(file.path);
        });

        const headersList = workbooks.map(workbook => workbook.headers);

        validateHeaders(headersList);

        const workbook = mergeExcelFiles(req.files);

        const output = getOutputPath();

        XLSX.writeFile(workbook, output.path);

        req.files.forEach(file => {
            deleteFile(file.path);
        });

        res.download(
            output.path,
            "Combined.xlsx",
            (error) => {
                deleteFile(output.path);

                if (error && !res.headersSent) {
                    next(error);
                }
            }
        );

    } catch (error) {
        if (req.files) {
            req.files.forEach(file => {
                deleteFile(file.path);
            });
        }

        next(error);
    }
};

module.exports = {
    mergeFiles
};