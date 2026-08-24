const app = require("./src/app");
const config = require("./src/config/env");

app.listen(config.port, () => {
    console.log(`Excel Merger running on port ${config.port}`);
});