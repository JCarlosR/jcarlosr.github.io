---
title:  "Aprende Laravel desarrollando un Sistema de Gestión de Incidencias"
categories: [Desarrollo web]
tags: [laravel]
image: posts/2017/laravel-gestion-incidencias.png
---

La intención de este tutorial es demostrar **lo fácil y práctico que resulta usar Laravel** para desarrollar un sistema web.

El primer lenguaje backend que aprendí fue PHP (de seguro, al igual que una gran mayoría), y desarrollé mis primeros sistemas escribiendo "PHP puro". Es decir, desarrollaba sin usar un framework en particular. 

Ello significa organizar todos los archivos de mi proyecto por mi cuenta. Es genial porque conozco perfectamente lo que uso, pero a cambio tengo que hacer todo a mano.

De pronto tenía 2 caminos
---
Uno de ellos era probar varios frameworks y luego decidir cuál me resultaba más cómodo, a fin de conocerlo mejor y comenzar a usarlo para la mayoría de mis proyectos.
El otro camino consistía en organizar el código que ya había usado en mis desarrollos anteriores, y formar mi propio estándar.

El inconveniente de lo segundo es que, de pronto cuando tuviera que trabajar en conjunto con más personas, tendría que explicarles cómo es que funciona y cómo se organiza la base de código que uso para mis proyectos. 

De hecho tendría que escribir una documentación para que quienes trabajen conmigo acepten mi proyecto base como el suyo. En pocas palabras, es casi como tener que crear un framework propio y luego convencer a los demás de usarlo.

Mi primer acercamiento a Laravel
---
Vamos a darle una probada a este framework del que todo el mundo habla recientemente, me dije.

Así fue como accedí a la documentación oficial de Laravel por primera vez, y a leer los primeros tutoriales que encontraba.

No podía creer lo que estaba viendo. Resulta que era posible usar PHP con el paradigma de la programación orientada a objetos, y con una sintaxis bastante fácil de recordar.

Para muestra un botón:

{% highlight php %}
<?php

// Obtener el usuario con id 7
$user = User::find(7);

// Obtener el e-mail del usuario con id 7
$user->email;

// Actualizar el nombre del usuario con id 7
$user->name = 'Juan';
$user-save();

// Eliminar el usuario con id 7 (usando eliminación lógica si se desea)
$user->delete();

// Obtener las publicaciones (posts) del usuario seleccionado
$user->posts;
{% endhighlight %}

De todo
---
Realmente Laravel tiene de todo. 

Podemos enviar correos electrónicos, y validar nuestros formularios de forma muy fácil.

Para demostrarte lo sencillo y útil que resulta usar Laravel, he grabado una serie de tutoriales.

Esta serie de tutoriales se encuentra disponible en Youtube y muestra de forma práctica cómo desarrollar un sistema de gestión de incidencias, todo **sin costo alguno**.

¿Por qué lo hago?
---
La verdad es que me gusta compartir lo que aprendo, principalmente si la tecnología resulta de mi agrado.

He usado otros frameworks, en menor medida (cuando se trata de un requerimiento específico del proyecto). Y sigo creyendo que Laravel es más fácil de aprender y usar.

Con Laravel siento que no necesito nada más, ya que **la gran cantidad de paquetes que se han desarrollado para trabajar en conjunto con Laravel lo complementan** perfectamente.

No digo que Laravel es el mejor framework. Simplemente quiero mostrarte, si estás iniciando en el desarrollo backend, o tienes un tiempo sin animarte a usar un framework para PHP, que **Laravel es una muy buena opción** para empezar.

No se diga más
---
Si estás interesado en **aprender de forma gratuita**, a desarrollar el sistema de gestión de incidencias que antes te comenté, y desde cero, entonces es momento de que inicies con la serie haciendo clic en la siguiente imagen:

