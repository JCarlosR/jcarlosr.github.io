---
title: "Escribir emails en Laravel usando Markdown"
categories: [Desarrollo web]
tags: [laravel]
---

Aprende a enviar emails usando markdown. Gracias a esta nueva característica de Laravel 5.4 no tienes que preocuparte más por escribir HTML y estilos CSS inline.

Una mejor forma de redactar emails
---

Desde Laravel 5.4 podemos escribir emails usando Markdown, pero no solo eso.

Podemos reutilizar componentes entre los emails que enviamos, usando Blade.

En esta entrada vamos a ver cómo escribir un email como el siguiente en **3 sencillos pasos**:

![Email resultante usando Markdown en Laravel](/images/posts/2017/laravel-email-markdown/email-resultado-laravel.png)

Pasos a seguir
---

- Lo primero que haremos será crear una clase que herede de ```Mailable```. Esta clase gestionará el envío del mail por nosotros.

- Luego crearemos una vista usando Markdown con el contenido del mail que vamos a enviar.

- Por último hacemos uso de nuestra clase, de nuestra vista, y enviamos nuestro mail.

Mailable
---

**¿Por qué es necesario crear una clase?**

Según la documentación:

> En Laravel **cada tipo de email** que enviamos desde nuestra aplicación se representa a través de una clase Mailable.

Estas clases estarán ubicadas en ```app\Mail```. 

Y no tenemos que preocuparnos por crear esta carpeta, ni la clase, porque esto lo hace el comando por nosotros:

```
php artisan make:mail OrderShipped --markdown=emails.orders.shipped
```

Nota: Lo que hace el comando anterior, es crear una clase ```OrderShipped``` y un archivo ```shipped.blade.php``` en ```resources/views/emails/orders```.

Es el ejemplo que aparece en la documentación de Laravel. Nosotros **debemos adecuar el comando según nuestras necesidades**.

Por ejemplo, ahora mismo quiero crear un **email de confirmación para nuevos usuarios**, y lo haré de la siguiente manera:

```
php artisan make:mail EmailConfirmation --markdown=emails.users.confirmation
```

Con esto tenemos nuestra clase y nuestra vista creadas.

Template usando Markdown
---

Nuestra vista, creada a través del comando, tiene ya **un contenido por defecto**, que hace uso de Markdown:

{% raw %}
```markdown
@component('mail::message')
# Introduction

The body of your message.

@component('mail::button', ['url' => ''])
Button Text
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
```
{% endraw %}

Si comparas este contenido con la imagen que está al inicio, notarás cómo **cada componente se encarga de asignar los estilos inline** por sí mismo.

Personalizando los componentes
---

Nosotros podemos crear nuestros propios componentes. 

Incluso podemos obtener los componentes por defecto para editarlos según nuestra conveniencia.

Para tener acceso a estos estilos y poder modificarlos, debemos usar el siguiente comando:

```
php artisan vendor:publish --tag=laravel-mail
```

Este comando va a:

- Extraer los componentes en ```resources/views/vendor/mail```; en 2 carpetas: ```html``` y ```markdown```.

- Generar una carpeta ```resources/views/vendor/mail/html/themes``` con un archivo ```default.css``` representando un tema por defecto para nuestros mails.

Si lo deseamos, podemos definir un nuevo theme creando un nuevo archivo CSS en la carpeta ```themes```. Considerando que el theme que será usado está especificado en ```config/mail.php```.

**Nota:** El haber generado estos archivos no significa que debamos sobreescribir todos los componentes. Ni que tengamos que hacer los cambios sobre los archivos generados.

A modo de ejemplo, yo he sobreescrito únicamente **el componente message**. Quedándome de esta manera:

{% raw %}
    @component('mail::layout')
    {{-- Header --}}
    @slot('header')
    @component('mail::header', ['url' => config('app.url')])
    {{ config('app.name') }}
    @endcomponent
    @endslot

    ![Logo de Programación y más][logo]

    {{-- Body --}}
    {{ $slot }}

    {{-- Footer --}}
    @slot('footer')
    @component('mail::footer')
    © {{ date('Y') }} {{ config('app.name') }}. Todos los derechos reservados.

    Si no deseas recibir más correos, puedes [modificar tus preferencias][unsubscribe].

    [unsubscribe]: {{ url('/configuracion') }}
    @endcomponent
    @endslot

    [logo]: https://programacionymas.com/images/mago/mago-200x200.png
    @endcomponent
{% endraw %}

Este componente message lo he puesto en ```resources/views/emails```. 

De tal forma que ```resources/views/emails/users/confirmation.blade.php``` quedó así:

{% raw %}
```markdown
@component('emails.message')
# E-mail de bienvenida

Hola {{ $user->name }}, bienvenido a **Programación y  más** !

Espero que el material del sitio te sea de ayuda, y puedas mejorar tus habilidades en programación.

Lo primero que debes hacer es confirmar tu correo electrónico haciendo clic en el siguiente enlace,

@component('mail::button', [ 'url' => $emailConfirmationUrl ])
    Clic para confirmar tu email
@endcomponent

De esta forma podremos estar en contacto.

Y si llegas a olvidar tu contraseña, la podrás recuperar a través de este correo.

Saludos, y que estés bien !
@endcomponent
```
{% endraw %}

**Nota:** Puedo usar ```$emailConfirmationUrl``` dado que también está definido en la clase **EmailConfirmation** como un atributo público. Otra alternativa es usar ```with``` para inyectar variables sobre la vista.


Enviar nuestro mail
----

Un comando creó la clase y la vista por nosotros.

Luego de editar la vista según nuestras necesidades, lo siguiente es "disparar el email".


**¿Cómo lo hacemos?**

```php
<?php
Mail::to($user)->send(new EmailConfirmation($user));
```

La línea habla por sí misma:

> Envía un email del tipo EmailConfirmation a $user.

**¿Por qué le pasamos un parámetro a la nueva instancia de EmailConfirmation?**

Es para poder usar los datos del usuario en la vista.

Y lo veremos ahora mismo.

Usando variables en la vista de nuestro mail
---

La clase ```EmailConfirmation``` recibe un objeto ```$user``` en este caso.
Pero nuestro Mailable puede recibir datos de cualquier tipo.

En este caso, nuestra clase se adecúa de la siguiente manera:

```php
<?php
class EmailConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function build()
    {
        return $this->markdown('emails.users.confirmation');
    }
}
```

Un antes y un después
---

La forma de enviar emails que se usaba en versiones anteriores de Laravel sigue estando disponible.

**Veamos rápidamente una comparación.**

Así es como yo enviaba un mensaje de confirmación **antes**:

```php
<?php
Mail::send('emails.users.confirmation', $data, function($message) use ($data) {
    $message->to($data['email'], $data['name'])->subject('Por favor confirma tu correo');
});
```

Y así es como queda el código usando ```Mailable```s:

```php
<?php
Mail::to($user)->send(new EmailConfirmation($user));
```

**¿Qué nos falta?**

Correcto. El asunto del email.

Este dato lo debemos poner en el método ```build``` de ```EmailConfirmation```:

```php
<?php
public function build()
{
    return $this->markdown('emails.users.confirmation')->subject('Por favor confirma tu correo');
}
```

Este método build debe "construir nuestro mail", indicando la vista que vamos a usar.

Además de indicar el ```subject``` también podemos usar ```attach``` y adjuntar archivos a nuestro email.

Conclusión
---

No tenemos que batallar más con el CSS.

Podemos usar cómodamente Markdown en vez de HTML.

Podemos usar (y crear nuestros propios) componentes.
