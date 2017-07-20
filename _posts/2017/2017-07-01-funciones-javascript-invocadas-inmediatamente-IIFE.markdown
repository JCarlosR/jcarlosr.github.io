---
title: "Javascript: Funciones que son invocadas inmediatamente (IIFE)"
categories: [Desarrollo web]
tags: [javascript]
---

Aprende cómo funcionan las IIFEs (Immediately-invoked function expressions) en Javascript, y por qué se han usado tradicionalmente en el desarrollo Javascript.

___

Cuando empiezas a aprender Javascript, no ha de pasar mucho tiempo para que te encuentres con esto:

```js
(function () {
    // algún código aquí
})();
```

Y de seguro que resulta confuso la primera vez que lo ves. 

Pero ahora vamos a revisar con detenimiento qué significa este código, y por qué es que se ha usado mucho en Javascript. 

El código como tal representa una `immediately invoked function expression`, o también conocida como IIFE (se pronuncia "iffy").

___

En Javascript, las funciones se pueden crear a través de una declaración de función, o una expresión de función. 

Declarar una función es la forma más común de crear una función con nombre:

```js
// Declaración de una función con nombre
function myFunction() { /* código aquí */ }
```

Por otro lado, si estás asignando una función a una variable o a una propiedad, estás tratando con una expresión de función.

```js
// Asignar una expresión de función a una variable
var myFunction = function () { /* código aquí */ };

// Asignar una expresión de función a una propiedad
var myObj = {
    myFunction: function () { /* código aquí */ }
};
```

Una función creada en el contexto de una expresión es también una expresión de función (`function expression`).

```js
// Todo lo que está dentro de los paréntesis es parte de una expresión
(function () { /* código aquí */ });

// Todo lo que está después del operador de negación es parte de una expression
!function () { /* código aquí */ };
```

El punto clave de las expresiones Javascript es que devuelven valores.

En los 2 casos anteriores, el valor retornado por cada expresión es una función.

Eso significa que si queremos invocar la función creada a través de la `function expression` solo necesitamos añadir un par de paréntesis al final (aquí podríamos pasar parámetros a la función de ser necesario).

Esto nos lleva al ejemplo de código que estabamos analizando inicialmente:

```js
(function () {
    // código aquí
})();
```

## Pero, ¿por qué motivo se usan las IIFE?

Ahora sabemos qué es lo que hace el código anterior, ¿pero por qué hacerlo?

La primera razón para usar una IIFE es por **la privacidad de los datos**. 

Las variables declaradas con `var` en Javascript tienen un alcance a nivel de función (solo se pueden usar en la función que las contiene). 

Por esa razón toda variable declarada dentro de una IIFE no puede ser usada por fuera.

```js
(function () {
    var foo = "ABC";

    // Esto imprime "ABC"
    console.log(foo);
})();

// ReferenceError: foo is not defined
console.log(foo);
```

Por supuesto, puedes asignar un nombre a la función e invocarla posteriormente, y lograr el mismo resultado.

```js
function miFuncionInmediata () {
    var foo = "ABC";

    // Esto imprime "ABC"
    console.log(foo);
}

miFuncionInmediata();

// ReferenceError: foo is not defined
console.log(foo);
```

Este segundo ejemplo hace lo mismo, y de seguro que lo habrías entendido a la primera, ¿verdad?

¿Entonces por qué nos encontramos a menudo con la primera expresión?

- Primero porque estamos asignando un nombre a la función, cuando realmente no se necesita. Estamos ocupando el `global namespace`, incrementando la posibilidad de que ocurra alguna colisión entre identificadores. 
- Segundo, el último ejemplo no nos dice que se trata de una IIFE por sí mismo. A diferencia del caso anterior, en donde basta ver el código para saber que se trata de una función anónima que solo necesita ser invocada una vez, inmediatamente luego de su creación.  
- Dado que la función tiene un nombre, ésta podría ser usada por equivocación más de una vez.

Debes tener en cuenta que se pueden pasar parámetros a una IIFE:

```js
var variableExterna = "ABC";

(function (variableInterna) {
    // Esto imrpime "ABC"
    console.log(variableInterna);
})(variableExterna);
```