![Aprender Laravel de forma práctica](https://i.ytimg.com/vi/0iqYkOy4ups/hqdefault.jpg?custom=true&w=320&h=180&stc=true&jpg444=true&jpgq=90&sp=68)

¿Qué aprenderé?
---
Muy buena pregunta. 

Si quieres ver de antemano el listado de capítulos, aquí los tienes:

- **Capítulo 1:** Introducción
   
- **Capítulo 2:** Configuración y Sistema de autenticación
   
- **Capítulo 3:** Sistema de plantillas Blade
   
- **Capítulo 4:** Controladores y Middlewares
   
- **Capítulo 5:** Seeders
   
- **Capítulo 6:** Admin Middleware
   
- **Capítulo 7:** Modelamiento usando migraciones
   
- **Capítulo 8:** Inyectar variables en las vistas
   
- **Capítulo 9:** CSRF Token
   
- **Capítulo 10:** Método save()
   
- **Capítulo 11:** Reglas de validación
   
- **Capítulo 12:** Items del menú con class active
   
- **Capítulo 13:** Accessors y Mutators
   
- **Capítulo 14:** Niveles de atención (Modelado)
   
- **Capítulo 15:** CRUD de Usuarios de soporte
   
- **Capítulo 16:** Soft deletes
   
- **Capítulo 17:** Proyectos
   
- **Capítulo 18:** Categorías y Niveles
   
- **Capítulo 19:** Cargar SELECT dinámicamente
   
- **Capítulo 20:** Asignar proyectos a los usuarios
   
- **Capítulo 21:** Listar proyectos disponibles
   
- **Capítulo 22:** Proyecto seleccionado
   
- **Capítulo 23:** Dashboard
   
- **Capítulo 24:** Incidencias reportadas como cliente
   
- **Capítulo 25:** Error 404 y findOrFail
   
- **Capítulo 26:** Estados de una incidencia
   
- **Capítulo 27:** Atender, derivar, resolver, y re-abrir una incidencia
   
- **Capítulo 28:** Editar incidencia
   
- **Capítulo 29:** Discusión

Aún hay más
---
Dado que el tutorial tuvo una buena acogida, y el sistema que desarrollamos puede aplicarse a un equipo de trabajo de cualquier rubro, he querido que vayamos a un siguiente paso.

Con ello me refiero a añadir realtime a la aplicación web, y así mismo desarrollar una aplicación móvil que funcione en paralelo.

Para programar la característica de realtime usaremos Pusher, como comenté en los últimos capítulos de la serie; y la aplicación móvil la desarrollaremos para Android.

Esta parte final de la serie sí tiene un costo. Pero a cambio, ten por seguro que podrás **ver la aplicación finalizada** y trabajando al 100%, ya que **los tutoriales cuentan con un buen nivel de detalle** :)

El código fuente de la aplicación web se encuentra disponible en Github de forma gratuita, pero dicho repositorio no está actualizado a la versión final.

Las características más emocionantes solo estarán disponibles para quienes deseen seguir la serie hasta el final.

Adquirir la parte final de la serie significa:

- Tener acceso a la última versión del código fuente web
- Tener acceso al código fuente del proyecto Android correspondiente
- Tener acceso de por vida a todas las actualizaciones de este sistema

Además, de forma opcional podrás solicitar asesoría personalizada por una hora. 
Así, yo mismo te ayudaré a desplegar la aplicación a un servidor de Digital Ocean, de forma que la plataforma funcione tanto en web como en móvil y la puedas usar con tu equipo de trabajo o para el fin que creas conveniente.

<a class="button text-center" href="https://transactions.sendowl.com/products/524187/EFA78824/purchase" rel="nofollow">
	Deseo adquirir el proyecto completo
</a>
<script type="text/javascript" src="https://transactions.sendowl.com/assets/sendowl.js"></script>


Nota 1: *Si adquieres el paquete ahora podrás descargar inmediatamente el código fuente del proyecto Android. Sin embargo, los videotutoriales aún están en camino. En cuanto los tenga, actualizaré los archivos, recibrás una notificación vía mail y tendrás acceso a ellos sin costo alguno.*

Nota 2: *Como agradecimiento, por confiar en mi trabajo y ser de los primeros en adquirir este paquete, tienes acceso a un descuento especial. Esta promoción dejará de ser válida a finales de Marzo.*

[serie]: https://www.youtube.com/playlist?list=PLzSFZWTjelbJTgPatTzeF1fvoMsqawntG
