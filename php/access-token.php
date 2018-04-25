<?php
define("TOKEN", "something-i-can-type"); // Use your token here
define("SUBDOMAIN", "dev"); // Use your subdomain here
date_default_timezone_set("UTC");

function getAccessToken($scopes, $userId) {
	$ch = curl_init("https://" . SUBDOMAIN . ".livelyvideo.tv/auth/v1/access-tokens");

	$expire = new DateTime();
	$expire->add(new DateInterval("PT10M"));
	$data = array(
		"expire" => $expire->format("c"),
		"scopes" => $scopes,
		"userId" => $userId
	);
	$postFields = json_encode($data);

	$header = array();
	$header[] = "Content-type: application/json";
	$header[] = "Authorization: Bearer " . TOKEN;
	$header[] = "Content-Length: " . strlen($postFields);

	curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
	curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);

	$json = curl_exec($ch);
	curl_close($ch);
	return $json;
}

header('Content-Type: application/json');
echo getAccessToken(array("upload"), "php-demo-user");

?>
