<html>
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta charset="utf-8">
	<link type="text/css" rel="stylesheet" href="/dist/demo.css">
	<link type="text/css" rel="stylesheet" href="/dist/upload.min.css">
	<link type="text/css" rel="stylesheet" href="/dist/player.min.css">
	<style>
	body .upload {
		padding: 0; #temporary fixes
	}
	.upload__pause-button, .upload__cancel-button {
		text-indent: -9999px;
	}
	</style>
</head>
<body>
	<div class='upload'></div>

	<div class='wrapper'>
		<header>
			<h1><a href='/'>Videos</a></h1>
		</header>
		<div class='page'>
			<ol>
				<li>Upload a video above</li>
				<li>Wait an appropriate amount of time based on the size of the file</li>
				<li>Refresh the listing below</li>
				<li>Click on the file to play it</li>
			</ol>
			<p>Sometimes transcodes fail for various reasons, they will never show in this listing if they do.  They will show in your console tool, request access if you do not have it already</p>

			<div class='panel'>
				<div class='videos'></div>
				<br />
				<button class='loadvideos'>Reload</button>
			</div>

			<div class='panel'>
				<h2>Player</h2>
				<div id='player' class='lvvideo'></div>
			</div>
		</div>
	</div>
	<script type='text/javascript' src='/dist/app.js'></script>
</body>
</html>
