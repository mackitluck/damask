const express = require("express");
const path = require("path");
const fsPromises = require('fs').promises
require('dotenv').config();

const { default: axios } = require("axios");
const { getData, getPayload } = require("./helper/utility");
const https = require("https");

const PORT = process.env.PORT || 3001;

const agent = new https.Agent({
    rejectUnauthorized: false
});

// for local

// For Local
// const BASE_API_URL = process.env.REACT_APP_API_URL || 'hhttps://stagingapi.damaskcakes.com/rest/V1/ecomapi';
// const BACKEND_API_URL =  process.env.REACT_APP_BACKEND_API_URL || 'http://stagingapi.damaskcakes.com';
// For Live
const BACKEND_API_URL =  process.env.REACT_APP_BACKEND_API_URL || 'http://api.damaskcakes.com';
const BASE_API_URL = process.env.REACT_APP_API_URL || 'http://api.damaskcakes.com/rest/V1/ecomapi';
const app = express();
//for local
//const indexPath = path.resolve(process.cwd(), '..', 'build', 'index.html');
// for live
const indexPath = path.resolve(process.cwd(), 'index.html');

const META_API_URL = BASE_API_URL + "/getMetaInfo";

const SITEMAP_URL = BACKEND_API_URL + "/sitemap.xml"

app.get("/sitemap.xml", async (req, res, next) => {
    try {
        const { data } = await axios.get(SITEMAP_URL);
        res.header("Content-Type", "application/xml");
        res.status(200).send(data);
    } catch (error) {
        console.error("ERROR ", error)
        res.send("Something went wrong " + error.message);
    }
});


app.get("/", async (req, res) => {
    const payload = {
        "store": "main_website_store",
        "lang": "en",
        "type": "static",
        "urlKey": "homepage"
    };
    const htmlData = await readFSFile(getHTMLData, payload, req.url);
    res.send(htmlData);
});
// static resources should just be served as they are
app.use(express.static(
    //path.resolve(process.cwd(), '..', 'build'),
    path.resolve(process.cwd()),
    { maxAge: '30d' },
));

// app.get("/:store/:lang", async (req, res) => {
//     const payload = getPayload(req);
//     if (payload) {
//         const htmlData = await readFSFile(getHTMLData, payload);
//         res.send(htmlData);
//     }
// });
app.get("/*", async (req, res) => {
    if (req.url.includes(".js") || req.url.includes(".css") || 
    req.url.includes(".woff") || req.url.includes(".woff2") || req.url.includes(".ttf") ||
    req.url.includes(".ico")
    ) {
        return false;
    }
    const payload = getPayload(req);
    const htmlData = await readFSFile(getHTMLData, payload , req.url);
    res.send(htmlData);
});



app.listen(PORT, () => {
    console.log(`Server is listening on port 123 ${PORT}`)
});

async function readFSFile(fn, payload, url = null) {

    const data = await fsPromises.readFile(indexPath, 'utf8');
    try {
        const abc = await fn(data, payload, url);
        return abc;
    } catch (error) {
        console.log('server error', error.message)
        return data
    }

}

async function getHTMLData(htmlData, payload, url) {
    try {
        const {data: response} = await axios.post(META_API_URL, payload , { httpsAgent: agent });
        if (response && response.statusCode === '200') {
            htmlData = getData(response.metaInfo, htmlData, url);
        }
        return htmlData
    } catch (error) {
        console.log('payload', JSON.stringify(payload))
        console.log("ERROR from API", error.message)
        return htmlData;
    }
}