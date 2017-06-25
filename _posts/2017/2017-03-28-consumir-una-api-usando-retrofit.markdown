---
title:  "Cómo consumir una API y procesar la respuesta usando Retrofit"
categories: [Desarrollo móvil]
tags: [android]
image: posts/2017/android-retrofit/consumir-api-android.png
---

En este tutorial aprenderás a consumir una API (servicios web) y procesar la respuesta JSON obtenida.

¿API? ¿Servicios web?
---
Por azares del destino es posible que aun no conozcas muy bien el significado de estos términos, o la diferencia que existe entre ambos conceptos.

Pero don't worry. Puedes ver el siguiente video y aniquilar tus dudas:

<div class="text-center">
	<iframe width="858" height="480" src="//www.youtube.com/embed/SXZ0kDZbOas?vq=hd720&rel=0" frameborder="0" allowfullscreen></iframe>	
</div>

Este tutorial está centrado en cómo consumir una API o servicios web desde una aplicación Android.

Si por ejemplo tienes una base de datos, pero no tienes una API creada. Entonces primero deberías definir una API.

Una **API es un intermediario entre una base de datos y una aplicación** móvil (sea Android, iOS u otra tecnología).

Si deseas aprender a **desarrollar una aplicación Android de Diagnóstico Médico**, por favor haz [clic aquí][diagnostic-vet-serie]{:target="_blank"}.

En esta serie aprenderás a desarrollar una API usando Laravel, y a programar una aplicación Android que consuma esta API.

Cómo añadir Retrofit a nuestro proyecto
---
Existen varias formas de **añadir dependencias a nuestro proyecto**.

En este caso usaremos el método más común y recomendado: añadiremos Retrofit **vía Gradle**.

Eso significa que debemos ir a nuestro archivo ```build.gradle``` y añadir las siguientes líneas:

```
compile 'com.squareup.retrofit2:retrofit:2.2.0'
compile 'com.squareup.retrofit2:converter-gson:2.2.0'
compile 'com.squareup.okhttp3:logging-interceptor:3.6.0'
```

<blockquote>
	Espera, ¿dónde dices?
</blockquote>

Debes añadir la dependencia en el archivo ```build.gradle``` a nivel de módulo.

En el lado izquierdo de Android Studio encontrarás dentro de Gradle Scripts 2 opciones con el mismo nombre. Asegúrate de seleccionar la opción adecuada:

![Añadir dependencias Android usando Gradle](/images/posts/2017/android-retrofit/android-build-gradle.png)

Dentro del archivo debes agregar 2 dependencias. Una para Retrofit y otra para GSON.

La tercera dependencia, la del ```logging interceptor``` es opcional. Pero te recomiendo añadirla para poder debuggear las peticiones.

![Añadir Retrofit y GSON a nuestro proyecto Android](/images/posts/2017/android-retrofit/dependencias-retrofit-android.png)

<blockquote>
	Genial, ya lo tengo. ¿Pero qué es GSON? ¿No era JSON lo que queríamos obtener?
</blockquote>

JSON es un formato de respuesta que usan las API. Eso es lo que vamos a obtener y procesar.

Pero **GSON es una dependencia adicional**, que funciona **en conjunto con Retrofit** para "convertir las respuestas JSON obtenidas en objetos Java".

Retrofit los llama "converters", y existen varios de ellos. Incluso para "mapear" respuestas obtenidas en formato XML.

Entrando en acción
---

Una vez que tienes las dependencias cargadas en tu proyecto, lo siguiente es configurar Retrofit a través de un ApiAdapter y un ApiService.

<blockquote>
	¿No puedo hacer directamente la petición? Estoy algo apurado.
</blockquote>

Puedes, pero en serio, te recomiendo crear estos 2 archivos.

Una vez que lo comprendas, luego te será **súper sencillo hacer peticiones**, y lo mejor de todo es que tu código estará ordenado y podrás replicarlo fácilmente a **otros proyectos**.

Primero lo primero: Internet
---

Antes de empezar a configurar Retrofit en nuestro proyecto, es importante que nuestra aplicación se pueda conectar a internet.

Para solicitar este permiso debemos añadir la siguiente línea a nuestro archivo ```manifest```:

```
<uses-permission android:name="android.permission.INTERNET" />
```


Una clase y una interfaz
---

El **ApiAdapter es una clase que se encargará de instanciar un objeto Retrofit** (aplicando el patrón de diseño Singleton), y este objeto hará posible las peticiones. 

Además, en esta clase se definirá **la ruta base de la API** que queremos consultar.

El **ApiService en cambio es una interfaz**. Aquí vamos a definir métodos abstractos.

Cada método abstracto va a representar una **ruta específica de nuestra API**.

Por **ejemplo**, podemos tener un método para realizar un inicio de sesión. Le pasamos un usuario y una contraseña y obtenemos un token como respuesta.

