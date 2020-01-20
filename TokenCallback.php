<?php

$data = array(
    'grant_type' => 'authorization_code',
    'code' => $_GET['code'],
    'client_id' => 'f4d49b8783e6f8e3f596cc06f4253d6c873f484fd3929480fa5edecba9d0a8b6',
    'client_secret' => 'd6ba6fea56796c12104d91510266769909a1cbceb5c418be0fa42295d3234406',
    'redirect_uri' => 'https://localhost.test/manggahomes/TokenCallback.php',
    'state' => 'test123'
);
 
$payload = http_build_query($data, '', '&');
// Prepare new cURL resource
$ch = curl_init('https://auth.arthuronline.co.uk/oauth/token');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLINFO_HEADER_OUT, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
 
// Set HTTP Header for POST request 
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/x-www-form-urlencoded',
    'Content-Length: ' . strlen($payload))
);
 
// Submit the POST request
$result = curl_exec($ch);
curl_close($ch);
?>
<html>
<head>
</head>
<body>
	<script>
		localStorage.setItem("users_access", JSON.stringify(<?php echo $result; ?>));
		window.location.href = '/manggahomes/'
	</script>
</body>
</html>
<?php 

// Close cURL session handle
