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

Versión Android
---
Si has terminado de ver todos los videos, te comento que también existe una versión en Android del proyecto.

Si deseas adquirir el código fuente, y una explicación general de cómo funciona esta aplicación, puedes hacerlo a través de la siguiente opción.

<div markdown="span" class="text-center">
	<a class="button" href="https://transactions.sendowl.com/products/524187/EFA78824/purchase" rel="nofollow">
		Deseo adquirir el proyecto completo
	</a>
</div>

<small>Muy pronto grabaré un curso explicando paso a paso cómo desarrollar la versión Android de este proyecto.
Si adquieres el código fuente ahora mismo, tendrás acceso al curso como cortesía sin pagos adicionales.</small>

<script type="text/javascript" src="https://transactions.sendowl.com/assets/sendowl.js"></script>

{% comment %}

Adquirir la parte final de la serie significa:

- Tener acceso a la última versión del código fuente web
- Tener acceso al código fuente del proyecto Android correspondiente
- Tener acceso de por vida a todas las actualizaciones de este sistema

Además, de forma opcional podrás solicitar asesoría personalizada por una hora. 
Así, yo mismo te ayudaré a desplegar la aplicación a un servidor de Digital Ocean, de forma que la plataforma funcione tanto en web como en móvil y la puedas usar con tu equipo de trabajo o para el fin que creas conveniente.

{% endcomment %}

[serie]: https://www.youtube.com/playlist?list=PLzSFZWTjelbJTgPatTzeF1fvoMsqawntG
