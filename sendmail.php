<?php
    require 'phpmailer/Exception.php';
    require 'phpmailer/PHPMailer.php';
    require 'phpmailer/SMTP.php';

    $mail = new PHPMailer\PHPMailer\PHPMailer();
    $mail->CharSet = 'UTF-8';

    $mail->isSMTP();                   // Отправка через SMTP
    $mail->Host   = 'smtp.yandex.com';  // Адрес SMTP сервера
    $mail->SMTPAuth   = true;          // Enable SMTP authentication
    $mail->Username   = 'danichp01@yandex.ru';       // ваше имя пользователя (без домена и @)
    $mail->Password   = 'vvgtosnedosuvjdg';    // ваш пароль
    $mail->SMTPSecure = 'ssl';         // шифрование ssl
    $mail->Port   = 465;               // порт подключения

    $mail->setFrom('danichp01@yandex.ru', 'Это я');
    $mail->addAddress('danichp01@yandex.ru', 'Это не я');
    $mail->isHTML(true);
    $mail->Subject = 'Это тема';


    $body = '<h1>Новое письмо!</h1>';

    if(trim(!empty($_POST['class']))){
        $body.='<p><strong>Класс:</strong> '.$_POST['class'].'</p>';
    }

    if(trim(!empty($_POST['name']))){
        $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
    }

    if(trim(!empty($_POST['phone']))){
        $body.='<p><strong>Телефон:</strong> '.$_POST['phone'].'</p>';
    }

    $mail->Body = $body;
    
    if (!$mail->send()) {
        header('HTTP/1.1 400 Bad Request');
        echo('Сообщение не было отправлено! Причина ошибки: {$mail->ErrorInfo}');
    } else {
        echo ('Сообщение отправлено успешно!');
    }




