$source = 'd:\MithraTours-Travels-main'
$dest = 'd:\MithraTours-Travels-main\temp_deploy'
$zipPath = 'd:\MithraTours-Travels-main\milesweb_deploy.zip'

If (Test-Path $dest) { Remove-Item $dest -Recurse -Force }
New-Item -ItemType Directory -Path $dest | Out-Null

$itemsToCopy = Get-ChildItem -Path $source | Where-Object { 
    $_.Name -notmatch 'temp_deploy|testzip|smart_update|mithra_tours_deployment|mithra_tours_updates|milesweb_deploy|deploy|api_updates|time_picker_update|node_modules|\.git|Extras|.*\.zip|mysql_err\.txt'
}

foreach ($item in $itemsToCopy) {
    Copy-Item -Path $item.FullName -Destination $dest -Recurse -Force
}

# Remove any root-level .js or .ps1 scripts that were used for manipulation
Get-ChildItem -Path $dest -File | Where-Object { $_.Extension -match '\.(js|ps1)$' } | Remove-Item -Force

Compress-Archive -Path "$dest\*" -DestinationPath $zipPath -Force
Remove-Item $dest -Recurse -Force
Write-Output "milesweb_deploy.zip created successfully."
