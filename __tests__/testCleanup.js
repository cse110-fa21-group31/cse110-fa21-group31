const fs = require("fs");
import { TEST_RECIPE_DB_PATH } from "../source/service/util.js";

const teardown = async () => {
    console.log("Cleaning up mock data");
    try {
        fs.unlinkSync(TEST_RECIPE_DB_PATH);    
    } catch (err) {
        console.log("Error occured when trying to clean up:");
        console.log(err);
    }
};

module.exports = teardown;
