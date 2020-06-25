<?php

if($_POST['data']) {
    //http://webi.ru/webi_files/php_libmail.html
    include "php_LibMail/libmail.php"; // вставляем файл с классом

    $data = json_decode($_POST['data']);

    $name_client  = $data->nameClient;
    $email_client  = $data->emailClient;
    $phone_client  = $data->phoneClient;
    $name_form  = $data->nameForm;

    /* $agree_client  = $data->agreeClient;

    if ($agree_client == "true") {
        $agree_client = 'Да';
    } else {
        $agree_client = 'Нет';
    } */

    try {
        $text = '';
        $text .= "Имя клиента: <b>" . $name_client . "</b><br>";
        $text .= "Почта клиента: <b>" . $email_client . "</b><br>";
        $text .= "Телефон клиента: <b>" . $phone_client . "</b><br>";
        // $text .= "Согласие на обработку данных: <b>" . $agree_client . "</b>";

        $m = new Mail; // начинаем
        $m->From( "Minkult;info@profline-consult.ru" ); // от кого отправляется почта
        $m->To( "info@profline-consult.ru" ); // кому адресованно
        $m->Subject( "Форма: " . $name_form );
        $m->Body( $text , "html");
        $m->Cc( "marketing@kvott.ru"); // копия письма отправится по этому адресу
        //$m->Bcc( "bcopy@asd.com"); // скрытая копия отправится по этому адресу
        $m->Priority(3) ;    // приоритет письма
        //$m->Attach( "asd.gif","", "image/gif" ) ; // прикрепленный файл
        $m->smtp_on("ssl://smtp.yandex.ru", "info@profline-consult.ru", "fujwiimkFUjWiiMk2018" , 465) ; // если указана эта команда, отправка пойдет через SMTP  //ssl://
        $m->Send();    // а теперь пошла отправка

        echo "<div class='form__thanks'>Форма отправлена. В ближайшее время мы свяжемся с Вами.</div>";
    } catch( Exception $e ) {
        echo $e->getMessage();
    }
}