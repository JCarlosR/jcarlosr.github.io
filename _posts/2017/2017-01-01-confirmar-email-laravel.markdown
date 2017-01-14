---
title:  "Confirmar correo en Laravel"
categories: [Desarrollo web]
tags: [laravel]
---
Hoy aprenderemos a confirmar el correo de nuestros usuarios en Laravel.

Existen muchos motivos por los que es importante verificar el email de nuestros usuarios. 

Lo he visto en muchos sitios, ¿pero es necesario?
---
¡Claro! Imagina que alguien usa tu correo y de pronto comienzan a llegarte mails.

Puedes permitir que tus usuarios se registren e ingresen a la plataforma, pero debes verificar que realmente son sus correos antes de empezar a enviar mails, y antes que realicen alguna acción importante.

Además:

- La verificación de emails es una de las principales formas de evitar el spam.
- Evita enviar mensajes no deseados cuando un tercero se registra maliciosamente usando el email de otra persona.
- Un primer mensaje de verificación, que es esperado por el usuario, incrementa la posibilidad de que si llega como correo no deseado, sea ahora calificado como correo deseado por el usuario. Así los demás mails se recibirán sin problemas!
- La idea es que si un usuario olvida su contraseña, pueda obtener una nueva a través de su email. ¿Te imaginas qué ocurre si no ha verificado su correo?

Ok, ya entendí. ¡Empecemos!
---

Genial. Lo primero que haremos será añadir un campo a nuestra tabla de usuarios.
Este campo lo llamaremos ```confirmed``` y nos permitirá saber si un usuario ya ha verificado si email o aun no.

Además usaremos un segundo campo llamado ```confirmation_code```. 

Este campo guardará una cadena aleatoria, que será generada y asignada a cada usuario durante su registro.

Cada vez que un usuario se registre recibirá un correo de confirmación. Este correo contendrá un enlace con la siguiente ruta: ```/register/verify/{confirmation_code}```. 

Como debes haber imaginado, en cuanto el usuario ingrese a este link, nuestro controlador va a comparar el código de confirmación con el que el usuario obtuvo aleatoriamente en su registro. Si coincide, actualizaremos el valor del campo ```confirmed``` que tiene el usuario a ```TRUE```.

## Nuestra tabla de usuarios

La migración para nuestra tabla de usuarios tendrá el siguiente aspecto:

``` php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUsersTable extends Migration {

    public function up()
    {
        Schema::create('users', function(Blueprint $table)
        {
            $table->increments('id');
            $table->string('username')->unique();
            $table->string('email')->unique();
            $table->string('password');
            $table->boolean('confirmed')->default(0);
            $table->string('confirmation_code')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('users');
    }
}
```

## Registrando un usuario

1. Creamos una cadena aleatoria y la asignamos sobre el campo ```confirmation_code```. 
Para ello solo usamos la función ```str_random()``` que recibe como argumento la longitud de la cadena que deseamos generar.

2. Enviamos un mail de verificación al usuario con el enlace correspondiente. 
Para esto necesitamos crear un template para el mail, y luego hacer el envío usando ```Mail::send()```.

> Recuerda que si estás usando ```User::create()```, debes definir la propiedad $fillable de tu modelo User con los campos username, email, password y confirmation_code.

Si estás usando el sistema de autenticación que Laravel 5.2 genera (al usar ```php artisan make:auth```) tu código será identico al siguiente ejemplo. De caso contrario, simplemente debes añadir la lógica que hemos descrito justo luego de la validación de tu registro.

``` php
<?php

protected function create(array $data)
{
    $data['confirmation_code'] = str_random(25);

    $user = User::create([
        'name' => $data['name'],
        'email' => $data['email'],
        'password' => bcrypt($data['password']),
        'confirmation_code' => $data['confirmation_code']
    ]);

    // Send confirmation code
    Mail::send('emails.confirmation_code', $data, function($message) use ($data) {
        $message->to($data['email'], $data['name'])->subject('Por favor confirma tu correo');
    });

    return $user;
}
```


Hasta aquí llega nuestro ejemplo, pero recuerda que puedes implementar más características en torno a ello:

- Mostrar una alerta superior en todas las páginas para usuarios que aun no confirman su email.
- Incluir en la alerta un enlace para "volver a enviar mail de confirmación".

Por último, recuerda que también puedes (ver este tutorial en formato de video)[canal] en nuestro canal de Youtube.

Si tienes alguna duda, no dudes en comentar!

[canal]: http://youtube.com/sorcjc
