﻿# ==============================================================================
# Almontalaq Moving - Verification Script for Production (Hostinger)
# Run this script in PowerShell after deploying changes to verify redirects & status
# Uses curl.exe directly with detailed status, location, redirects count, 404 body check, and Cache-Control
# ==============================================================================

function Test-UrlResponse {
    param (
        [string]$Url,
        [string]$ExpectedStatus = "",
        [string]$ExpectedLocation = ""
    )

    $headerOutput = & curl.exe -sI $Url 2>&1
    $statusLine = ($headerOutput | Select-String "^HTTP/").Line
    $locationLine = ($headerOutput | Select-String -Pattern "^[Ll]ocation:\s*(.+)").Line

    $statusCode = ""
    if ($statusLine -match "HTTP/\S+\s+(\d+)") {
        $statusCode = $matches[1]
    }

    $location = ""
    if ($locationLine -match "^[Ll]ocation:\s*(.+)") {
        $location = $matches[1].Trim()
    }

    $redirectsCount = & curl.exe -sIL -o NUL -w "%{num_redirects}" $Url 2>&1
    $effectiveUrl = & curl.exe -sIL -o NUL -w "%{url_effective}" $Url 2>&1

    $isPass = $true
    if ($ExpectedStatus -and $statusCode -ne $ExpectedStatus) { $isPass = $false }
    if ($ExpectedLocation -and $location -ne $ExpectedLocation) { $isPass = $false }

    $badge = if ($isPass) { "[PASS]" } else { "[FAIL]" }
    $badgeColor = if ($isPass) { "Green" } else { "Red" }

    Write-Host "`n$badge [$statusCode] $Url" -ForegroundColor $badgeColor
    Write-Host "  -> Location: $(if ($location) { $location } else { 'None' })" -ForegroundColor White
    Write-Host "  -> Total Redirects: $redirectsCount | Final Effective URL: $effectiveUrl" -ForegroundColor Gray
}

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "1. Testing Domain Canonical Variants (Must be single 301 direct to https://almontalaqmoving.com/)" -ForegroundColor Yellow
Write-Host "==========================================" -ForegroundColor Cyan

Test-UrlResponse "http://almontalaqmoving.com/" "301" "https://almontalaqmoving.com/"
Test-UrlResponse "http://www.almontalaqmoving.com/" "301" "https://almontalaqmoving.com/"
Test-UrlResponse "https://www.almontalaqmoving.com/" "301" "https://almontalaqmoving.com/"
Test-UrlResponse "https://almontalaqmoving.com/" "200"

Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host "2. Testing 301 Redirects Table" -ForegroundColor Yellow
Write-Host "==========================================" -ForegroundColor Cyan

