<?php
    // This file sends a Pushover message to me when a user sends a message
    // and that user's recaptcha is valid.

    // this file requires two API keys: one for Pushover and one for ReCaptcha
    // these keys should be stored in JSON format in a file in this directory
    // called "keys.json".
    $keys = json_decode(file_get_contents("keys.json"), true);
    $pushover_user_key = $keys["pushover-user"];
    $pushover_application_key = $keys["pushover-application"];
    $recaptcha_key = $keys["recaptcha"];

    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];

    // check if the captcha key is valid; see https://developers.google.com/recaptcha/docs/verify
    $captcha_key = $_POST["g-recaptcha-response"];
    // make a post request; from https://stackoverflow.com/a/6609181
    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $data = array('secret' => $recaptcha_key, 'response' => $captcha_key);

    $options = array(
        'http' => array(
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data)
        )
    );
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);

    if ($result === FALSE) {
        http_response_code(500);
        exit("There was an error contacting Google's servers to verify you are not a robot.");
    }

    $result = json_decode($result, true);
    if($result["success"] === FALSE) {
        http_response_code(400);
        exit("Could not verify you are not a robot. Reason: " . $result["error-codes"][0]);
    }

    // the captcha key is valid; send the Pushover notification
    // make a post request; from https://stackoverflow.com/a/6609181
    $pushover_url = 'https://api.pushover.net/1/messages.json';
    $pushover_data = array('token' => $pushover_application_key, 'user' => $pushover_user_key, 'title' => $subject, 'message' => $message . "\n\nFROM: " . $email);

    $pushover_options = array(
        'http' => array(
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($pushover_data)
        )
    );
    $pushover_context  = stream_context_create($pushover_options);
    $pushover_result = file_get_contents($pushover_url, false, $pushover_context);

    if ($pushover_result === FALSE) {
        http_response_code(500);
        exit("Could not contact Pushover's servers to send the notification.");
    }

    $pushover_result = json_decode($pushover_result, true);
    if($pushover_result["status"] === 1) {
        // success!
        echo "Success!";
    } else {
        echo "There was an error trying to notify Nate. Error: " . $pushover_result["errors"][0];
    }
?>