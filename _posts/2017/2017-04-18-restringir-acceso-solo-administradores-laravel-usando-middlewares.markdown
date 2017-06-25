---
title: "Restringir el acceso a solo administradores en Laravel, usando Middlewares"
categories: [Desarrollo web]
tags: [laravel]
image: posts/2017/laravel-admin/laravel-admin-middleware.png
---

En este tutorial de Laravel aprenderás a restringir el acceso a tus rutas, según el rol de cada usuario.

Acerca de los Middlewares
---

Los primeros conceptos que aprendemos de un framework generalmente son los siguientes:

- Modelos
- Rutas
- Controladores
- Vistas

Una vez que sabemos qué son y cómo usarlos, es importante abordar otros temas, como el uso de ```middlewares```.

En términos simples podemos decir que:

> Un middleware es un puente que existe entre la petición que un usuario hace a una ruta y el controlador.

De esta forma, antes que un controlador resuelva la petición, un middleware actuará a mitad del proceso.

**Este middleware podrá asegurarse de que se cumpla una condición determinada**, y en caso que no, redirigir al usuario (o ejecutar alguna acción) **evitando que el controlador entre en acción**.

___

En Laravel algunos middlewares son definidos desde la creación de nuestro proyecto.

Sin embargo, podemos definir nuestros propios middlewares.

En este caso, vamos a definir un middleware que va a restringir el acceso de los usuarios según su rol.

Middleware para restringir el acceso (solo administradores)
---

¿Cómo creamos un middleware?

Para facilitarnos esta tarea Laravel pone a nuestra disposición el siguiente comando:

```
php artisan make:middleware AdminMiddleware
```

El último término ```AdminMiddleware``` es el nombre que usaremos en nuestro ejemplo.

Este nombre puede variar según el propósito.

Por ejemplo, si nuestra página es para el público en general pero tenemos una sección de apuestas, podemos crear un ```AgeMiddleware```, y **restringir el acceso**, para que solo puedan acceder personas mayores de edad.

En fin.

Una vez que hemos ejecutado el comando, se creará un archivo en la siguiente ruta: ```app\Http\Middleware\AdminMiddleware.php```.

Y tendrá el siguiente contenido:

{% highlight php %}
<?php

namespace App\Http\Middleware;

use Closure;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        return $next($request);
    }
}
{% endhighlight %}

Definiendo nuestro middleware
---

En el código generado para nuestro ```AdminMiddleware```, es importante comprender que esta línea:

```
return $next($request);
```

se expresa como "continúa tu camino".

Si nuestro middlware no realiza ninguna validación en el método ```handle``` y directamente devuelve esa respuesta, entonces es como si no existiera porque no impone ninguna restricción.

La ejecución seguirá su camino.

Eso significa que luego de pasar el ```AdminMiddleware``` la ejecución pasará por los siguientes middlewares que hagan falta, y por último llegará al controlador.

Entonces, es aquí donde tenemos que añadir nuestra condición.

Quedamos en que queremos validar si un usuario es administrador, y dejarlo pasar, solo si es administrador. ¿Recuerdas?

Entonces vamos a añadir una columna en nuestra tabla de usuarios, llamada ```is_admin```. Esta nos permitirá saber si un usuario es administrador o no.

{% highlight php %}
<?php
$table->boolean('is_admin')->default(false);
{% endhighlight %}

De tal forma que nuestro método ```handle``` quede de esta manera:

{% highlight php %}
<?php
public function handle($request, Closure $next)
{
    if (auth()->check() && auth()->user()->is_admin)
        return $next($request);

    return redirect('/');
}
{% endhighlight %}

Este último código se lee como:

> Si el usuario autenticado es administrador, déjalo pasar, y si no, redirígelo a la ruta principal.

Registrando nuestro middleware
---

Para facilitar el uso de nuestro middleware es importante registrarlo bajo un nombre.

Vamos a ```app\Http\Kernel.php``` y en el siguiente arreglo vamos a agregar nuestro middleware:

