$content = Get-Content 'js/main.js' -Raw
$content = $content -replace 'image: \s*https://maps\.googleapis\.com[^]+\s*,', 'image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",'
Set-Content 'js/main.js' $content

$content2 = Get-Content 'js/booking.js' -Raw
$content2 = $content2 -replace 'image: \s*https://maps\.googleapis\.com[^]+\s*,', 'image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",'
$content2 = $content2 -replace 'image: gmap\([^)]+\)', 'image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"'
Set-Content 'js/booking.js' $content2
