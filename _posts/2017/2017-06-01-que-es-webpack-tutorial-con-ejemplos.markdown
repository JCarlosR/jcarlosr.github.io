---
title: "Aprende Webpack paso a paso"
categories: [Desarrollo web]
tags: [javascript]
---

En este tutorial vamos a aprender qué es webpack, su importancia, y cómo podemos empezar a usarlo en nuestros desarrollos.

## Antes de empezar: ¿por qué aprender Webpack?

En lo que respecta al desarrollo web en el lado del cliente, **el uso de Javascript es indispensable para lograr una interacción con los usuarios que visitan y usan nuestras aplicaciones web**.

Decimos "aplicaciones web" y no "páginas web" porque una página web es en general un sitio web informativo. Mientras que "aplicaciones web" es un término que demanda un mayor nivel de interacción con el usuario.

¿Cómo así?

Nuestra aplicación web va a reaccionar ante los eventos que desata un usuario.

Un usuario que hace clic aquí y allá, a fin de gestionar su información.

Como ejemplo de aplicaciones tenemos a Facebook y Gmail. Podemos editar nuestros datos, y somos usuarios. No simples visitantes como ocurre generalmente en un portal de noticias.

Entonces, en un mundo cada vez más exigente, se requiere que estas aplicaciones permitan una interacción lo más fluida posible.

Eso implica que no hayan actualizaciones en el navegador.

Y la solución ideal es el desarrollo de `Single Page Applications`.

Es decir, aplicaciones que carguen una única vez y que demanden nuestros datos al servidor conforme se requiera, en segundo plano.

El servidor continúa encargándose de todas las validaciones serias, sin embargo, en vez de responder como habitualmente lo hace, ya no devuelve código HTML con datos, sino simplemente datos.

Es ahora una tarea de la tecnología de lado del cliente renderizar los contenidos (y exacto, esto se logra con Javascript).

En resumen:

- En la actualidad las aplicaciones suelen requerir de más código Javascript para permitir un buen nivel de interacción a nuestros usuarios.
- Y como es lógico, más código implica un mayor orden, ¿verdad? A fin de "tener todo en su sitio" y tener una aplicación "no muy costosa" de mantener.

Eso es lo que demandamos nosotros mientras desarrollamos. Pero a final de cuentas, antes de subir a producción requerimos de otros procesos:

- Minificar nuestros assets (archivos Javascript y CSS).
- Empaquetar muchos módulos en una cantidad mínima de archivos Javascript (solicitados bajo demanda).
- Hacer que nuestro código Javascript sea compatible con todos los navegadores (sí, porque debemos hacer uso del último estándar de Javascript, que no siempre se encuentra implementado por los browsers).
- Si usamos preprocesadores, entonces también necesitamos desde un inicio el proceso de conversión para cada caso.

## Entonces, ¿qué es Webpack y cómo nos ayuda?

![Webpack y la gestión de dependencias](/images/posts/2017/javascript/webpack-dependency-tree.png)

Webpack es un `module bundler`, es decir, un empaquetador de módulos.

Hace un momento hablamos que muchos archivos vienen a ser unos pocos, al final.

Generalmente estos archivos van a representar módulos, cuando de Javascript se trata.

Cada módulo representa un conjunto de código que cumple con un objetivo determinado.

Módulos dependen de otros, y esta gestión de dependencias es posible gracias a algún `module system` de Javascript (es decir, una especificación sobre cómo importar y exportar estos módulos).

Si no estás familiarizado con el tema de [módulos en Javascript, por favor lee este artículo][modules] antes de continuar.

Webpack permite optimizar todo este proceso:

- Gestión de dependencias entre módulos
- Minificar, comprimir y unir nuestro código
- Solicitar archivos según se requiera

<div class="text-center">
	<iframe width="858" height="480" src="//www.youtube.com/embed/DWQd9iq53Nk?vq=hd720&rel=0" frameborder="0" allowfullscreen></iframe>	
</div>

## Frameworks Javascript modernos

Aprender Webpack, o alguna otra herramienta equivalente (que nos permita empaquetar módulos y optimizar todo este proceso), es indispensable para empezar a usar adecuadamente un framework Javascript moderno.

Tenemos muchas alternativas:

![Angular JS, Vue JS y React JS](/images/posts/2017/javascript/angular-vue-react.png)

Nuestra elección dependerá del tipo de aplicación que pensamos desarrollar, y las ventajas que esperamos obtener (cada framework tiene su propio ecosistema).

## Más contenido

Tenemos una serie sobre Webpack. Si te ha parecido interesante, por favor ayúdame a compartir el artículo, y luego:

<a href="https://series.programacionymas.com/aprende-webpack-paso-a-paso" class="button">
Mira la serie completa aquí.
</a>

[modules]: /blog/modulos-javascript-commonjs-amd-ecmascript