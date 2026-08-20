$search = "'http://localhost',"
$replace = "'https://previewsite.page.gd',`r`n    'http://previewsite.page.gd',`r`n    'http://localhost',"

Get-ChildItem -Path api\*.php | ForEach-Object {
    $c = Get-Content $_.FullName -Raw
    if ($c -match $search) {
        $c = $c.Replace($search, $replace)
        Set-Content $_.FullName -Value $c -NoNewline
    }
}
