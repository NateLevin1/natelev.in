// This file sends a Pushover message to me when a user sends a message
// and that user's recaptcha is valid.

// this file requires two API keys: one for Pushover and one for ReCaptcha
// these keys should be stored in JSON format in a file in this directory
// called "keys.json".

// to be run in an AWS Lambda function
const keys = require("./keys.json");
const fetch = require("node-fetch");
const querystring = require('querystring');

const pushoverUserKey = keys["pushover-user"];
const pushoverApplicationKey = keys["pushover-application"];
const recaptchaKey = keys["recaptcha"];

const defaultRequest = {
    method: "post",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
}

exports.handler = async (event) => {
    let method = event.httpMethod || event.requestContext.httpMethod || event.requestContext.http.method;
    if((method || "").toUpperCase() !== "POST") {
        return { statusCode: 400, body: JSON.stringify("Invalid request: only POST requests are allowed. Instead got "+method) };
    }
    if(!event.body) {
        return { statusCode: 400, body: JSON.stringify("Invalid request")};
    }

    let body = event.body;
    if(event.isBase64Encoded) {
        body = Buffer.from(body, 'base64').toString();
        body = querystring.parse(body);
    } else {
        body = JSON.parse(body);
    }

    const { email, subject, message } = body;
    const captchaKey = body["g-recaptcha-response"];

    try {
        // check if the captcha key is valid; see https://developers.google.com/recaptcha/docs/verify
        const captchaResult = await (await fetch("https://www.google.com/recaptcha/api/siteverify", {
            body: querystring.stringify({
                secret: recaptchaKey,
                response: captchaKey
            }),
            ...defaultRequest
        })).json();

        if(captchaResult.success === false) {
            return { statusCode: 400, body: JSON.stringify("Could not verify you are not a robot. "+captchaResult["error-codes"].join(", ")) }
        }
    } catch(e) {
        return { statusCode: 500, body: JSON.stringify("Could not verify you are not a robot. "+e) };
    }

    try {
        // the captcha key is valid; send the Pushover notification
        const pushoverResult = await (await fetch("https://api.pushover.net/1/messages.json", {
            body: querystring.stringify({
                token: pushoverApplicationKey,
                user: pushoverUserKey,
                title: subject,
                message: message + `\n\nFROM: ${email}`,
            }),
            ...defaultRequest
        })).json();
        if(pushoverResult.status !== 1) {
            return { statusCode: 400, body: JSON.stringify("Could not send notification through Pushover. "+pushoverResult.errors.join(", ")) }
        }
    } catch(e) {
        return { statusCode: 500, body: "Could not contact Pushover servers to send the notification. "+e };
    }

    // we haven't returned yet, we had a success!
    return { statusCode: 200, body: JSON.stringify("Message sent!") };
}