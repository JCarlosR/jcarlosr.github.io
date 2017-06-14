---
title: "¿Por qué empezar a usar VueJS? (Comparación con JQuery)"
categories: [Desarrollo web]
tags: [javascript]
image: posts/2017/javascript/vuejs-vs-jquery-comparacion.png
---

Esta guía explica por qué deberías usar VueJS, y no depender exclusivamente de JQuery, a través de ejemplos.

La creación de **sitios web con componentes interactivos** (que actualizan su estado constantemente), es una tarea tediosa usando únicamente JQuery.

Se puede hacer, pero no es el mejor enfoque a seguir.

El uso de VueJS (similar a lo que aportan otros frameworks de Javascript) permite:

- Desarrollar proyectos en menor tiempo
- Escribir código más fácil de entender (y mantener)

___

Ahora vamos a ver:

Un ejemplo, que muestra cómo Vue puede simplificar nuestro código y la manera de pensar. 

Ejemplo usando JQuery
---

Vamos a mostrar una lista simple. 

Esta lista tendrá elementos, que pueden ser lo que sea, una lista de cosas a comprar, contactos, noticias, etcétera.

En este caso vamos a representar una lista de nombres de personas.

Usando JQuery nuestro ejemplo queda de la siguiente forma:

**Código HTML**

```html
<input type="text" class="js-filter">
<ul class="js-people"></ul>
```

**Código Javascript**

```js
var people = ['Jorge', 'Carlos', 'Cinthia'];

// Eliminamos los elementos que actualmente existen en la lista
$('.js-people').empty();

// Añadimos los elementos directamente al DOM
$.each(people, function(index, person) {
    $('.js-people').append("<li>"+ person +"</li>");
});

// Escuchamos cambios en el input
$('.js-filter').on('keyup', function() {
    // Obtenemos el valor buscado
    var value = $(this).val();

    // Ocultamos a todas las personas
    $('.js-people li').hide();

    // Y mostramos solo las personas que coinciden con la búsqueda
    $('.js-people li').filter(':contains("'+value+'")').show();
});
```

Aunque este ejemplo usa JQuery de una forma bastante simple, el código no resulta fácil de mantener.

Y esto se notará más en casos donde se requiera una mayor interacción con el usuario.

Usando JQuery, el "estado" de nuestros elementos es gestionado en base a lo que existe en el DOM. 

Cuando a esto le añadimos estilos, o una estructura más compleja, el estado de los datos se hace más confuso, y empezamos a perder el orden.

Ejemplo usando Vue
---

**Código HTML**

```html
<div id="app">
  <input type="text" v-model="filter">
  <ul v-for="person in people | filterBy filter">
    <li>{{ person }}</li>
  </ul>
</div>
```

**Código Javascript**

```js
new Vue({
  el: '#app',
  data: {
    filter: '',
    people: [
      'Jorge', 'Carlos', 'Cinthia'
    ]
  }
});
```

El código requiere de menos líneas para expresar lo mismo, y es más fácil de mantener.

En este último ejemplo:

- ```v-model="filter"``` se encarga de enlazar la caja de texto con la propiedad ```filter``` definida en el objeto ```data```. Si el valor de esta variable cambia, el texto mostrado en la caja de texto **se actualizará automáticamente**.

- Si nuestra aplicación modifica el valor del arreglo ```people```, la vista también será actualizada automáticamente. 

Algo importante a tener en cuenta es que:

**Solo la información que necesita actualizarse será renderizada nuevamente**. 

Si nuestro arreglo tiene 100 elementos, y solo 1 cambia, solo 1 elemento del DOM será vuelto a renderizar. 

Esto hace que nuestras **aplicaciones sean más eficientes**, y representa una mejora importante sobretodo en dispositivos móviles.

Conclusión
---

El ejemplo anterior es solo una pequeña muestra de todo lo que se puede lograr usando Vue.JS. 

La belleza de Vue reside en que:

- Se puede usar dentro de una aplicación más grande, pero así mismo puede escalar y ser una solución completa. 

- Otras alternativas como React y Angular requieren generalmente una mayor configuración y más código para lograr lo mismo.

Probablemente JQuery seguirá usándose en el desarrollo de páginas informativas, donde se requiere de muy poca interacción con el usuario.

Sin embargo, si te encuentras desarrollando una app con un alto nivel de interacción, te recomendamos usar Vue.js o algún otro framework, con el fin de evitar escribir "muchas líneas de código y lógica para mantener la vista actualizada usando JQuery".

___

Esta guía ha sido traducida y adaptada a partir de su [versión original][original] en inglés.

[original]: https://steveedson.co.uk/vuejs-intro/
