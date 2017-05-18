---
title: "Introducción a RxJava: Tutorial desde cero (Con ejemplos)"
categories: [Desarrollo móvil]
tags: [android]
---

Aprende RxJava desde cero, paso a paso. El tutorial incluye varios ejemplos, empezando por los más simples para facilitar el aprendizaje.

ReactiveX y RxJava
---

**ReactiveX** es una API que facilita el manejo de flujos de datos y eventos, a partir de una combinación de **el patrón Observer**, el patrón **Iterator**, y características de la **Programación Funcional**. 

El manejo de **datos en tiempo real** es una tarea común en el desarrollo de aplicaciones.

Por lo tanto, tener una manera eficiente y limpia de lidiar con esta tarea es muy importante. 

**ReactiveX** (mediante el uso de **Observables** y operadores) nos ofrece una API flexible para **crear y actuar sobre los flujos de datos**.

Además, simplifica la programación asíncrona, como la creación de hilos y los problemas de concurrencia.

Es así que:

**RxJava** es la implementación de ReactiveX para Java. 

Observable y Subscriber
---

Las 2 clases principales son: **Observable** y **Subscriber**. 

En RxJava, **Observable** es una clase que **emite un flujo de datos o eventos**.

Y **Subscriber** es una clase que **actúa sobre** los elementos emitidos. 

El funcionamiento estándar es el siguiente:

Un (objeto de la clase) **Observable** emite 1 o más elementos, y luego se completa con éxito o con algún error. 

Específicamente hablando:

- Un **Observable** puede tener varios **Subscribers**, y cada elemento emitido por el Observable, será enviado al método ```Subscriber.onNext()``` para ser "usado en lo que se requiera". 

- Una vez que un **Observable ha terminado de emitir elementos**, invocará al método ```Subscriber.onCompleted()```. O, en caso que haya ocurrido algún error, el Observable invocará el método ```Subscriber.onError()```. 

Ahora:

Ya sabemos cómo funcionan las clases Observable y Subscriber. Entonces vamos a continuar, viendo una introducción sobre **cómo crear Observables y suscribirnos a ellos**.

Primer ejemplo
---

```java
Observable integerObservable = Observable.create(new Observable.OnSubscribe() {
   @Override
   public void call(Subscriber subscriber) {
       subscriber.onNext(1);
       subscriber.onNext(2);
       subscriber.onNext(3);
       subscriber.onCompleted();
   }
});
```

Tenemos este Observable que emite los enteros 1, 2, y 3, y luego finaliza. 

Ahora vamos a:

Crear un primer Subscriber, de forma que podamos **actuar ante estas emisiones**.

```java
Subscriber integerSubscriber = new Subscriber() {
   @Override
   public void onCompleted() {
       System.out.println("Complete!");
   }

   @Override
   public void onError(Throwable e) {

   }

   @Override
   public void onNext(Integer value) {
       System.out.println("onNext: " + value);
   }
};
```

**Lo que pasará es lo siguiente:**

Nuestro Subscriber simplemente va a imprimir los elementos emitidos, y a notificarnos cuando haya finalizado la "emisión". 

___

Una vez que hemos creado un Observable y un Subscriber podemos conectarlos con el método ```Observable.subscribe()```.

```java
integerObservable.subscribe(integerSubscriber);
// Y esta es la salida:
// onNext: 1
// onNext: 2
// onNext: 3
// Complete!
```

Segundo ejemplo
---

El código que hemos escrito antes podemos simplificarlo usando el método ```Observable.just()```.

**Este método hará que:**

El Observable solo emita los valores definidos.

**Además si cambiamos,**
nuestro Subscriber por una **clase anónima** interna, tendremos lo siguiente.

```java
Observable.just(1, 2 ,3).subscribe(new Subscriber() {
   @Override
   public void onNext(Integer value) {
       System.out.println("onNext: " + value);
   }   

   @Override
   public void onCompleted() {
       System.out.println("Complete!");
   }

   @Override
   public void onError(Throwable e) {}
});
```

Operadores (Operators)
--- 

**Nosotros acabamos de:**

Crear y suscribirnos a un Observable de una forma muy simple. 

**Probablemente estás pensando**, "no es muy complejo, pero no me parece útil".

Solo ten un poco de paciencia, porque esto es solo el inicio de lo que podemos lograr con RxJava. 

___

**Todos los objetos Observable** pueden tener sus salidas transformadas por lo que se conoce como **Operator**.

Y muchos Operators pueden aplicarse en cadena sobre un Observable. 

**Por ejemplo:**

Para el Observable que vimos anteriormente, digamos que "**solo queremos que emita** los números impares que recibe". 

Para lograrlo, usamos el operador ```filter()```.

