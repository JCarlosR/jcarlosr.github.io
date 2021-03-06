---
layout: tutorial
permalink: /frontend-vs-backend/
image: tutoriales/frontend-vs-backend.jpg
title: "Desarrollo web: Frontend vs Backend"
subtitle: "Aprende a diferenciar las tecnologías de lado del cliente y de lado del servidor."
description: "¿Cuál es la diferencia entre frontend y backend? ¿Tecnología de lado del cliente y del servidor? ¿Diseñador web y desarrollador web?"
---

Frontend vs Backend
---
  
Si **inicias en el desarrollo web** es altamente probable que te hayas encontrado con estos términos:
  
<ul>
  <li>Frontend vs Backend</li>
  <li>Diseñador web vs desarrollador web</li>
  <li>Tecnología de lado del cliente vs tecnología de lado del servidor</li>
</ul>

<p>En esta artículo aprenderás a diferenciarlos.</p>

<img src="/images/tutoriales/frontend-vs-backend.jpg" alt="Frontend vs Backend" class="img-responsive">

<p class="lead">La intención de este artículo es describir de forma resumida las diferencias, y explicar a través de ejemplos.</p>

Y recuerda que si algo no te queda claro, puedes usar la sección de comentarios al final de la página.

___

Entrando en contexto
---
En el desarrollo web moderno intervienen muchos roles en el desarrollo de aplicaciones web.

"Desarrollador frontend" y "desarrollador backend" son solo 2 de estos roles.

Ambos en conjunto cubren el desarrollo de **lo que se ve** y **cómo funciona** una página web, sin embargo _hay más funciones que se deben desempeñar_ y que no son muy obvias cuando recién inicias en el desarrollo web.

___

¿Qué otros roles existen?
---

<blockquote>
  ¿Cómo es posible que existan tantos roles si mi amigo hace páginas web él solo y en poco tiempo?
</blockquote>

Espera. No te molestes, que te lo explicaré con mayor detenimiento.

Lo primero que debes saber es que, es diferente desarrollar una **página informativa**, que desarrollar una **plataforma web** donde los usuarios pueden interactuar.

Y eso, también es diferente a desarrollar un sistema web que permita gestionar todas las operaciones (internas y externas) de una empresa, e integre **varios módulos**: compras, ventas, contabilidad, facturación, recursos humanos, entre otras funcionalidades más.

Como ya lo habrás notado, **mientras más complejo es un proyecto, más roles se van a necesitar** a fin de entregar un software de calidad.

A continuación algunos roles más que intervienen en el desarrollo de proyectos de software (no se limita a desarrollo web):

<ul>
  <li>Gestor del proyecto</li>
  <li>Arquitecto de información</li>
  <li>Diseñador gráfico</li>
  <li>Especialista en usabilidad y experiencia de usuario</li>
  <li>Administrador de bases de datos</li>
  <li>Redactor y editor de contenidos</li>
  <li>Especialista en seguridad de la información</li>
</ul>

Pero no nos desviemos del tema.
Vamos a lo que nos interesa.

___

Lado del cliente: el origen de todo
---

Cuando un usuario llega a una página web, se realiza una **petición al servidor** donde está alojada dicha página.

Como respuesta a esta petición, **el dispositivo que usa el usuario recibe información** (y se le llama cliente porque es quien hace la petición): archivos HTML, CSS y Javascript, además de imágenes, sonidos, videos y otros recursos que podría tener el sitio.

Es el navegador el que se encarga de interpretar toda esta información (sea que estés usando Chrome, Firefox, Safari o el mismo Internet Explorer).

Veamos entonces las tecnologías del lado del cliente:

<div class="text-center">
  <img src="/images/skills/html-css-js.png" alt="Tecnologías frontend" class="img-responsive" width="200">
</div>

<ul>
	<li><strong>HTML:</strong> Estos archivos definen la estructura semántica del sitio (le dice a los navegadores qué imágenes, menús de navegación, y secciones contiene cada página).</li>
	<li><strong>CSS:</strong> Los archivos CSS u <strong>hojas de estilo en cascada</strong> definen la apariencia de la página (los colores de fondo, tamaños y colores de fuente, ubicación de los elementos, cambios según el tamaño del dispositivo).</li>
  <li><strong>Javascript:</strong> Este es el lenguaje de programación que interpretan los navegadores, y por tanto, es el lenguaje que permite realizar interacciones con la página. JS permite escuchar eventos (clic, doble clic, cursor encima de, arrastrar) y realizar alguna acción como efecto de ello (modificar la estructura HTML, o cambiar las propiedades de los elementos alterando sus estilos asignados inicialmente).</li>
</ul>

Esto siempre ha funcionado así.

Lo que cambian son los estándares sobre cómo se deben escribir las cosas, y cómo deben interpretar los navegadores.

