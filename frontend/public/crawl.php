<?php
// Fixed upstream documents only. No credentials or private endpoints are exposed.
$documents = ['sitemap' => ['sitemap.xml', 'application/xml'], 'llms' => ['llms.txt', 'text/plain'], 'robots' => ['robots.txt', 'text/plain']];
$key = $_GET['document'] ?? '';
if (!isset($documents[$key])) { http_response_code(404); exit; }
[$filename, $mime] = $documents[$key];
$url = 'https://api.keyroutes.co/api/public/' . $filename;
$body = false; $status = 0;
if (function_exists('curl_init')) {
    $handle = curl_init($url);
    curl_setopt_array($handle, [CURLOPT_RETURNTRANSFER => true, CURLOPT_CONNECTTIMEOUT => 5, CURLOPT_TIMEOUT => 15, CURLOPT_FOLLOWLOCATION => false]);
    $body = curl_exec($handle); $status = curl_getinfo($handle, CURLINFO_HTTP_CODE); curl_close($handle);
} else {
    $context = stream_context_create(['http' => ['timeout' => 15, 'ignore_errors' => true, 'follow_location' => 0]]);
    $body = @file_get_contents($url, false, $context);
    if (isset($http_response_header[0]) && preg_match('/\s(\d{3})\s/', $http_response_header[0], $matches)) $status = (int)$matches[1];
}
header('Content-Type: ' . $mime . '; charset=utf-8');
header('Cache-Control: no-cache');
if ($status !== 200 || $body === false) { http_response_code(503); header('Retry-After: 60'); echo 'Crawl document temporarily unavailable.'; exit; }
echo $body;