```java
Observable.just(1, 2, 3, 4, 5, 6) // números que recibe el Observable
       .filter(new Func1() { // filtramos para que solo emita valores impares
           @Override
           public Boolean call(Integer value) {
               return value % 2 == 1;
           }
       })
       .subscribe(new Subscriber() {
           @Override
           public void onNext(Integer value) {
               System.out.println("onNext: " + value);
           }

           @Override
           public void onCompleted() {
               System.out.println("Complete!");
           }

           @Override
           public void onError(Throwable e) {
           }
       });
// Salida:
// onNext: 1
// onNext: 3
// onNext: 5
// Complete!
```

El operador ```filter()``` nos permite definir una función que recibirá todos los valores que "pretende emitir" el Observable.

**En esta función:**
Los valores que devuelvan false no serán emitidos finalmente al Subscriber (por eso, en este caso, no se muestran en la salida). 

**Es importante notar que:***

El operador ```filter()```devuelve un objeto Observable, al que nos suscribimos (tal como se hacía antes).

Tercer ejemplo
---

Ahora, daigamos que queremos obtener la raíz cuadrada de los impares emitidos del Observable al Subscriber.

**Una forma de hacerlo es** calculando la raíz cuadrada de cada elemento en el método ```onNext()``` de nuestro Subscriber.

Sin embargo, hay una mejor forma de hacer esta "transformación". 

Para que el Subscriber reciba **exactamente los datos como los necesita**, vamos a "encadenar" el operador ```map()``` con el operador ```filter()``` (uno después del otro).

```java
Observable.just(1, 2, 3, 4, 5, 6)
       .filter(new Func1() { // función anónima para filtrar
           @Override
           public Boolean call(Integer value) {
               return value % 2 == 1;
           }
       })
       .map(new Func1() { // función anónima para "mapear" o transformar
           @Override
           public Double call(Integer value) {
               return Math.sqrt(value);
           }
       })
       .subscribe(new Subscriber() { // nótese que el tipo de dato cambió para onNext
           @Override
           public void onNext(Double value) {
               System.out.println("onNext: " + value);
           }

           @Override
           public void onCompleted() {
               System.out.println("Complete!");
           }

           @Override
           public void onError(Throwable e) {
           }
       });
// Salida:
// onNext: 1.0
// onNext: 1.7320508075688772
// onNext: 2.23606797749979
// Complete!
```

**Encadenar operadores es una parte esencial de RxJava**, y nos da la flexibilidad para lograr grandes y mejores cosas.

**Una vez que hemos aprendido** cómo interactúan los Observables con los Operators, podemos avanzar al siguiente tema: **integrar RxJava con Android** !


Cuarto ejemplo (tareas de segundo plano en Android)
---

Un escenario muy común en el desarrollo Android es tener que pasar cierta carga de trabajo a un hilo que se ejecuta en segundo plano. Y una vez que la tarea ha finalizado, publicar los resultados en el ```main thread``` con el fin de mostrar los resultados al usuario. 

En Android, **tenemos muchas formas de lograr esto de forma nativa**:

Usando AsyncTasks, Loaders, Services, etcétera. 

Sin embargo, estas soluciones no son siempre las mejores: 

- Los **Asynctasks** puede fácilmente llevarnos a "memory leaks" (fugas de memoria).
- Los **CursorLoaders** con un ContentProvider requieren de un montón de código "boilerplate" para ser configurados.
- Y los **Services** han sido diseñados para ejecutar largas tareas en segundo plano, y no idealmente para tratar con operaciones de corta duración (como hacer una petición o cargar contenido de una base de datos). 

Veamos cómo **RxJava puede ayudarnos** a resolver estos problemas.

___

**El siguiente Layout:**

Tiene un tiene un botón para iniciar una operación (de larga duración), y siempre muestra un círculo de progreso (que nos asegura que nuestra operación continúa ejecutándose en un ```background thread```; y no en el ```main thread```).

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
   xmlns:app="http://schemas.android.com/apk/res-auto"
   android:id="@+id/root_view"
   android:layout_width="match_parent"
   android:layout_height="match_parent"
   android:fitsSystemWindows="true"
   android:orientation="vertical">

   <android.support.v7.widget.Toolbar
       android:id="@+id/toolbar"
       android:layout_width="match_parent"
       android:layout_height="?attr/actionBarSize"
       android:background="?attr/colorPrimary"
       app:popupTheme="@style/AppTheme.PopupOverlay"
       app:theme="@style/ThemeOverlay.AppCompat.Dark.ActionBar" />

   <Button
       android:id="@+id/start_btn"
       android:layout_width="wrap_content"
       android:layout_height="wrap_content"
       android:layout_gravity="center_horizontal"
       android:text="@string/start_operation_text" />

   <ProgressBar
       android:layout_width="wrap_content"
       android:layout_height="wrap_content"
       android:layout_gravity="center_horizontal"
       android:indeterminate="true" />