___

<h2>¿Y el lado del servidor?</h2>

¿Te parece que con lo anterior ya lo tenemos todo?

No es así. Faltan cubrir muchas cosas, igual de interesantes.

Imagina que ahora quieres que tus usuarios inicien sesión, se registren y guarden su información en tu página.

Quieres guardar sus preferencias, sus imágenes, sus conversaciones.

Para eso necesitas una base de datos. Y necesitas conectar tu página a dicha base de datos de alguna forma.

<blockquote>
  ¿Puede HTML o CSS hacer eso?
</blockquote>

No, y  no. HTML solo define la estructura de un sitio, y CSS los estilos. No son lenguajes de programación.

<blockquote>
  Vaya, ¿entonces Javascript sí puede?
</blockquote>

Sí, y no.

Javascript sí es un lenguaje de programación, pero ejecutado sobre un navegador no puede ni debe conectarse a la base de datos de tu aplicación.

<p class="lead">Ten en cuenta que el código Javascript que se ejecuta en el navegador se puede alterar.</p>

Se puede modificar porque se ejecuta en el navegador, y el navegador es la computadora del usuario visitante.

Entonces si expones el usuario y contraseña de tu base de datos en el código Javascript de tu página, todos lo verían.

<blockquote>
  ¿Eso significa que puedo modificar cualquier página que visito? :o
</blockquote>

Sí, y no.

Puedes modificar las páginas que visitas, ejecutando código Javascript que tú mismo escribes. También puedes modificar la estructura HTML del sitio que estás viendo y alterar las propiedades CSS.

Pero, sólo tú verás los cambios.

<p class="lead">Recuerda que estas tecnologías se están ejecutando en tu ordenador (o smartphone, o tablet, o smart TV), pero el servidor ya te respondió.</p>

Por más cambios que hagas, esos cambios no persisten en el servidor. Son cambios que haces para ti, y que los demás no podrán ver. 

A menos que compartas con alguien el código Javascript que usaste, pero eso no tiene sentido, porque lo verían solo ustedes 2.

Cada vez que alguien haga una petición a la página, el servidor responderá con la información correcta, que de eso se encarga el desarrollador **backend**.

___

El camino completo
---

<p>Cuando un usuario visita una página, está haciendo una petición GET (<a href="https://www.youtube.com/edit?o=U&video_id=Qk2cqRtWkDo">existen distintas formas de realizar peticiones</a>, distintos verbos HTTP) al servidor.</p>

La tecnología usada como backend se encargará de elaborar una respuesta, y entonces devolverá al cliente archivos HTML, CSS, Javascript y demás recursos.

Elaborar una respuesta puede implicar varias cosas. Algunas de ellas podrían ser:

<ul>
  <li>Verificar si el usuario tiene permisos para ver dicha página.</li>
  <li>Consultar la base de datos y mostrar los resultados en la página.</li>
  <li>Mostrar aleatoriamente una imagen.</li>
  <li>Realizar un cálculo importante y mostrar el resultado.</li>
</ul>

<p>Así, <strong>el cliente recibirá la respuesta ya procesada</strong>. Podrá alterar estos archivos como ya te comenté antes, pero la verdadera base de datos se ve reflejada en la respuesta que realiza el servidor, porque eso es lo que ven todos los clientes conectados <em>como la verdad absoluta</em>.</p>

___

La verdad absoluta
---

Para que se comprenda mejor te pongo un ejemplo.

Hace poco encontré un juego online bastante entretenido, al estilo del entrañable **Bomberman**.

<div class="text-center">
  <img src="/images/tutoriales/frontend-vs-backend/bomberman.jpg" alt="Bomberman online" class="img-responsive" width="200">
</div>

Era un juego de "todos contra todos" donde cada uno controlaba un personaje y trataba de conseguir la mayor cantidad de víctimas posible.

El punto es que, algunos personajes tenían apareciencias más destacables.

Algunos jugadores tenían como personaje a Naruto, Batman, Spiderman, un zombie, un dragón, un gato, etcétera.

<blockquote>
  Genial, ¿y cuál escogiste?
</blockquote>

Lamentablemente no podía cambiar el skin de mi personaje porque para ello había que recargar puntos, y por tanto pagar. Y yo solo estaba de pasada.

El servidor es el que se encarga de ver qué jugadores están conectados, qué skin tiene escogido cada jugador, y de comunicar esta información a cada cliente conectado.

Yo analicé un poco el código Javascript y pude cambiar la apariencia de mi personaje, **alterando el código Javascript que se ejecutaba en mi ordenador**.

Fue bueno, porque pude jugar con una apariencia más llamativa.

Pero lo triste detrás de esta historia (como ya habrás notado) es que sólo yo me veía de esa forma. Todos los demás jugadores me veían con la apariencia por defecto.