Otro **ejemplo** es que le pasamos los datos de un producto, para que la API lo registre en la base de datos. Y obtenemos como respuesta un arreglo de posibles errores en los datos, o bien un boolean indicándonos que el registro fue satisfactorio.

¿Tiene sentido verdad?

Para que se comprenda mejor, a continuación puedes ver códigos de ejemplo para ambos conceptos.


Ejemplo de ApiService
---

En el siguiente ejemplo de ApiService se han considerado 4 métodos abstractos.

Cada método define una ruta, y especifica qué clase se encargará de procesar la respuesta obtenida.
Esto te lo explicaré con más detalle en un momento. Por favor ten paciencia.

- El primer método representa una **petición GET** a la ruta ```diseases```. La respuesta será un listado de enfermedades. Y esta respuesta se va a procesar gracias a la clase ```DiseasesResponse```.

- El segundo método es una **petición POST** a la ruta ```upload/photo```. Esta petición se hace enviando ciertos parámetros. Entre ellos, una variable String que representa una imagen codificada en base64. Se asume que la API está lista para subir la foto a través de esta ruta.

- El tercer método permite **iniciar sesión** en una aplicación. Se asume que ```LoginResponse``` indica el formato para procesar la respuesta de esta ruta. Debería encargarse de parsear el posible token recibido, si el login fue exitoso.

- El último método permite **registrar un producto** a través de una petición POST. Se asume que la respuesta devolverá un arreglo con mensajes de error, en caso de que el servidor así lo considere. Todo depende de la API. Aquí solo estamos viendo cómo consumirla.

{% highlight java %}
public interface MyApiService {

    @GET("diseases")
    Call<DiseasesResponse> getDiseases();

    @FormUrlEncoded
    @POST("upload/photo")
    Call<SimpleResponse> postPhoto(
        @Field("image") String base64, 
        @Field("extension") String extension,
        @Field("user_id") String user_id
    );

    @GET("/login")
    Call<LoginResponse> getLogin(
    	@Query("username") String username, 
    	@Query("password") String password
    );

    @FormUrlEncoded
    @POST("product")
    Call<SimpleResponse> postNewProduct(
            @Field("code") String code,
            @Field("name") String name,
            @Field("description") String description
    );

}
{% endhighlight %}

Ejemplo de ApiAdapter
---

{% highlight java %}
public class MyApiAdapter {

    private static MyApiService API_SERVICE;

    public static MyApiService getApiService() {

        // Creamos un interceptor y le indicamos el log level a usar
        HttpLoggingInterceptor logging = new HttpLoggingInterceptor();
        logging.setLevel(HttpLoggingInterceptor.Level.BODY);

        // Asociamos el interceptor a las peticiones
        OkHttpClient.Builder httpClient = new OkHttpClient.Builder();
        httpClient.addInterceptor(logging);

        String baseUrl = "http://my-site.com/api/";

        if (API_SERVICE == null) {
            Retrofit retrofit = new Retrofit.Builder()
                    .baseUrl(baseUrl)
                    .addConverterFactory(GsonConverterFactory.create())
                    .client(httpClient.build()) // <-- usamos el log level
                    .build();
            API_SERVICE = retrofit.create(MyApiService.class);
        }

        return API_SERVICE;
    }

}
{% endhighlight %}

## Organizando nuestro código

Como ya lo has notado, necesitamos crear una clase y una interfaz.

Con el fin de tener nuestro **proyecto organizado por carpetas**, vamos a crear una carpeta ```io``` y a situar allí los 2 archivos antes mencionados.

*El nombre de IO hace referencia a input/output.*

Ten en cuenta que no he puesto los ```import``` en los ejemplos. Pero puedes importar las clases fácilmente en Android Studio.

Adicional a ello, necesitamos otro grupo de clases que nos permitirán "parsear" las respuestas JSON obtenidas. Estas clases las guardaremos en una carpeta ```model```.

Por ejemplo, si tenemos una entidad Disease (con los datos de una enfermedad), entonces vamos a crear esta clase dentro de la carpeta ```model```.

Esta carpeta contendrá todo nuestro modelo de datos. Es decir, existirá **una clase por cada entidad que recibamos** desde la API.

A estas alturas nuestro proyecto se verá de la siguiente forma:

![Paquetes de nuestro proyecto Android](/images/posts/2017/android-retrofit/paquetes-proyecto-android.png)

En la carpeta ```response```, ubicada dentro del paquete ```io``` se encontrarán nuestras clases que sirven para determinar el formato a usar en el "parse" de la respuesta JSON a objetos.

## ¿Te has perdido?

No te preocupes, hay un video que puedes ver ahora mismo sobre cómo implementar todos estos pasos:

<div class="text-center">
	<iframe width="858" height="480" src="//www.youtube.com/embed/g_xO238hJqU?vq=hd720" frameborder="0" allowfullscreen></iframe>	
</div>

[diagnostic-vet-serie]: https://www.youtube.com/watch?v=RpWzd0-_47o
