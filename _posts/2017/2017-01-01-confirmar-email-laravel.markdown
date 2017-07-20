---
title:  "Confirmar correo en Laravel"
categories: [Desarrollo web]
tags: [laravel]
image: posts/2017/laravel-confirmar-correo/confirmar-email.png
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

Cada vez que un usuario se registre recibirá un correo de confirmación. Este correo contendrá un enlace con la siguiente ruta: 

```
/register/verify/{confirmation_code}
```

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

## Pasos a seguir

Luego de haber añadido los campos ```confirmed``` y ```confirmation_code``` a la tabla de usuarios:

1. Creamos una cadena aleatoria y la asignamos sobre el campo ```confirmation_code```. 
Para ello solo usamos la función ```str_random()``` que recibe como argumento la longitud de la cadena que deseamos generar.

2. Enviamos un mail de verificación al usuario con el enlace correspondiente. 
Para esto necesitamos crear un template para el mail, y luego hacer el envío usando ```Mail::send()```.

## Dónde hacer los cambios

Si estás usando el sistema de autenticación que Laravel genera (al usar ```php artisan make:auth```), debes modificar el método ```create``` de ```RegisterController``` (ubicado en ```app\Http\Controllers\Auth```). 

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

> Recuerda que si estás usando ```User::create()```, debes definir la propiedad $fillable de tu modelo User con los campos username, email, password y confirmation_code.

## Plantilla del email de confirmación

En el código anterior, el método ```send``` recibe como primer parámetro el template que se usará para el mail de confirmación.

El valor de ```emails.confirmation_code``` significa que dentro de ```resources/views``` debemos tener una carpeta **emails**, que contenga un archivo ```confirmation_code.blade.php``` representando el mail que vamos a enviar.

Aquí te doy un ejemplo básico del que puedes partir:

{% raw %}
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
</head>
<body>
    <h2>Hola {{ $name }}, gracias por registrarte en <strong>Programación y más</strong> !</h2>
    <p>Por favor confirma tu correo electrónico.</p>
    <p>Para ello simplemente debes hacer click en el siguiente enlace:</p>

    <a href="{{ url('/register/verify/' . $confirmation_code) }}">
        Clic para confirmar tu email
    </a>
</body>
</html>
```
{% endraw %}

## Enlace de verificación

Hemos hablado de **verificar emails**, pero lo que hace esto verdaderamente posible, es el enlace de verificación que es enviado por mail.

Y que debemos definir en nuestro archivo de rutas:

{% highlight php %}
<?php
// E-mail verification
Route::get('/register/verify/{code}', 'GuessController@verify');
{% endhighlight %}

Puedes usar la ruta que te parezca conveniente (por ejemplo ```/verificar/email/{code}```), siempre y cuando hagas ese cambio también en la plantilla del mail enviado.

De tal forma que, cuando el usuario visite el enlace, el método ```verify``` resuelva la petición de esta manera:

{% highlight php %}
<?php
public function verify($code)
{
    $user = User::where('confirmation_code', $code)->first();

    if (! $user)
        return redirect('/');

    $user->confirmed = true;
    $user->confirmation_code = null;
    $user->save();

    return redirect('/home')->with('notification', 'Has confirmado correctamente tu correo!');
}
{% endhighlight %}
___

Hasta aquí llega nuestro ejemplo, pero recuerda que puedes implementar **más características** en torno a ello:

- Mostrar una **alerta superior** en todas las páginas para usuarios que aun no confirman su email.
- Incluir en la alerta un enlace para "**volver a enviar mail de confirmación**".

Por último, recuerda que también puedes ver este tutorial en formato de video:

<div class="text-center">
    <iframe width="858" height="480" src="//www.youtube.com/embed/D5fKth0MjP8?vq=hd720&rel=0" frameborder="0" allowfullscreen></iframe>   
</div>

Si tienes alguna duda, no dudes en comentar!
