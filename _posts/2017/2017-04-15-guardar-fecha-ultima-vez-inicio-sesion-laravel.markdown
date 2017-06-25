---
title: "Laravel: Guardar fecha de la última vez que un usuario inició sesión"
categories: [Desarrollo web]
tags: [laravel]
image: posts/2017/fecha-login/laravel-guardar-fecha-ultima-sesion.png
---

En este tutorial aprenderás a registrar la fecha del último inicio de sesión de tus usuarios en Laravel.

Acerca del inicio de sesión en Laravel
---

En Laravel, el inicio de sesión, y registro, son funcionalidades que [se pueden implementar fácilmente con tan solo usar un comando][laravel-auth].

Estamos hablando específicamente del comando ```php artisan make:auth```.

Este comando va a generar por nosotros algunos archivos blade y controladores, necesarios para que funcione el login y registro de usuarios en nuestro proyecto.

Así que, una **primera alternativa** sería pensar en modificar el archivo ```LoginController```.

Si modificamos uno de sus métodos, específicamente uno que se encargue de crear la sesión del usuario luego de validar sus credenciales, podríamos capturar allí la **fecha de inicio de sesión**.

Eventos en Laravel
---

Sin embargo, hay una mejor forma de lograrlo.

Y es, usando [los eventos de Laravel][events].

Así podemos evitar la complejidad de modificar ```LoginController``` y seguir manteniendo nuestro código ordenado.

¿Cómo lo hacemos entonces?

Escuchar el evento de inicio de sesión
---

Así es, lo primero que debemos hacer es detectar el momento en que un usuario acaba de iniciar sesión satisfactoriamente.

En ese instante vamos a guardar la fecha.

Entonces vamos a ```app\Providers\EventServiceProvider.php```.

Si es la primera vez que entras aquí te encontrarás con lo siguiente:

{% highlight php %}
protected $listen = [
    'App\Events\SomeEvent' => [
        'App\Listeners\EventListener',
    ],
];
{% endhighlight %}

Este arreglo contiene un evento ```SomeEvent``` de ejemplo, y un oyente ```EventListener```, también de ejemplo.

Lo que significa es que cuando ocurra ```SomeEvent```, el ```EventListener``` asociado escuchará dicho evento y se encargará de actuar de cierta forma.

> ¿Eso significa que podemos crear nuestros propios eventos y nuestros propios listeners?

Es correcto.

Podemos definir nuestros propios eventos, y activarlos cuando lo creamos necesario.

Pero este no es el caso.

El evento de inicio de sesión no lo tenemos que activar nosotros. Es un evento que ya pone Laravel a nuestra disposición.

Para escuchar el evento de login y actuar ante él, usaremos lo siguiente:

{% highlight php startinline=true %}
protected $listen = [
    'Illuminate\Auth\Events\Login' => [
        'App\Listeners\SuccessfulLogin',
    ],
];
{% endhighlight %}

Como ves, el evento de Login ya viene predefinido. Pero nuestro Listener está en una carpeta de nuestro alcance.

¿Cómo creamos nuestro listener?
---

Luego de haber modificado el ```EventServiceProvider```, lo siguiente es crear el listener ```SuccessfulLogin```.

Laravel nos facilita esta tarea. Pues simplemente debemos ejecutar:

```
php artisan event:generate
```

Si hiciste todo bien, de seguro que la consola te respondera: ```Events and listeners generated successfully!```

Y dentro de la carpeta ```app\Listeners``` encontrarás la clase ```SuccessfulLogin```.

Ábrela, y en su interior encontrarás un método ```handle```.

Último paso: guardar la fecha
---

Llegados a este punto, puedes hacer con la fecha lo que mejor te parezca:

- Si solo te interesa saber la última fecha en que un usuario inició sesión, basta con que añadas una columna más a tu tabla de usuarios.

- Si lo que deseas, en cambio, es poder mostrar un historial con todas las fechas en que se inició sesión, entonces deberías crear una tabla adicional para ello.

Para este ejemplo, vamos a considerar la primera opción.

Entonces en la migración de ```users``` tendremos lo siguiente:

{% highlight php %}
$table->dateTime('last_login')->nullable();
{% endhighlight %}

Y en el método ```handle```:
{% highlight php %}
public function handle(Login $event)
{
    $event->user->last_login = new DateTime;
    $event->user->save();
}
{% endhighlight %}

Preguntas frecuentes
---

Es probable que te estés preguntando qué representa el objeto ```$event```.

Este objeto viene como parámetro en el método ```handle```, y esto es porque cuando Laravel activa el evento de Login, envía dicha información.

De la misma forma puede funcionar, si defines tus propios eventos.

Cuando actives los eventos, podrás enviar parámetros de esta forma, para que el listener actúe adecuadamente.

Para que lo comprendas mejor, puedes ver el siguiente video:

<div class="text-center">
    <iframe width="858" height="480" src="//www.youtube.com/embed/jcoHSzZKrQs?vq=hd720" frameborder="0" allowfullscreen></iframe>   
</div>

Hora incorrecta
---
Si en tu aplicación la fecha y hora se están registrando con un valor que no coincide con la hora de tu país.

Lo más probable es que no hayas definido la **zona horaria** de tu proyecto Laravel.

Para hacer ello debes ir a ```config\app.php```.

Allí te encontrarás con:

```
'timezone' => 'UTC',
```

En mi caso, estoy en Perú, así que modificaré la zona horaria de esta forma:

```
'timezone' => 'America/Lima',
```

Y el resultado:

![Tabla mostrando último login](/images/posts/2017/fecha-login/tabla.png)

Conclusión
---

Laravel define muchos eventos que nos serán muy útiles en nuestro proyecto.

Y si queremos definir nuestros propios eventos, también podremos hacerlo.

Por ejemplo, si queremos enviar un mail de confirmación cuando un usuario realiza una publicación en nuestra app, podemos usar un evento que escuche este registro satisfactorio.

Si tienes alguna duda, o crees que podemos mejorar esta guía, por favor deja un comentario.

Gracias por leer hasta el final.

[laravel-auth]: https://www.youtube.com/watch?v=cHnEp-i3vrU&index=2&list=PLzSFZWTjelbJTgPatTzeF1fvoMsqawntG
[events]: https://www.youtube.com/watch?v=jcoHSzZKrQs&list=PLzSFZWTjelbIi1UJ3WZZK8vVzgmhjAq25&index=6