{% highlight php %}
<?php
protected $routeMiddleware = [
    'auth' => \Illuminate\Auth\Middleware\Authenticate::class,
    'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
    'bindings' => \Illuminate\Routing\Middleware\SubstituteBindings::class,
    'can' => \Illuminate\Auth\Middleware\Authorize::class,
    'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
    'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
];
{% endhighlight %}

Es decir, añadimos un elemento más:
{% highlight php %}
<?php
protected $routeMiddleware = [
    'auth' => \Illuminate\Auth\Middleware\Authenticate::class,
    'admin' => \App\Http\Middleware\AdminMiddleware::class,
    'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
    'bindings' => \Illuminate\Routing\Middleware\SubstituteBindings::class,
    'can' => \Illuminate\Auth\Middleware\Authorize::class,
    'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
    'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
];
{% endhighlight %}

Aplicando nuestro middleware
---

¡Ya tenemos nuestro middleware registrado!

Solo falta aplicarlo.

Podemos usar nuestro middlware:

- directamente sobre una ruta en específico, 
- sobre un conjunto de rutas, 
- o sobre un controlador (afectando a todas las peticiones que este controlador está destinado a resolver).

> ¿Cómo es que deberíamos aplicar nuestros middlewares? ¿Cuál es la forma correcta?

Todas las formas son correctas.

Usar una u otra va a depender del proyecto que estés desarrollando.

Por ejemplo, si el panel para administradores solo difiere un poco del panel de usuarios, es probable que solo quieras aplicar el middleware a un controlador.

Sin embargo, si el administrador puede gestionar muchas entidades, a diferencia de un usuario regular, sería conveniente crear un grupo de rutas y aplicar el middleware a todas ellas.

___

Permíteme explicarlo a través de **un ejemplo**.

Digamos que estoy desarrollando ahora mismo una aplicación donde los usuarios pueden conectarse y ver una serie de tutoriales, organizados por categorías.

El usuario administrador debe ser el único que pueda editar la información de las series.

Entonces, vamos a crear un grupo de rutas y aplicar el middleware ```admin``` sobre ellas:

{% highlight php %}
<?php
Route::group(['middleware' => 'admin'], function () {
    Route::get('/admin/series', 'Admin\SeriesController@index');
    Route::get('/admin/series/{id}', 'Admin\SeriesController@edit');
});
{% endhighlight %}

El código anterior funciona muy bien.

Y hay 2 cosas que debemos tener en cuenta:

- Ambas rutas se encuentran bajo el prefijo ```/admin```.
- El controlador ```SeriesController``` se encuentra bajo el namespace ```Admin```.

Podemos simplificar nuestro grupo de rutas de la siguiente manera:

{% highlight php %}
<?php
Route::group([
    'middleware' => 'admin',
    'prefix' => 'admin',
    'namespace' => 'Admin'
], function () {
    Route::get('/series', 'SeriesController@index');
    Route::get('/series/{id}', 'SeriesController@edit');
});
{% endhighlight %}

De tal forma que, podemos continuar añadiendo rutas a este grupo, y todas ellas:

- Estarán validadas por el middlware ```admin```.
- Tendrán como prefijo ```/admin```.
- Sus controladores respectivos se encontrarán ubicados en ```App\Http\Controllers\Admin```.


Conclusión
---

**Laravel nos facilita la gestión de roles y permisos** a través de los middlewares.

De hecho existen paquetes más sofisticados para usar con nuestro proyecto Laravel, pero este es el punto de partida.

Si tienes alguna duda, te recomiendo ver el siguiente video:

<div class="text-center">
    <iframe width="858" height="480" src="//www.youtube.com/embed/3sYpKhF6B0k?vq=hd720" frameborder="0" allowfullscreen></iframe>   
</div>

Es un videotutorial sobre cómo aplicar lo que hemos visto en este artículo.

Y ya sabes. Si tienes alguna duda, tan solo deja un comentario.

Gracias por ver hasta el final y recuerda compartir el contenido en redes sociales si te ha sido de utilidad.
