<?php
    require './../vendor/autoload.php';
    use Symfony\Component\Asset\Package;
    use Symfony\Component\Asset\VersionStrategy\JsonManifestVersionStrategy;

    $package = new Package(new JsonManifestVersionStrategy(__DIR__.'/dist/manifest.json'));
    
?>
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>React Starter</title>
  <link rel="stylesheet" href="<?php echo $package->getUrl('globalStyles.css') ?>">
</head>

<body>
  <div id="root"></div>
  <noscript>
    You need to enable JavaScript to run this app.
  </noscript>
  <script src="<?php echo $package->getUrl('main.js'); ?>"></script>
  <script src="<?php echo $package->getUrl('globalStyles.js'); ?>"></script>
</body>

</html>