<blockquote>
  ¿Y te quedaste tranquilo?
</blockquote>

Si tu pregunta está orientada a si pagué, prefiero no responder :P

Pero si me estás preguntando si detecté alguna **vulnerabilidad en el sitio**, es una buena pregunta.

Accedí a la tienda. Vi el botón para comprar el skin que quería. Le di clic.

Apareció una ventana flotante solicitando que realice un pago.

Revise los eventos del botón, a fin de predecir qué pasaría luego de hacer la compra.

Y curiosamente encontré una función que le decía al servidor que me asigne el skin que había escogido, y que a su vez me lo asigne por un tiempo limitado (¿gran negocio verdad?).

Entonces hice la petición al servidor por mi cuenta. Creí que había conseguido lo que quería.

Pero no. El servidor verificó si había un pago registrado en la base de datos.

Como ese pago no existía, la orden que se le daba perdía peso, y por tanto no se ejecutaba.

Esa es la **verdad absoluta que el servidor debe imponer**.

___

La verdad acerca de las verdades absolutas
---

Es lógico que un juego con una cantidad considerable de usuarios activos, tenga muy bien desarrollado tanto su lado frontend (las animaciones que realiza el juego, los colores, los estilos de fuente, las imágenes, las ventanas flotantes) como su lado backend (las validaciones, la correcta ejecución de las operaciones de compra).

Pero lo cierto es que muchos sitios no están creados correctamente.

Algunos sitios realizan validaciones en el lado del cliente (usando Javascript), pero no validan adecuadamente en el lado del servidor.

___

Tecnologías backend
---

A continuación, un listado de las tecnologías más representativas del desarrollo backend:

<ul>
  <li>PHP (Laravel, Symfony)</li>
  <li>Java (Spring)</li>
  <li>Python (Django)</li>
  <li>Ruby (Ruby on Rails)</li>
  <li>Javascript (Node.JS)</li>
</ul>

Lo que se menciona primero es el lenguaje y lo que está entre paréntesis son unos ejemplos de frameworks para cada uno de ellos. Puedes leer <a href="https://www.youtube.com/edit?o=U&video_id=EWSSxd0Cb1o">"¿En qué se diferencia un framework de un lenguaje de programación?"</a> para aclarar tus posibles dudas.

<blockquote>
  Ok. Pero, espera, ¿acabas de mencionar Javascript como una tecnología backend?
</blockquote>

Así es. Javascript es un lenguaje de programación que se puede ejecutar como tecnología de lado del cliente (sobre el navegador), pero también puede funcionar como una tecnología de lado del servidor.

<blockquote>
  Ya veo. De todas formas, me parece que el backend es mucho más complejo que el frontend.
</blockquote>

Cuando uno recién empieza, puede tener esa impresión.
Pero déjame decirte 4 cosas:

<ul>
  <li>Mira en qué año estamos</li>
  <li>Lee a continuación más sobre el desarrollo frontend</li>
  <li>Reflexiona sobre lo inmenso que es este mundo</li>
  <li>Pero JAMÁS abandones tu aprendizaje, ya que todo esto lo puedes aprender</li>
</ul>

Tecnologías frontend
---

Lo diré de forma breve para que no resulte confuso, pero <a href="https://medium.com/javascript-scene/top-javascript-frameworks-topics-to-learn-in-2017-700a397b711">te dejaré un enlace por si quieres profundizar</a> un poco más acerca de la situación actual del desarrollo frontend y lo que comprende.

Así como existen tecnologías backend y frameworks para estos lenguajes, existe también toda una variedad de frameworks para Javascript:

<ul>
  <li>Angular</li>
  <li>React</li>
  <li>Vue</li>
  <li>Meteor</li>
  <li>Backbone</li>
  <li>Ember</li>
  <li>Y muchos más</li>
</ul>

<blockquote>
  Espera, ¿y JQuery?
</blockquote>

JQuery es una biblioteca de funciones de Javascript.

Es ideal para cuando inicias en el desarrollo web y estás aprendiendo lo básico sobre HTML, CSS y Javascript.

Pero las aplicaciones web modernas son un tanto más complejas, y JQuery se queda bastante corto, comparado a lo que ofrecen los frameworks antes citados.

___

Conclusión
---

Hay mucho por aprender.

Cuanto más aprendas, notarás que hay mucho más por aprender.

Y eso no es una desventaja. Es una ventaja que el mundo se "actualice" tan rápidamente.

Sería aburrido hacer todo siempre de la misma forma, ¿verdad?

Comparte
---

Siempre que aprendas algo nuevo, compártelo. Es la mejor forma de aprender.

Si este artículo te ha parecido interesante, por favor compártelo con tus amigos, compañeros, familiares y en las redes sociales.

Gracias por leer hasta el final !
