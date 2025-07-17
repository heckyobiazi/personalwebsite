<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

$success = isset($_GET['status']) && $_GET['status'] === 'success';
 $error = isset($_GET['status']) && $_GET['status'] === 'error';

if(isset($_POST["submit"])){
    $mail = new PHPMailer(true);

    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'heckystudio@gmail.com';
    $mail->Password = 'kvly daqa cyab vdkw';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $mail->setFrom('heckystudio@gmail.com');

    $mail->addAddress('heckystudio@gmail.com');

    $mail->isHTML(true);

    $msg = "First name = " . $_POST['fname'] . "<br>";
    $msg .= "Number = " . $_POST['number'] . "<br>";
    $msg .= "Email = " . $_POST['email'] . "<br>";
    $msg .= "Message = " . $_POST['message'];

    $mail->Subject = "New message from ". $_POST["fname"]. "(". $_POST["email"].")";
    $mail->Body = $msg; 

    try {
        $mail->send();
        header("Location: contact.html?status=success");
    } catch (Exception $e) {
        header("Location: contact.html?status=error");
    }
}

?>

