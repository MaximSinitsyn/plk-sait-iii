<?php
    require_once $_SERVER['DOCUMENT_ROOT'].'/phpLibs/Twig-1.35.2/lib/Twig/Autoloader.php';
    require_once $_SERVER['DOCUMENT_ROOT'].'/scripts/Render_Data.php';
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">

    <?php
        $Render_Data_HEAD = new Render_Data('head.twig');
        $Render_Data_HEAD->render('MAIN');
    ?>

    <?php if (file_exists("css/external.css")) { ?>
        <link rel="stylesheet" href="css/external.css" type="text/css" />
    <?php } ?>
    <?php if (file_exists("css/style.css")) { ?>
        <link rel="stylesheet" href="css/style.css" type="text/css" />
    <?php } ?>

    <noscript>
        <style>
            .noScript {
                display: none;
            }
        </style>
    </noscript>
</head>
<body class="body">
    <div class="body__container">
        <?php
            $Render_Data = new Render_Data('base.twig');
            $Render_Data->render('MAIN');
        ?>
     </div>

    <?php
        $Render_Data_Modals = new Render_Data('modals.twig');
        $Render_Data_Modals->render('MAIN');
    ?>

    <?php if (file_exists("js/external.js")) { ?>
        <script src="js/external.js"></script>
    <?php } ?>
    <?php if (file_exists("js/bundle.js")) { ?>
        <script src="js/bundle.js"></script>
    <?php } ?>

    <?php
        $Render_Data_SCRIPTS = new Render_Data('scripts.twig');
        $Render_Data_SCRIPTS->render('MAIN');
    ?>
</body>
</html>