$redirectTests = @(
    @{ Url = "https://almontalaqmoving.com/furniture-moving-in-jeddah/"; Status = "301"; Location = "https://almontalaqmoving.com/" },
    @{ Url = "https://almontalaqmoving.com/furniture-moving-company-in-jeddah/"; Status = "301"; Location = "https://almontalaqmoving.com/" },
    @{ Url = "https://almontalaqmoving.com/furniture-packaging-in-jaddah/"; Status = "301"; Location = "https://almontalaqmoving.com/furniture-packaging-in-jeddah/" },
    @{ Url = "https://almontalaqmoving.com/bride-luggage-moving-jeddah/"; Status = "301"; Location = "https://almontalaqmoving.com/bridal-trousseau-moving-jeddah/" },
    @{ Url = "https://almontalaqmoving.com/blogs/furniture-packaging-in-jeddah/"; Status = "301"; Location = "https://almontalaqmoving.com/furniture-packaging-in-jeddah/" },
    @{ Url = "https://almontalaqmoving.com/blogs/furniture-dismantling-and-assembly-in-jeddah/"; Status = "301"; Location = "https://almontalaqmoving.com/furniture-dismantling-and-assembly-in-jeddah/" },
    @{ Url = "https://almontalaqmoving.com/blogs/electrical-appliance-moving-in-jeddah/"; Status = "301"; Location = "https://almontalaqmoving.com/moving-electrical-appliances-in-jeddah/" },
    @{ Url = "https://almontalaqmoving.com/blogs/furniture-moving-trucks-in-jeddah/"; Status = "301"; Location = "https://almontalaqmoving.com/moving-trucks-in-jeddah/" },
    @{ Url = "https://almontalaqmoving.com/blogs/best-furniture-moving-company-jeddah/"; Status = "301"; Location = "https://almontalaqmoving.com/furniture-moving-companies-in-jeddah/" },
    @{ Url = "https://almontalaqmoving.com/blogs/best-furniture-moving-companies-in-jeddah/"; Status = "301"; Location = "https://almontalaqmoving.com/furniture-moving-companies-in-jeddah/" },
    @{ Url = "https://almontalaqmoving.com/blogs/furniture-moving-companies-in-jeddah/"; Status = "301"; Location = "https://almontalaqmoving.com/furniture-moving-companies-in-jeddah/" },
    @{ Url = "https://almontalaqmoving.com/areas/hayu-aleazizia/"; Status = "301"; Location = "https://almontalaqmoving.com/areas/hayu-alaziziya/" },
    @{ Url = "https://almontalaqmoving.com/areas/hayu-alrabwa/"; Status = "301"; Location = "https://almontalaqmoving.com/areas/hayu-alrubwa/" },
    @{ Url = "https://almontalaqmoving.com/areas/hayu-alshaati/"; Status = "301"; Location = "https://almontalaqmoving.com/areas/hayu-alshati/" }
)

foreach ($t in $redirectTests) {
    Test-UrlResponse $t.Url $t.Status $t.Location
}

Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host "3. Testing /areas/hayu-alrubwa/ (Must be 200 OK directly)" -ForegroundColor Yellow
Write-Host "==========================================" -ForegroundColor Cyan

Test-UrlResponse "https://almontalaqmoving.com/areas/hayu-alrubwa/" "200"

Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host "4. Testing Custom 404 Response and Custom HTML Body Verification" -ForegroundColor Yellow
Write-Host "==========================================" -ForegroundColor Cyan

$test404Url = "https://almontalaqmoving.com/test-non-existent-page-$(Get-Random)/"
Test-UrlResponse $test404Url "404"

$bodyContent = & curl.exe -s $test404Url
if ($bodyContent -match "404" -and ($bodyContent -match "المنطلق" -or $bodyContent -match "almontalaq")) {
    Write-Host "  [PASS] 404 response body contains custom brand content from 404.html." -ForegroundColor Green
} else {
    Write-Host "  [FAIL] 404 response body is a generic server error page, not custom 404.html!" -ForegroundColor Red
}

Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host "5. Testing Cache-Control Headers (Must be no-cache for instant updates)" -ForegroundColor Yellow
Write-Host "==========================================" -ForegroundColor Cyan

$cacheTargets = @(
    @{ Type = "HTML Page"; Url = "https://almontalaqmoving.com/" },
    @{ Type = "CSS Asset"; Url = "https://almontalaqmoving.com/dist/output.css" },
    @{ Type = "Image Asset"; Url = "https://almontalaqmoving.com/assets/img/logo.webp" }
)

foreach ($target in $cacheTargets) {
    $header = & curl.exe -sI $target.Url 2>&1
    $cacheLine = ($header | Select-String -Pattern "^[Cc]ache-[Cc]ontrol:\s*(.+)").Line
    $cacheValue = if ($cacheLine -match "^[Cc]ache-[Cc]ontrol:\s*(.+)") { $matches[1].Trim() } else { "Not Found" }
    
    $isNoCache = $cacheValue -match "no-cache"
    $badge = if ($isNoCache) { "[PASS]" } else { "[FAIL]" }
    $color = if ($isNoCache) { "Green" } else { "Red" }

    Write-Host "$badge $($target.Type) ($($target.Url))" -ForegroundColor $color
    Write-Host "  -> Cache-Control: $cacheValue" -ForegroundColor White
}
