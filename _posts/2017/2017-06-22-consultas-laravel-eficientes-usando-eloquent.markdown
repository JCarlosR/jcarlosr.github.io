---
title: "Cómo escribir consultas Eloquent más eficientes en Laravel"
categories: [Desarrollo web]
tags: [laravel]
image: posts/2017/optimizar-laravel/consultas-eloquent.jpg
---

Aprende a escribir consultas Eloquent más eficientes en Laravel con estos ejemplos prácticos.

Cuando aprendemos Laravel, nos emocionamos mucho con Eloquent, el ORM que Laravel nos ofrece.

Aprendemos a declarar relaciones entre los modelos de nuestra aplicación y "explotamos" Eloquent al máximo!

O eso es lo que creemos.

¿Usas Eloquent constantemente y tu aplicación funciona muy bien? Genial, ¿pero estás haciendo un uso adecuado del ORM?

Usando Eloquent tenemos muchas formas de obtener el mismo resultado.

Sin embargo, aunque las soluciones sean equivalentes en cuanto al resultado final, ¿qué hay del proceso que ocurre por detrás?

A continuación vamos a analizar algunas consultas. 

Son consultas que todos usamos a diario, pero no siempre de la forma más adecuada.

___

## Antes de iniciar: ¿Qué es un Query Builder?

Como su mismo nombre lo indica, es una clase que permite construir consultas.

Es decir, en vez de escribir consultas SQL directamente, usamos métodos sobre un objeto para construir nuestras consultas y luego ejecutarlas.

A modo de ejemplo, imagina que tienes 2 modelos, `developer` (programador) y `skill` (habilidad), que se relacionan entre sí (un programador tiene varias habilidades, domina varias tecnologías).

Lo primero que debes entender es que `$developer->skills` produce un resultado diferente a `$developer->skills()`.

La primera sentencia devuelve una colección de objetos `Skill`, y la segunda devuelve un objeto `Builder`.


Hasta este punto, lo que sabemos es que la primera operación es más costosa que la segunda.

La primera operación:

- Hace una consulta a la base de datos para obtener todos los `skills` relacionados con el `developer` seleccionado.

- Crea una colección (una instancia de la clase `Collection`) con objetos `Skill`. Esto implica crear una instancia del modelo `Skill` y asignarle todos sus datos correspondientes, para cada una de las filas.

La segunda operación:

- Devuelve un objeto Builder, sin ejecutar consulta alguna. 

¿A qué viene todo esto?

Esto es porque, a medida que sea posible, debemos escribir consultas más elaboradas para que las procese la base de datos, y reducir la carga de lo que ejecutamos a nivel de PHP.

En términos generales, buscar en una base de datos es más rápido y menos costoso que buscar en un objeto Collection (clase que usa Laravel para representar una colección de instancias de un modelo).

___

Es entonces que debemos plantearnos las siguientes interrogantes:

- ¿Realmente necesito toda una colección?
- ¿Puedo usar una consulta más específica? 
- ¿Necesito instancias del modelo o solo los datos?

Si necesitamos hacer uso de `accessors`, `mutators` u otras operaciones de "casteo" (como recibir los datos de tipo fecha en objetos Carbon), el uso de modelos y colecciones está justificado. 

Pero eso no siempre es así.

Vamos con los ejemplos
---

**1. Si necesitas contar datos, cuenta registros en la base de datos en vez de objetos en una colección.** 

- Usar `$developer->skills->count()` implica crear una colección de objetos (con todos sus atributos), y finalmente devolver el número de objetos. 
- Es diferente a usar `$developer->skills()->count()`, que simplemente ejecuta una consulta de agregado y obtiene un número entero de la base de datos con la cantidad. No consume recursos innecesarios si solo necesitamos contar los registros.
- Sin embargo, si ya has cargado los `skills` que el `developer` tiene (momentos antes), contar a partir de la colección no es malo (porque de todas formas ya se ha construido).

Si nuestra intención es solo contar la cantidad de registros, la segunda opción es la mejor por mucho. Mientras mayor es la cantidad de elementos, mayor es la diferencia en cuanto a tiempo de ejecución.

**2. Si solo necesitas un primer elemento, evita formar toda una colección para acceder a él.**

Similar al ejemplo anterior:

- `$developer->skills->first()` primero obtiene todos los `skills` que el `developer` tiene asignados, forma una colección con estos datos y finalmente devuelve el primer objeto de la colección.
- Podemos solicitar el primer registro al query builder usando `$developer->skills()->first()`. 
Así, la consulta usará LIMIT para solicitar un solo registro, que será el único a ser representado en un objeto del modelo `Skill`.

**3. Si vas a filtrar usando where, que sea sobre la base de datos y no sobre una colección.**

La historia se repite:

- Si usas `$developer->skills->where('name', 'PHP')->get()`, primero se creará una colección de objetos y luego se buscará iterando sobre cada uno de ellos, para finalmente devolver una colección con las coincidencias.
- En cambio, `$developer->skills()->where('name', 'PHP')->get()` hará la búsqueda sobre la base de datos y la colección resultante se formará una vez se han obtenido los resultados de la consulta.

**4. Si vas a usar "pluck", que sea sobre un builder en vez de una colección.**

Es muy común el uso de `pluck` en proyectos Laravel. 

Usamos este método cuando solo necesitamos los valores de una columna determinada como un arreglo (o como un arreglo asociativo en base a otra columna, como puede ser el id). 

En el ejemplo que estamos viendo probablemente queremos obtener el listado de `skills` en un arreglo, donde la clave sea el `id` y el valor el `name` de la habilidad.

Una forma de lograrlo es usar `$developer->skills->pluck('name', 'id')`.
Pero volvemos a lo mismo. Esta sentencia crearía una colección con todos los objetos `Skill` y a partir de la colección se usaría el método `pluck`. 

¡No necesitamos crear instancias de nuestro modelo ni solicitar todos los atributos! Solo queremos unos datos bien puntuales.

Entonces hemos de usar `$developer->skills()->pluck('name', 'id')`. De modo que la consulta use internamente un `SELECT name, id`, y construya el arreglo asociativo a partir de datos planos, que no son representaciones de nuestro modelo.

Nuestros modelos son muy útiles, pero si no necesitamos hacer uso de campos calculados dinámicamente (`accessors`) u otras características propias de los modelos, es preferible usar "un constructor de consultas" antes que una colección y/o modelos.

Si nuestra aplicación gestiona cientos, o miles de datos, probablemente no se note mucho la diferencia. 

Pero siempre debemos pensar en grande. Una aplicación con cientos de miles de usuarios ejecutando operaciones que consumen recursos innecesariamente, una vez tras otra, podría representar un gasto significativo para nosotros.
