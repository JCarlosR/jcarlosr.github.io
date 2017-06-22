---
title: "¿Qué son los módulos en Javascript? ¿Qué es CommonJS, AMD y ECMAScript 6?"
categories: [Desarrollo web]
tags: [javascript]
image: posts/2017/javascript/modulos-javascript-commonjs-amd.png
---

Aprende qué son los módulos en JavaScript: qué es CommonJS, AMD, System.js, require.js, ES2015, ECMAScript6 y Webpack.

A medida que JavaScript se usa con mayor frecuencia, los `namespaces` y las dependencias se hacen más difíciles de manejar. 

Se han desarrollado diferentes soluciones para tratar con este inconveniente, haciendo uso de module systems. 

Hoy veremos qué alternativas son las más usadas, y la diferencia entre ellas.

___

## Antes de iniciar: ¿Por qué son necesarios los módulos en Javascript?

Si has desarrollado para otras plataformas, es probable que tengas noción de los conceptos de **encapsulación** y **dependencia**. 

Muchas aplicaciones son desarrolladas de forma aislada.

Hasta que alguno de los requerimientos puede ser implementado usando como base una solución ya existente.

En el instante en que se introduce una "pieza de software" dentro de un proyecto, **se crea una dependencia** entre este y la pieza de software. 

Dado que estas piezas software necesitan trabajar en conjunto, **es importante que no existan conflictos** entre ellos.

Esto puede sonar trivial, pero si no realizamos ningún tipo de encapsulación, es cuestión de tiempo para que 2 módulos entren en conflicto. 

> Esta es una de las razones por las que bibliotecas de C usan un prefijo en sus componentes.

La encapsulación es esencial para prevenir conflictos y facilitar el desarrollo.

Cuando se trata de dependencias, en el desarrollo JavaScript de lado del cliente, éstas se han tratado de forma implícita tradicionalmente. 

Es decir, es tarea del desarrollador asegurar que las dependencias se satisfagan al momento de ejectar cada bloque de código. 
Así mismo, asegurar que estas dependencias se carguen en el orden correcto.

A medida que escribimos más código Javascript en nuestras aplicaciones, la gestión de dependencias resulta más engorrosa. 
Surgen preguntas como: ¿dónde debemos poner las nuevas dependencias a fin de mantener el orden apropiado?

Los sistemas de módulos (`module systems`) alivian este problema y otros más. 
Ellos nacen de la necesidad de "acomodar" el creciente ecosistema de JavaScript. 

Veamos qué es lo que aportan las distintas soluciones.

___

## 1 solución Ad-Hoc: The Revealing Module Pattern

Antes de la llegada de los module systems:

Un particular patrón de programación comenzó a usarse cada vez con mayor frecuencia en JavaScript: `the revealing module pattern` o "el patrón del módulo revelador".

```js
var miModuloRevelador = (function () {
    var varPrivada = "Juan Ramos",
        varPublica = "Hola !";

	// Función privada
    function imprimirNombre() {
        console.log("Nombre:" + varPrivada);
    }

	// Función pública
    function asignarNombre(nuevoNombre) {
        varPrivada = nuevoNombre;
    }

    // Revelar accesos públicos
    // opcionalmente con otros nombres
    return {
        setName: asignarNombre,
        greeting: varPublica
    };
})();

miModuloRevelador.setName("Carlos Ramos");
```

Los ámbitos en Javascript (al menos hasta la aparición de `let` en ES2015) trabajan a nivel de función. 

Esto significa que todo lo que se declara dentro de una función no puede escapar de su ámbito. 
Es por esta razón que el patrón `revealing module` se basa en funciones para encapsular el contenido privado (como muchos otros patrones de Javascript).

En el ejemplo anterior, las funciones y variables públicas son expuestas en el objecto devuelto (al final con un `return`). 

Todas las otras declaraciones están protegidas por el ámbito de la función que las contiene. 

Nota: No es obligatorio usar `var` e inmediatamente asignarle la función. Declarar la función con un nombre también es válido.

**PROS**

- Lo suficientemente simple para ser usado donde sea (no requiere bibliotecas u otro soporte adicional).
- Múltiples módulos se pueden definir en un solo archivo.

**CONTRAS**

- No hay forma de importar módulos de forma programada (excepto usando `eval`).
- La dependencias deben gestionarse manualmente.
- La carga asíncrona de módulos no es posible.
- Las dependencias circulares pueden resultar problemáticas.

## CommonJS

CommonJS es un proyecto que define una serie de especificaciones para el ecosistema de Javascript, fuera del navegador (por ejemplo, en el lado del servidor o para aplicaciones de escritorio). 

