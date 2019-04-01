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
  <link rel="stylesheet" href="<?php echo $package->getUrl('main.css') ?>">
</head>

<body>
  <div class="container">
      <div class="row">
          <div class="col col-12">
              <div id="root">test</div>
          </div>
      </div>
  </div>
  <noscript>
    You need to enable JavaScript to run this app.
  </noscript>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="<?php echo $package->getUrl('main.js'); ?>"></script>
</body>

</html>
