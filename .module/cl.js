const fs = require("fs");
const axios = require("axios");

const url = "http://localhost:9400/ptl/api/v1/ptl/comn/comn/front/lang";

const createLocale = async (lang) => {
    try {
        const response = await axios.get(`${url}/${lang}`);
        fs.writeFileSync(`./src/comn/.module/lang-${lang}.json`, JSON.stringify(response.data));
    } catch (error) {
        console.log(error);
    }
};

createLocale("ko");
createLocale("en");
createLocale("tz");