Una de las áreas que el equipo de CommonJS intenta abordar son los módulos en Javascript. 

Los desarrolladores de Node.js originalmente intentaron seguir la especificación de CommonJS, pero luego cambiaron de decisión. 

En lo que se refiere a módulos, la implementación en Node.js se vio influenciada:

{% highlight javascript %}
// En circle.js
const PI = Math.PI;

exports.area = (r) => PI * r * r;
exports.circumference = (r) => 2 * PI * r;

// En otro archivo
const circle = require('./circle.js');
console.log('El área de 1 círculo de radio 4 es: ' + circle.area(4));
{% endhighlight %}

Existen abstracciones sobre el sistema de módulos de Node.js, en forma de bibliotecas, que actúan como un puente entre los módulos de Node.js y CommonJS. 
En este artículo solo vemos las características básicas.

Tanto en Node como en CommonJS, existen 2 palabras esenciales para interactuar con los módulos: `require` y `exports`.

- `require` es una función que se puede usar para importar símbolos desde otro módulo al ámbito actual. 
El parámetro pasado a `require` es el id del módulo. 
En la implementación de Node, es el nombre del módulo dentro de la carpeta `node_modules` (o, en todo caso, la ruta hacia su ubicación). 

- `exports` es un objeto especial: todo lo que es puesto en él se puede exportar como un elemento público (conservando el nombre de los elementos). 

Los módulos en CommonJS fueron diseñados teniendo en mente el desarrollo de lado del servidor. 
De forma natural, **la API es síncrona**. Es decir, los módulos son cargados en el momento y en el orden que se requieren dentro de un archivo de código fuente.

**PROS**

- Es simple. Un desarrollador puede comprender el concepto sin ver la documentación.
- Permite la gestión de dependencias: Los módulos requieren otros módulos, y se cargan con el orden solicitado.
- `require` puede ser usado en todo lugar: los módulos se pueden cargar mediante programación.
- Soporta dependencias circulares.

**CONTRAS**

- Su API síncrona hace que su uso no sea adecuado para ciertos casos (lado del cliente).
- Un archivo por módulo.
- Los navegadores requieren una biblioteca para interpretarlo.
- No hay 1 función constructora para los módulos (aunque Node lo admite).

**Implementaciones**

Ya hemos hablado de una implementación parcial: Node.js

Para el lado del cliente hay 2 opciones populares: webpack y browserify. 

## Asynchronous Module Definition (AMD)

AMD nació de un grupo de desarrolladores que estaban descontentos con la dirección adoptada por CommonJS. La principal diferencia entre AMD y CommonJS radica en su soporte para la carga asíncrona de módulos.

```js
// Llamamos a define y le pasamos 1 arreglo de dependencias y 1 función que fabrica al módulo
define(['dependencia1', 'dependencia2'], function (dep1, dep2) {

    // Devolvemos una definición del módulo
    return function () {};
});

// Equivalente a:
define(function (require) {
    var dependencia1 = require('dependencia1'),
        dependencia2 = require('dependencia2');

    return function () {};
});
```

La carga asíncrona en JS es posible usando `closures`: una función es llamada cuando los módulos requeridos terminan de cargar. 

La definición e importación de módulos se lleva a cabo por la misma función: cuando se define un módulo se indican sus dependencias de forma explícita. 

De esta forma, un cargador AMD puede tener una imagen completa del gráfico de dependencias para un proyecto determinado en tiempo de ejecución.

Las bibliotecas que no dependen de otras pueden ser cargadas al mismo tiempo. 
Esto es muy importante para los navegadores, donde el tiempo de carga inicial es un punto esencial para brindar una buena experiencia de usuario.

**PROS**

- Carga asíncrona (mejores tiempos de inicio).
- Soporta dependencias circulares.
- Es compatible con `require` y `exports`.
- Gestión de dependencias totalmente integrada.
- Los módulos se pueden separar en múltiples archivos si es necesario.
- Soporta funciones constructoras.
- Soporta plugins (para personalizar los pasos de carga).

**CONTRAS**

- Sintácticamente es un poco más complejo.
- Requiere de bibliotecas de carga, o bien de un proceso de transpilación.

**Implementaciones**

Las implementaciones más conocidas de AMD son require.js y Dojo.

Usar require.js es relativamente sencillo. Basta con incluir la biblioteca en nuestro HTML y usar el atributo `data-main` para indicar qué módulo debe cargarse primero. Dojo tiene una configuración similar.

## Módulos en ES2015

Afortunadamente, el equipo de ECMA (encargado de la estandarización de Javascript) decidió abordar el tema de los módulos.

