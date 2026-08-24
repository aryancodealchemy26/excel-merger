const validateFiles = (files) => {
    if (!files || files.length < 2) {
        const error = new Error("At least two Excel files are required.");
        error.status = 400;
        throw error;
    }

    return true;
};

const validateHeaders = (headersList) => {
    if (!headersList || headersList.length === 0) {
        const error = new Error("No Excel headers were found.");
        error.status = 400;
        throw error;
    }

    const referenceHeaders = headersList[0];

    for (let i = 1; i < headersList.length; i++) {
        const currentHeaders = headersList[i];

        if (referenceHeaders.length !== currentHeaders.length) {
            const error = new Error(
                "Excel files have different column structures."
            );
            error.status = 400;
            throw error;
        }

        for (let j = 0; j < referenceHeaders.length; j++) {
            if (referenceHeaders[j] !== currentHeaders[j]) {
                const error = new Error(
                    "Excel files have different column names or order."
                );
                error.status = 400;
                throw error;
            }
        }
    }

    return true;
};

module.exports = {
    validateFiles,
    validateHeaders
};