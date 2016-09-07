---
title:  "Perspectiva general de caching network data"
date:   2016-09-04 02:04:30
categories: [Resumen]
tags: [android, sqlite, retrofit]
---
Luego que aprendemos a consumir webservices desde una app, lo siguiente es aprender una estrategia para almacenar los datos en caché.

La idea de este post es comprender cómo funciona el almacenamiento de datos en caché, y considerar algunas alternativas de implementación, pero sin entrar en términos técnicos.

Para ello, voy a traducir (*no literalmente*) [una discusión que encontré][reddit] sobre este tema, y que me pareció interesante.

**KickingLettuce** pregunta:

¿Cómo almacenan en SQLite la data que reciben de sus peticiones?
Por ejemplo, para aplicaciones de tipo red social, donde la información se modifica o añade constantemente, debo verificar siempre la conexión a internet en el background.

He visto cómo hacen esto las grandes compañías (Twitter y Google). **En ningún caso muestran una pantalla en blanco** con un ícono de loading. Siempre hay datos para mostrar, cuando la app se inicia por primera vez.

Sé que Twitter agrega contenido en segundo plano, o eso parece. Aunque no estoy seguro en qué momento lo hacen o si usan un Service para actualizar. Para manejar esto adecuadamente, ellos nos muestran el ListView en la última posición que lo dejamos. Además nos muestran un mensaje de "New Tweets" con una flecha hacia arriba, para recordarnos que podemos hacer scroll y ver el nuevo contenido.

Google Plus no carga las nuevas publicaciones, pero nos informan de ello con un mensaje. Cuando hacemos click sobre dicho mensaje, el nuevo contenido se carga rápidamente!
Probablemente lo cargan desde caché -- y como en el caso de Twitter, asumo que descargan el contenido en segundo plano.

Entonces, volviendo a mi pregunta... ¿cuáles son los pasos para hacer esto adecuadamente? -- especialmente cuando la data cambia regularmente. Por cierto, Twitter y Google no solo usan cahé para su nuevo contenido: ellos también actualizan su contenido (para mostrar la cantidad "re-tweets" y +1 realizados).

Mi pregunta en sí es: Quiero usar SQLite para el proceso de caché, ¿pero cómo?

1. En segundo plano: Verificar nuevo contenido (o actualizaciones) en mi base de datos MySQL.
2. Copiar ello directamente a mi base de datos SQLite.
3. Entonces, ¿qué más detalles? ¿Cómo lo trabajan ustedes?

____

**bonrgoo88** responde:

Los datos se almacenan en caché, en tablas SQLite (Android tiene una clase llamada *SQLiteOpenHelper* para ello), cuando el usuario inicia sesión por primera vez. 
Todas las peticiones siguientes son realizadas en un hilo en segundo plano, y las tablas de caché son actualizadas correspondientemente. 

En mis aplicaciones, solo un pequeño porcentaje de la data es actualizado, así que he tenido que gestionar pequeños cambios. Una de las ventajas de este modelo es que puedes mostrar información al usuario incluso cuando está desconectado.
Luego, si deseas ir un paso más allá, puedes usar un [ContentProvider][content_provider], para actualizar la data que actualmente se está mostrando al usuario. 

Si lo configuras correctamente, el usuario verá la última información inmediatamente al entrar a la app, y en cuanto tu Service en segundo plano esté listo, la nueva información se actualizará por sí misma automáticamente en pantalla. 

___

**iainconnor** responde:

Lo que mencionan es una forma genial de cómo trabajar con la data, pero he de advertir que no todo es vinos y rosas.
Asumiendo que estás construyendo algo como G+ o Twitter (una lista infinita con nuevos items que van apareciendo constantemente en la parte superior), algunas cosas que probablemente debas tener en cuenta son:

1. ¿Cómo y cuándo "limpias" la base de datos? Si el usuario carga 10 millones de Tweets, ¿permites que todos ellos permanezcan en la base de datos?
2. ¿Cómo manejas un "gap" entre los datos? Supongamos que tienes los tweets 1, 2, 3 en tu base de datos, preguntas a la API por nuevos tweets y te devuelve los tweets 7, 8, 9. Sabes que se han perdido algunos entre ellos: existe un gap (*una brecha*) en tu conjunto de datos.
3. ¿Cómo gestionas la carga de más contenido al final de la lista? Si tu API está trabajando con "páginas" de datos, ¿consideras que la página #3 es ahora drásticamente diferente que cuando la solicitaste a la API?

Me gustaría saber si alguien más se ha encontrado con este tipo de preocupaciones, y cómo lo solucionaron. Para nosotros, puedo decir brevemente que nuestras soluciones son;

1. Tenemos algunos modelos "héroe" en nuestra base de datos. En el ejemplo de Twitter, esto se correspondería con los tweets. De vez en cuando comprobamos cuántos registros están en esas tablas, y si es demasiado, echamos todo excepto los más recientes. A continuación, limpiamos todos los modelos que quedaron abandonados por este proceso... cosas como usuarios, avatars, etc.
2. Cuando cargamos una lista siempre preguntamos a la API por la página de resultados que está "más arriba". Si no hay intersección entre tales datos y los que tenemos en nuestra base de datos, recordamos cuántos resultados estuvieron "por encima de esa brecha", y esperamos que el usuario haga scroll hasta dicha posición, o salga de la app. En cualquiera de los casos, descartamos todo lo que está por debajo del gap. Así, el usuario siempre puede hacer scroll hacia abajo y cargar las páginas que están en la parte inferior (para volver a donde estaba).
3. Un cambio mayor en nuestra API fue consultar "la página después del registro 7" en vez de "la página #3". Nosotros lo llamamos cursores. Para nuestras listas, también guardamos un cursor hacia lo que está "más arriba" y lo que está "más abajo", así siempre podemos reanudar la páginación, incluso al final de nuestro data set.

Tener este conjunto de herramientas ha hecho que sea realmente agradable y fácil agregar nuevo contenido en la parte superior de nuestras listas. Por ejemplo, podemos restaurar y mostrar al usuario exactamente el contenido que estaba viendo la última vez antes de salir de la app y si hay nuevo contenido que mostrar, podemos generar un sutil "call to action", para ver dicho contenido. En lo que a mí respecta, Twitter parece estar usando estos mismos trucos.

Otra punto que ha funcionado realmente bien es ocultar tanto como sea posible detrás de Repositorios. Habrá un método en el repositorio, algo como "getRecentTweets". Cuando este método es llamado, suceden algunas cosas;

1. Consultamos la base de datos e instantáneamente devolvemos los mejores resultados que podemos (usamos un ContentProvider/Loader o RXJava).
2. Tenemos una "estrategia de actualización" que verifica si esos resultados son debidos a una actualización. Usualmente es algo como "¿el registro más antiguo se obtuvo hace más de 5 minutos?".
3. Si hace falta una actualización, llamamos a la API, guardamos los resultados en nuestra bd, y notificamos al método que solicita datos nuevamente (estamos usando un Loader para manejar esto, pero hay muchas más opciones).

___

Esto nos da una idea general de aspectos que debemos tener en cuenta para mostrar datos siempre actualizados en nuestra app. 

Podemos usar SQLite como caché para tener siempre datos qué mostrar (y evitar pantallas en blanco, cuando no se tiene una conexión a internet, o mientras se espera la respuesta de una petición realizada a una API determinada).

En próximas publicaciones veremos algunos ejemplos sobre estos términos nuevos para nosotros: ContentProvider, Loader, RxJava. Que estén bien hasta entonces.

[reddit]: https://www.reddit.com/r/androiddev/comments/36s4vs/what_is_your_process_for_caching_network_data_to/
[content_provider]: https://developer.android.com/guide/topics/providers/content-providers.html