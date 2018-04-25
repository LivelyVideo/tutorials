<?php
define("TOKEN", "something-i-can-type"); // Use your token here
define("SUBDOMAIN", "dev"); // Use your subdomain here
date_default_timezone_set("UTC");

function getVideos($offset, $limit) {
	$ch = curl_init("https://" . SUBDOMAIN . ".livelyvideo.tv/api/xcode/videos?limit=" . $limit . "&offset=" . $offset . "&status=COMPLETED");
	$header = array();
	$header[] = "Content-type: application/json";
	$header[] = "Authorization: Bearer " . TOKEN;

	curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_HEADER, 0);

	$json = curl_exec($ch);
	curl_close($ch);
	return $json;
}

header('Content-Type: application/json');
echo getVideos(0, 30);

?>
