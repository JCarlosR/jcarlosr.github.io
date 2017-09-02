---
title: "En Laravel: ¿Cómo enviar correos? (Configura el envío en 3 simples pasos)"
categories: [Desarrollo web]
tags: [laravel]
image: posts/2017/laravel-mail-gmail/configurar.png
---

Aprende a enviar emails desde tu aplicación Laravel. A uno o múltiples destinatarios.

___

## Introducción al envío de mails

Para dar la orden a Laravel, de enviar un correo electrónico, basta con ejecutar la siguiente línea de código:

```php
<?php
    Mail::to($request->user())->send(new OrderShipped($order));
?>
```

Esta línea de código enviará un correo al usuario, para informarle que su orden ha sido enviada.

Sin embargo, para que esto funcione, es necesario configurar el envío de mails.

Debemos especificar en nuestro proyecto cómo hacer el envío, dado que Laravel nos ofrece varias opciones.

## Configurar el envío de mails

Como ya comentamos, existen muchas formas. Hoy vamos a ver cómo usar las siguientes alternativas:

- Enviar desde un correo Gmail (puede ser corporativo o no)
- Enviar desde Mailgun
- Enviar desde Mailtrap
- Usar el log

## Enviar mails desde un correo Gmail

Si tienes un dominio enlazado con Gmail, puedes usar un correo corporativo para hacer el envío de los mails.

Si aún no tienes un dominio adquirido, no te preocupes, de momento también puedes usar cualquier otro correo de Gmail.

El driver que usaremos es SMTP, y usaremos el servidor SMTP de Gmail para hacer los envíos.

Muy bien. Lo primero que haremos es **iniciar sesión en nuestra cuenta de Gmail**.

Una vez que hemos iniciado sesión, en la parte superior derecha encontraremos nuestra imagen de perfil.

![Mi cuenta en Gmail](/images/posts/2017/laravel-mail-gmail/mi-cuenta.png)

Allí le daremos clic a "Mi cuenta".

Una vez dentro, en "Acceso y seguridad" le daremos clic a "Cómo acceder a Google".

![Acceso y seguridad en Gmail](/images/posts/2017/laravel-mail-gmail/inicio-sesion-y-seguridad.png)

Al final de esta página encontraremos una opción que dice "Permitir el acceso de aplicaciones menos seguras". Debemos activar esta opción.

![Permitir el acceso de aplicaciones menos seguras](/images/posts/2017/laravel-mail-gmail/permitir-acceso.png)

Luego de habilitar el acceso, necesitamos generar una clave para nuestra aplicación Laravel.

Para ello debes [entrar aquí y activar la autenticación en 2 pasos][two-step].

![Verificación en 2 pasos](/images/posts/2017/laravel-mail-gmail/verificacion-2-pasos.png)

Ingresas tu número de celular y te llegará un código de confirmación para activar la **verificación en 2 pasos**:

![Verificación en 2 pasos - Ingresar código recibido por SMS](/images/posts/2017/laravel-mail-gmail/verificacion-2-pasos-b.png)

Una vez confirmado, verás este mensaje de éxito:

![Verificación en 2 pasos - Confirmado](/images/posts/2017/laravel-mail-gmail/verificacion-2-pasos-c.png)

Y podrás [autorizar a tu aplicación el uso del correo][new-app].

![Autorizar a una app para usar la cuenta de Gmail](/images/posts/2017/laravel-mail-gmail/verificacion-2-pasos-password-app.png)

![Ingresar un nombre de aplicación](/images/posts/2017/laravel-mail-gmail/verificacion-2-pasos-password-nombre.png)

Anota esta última clave. La usaremos en seguida:

![Clave secreta generada por Google para la app](/images/posts/2017/laravel-mail-gmail/verificacion-2-pasos-password-final.png)

Felicitaciones. Tu cuenta de Gmail ahora está apta para enviar correos.

Solo tienes que **decirle a Laravel qué datos usar para enviar mails** a través de esta cuenta Gmail.