</LinearLayout>
```

**Una vez que el botón se ha presionado:**

Éste será desactivado e iniciará la operación.

Y cuando la operación finalice, un **Snackbar** será mostrado y el botón se volverá a activar.

He aquí un ejemplo usando AsyncTask, y nuestra "operación de larga duración". 

El método ```onClick``` del botón simplemente crea una instancia de **SampleAsyncTask** y la ejecuta:

```java
public String longRunningOperation() {
   try {
       Thread.sleep(2000);
   } catch (InterruptedException e) {
       // error
   }
   return "Complete!";
}

private class SampleAsyncTask extends AsyncTask {

   @Override
   protected String doInBackground(Void... params) {
       return longRunningOperation();
   }

   @Override
   protected void onPostExecute(String result) {
       Snackbar.make(rootView, result, Snackbar.LENGTH_LONG).show();
       startAsyncTaskButton.setEnabled(true);
   }
}
```

Entonces la pregunta es:

**¿Cómo podemos convertir este AsyncTask y usar RxJava?** 

Bueno, lo primero que tenemos que hacer es añadir esta dependencia a nuestro proyecto usando Gradle: 

```
compile 'io.reactivex:rxjava:1.0.14'
```

Ahora bien. Tenemos que crear un Observable que invoque a nuestra "operación de larga duración". 
Esto lo podemos hacer con el método ```Observable.create()```.

```java
final Observable operationObservable = Observable.create(new Observable.OnSubscribe() {
   @Override
   public void call(Subscriber subscriber) {
       subscriber.onNext(longRunningOperation());
       subscriber.onCompleted();
   }
});
```

Nuestro Observable invocará nuestro método ```longRunningOperation``` y publicará los resultados en ```onNext()```. Por último llamará a ```onCompleted()```.

**IMPORTANTE:** nuestra "operación de larga duración" no se va a invocar, hasta que nos suscribamos a nuestro Observable. 

Ahora, vamos a suscribirnos a nuestro Observable (lo haremos cuando nuestro botón sea presionado). 

**He añadido un botón** que va a manejar la versión RxJava de nuestra tarea.

```java
startRxOperationButton.setOnClickListener(new View.OnClickListener() {
   @Override
   public void onClick(final View v) {
       v.setEnabled(false);
       operationObservable.subscribe(new Subscriber() {
           @Override
           public void onCompleted() {
               v.setEnabled(true);
           }

           @Override
           public void onError(Throwable e) {}

           @Override
           public void onNext(String value) {
               Snackbar.make(rootView, value, Snackbar.LENGTH_LONG).show();
           }
       });
   }
});
```

Entonces, si ejecutamos nuestra aplicación y presionamos el botón, **¿qué pasa?** 

Nuestro indicador de progreso se congela, y nuestra UI deja de responder. 

Esto se debe a que, **no hemos definido qué hilo debe observar a nuestro Observable** y **en qué hilo debemos suscribirnos**.

**Esta es una fución de los Schedulers** de RxJava.

**Para todo Observable podemos definir 2 hilos diferentes**, sobre los que el Observable va a operar:

- Usando ```Observable.observeOn()``` podemos definir un hilo que será usado para "**monitorear** y ver si hay nuevos elementos emitidos por el Observable" (los métodos onNext, onCompleted, y onError del Subscriber son ejecutados en el hilo especificado por el método ```observeOn()```), 

- Y usando ```Observable.subscribeOn()``` podemos definir un hilo que va a ejecutar el código de nuestro Observable ("nuestra operación de larga duración"). 

**RxJava** trabaja con **un solo hilo por defecto**. Eso significa que tenemos que usar ```observeOn()``` y ```subscribeOn()``` para que nuestra aplicación sea "multihilo". 

Lo bueno es que:

**RxJava viene con varios Schedulers listos para usar** con nuestros Observables, tales como:

- ```Schedulers.io()``` para bloquear operaciones I/O (de entrada y salida de datos), 
- ```Schedulers.computation()``` para trabajo computacional, 
- y ```Schedulers.newThread()``` que crea un nuevo hilo de trabajo. 

___

Sin embargo (pensando desde una perspectiva Android), te estarás preguntando **cómo hacer para ejecutar código en el main thread** (también conocido como ```UI thread```). 

Podemos lograrlo, usando la biblioteca: **RxAndroid**.

**RxAndroid** es una ligera extensión de **RxJava** que proporciona un Scheduler para el ```main thread``` de Android. Además de hacer posible la creación de Schedulers que se ejecuten sobre cualquier clase Handler de Android. 

Con estos nuevos Schedulers, podemos modificar el Observable creado antes, para que nos permita ejecutar nuestra tarea pesada en hilos de segundo plano, y los resultados se publiquen en el ```main UI thread```. 

Para **tener RxAndroid disponible** en nuestra app, añadimos la siguiente línea a nuestro archivo gradle: 

```
compile 'io.reactivex:rxandroid:1.0.1'
```

Así tenemos:

```java
final Observable operationObservable = Observable.create(new Observable.OnSubscribe() {
   @Override
   public void call(Subscriber subscriber) {
       subscriber.onNext(longRunningOperation());
       subscriber.onCompleted();
   }
})
.subscribeOn(Schedulers.io()) // subscribeOn the I/O thread
.observeOn(AndroidSchedulers.mainThread()); // observeOn the UI Thread
```

Nuestro Observable (modificado) usará ```Schedulers.io()``` para *suscribirnos*, y *observará* los resultados en el ```UI thread``` usando ```AndroidSchedulers.mainThread()```. 

**Ahora que hemos construido nuestra app:** 

Hacemos clic en nuestro botón, y veremos que el hilo principal de nuestra app ya no se detiene mientras nuestra "operación de larga duración" se ejecuta. 

Observable y Single
---

Todos nuestros ejemplos anteriores hacen uso de la clase *Observable* para emitir resultados.
Pero existe **otra opcion** (ideal para cuando nuestra operación solo necesita emitir **un resultado y completarse**). 

En la versión 1.0.13 de RxJava se introdujo la clase Single. Y esta clase puede ser usada de la siguiente manera.

```java
Subscription subscription = Single.create(new Single.OnSubscribe() {
   @Override
   public void call(SingleSubscriber singleSubscriber) {
       String value = longRunningOperation();
       singleSubscriber.onSuccess(value);
   }
})
.subscribeOn(Schedulers.io())
.observeOn(AndroidSchedulers.mainThread())
.subscribe(new Action1() {
   @Override
   public void call(String value) {
       // onSuccess
       Snackbar.make(rootView, value, Snackbar.LENGTH_LONG).show();
   }
}, new Action1() {
   @Override
   public void call(Throwable throwable) {
       // handle onError
   }
});
```

**Cuando nos suscribimos a un Single**, solo existen: una acción onSuccess y una acción onError. 

La clase Single tiene un conjunto de operadores diferentes a los de Observable (algunos proveen incluso mecanismos que permiten convertir Singles en Observables). 

Por ejemplo, usando el operador ```Single.mergeWith()```, 2 o más Singles del mismo tipo pueden "fusionarse" para crear un Observable, emitiendo los resultados de cada Single a un Observable.

Prevención de fugas
---

Antes mencionamos que las ```memory leaks``` son una desventaja de los AsyncTasks, con relación a referencias de su Activity/Fragment asociado, si no se tiene el cuidado apropiado. 

Desafortunadamente, el uso de RxJava no soluciona mágicamente este problema, **pero sí que hace fácil la prevención** de este problema. 

Si has seguido todos los ejemplos, notarás que cuando llamas a ```Observable.subscribe()```, un objeto Subscription es "retornado". 

**La clase Subscription** tiene solo 2 métodos: ```unsubscribe()``` y ```isUnsubscribed()```. 

Para prevenir "fugas de memoria", en el método ```onDestroy``` de tu Activity o Fragment, debes verificar si ```Subscription.isUnsubscribed()```. Si el objeto Subscription aún está suscrito, debes llamar a ```Subscription.unsubscribe()```. 

Este método va a detener todas las notificaciones (de elementos emitidos a tu Subscriber) y permitirá la correcta "recolección de basura" de todos los objetos relacionados, previniendo fugas (asociadas a nuestro código RxJava).

Si estás tratando con **múltiples Observables y Subscribers**, todos los objetos Subscription pueden ser añadidos a una **CompositeSubscription**, de forma que todos queden "desuscritos" al mismo tiempo al usar ```CompositeSubscription.unsubscribe()```.

Conclusión
---

RxJava es una gran alternativa cuando se trata de multi-threading, en el ecosistema Android. 

Ser capaz de "procesar una carga de trabajo" en segundo plano, y luego publicar los resultados en el hilo principal o ```UI thread``` es una característica indispensable en toda aplicación Android.

Ser capaz de aplicar los operadores (que RxJava pone a nuestra disposición) a los resultados de cualquier operación, otorga incluso un mayor control. 

Es cierto que:

El uso RxJava requiere de un buen entendimiento de esta biblioteca para sacarle el máximo provecho a todas sus características.

Pero:

El tiempo invertido en esta biblioteca es realmente compensado por todo lo que se consigue. 

Otros temas, sobre RxJava que no se han cubierto en este tutorial, son: "hot vs cold Observables", trabajar con backpressure, y la clase Subject. 

___

Esta guía ha sido traducida y adaptada a partir de su [versión original][original] en inglés.

[original]: https://www.captechconsulting.com/blogs/getting-started-with-rxjava-and-android