El resultado se puede ver en la última versión del estándar Javascript: ECMAScript 2015 (anteriormente conocido como ECMAScript 6). El resultado es sintácticamente agradable, y compatible con ambos modos de operación (de forma síncrona y asíncrona).

```js
//------ lib.js ------
export const sqrt = Math.sqrt;
export function square(x) {
    return x * x;
}
export function diag(x, y) {
    return sqrt(square(x) + square(y));
}

//------ main.js ------
import { square, diag } from 'lib';
console.log(square(11)); // 121
console.log(diag(4, 3)); // 5
```

La directiva `import` permite traer módulos al ámbito actual. 
Esta directiva, en contraste con `require` y `define` es no dinámica (es decir, no se puede llamar en cualquier lugar). 
La directiva `export`, por otro lado, puede usarse para explícitamente hacer públicos los elementos.

La naturaleza estática de `import` y `export` permite a los analizadores estáticos construir un árbol completo de las dependencias sin ejecutar código. 

**PROS**

- Soporta la carga síncrona y asíncrona.
- Es sintácticamente simple.
- Está integrado en el lenguaje mismo (eventualmente será soportado en todos lados sin necesidad de bibliotecas).
- Soporta dependencias circulares.

**CONS**

- Aún no está soportado en todos lados.

**Implementaciones**

Desafortunadamente no todos los intérpretes de JS soportan ES2015 en sus versiones estables. 

Sin embargo, existen "transpiladores" (`transpilers`) que añaden este soporte.

Un ejemplo es el preset ES2015 para Babel. Babel es un `transpiler`, y `ES2015 preset` es un plugin que permite transformar código ES2015 (ES6) en ES5 (la versión típica de Javascript soportada por todos los navegadores desde varios años).

## Un cargador universal: System.js

¿Deseas que tu proyecto funcione adecuadamente para todos los casos?

System.js es un cargador universal de módulos, que soporta CommonJS, AMD y los módulos de ES2015. 


## Una mejor alternativa

Hoy en día, Webpack ofrece lo mismo que System.JS y mucho más.

Webpack es un empaquetador de módulos que además optimiza nuestros archivos para producción, minificándolos y uniéndolos según se requiera (de hecho permite usar `loaders` para realizar más tareas durante este proceso).

Usar SystemJS y conseguir lo mismo que permite Webpack implicaría usar adicionalmente Gulp, o "SystemJS builder" para empaquetar nuestro proyecto para producción.

## Conclusión

Los sistemas de módulos para Javascript surgen como una necesidad de los mismos programadores, de encapsular distintas funcionalidades en "piezas". Estas piezas son llamadas módulos y es importante contar con un mecanismo para gestionar las dependencias entre estos módulos.

Es así como surgen especificaciones, que buscan definir un formato para la importación y exportación de módulos, como CommonJS y AMD.

Estas especificaciones tienen sus correspondientes implementaciones con ligeras diferencias.

A fin de poner un poco de orden ante tanto caos, aparece una nueva versión del estándar Javascript: ES2015 (antes conocido como ES6).

Genial. ¿Entonces por qué tanto lío?

Lo que pasa es que no todos los navegadores han terminado de implementar este estándar de forma estable, y una gran cantidad de usuarios usa versiones antiguas.

La solución entonces está en "transformar nuestro código" en código que todos los navegadores puedan entender, haciendo uso de `transpilers`. O bien usar `polyfills` para darle a los navegadores la capacidad de entender características que aun no han implementado.

Existen muchas alternativas, pero una herramienta que ha tenido bastante acogida últimamente es Webpack. Esto es porque Webpack no solo soluciona este problema. También optimiza la ejecución de tareas, de empaquetar nuestro código y dejarlo listo para producción.

Pero las especificaciones no solo están de lado del cliente. Se deben considerar también de lado del servidor.
Es por eso que en este artículo hemos mencionado a NodeJS.

## Llamado a la acción

El ecosistema de Javascript cambia muy amenudo.

Esto se debe en gran parte a que las compañías tecnológicas más destacadas (entre ellas Facebook, Google, Twitter, Instagram) están siempre en búsqueda de mejores herramientas. Dejan de usar una para adoptar otra mejor, o crear su propia versión propuesta.

Pero no hay que temerle a estos cambios. Al final, son muchas formas de hacer "casi" lo mismo.

Si deseas [aprender Webpack puedes empezar viendo esta serie][webpack] de videotutoriales. 

Si te ha parecido interesante, por favor ayúdame a compartir este artículo.

___

Este artículo es una adaptación de este [otro artículo][original] en inglés.

[original]: https://auth0.com/blog/javascript-module-systems-showdown/ 
[webpack]: https://series.programacionymas.com/aprende-webpack-paso-a-paso