## Laravel, usa estos datos

![Configuración en Laravel para enviar mails](/images/posts/2017/laravel-mail-gmail/laravel-config-mail.png)

En la carpeta `config` existe un archivo `mail.php`. Aquí se encuentran todas las variables asociadas al envío de mails.

Dentro de este archivo de configuración, encontramos:

```php
'driver' => env('MAIL_DRIVER', 'smtp'),
```

**Esta línea le dice a Laravel:**

El `driver` que debes usar se encuentra definido dentro del archivo `.env` bajo el nombre `MAIL_DRIVER`. Pero, si no lo encuentras, usa `smtp`.

De la misma forma podemos leer las siguientes líneas:

```php
'host' => env('MAIL_HOST', 'smtp.mailgun.org'),
'port' => env('MAIL_PORT', 587),

'from' => [
    'address' => env('MAIL_FROM_ADDRESS', 'hello@example.com'),
    'name' => env('MAIL_FROM_NAME', 'Example'),
],
'encryption' => env('MAIL_ENCRYPTION', 'tls'),
    
'username' => env('MAIL_USERNAME'),
'password' => env('MAIL_PASSWORD'),
```

De esto último:

- `host` y `port` se asocian con el servidor SMTP.
- `from` determina a nombre de quién se envía el correo.
- `username` y `password` son las credenciales de la cuenta Gmail.

Por lo tanto, estos datos los vamos a poner dentro de nuestro archivo `.env`.

**¿Por qué en el archivo .env y no directamente en mail.php?**

Nos conviene definir estos valores en `.env` porque así podemos tener configuraciones distintas: por ejemplo, usar nuestro correo corporativo de Gmail en producción, pero usar el log de forma local para hacer pruebas.

Además, las credenciales siempre deben definirse en el archivo `.env`, ya que este archivo no forma parte del código fuente (al usar GIT este archivo es ignorado, por lo que cada persona que tenga acceso al código, podrá usar la configuración que más le convenga).

**Ya para finalizar tenemos estos datos en nuestro .env:**

```
MAIL_DRIVER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=micorreo@gmail.com
MAIL_PASSWORD=miclave
MAIL_ENCRYPTION=tls
```

Estos, permitirán a nuestra app Laravel enviar mails a través del correo Gmail.

Solo debes reemplazar `MAIL_USERNAME` y `MAIL_PASSWORD` según el correo que estás usando.

Opcionalmente también puedes definir estos 2 valores:

```
MAIL_FROM_ADDRESS=micorreo@gmail.com
MAIL_FROM_NAME=Juan
```

Pero, no es obligatorio, ya que también puedes definir estos 2 últimos datos al momento de hacer el envío desde tu aplicación Laravel.

## Envío de mails

Una vez que tenemos configurado el envío de correos, podemos enviar tantos mails como se requiera.

**Veamos un ejemplo.**

Ahora mismo estoy desarrollando una aplicación Android que incluye un "botón de panico".

Este botón rojo permite a los usuarios reportar su ubicación actual y enviar una notificación a todos los implicados.

Como parte del proceso se envían mensajes SMS y correos electrónicos a una lista de usuarios.

Entonces empecemos por definir una clase `Mailable`:

```
php artisan make:mail EmergencyCallReceived
```

Este comando va generar la clase `EmergencyCallReceived` en `app\Mail` con el siguiente contenido:

```php
<?php
class EmergencyCallReceived extends Mailable
{
    use Queueable, SerializesModels;
    
    public function __construct()
    {
        //
    }
    
    public function build()
    {
        return $this->view('view.name');
    }
}
?>
```

- Usaremos esta clase desde el controlador que enviará los mails.
- Como nos interesa pasarle datos a la vista del correo, vamos a añador un atributo `$emergencyCall`.
- También vamos a crear una carpeta `mails` en `resources/views` y a definir una vista llamada `emergency_call.blade.php`.

Por tanto nuestro código ahora se verá así:

```php
<?php
class EmergencyCallReceived extends Mailable
{
    use Queueable, SerializesModels;
    
    public $emergencyCall;
    
    public function __construct(EmergencyCall $emergencyCall)
    {
        $this->emergencyCall = $emergencyCall;
    }
    
    public function build()
    {
        return $this->view('mails.emergency_call');
    }
}
?>
```

`EmergencyCall` es un modelo de mi aplicación. Se asocia con una tabla, donde se registra un histórico de todas las llamadas de emergencia realizadas.

Tú puedes, de la misma forma, pasar cualquier objeto según lo requieras.
Y finalmente, podrás acceder a los datos desde la vista. 

En el ejemplo que estamos viendo, `emergency_call.blade.php` se verá de la siguiente forma:

{% highlight html %}
{% raw %}
<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0">
    <title>Llamado de emergencia</title>
</head>
<body>
    <p>Hola! Se ha reportado un nuevo caso de emergencia a las {{ $distressCall->created_at }}.</p>
    <p>Estos son los datos del usuario que ha realizado la denuncia:</p>
    <ul>
        <li>Nombre: {{ $distressCall->user->name }}</li>
        <li>Teléfono: {{ $distressCall->user->phone }}</li>
        <li>DNI: {{ $distressCall->user->dni }}</li>
    </ul>
    <p>Y esta es la posición reportada:</p>
    <ul>
        <li>Latitud: {{ $distressCall->lat }}</li>
        <li>Longitud: {{ $distressCall->lng }}</li>
        <li>
            <a href="https://www.google.com/maps/dir/{{ $distressCall->lat }},{{ $distressCall->lng }}">
                Ver en Google Maps
            </a>
        </li>
    </ul>
</body>
</html>
{% endraw %}
{% endhighlight %}

**Muy bien! Ahora que tenemos lo necesario, hacemos el envío.**

Para este caso, yo tengo una tabla `receivers` donde tengo información de todos los destinatarios.

Por ello primero consulto la base de datos, y luego ejecuto el envío de mails a todos ellos.

```php
<?php
$receivers = Receiver::pluck('email');
Mail::to($receivers)->send(new EmergencyCallReceived($call));
?>
```

- En tu caso podrías llenar el método `to` con una instancia del modelo `User`, un arreglo de correos (como en este caso), o incluso un correo directamente.

- También ten en cuenta que estoy pasando un objeto `$call` a la clase `EmergencyCallReceived` que antes definimos. Aquí puedes pasar más objetos si lo llegas a necesitar, o ninguno (si realmente no necesitas información para el correo que estás enviando).

## Resultado final

El resultado final es que, se ha enviado un correo a todos los destinatarios.

![Bandeja de entrada Gmail](/images/posts/2017/laravel-mail-gmail/resultado-final.png)

Y el contenido del mensaje es justo el que hemos definido en nuestra vista, con los datos que le pasamos:

![Mensaje recibido en Gmail](/images/posts/2017/laravel-mail-gmail/resultado-final-mail.png)

## Conclusión

Un resumen de lo que hicimos es:

- Primero **hemos configurado una cuenta de Gmail para que permita enviar correos** desde otras aplicaciones.
- Segundo, **hemos indicando a Laravel qué driver usar y cuáles son las credenciales**.
- Finalmente, **hemos realizado el envío haciendo uso de una clase Mailable** y una vista (también vimos cómo pasarle datos).

Si tienes alguna duda puedes dejar un comentario.

Por último: si puedes ayudarme a compartir este artículo, estaría genial. Gracias.

___

**Post-data:** Si has seguido todos los pasos y obtienes un error con los datos de la cuenta de Gmail, es posible que las variables del archivo `.env` no se hayan actualizado.

![Actualizar variables de entorno en el archivo .env](/images/posts/2017/laravel-mail-gmail/final-actualizar-var-env.png)

Esto me hizo perder varios minutos. Espero que no te ocurra lo mismo.

[two-step]: https://www.google.com/landing/2step/
[new-app]: https://security.google.com/settings/security/apppasswords
