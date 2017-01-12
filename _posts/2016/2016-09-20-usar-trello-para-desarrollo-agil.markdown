---
title: "Cómo usar Trello para el desarrollo ágil"
categories: [Buenas prácticas]
tags: [scrum, agile]
---

En esta ocasión aprenderás a usar Trello como una herramienta de apoyo para el desarrollo ágil. Específicamente, vamos a aplicar varios de los conceptos de Scrum, aunque no seguiremos todo lo descrito por esta metodología al pie de la letra.

Lo básico
---------
En Trello existen 3 componentes básicos:

- Tableros
- Listas
- Tarjetas

Un tablero de Trello se corresponde con un proyecto. Dentro de cada tablero podemos crear tantas listas como sea necesario. Por último, cada lista contendrá una serie de tarjetas.

Las listas se muestran de izquierda a derecha, de forma que las listas consultadas con más frecuencia se deberían mostrar primero, y las menos consultadas deberían ir más a la derecha. 

Estructura básica
-----------------
He elaborado un [tablero de guía][scrum_trello]{:target="_blank"}, que contiene las listas principales a considerar. 
Y a continuación, una descripción de cada una.

- **Product backlog.** Esta lista debe contener todas las historias de usuario que se van a implementar a lo largo de todo el proyecto.
- **Sprint backlog N.** Al iniciar un sprint, se debe crear una lista correspondiente. Por ejemplo, al iniciar el primer sprint tenemos una lista llamada *Sprint backlog 1*. Sin embargo, no es necesario usar una enumeración. Si nos parece mejor, podemos usar un nombre en específico para el sprint.
- **General.** Esta lista contendrá tarjetas "especiales" que serán descritas luego con mayor detalle. Cada tarjeta contendrá información importante sobre el proyecto en general.

Antes
-----
Antes de iniciar un sprint se lleva a cabo una reunión de planificación, conocida como [sprint planning meeting]({% post_url 2016-09-18-scrum-sprint-planning-meeting %}). 

Esta reunión consiste en identificar qué actividades se van a desarrollar. Esto significa que las primeras tarjetas del [product backlog]({% post_url 2016-09-17-scrum-product-backlog %}) pasarán a formar parte de un sprint backlog.

En este punto es importante delimitar correctamente cada actividad. Generalmente, el product backlog está compuesto de historias de usuario que son genéricas. Es importante dividir estas historias de usuario en actividades más específicas y asignar un responsable para cada tarjeta.

Al final de esta reunión lo correcto es que:

- El sprint backlog se encuentre correctamente definido.
- Se haya redactado el objetivo general del sprint (sprint goal).

Durante
-------
Cuando el sprint ha iniciado, el equipo de desarrollo se debe centrar en cumplir con sus compromisos (las tarjetas que seleccionaron durante la planificación).

No se deben añadir nuevos requerimientos al sprint backlog. Si el cliente solicita nuevas características, estas se añaden al product backlog, a fin de ser resueltas en sprints posteriores.

Durante el desarrollo del sprint, las listas con mayor actividad son:

- **Sprint backlog.** Esta lista representa las actividades pendientes por realizar.
- **In progress.** Actividades en desarrollo, características que se están implementando.
- **Done.** Actividades finalizadas en el sprint actual.

Es importante realizar una reunión al inicio de cada día, a fin de evaluar el progreso del sprint y aplicar acciones correctivas en caso de ser necesario. Esto se conoce como [daily scrum meeting]({% post_url 2016-09-18-daily-scrum-meeting %}).

Después
-------
Lo ideal es que se haya finalizado con todo lo propuesto. En ese caso, la lista *Sprint backlog 1* no tendrá más tarjetas, pues todas estarán ubicadas en la lista *Done*. Y lo siguiente será:

- Renombrar la lista *Done* por *Sprint release 1*. 
- Crear una nueva lista *Done* para el sprint que está por iniciar.
- Ubicar la lista *Sprint release 1* al final.
- Renombrar *Sprint backlog i* por *Sprint backlog i+1* (el sprint que esté por iniciar).
- Realizar [una reunión de revisión y una reunión de retrospectiva]({% post_url 2016-09-19-sprint-review-meeting-y-sprint-retrospective %}).
- Generar un nuevo [burndown chart]({% post_url 2016-09-18-scrum-burndown-chart %}).

¿Y la lista general?
--------------------
Cierto. Aquí podemos incluir tarjetas con información clave. Por ejemplo podemos tener tarjetas con los siguientes nombres:

- **Sprint goals.** Como su nombre lo indica, aquí anotaremos los objetivos que nos vamos trazando antes de iniciar cada sprint.
- **Burndown charts.** En esta tarjeta actualizaremos (subiendo nuevas imágenes) nuestro burndown chart, y esto se hará al finalizar cada sprint como ya se comentó antes.

Proyectos más grandes
---------------------
Esta idea funciona bien para proyectos pequeños y medianos, donde el equipo de desarrollo es relativamente pequeño, tal vez hasta 7 integrantes.

Para proyectos donde interviene una cantidad mayor de personas, lo adecuado es usar varios tablones de Trello para el mismo proyecto (un tablero de planificación, un tablero por cada sprint, y un tablero de retrospectiva).

[scrum_trello]: https://trello.com/b/H0xcA5bM/guia-simple-scrum-trello