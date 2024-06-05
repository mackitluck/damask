const { OUR_STORY, TERMS_AND_CONDITIONS, PRIVACY_POLICY } = require("./url-constants");

exports.getData = function (data, htmlData, url) {
    htmlData = htmlData
        .replace(`<title>Damask</title>`, `<title>${data.metaTitle ? data.metaTitle : "Damask"}</title >`)
        .replace('__TITLE__', data.metaTitle ? data.metaTitle : "Damask")
        .replace('__META_TITLE__', data.metaTitle ? data.metaTitle : "Damask")
        .replace('__META_DESCRIPTION__', data.metaDescription ? data.metaDescription : "Damask")
        .replace('__META_KEYWORD__', data.metaKeywords ? data.metaKeywords : "Damask")
        .replace('__META_CANONICAL_URL__', data.canonicalUrl ? data.canonicalUrl : "https://damaskcakes.com"+url);
    return htmlData;
}


exports.getPayload = function (req) {
    const urlArr = req.url.split("/").filter(e => e);
    let payload = {};
    switch (true) {
        /*  case urlArr.length === 0:
             payload = {
                 "store": "main_website_store",
                 "lang": "en",
                 "type": "static",
                 "urlKey": "homepage"
             }
             break
         case urlArr.length === 1:
             if(urlArr[0] === "our-story"){
             }
             payload = {
                 "store": "main_website_store",
                 "lang": "en",
                 "type": "static",
                 "urlKey": "homepage"
             };
             break;
         case urlArr.length === 2:
             payload = {
                 "store": "main_website_store",
                 "lang": "en",
                 "type": "static",
                 "urlKey": "homepage"
             };
             break; */
        case urlArr.length === 0:
            payload = {
                "store": "main_website_store",
                "lang": "en",
                "type": "static",
                "urlKey": "homepage"
            }
            break
        case urlArr.length > 0:
            payload = getPayloadOnMoreChunk(urlArr);
            break;

        default:
            payload = {
                "store": "main_website_store",
                "lang": "en",
                "type": "static",
                "urlKey": "homepage"
            }
            break;
    }
    return payload;
}


function getPayloadOnMoreChunk(urlArr) {
    console.log('urlArr', urlArr)
    /*  let payload = {
         "store": urlArr[0],
         "lang": urlArr[1],
         "type": "static",
         "urlKey": urlArr[urlArr.length - 1]
     }; */
    let type = ''
    let urlKey = ''
    switch (true) {
        case urlArr.length === 1:
            type = 'static';
            urlKey = urlArr[0];
            if (urlArr[0] === OUR_STORY || urlArr[0] === PRIVACY_POLICY || urlArr[0] === TERMS_AND_CONDITIONS) {
                type = 'cms';
            } else {
                urlKey = urlArr[0].replace('-', '_');
            }
            payload = {
                "store": "main_website_store",
                "lang": "en",
                "type": type,
                "urlKey": urlKey
            };
            break;
        case urlArr.length === 2:
            payload = {
                "store": "main_website_store",
                "lang": "en",
                "type": urlArr[0],
                "urlKey": urlArr[1]
            };
            break;
    }
    return payload;
}