Esta es la historia detrás de las IIFEs (Immediately Invoked Function Expressions).

Esta forma de usar las funciones se usa muy amenudo en patrones y bibliotecas de Javascript.

Aquí puedes leer [más acerca del patrón "Módulo revelador"][js-modules], que es un buen ejemplo de ello. Y de paso, aprender más acerca de los módulos en Javascript.

## Más beneficios de usar una IIFE

### Reducir el alcance de las búsquedas (scope lookups)

Se puede lograr un mejor rendimiento usando IIFEs:

Si pasamos objetos globales (como window, document, jQuery, u otro) a una función anónima, y luego usamos estos objetos a través de su referencia local, Javascript no tendrá la necesidad de hacer búsquedas en el ámbito global.

Lo que ocurre es que: 

Javascript primero busca propiedades en el ámbito local, y mientras no encuentre la referencia adecuada continúa su búsqueda hacia arriba, hasta llegar al ámbito global. 

Ser capaces de poner objetos de ámbito global en un ámbito local nos permite mejorar el rendimiento porque las referencias se resuelven más rápido.

Veamos un ejemplo de ello:

```js
// Función anónima con 3 argumentos
(function(window, document, $) {

// Aquí podemos usar las referencias window, document, jQuery
// en un ámbito local 

})(window, document, window.jQuery); // Los objetos globales son pasados a la función anónima
```

### Minificar código

Otro beneficio de usar IIFEs es que ayuda a optimizar el proceso de minificación. 
Dado que los objetos globales requeridos son pasados a la función anónima como parámetros, un minificador puede asignar un nuevo nombre a las variables locales, que consten de una sola letra (mientras no se repitan no hay problema). 

Veamos un ejemplo:

```js
// Función anónima con 3 argumentos
(function(w, d, $) {

// Aquí se pueden usar las referencias de forma local
// que se han obtenido de window, document, y jQuery

})(window, document, window.jQuery); // Objetos globales pasados como parámetros
```

Nota: Podemos usar `$` con total libertad, ya que jQuery se obtiene bajo ese identificador en el ámbito local. No hay necesidad de preocuparse por posibles conflictos con otras bibliotecas.

___

## Conclusión

Una IIFE (Immediately Invoked Function Expression) constituye un patrón de diseño usado comúnmente en Javascript (por bibliotecas, como jQuery, Backbone.js, Modernizr, y muchas más) para encapsular un bloque de código dentro de un ámbito local.

En ES2015 (inicialmente nombrado como ES6) es posible declarar ámbitos a nivel de bloque. En ES5 no, y es por ello que se emulaba este comportamiento con el uso de IIFEs.

En pocas palabras, para conseguir un encapsulamiento, antes de ES2015 se hacía de esta manera:

```js
(function () { 
    var x = 10;
})();
console.log(x);  // Reference Error: x is not defined
```

Pero desde la versión ES2015 es posible usar lo siguiente:

```js
{ 
    let x = 10;
};
console.log(x);  // Reference Error: x is not defined
```

Esta nueva característica `block scoping` es posible usando las palabras reservadas `let` y `const` que se introdujeron en el nuevo estándar de Javascript. Sin embargo, `var` sigue existiendo por cuestiones de compatibilidad.

Por lo tanto, decimos que `var` tiene alcance a nivel de función, y no a nivel de bloque. Si queremos encapsular la variable `x` declarada con `var` hace falta usar IIFEs, ya que unas llaves no serán suficiente:

```js
{ 
    var x = 10;
};
console.log(x);  // Imprime 10
```

## Referencias

- [An introduction to IFFEs][adripof]
- [I love my IIFE][greg]
- [What is (function(){})() in JavaScript?][stackoverflow]


[do]: https://m.do.co/c/16e8c5d942fd
[domains]: https://affiliate.namecheap.com/?affId=105242
[js-modules]: /blog/modulos-javascript-commonjs-amd-ecmascript
[adripof]: http://adripofjavascript.com/blog/drips/an-introduction-to-iffes-immediately-invoked-function-expressions.html
[greg]: http://gregfranko.com/blog/i-love-my-iife/
[stackoverflow]: https://stackoverflow.com/questions/8228281/what-is-the-function-construct-in-javascript
