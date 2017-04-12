---
title:  "Aprende Laravel desarrollando un Sistema de Gestión de Incidencias"
categories: [Desarrollo web]
tags: [laravel]
image: posts/2017/laravel-gestion-incidencias.png
---

La intención de este tutorial es demostrar **lo fácil y práctico que resulta usar Laravel** para desarrollar un sistema web.

De PHP a Laravel
---

El primer lenguaje backend que aprendí fue PHP (de seguro, al igual que una gran mayoría), y desarrollé mis primeros sistemas escribiendo "PHP puro". 

Es decir, desarrollaba sin usar un framework en particular. 

Ello implicaba organizar todos los archivos del proyecto por mi cuenta. 

Por un lado es genial, porque uno conoce perfectamente lo que usa, pero a cambio se tiene que hacer todo a mano.

De pronto tenía 2 caminos
---
Uno de ellos era probar varios frameworks y luego decidir cuál me resultaba más cómodo, a fin de conocerlo mejor y comenzar a usarlo para la mayoría de mis proyectos.

**El otro camino** consistía en organizar el código que ya había usado en mis desarrollos anteriores, y formar mi propio estándar.

El inconveniente de lo segundo es que, de pronto cuando tuviera que trabajar en conjunto con más personas, tendría que explicarles cómo es que funciona y cómo se organiza la base de código que uso para mis proyectos. 

De hecho tendría que escribir una documentación para que quienes trabajen conmigo acepten mi proyecto base como el suyo. 

En pocas palabras, es casi como tener que crear un framework propio y luego convencer a los demás de usarlo.

¿La solución?

Mi primer acercamiento a Laravel
---
_Vamos a probar este framework del que todo el mundo habla recientemente_, me dije.

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

¿Por qué Laravel?
---
La verdad es que me gusta compartir lo que aprendo, principalmente si la tecnología resulta de mi agrado.

He usado otros frameworks, en menor medida (cuando se trata de un requerimiento específico del proyecto). Y sigo creyendo que Laravel es más fácil de aprender y usar.

Con Laravel siento que no necesito nada más, ya que **la gran cantidad de paquetes que se han desarrollado para trabajar en conjunto con Laravel lo complementan** perfectamente.

No digo que Laravel es el mejor framework. Simplemente quiero mostrarte, si estás iniciando en el desarrollo backend, o tienes un tiempo sin animarte a usar un framework para PHP, que **Laravel es una muy buena opción** para empezar.

Empieza por aquí
---
Si estás interesado en **aprender de forma gratuita**, a desarrollar el sistema de gestión de incidencias que antes te comenté, y desde cero, entonces **es momento que inicies con la serie haciendo clic en la siguiente imagen**:

<div class="text-center">
	<iframe width="858" height="480" src="//www.youtube.com/embed/videoseries?list=PLzSFZWTjelbJTgPatTzeF1fvoMsqawntG&vq=hd720" frameborder="0" allowfullscreen></iframe>
</div>


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

Material adicional
---
Mi sugerencia es que veas la serie en orden.

Así podrás **desarrollar tú mismo el sistema web paso a paso**.

Pero, aquí te dejo **contenido adicional** por si deseas reforzar alguno de los temas:

### Si estás iniciando
- [Cómo crear mi primer CRUD en Laravel][crud-laravel]
- [Cómo registrar y validar en Laravel][validar-laravel]
- [Aprende a restringir el acceso solo a administradores][middleware-admin]
- [Cómo subir imágenes usando Laravel, y cómo reducir su tamaño][upload-images]
- [Redirgir a un usuario a una página u otra según su rol][redirigir-rol]

### Temas intermedios
- [Eventos o Triggers en Laravel][model-events]
- [Exportar archivos Excel usando Laravel][excel-laravel]
- [Aprende a enviar mensajes SMS usando Twilio y Laravel][twilio-tutorial]

### Muy importantes
- [Cómo añadir más columnas en las migraciones sin perder los datos][nuevas-migraciones]
- [Aprende a validar el correo de tus usuarios en Laravel, usando un correo de confirmación][email-confirm]
- [Organiza tu proyecto Laravel adecuadamente en carpetas][laravel-folders]

### Temas adicionales
- [Cómo subir tu app Laravel a un hosting fácilmente][deploy-laravel]
- [Cómo usar Laravel en conjunto con VueJS][vue-js]

Continuación: Versión Android
---
Si has terminado de ver todos los videos, te comento que también existe una versión Android del proyecto.

Aunque aun estoy preparando la [serie de tutoriales sobre Android][tutos-android], de este mismo sistema.

Conclusión
---

Laravel es el framework PHP más usado en la actualidad.

Y su popularidad se debe principalmente a que es muy fácil y práctico de usar, incluso desde sus inicios.

Por mi parte, espero que te hayas animado a darle una oportunidad a este framework.

Gracias por tu visita. Y recuerda dejar un comentario si tienes alguna duda!

___

<p class="text-muted">Si deseas usar el sistema tanto en su <strong>versión web y móvil</strong>, y revisar el código fuente para potenciar tu aprendizaje, puedes
<a href="https://gum.co/laravel-incidencias?wanted=true" target="_blank" data-gumroad-single-product="true">adquirir el sistema completo</a>.
</p>
<script src="https://gumroad.com/js/gumroad.js"></script>


[crud-laravel]: https://www.youtube.com/watch?v=EWSSxd0Cb1o&list=PLzSFZWTjelbIi1UJ3WZZK8vVzgmhjAq25&index=1
[validar-laravel]: https://www.youtube.com/watch?v=jvhZLtgar-k&list=PLzSFZWTjelbIi1UJ3WZZK8vVzgmhjAq25&index=2
[middleware-admin]: https://www.youtube.com/watch?v=3sYpKhF6B0k&list=PLzSFZWTjelbIi1UJ3WZZK8vVzgmhjAq25&index=3
[upload-images]: https://www.youtube.com/watch?v=ErU7mcIYPwA&list=PLzSFZWTjelbIi1UJ3WZZK8vVzgmhjAq25&index=4
[redirigir-rol]: https://www.youtube.com/watch?v=7ALqpT7JpB4&list=PLzSFZWTjelbIi1UJ3WZZK8vVzgmhjAq25&index=5
[model-events]: https://www.youtube.com/watch?v=jcoHSzZKrQs&list=PLzSFZWTjelbIi1UJ3WZZK8vVzgmhjAq25&index=6
[excel-laravel]: https://www.youtube.com/watch?v=s-ZeszfCoEs&list=PLzSFZWTjelbIi1UJ3WZZK8vVzgmhjAq25&index=9
[nuevas-migraciones]: https://www.youtube.com/watch?v=G_BPA6566qA&list=PLzSFZWTjelbIi1UJ3WZZK8vVzgmhjAq25&index=10
[email-confirm]: /blog/confirmar-email-laravel
[laravel-folders]: https://www.youtube.com/watch?v=Ktu9XXCfAaM&list=PLzSFZWTjelbIi1UJ3WZZK8vVzgmhjAq25&index=12
[twilio-tutorial]: https://www.youtube.com/watch?v=fSgb8LiY2B4&list=PLzSFZWTjelbIi1UJ3WZZK8vVzgmhjAq25&index=13
[deploy-laravel]: /blog/hacer-deploy-app-laravel-digital-ocean
[vue-js]: https://www.youtube.com/watch?v=AUQceG6ZBy0&list=PLzSFZWTjelbIi1UJ3WZZK8vVzgmhjAq25&index=15
[tutos-android]: https://www.youtube.com/playlist?list=PLzSFZWTjelbI_qvEzuvMhA0xNsKnK1qid