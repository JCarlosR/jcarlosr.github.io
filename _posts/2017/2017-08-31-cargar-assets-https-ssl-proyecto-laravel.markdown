---
title: "¿Tu proyecto Laravel tiene HTTPS y no cargan los assets? (Imágenes, estilos, scripts)"
categories: [Desarrollo web]
tags: [laravel]
---

Cuando añadimos un protocolo seguro a nuestro dominio es común que los assets de nuestra aplicación dejen de cargar adecuadamente. Aprende cómo solucionar este problema ya mismo!

___

## Introducción

¿Has configurado tu dominio para que funcione con HTTPS y ahora sucede que no cargan los recursos de tu proyecto Laravel?

Este es un problema muy común, pero no te preocupes porque ahora mismo vamos a solucionarlo.

## El problema a solucionar

¿Te sucede lo siguiente?

- No cargan las imágenes
- No cargan los archivos Javascript
- No cargan las hojas de estilo (CSS)

El problema radica en que una página segura (con protocolo HTTPS) no puede ni debe cargar recursos que no son seguros (que se sirven a través del protocolo HTTP).

Tal como lo indica la siguiente imagen:

![No cargan los recursos estáticos](/images/posts/2017/laravel-ssl-https/no-cargan-recursos.png)

Si usas los helpers `url` y `asset` para generar enlaces absolutos a tus recursos y otras páginas de tu aplicación, y éstos enlaces se crean usando HTTP en vez de HTTPS, ese es justamente el problema.

¿Tienes algunos recursos que sí son cargados correctamente? Lo más probable es que estés usando rutas relativas para acceder a ellos.

Pero no es adecuado que cambies todos los enlaces absolutos de tu aplicación por unos relativos, porque siempre existirá el riesgo de que se te escapen algunos.

Lo que veremos ahora es una solución general para que los enlaces absolutos se creen haciendo uso de HTTPS.

## Una solución en 2 pasos

Lo que haremos será:

1. Definir nuestra propia clase `Request`.
2. Indicar a Laravel que use nuestra clase `Request` en vez de la que viene por defecto.

### Paso 1: Definir nuestra propia clase Request

Vamos a crear una clase Request que extienda de la clase Request original, y vamos a sobreescribir el método `isSecure` por uno más adecuado.

Por lo tanto, copia el siguiente código y úsalo para crear una clase Request.

```php
<?php namespace App\Custom\Http;
use \Illuminate\Http\Request as Base;

class Request extends Base {

    public function isSecure() {
        $isSecure = parent::isSecure();
        if ($isSecure) {
            return true;
        }
        if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') {
            return true;
        } else if (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https' || !empty($_SERVER['HTTP_X_FORWARDED_SSL']) && $_SERVER['HTTP_X_FORWARDED_SSL'] == 'on') {
            return true;
        }
        return false;
    }

}
?>
```

En este caso yo he creado 2 carpetas nuevas, una dentro de otra y he ubicado allí la clase Request:

![Ubicación de la nueva clase Request](/images/posts/2017/laravel-ssl-https/custom-http-request.png)

Para tu proyecto puedes situar esta clase donde creas conveniente, pero de ser así recuerda actualizar el `namespace` que aparece en la primera línea.

### Paso 2: Indicar a Laravel qué clase Request usar

Para esto ve a `public/index.php` y reemplaza este fragmento de código:

```php
<?php
$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);
?>
```

Por este otro:

```php
<?php
$response = $kernel->handle(
    $request = App\Custom\Http\Request::capture()
);
?>
```

Y eso es todo :)

## Conclusión

Luego de aplicar los cambios, si usas `asset('ruta/a/tu/recurso.css')` el resultado que se va a imprimir sobre tu página es `https://tudominio.com/ruta/a/tu/recurso.css`.

Antes del cambio, el resultado era de esta forma: `http://tudominio.com/ruta/a/tu/recurso.css`.

Pero tus enlaces relativos no se veían afectados porque `/ruta/a/tu/recurso.css` es equivalente a `https://tudominio.com/ruta/a/tu/recurso.css` cuando estás cargando el recurso desde `https://tudominio.com/`.

Luego del cambio, la página volverá a ser la misma de siempre:

![Recursos cargados correctamente gracias a la clase Request](/images/posts/2017/laravel-ssl-https/recursos-cargados.png)
