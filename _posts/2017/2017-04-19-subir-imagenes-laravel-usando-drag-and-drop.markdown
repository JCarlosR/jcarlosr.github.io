---
title: "Cómo subir varias imágenes en Laravel usando Dropzone"
categories: [Desarrollo web]
tags: [laravel]
image: posts/2017/laravel-dropzone/subir-imagenes.png
---

Aprende a subir múltiples imágenes en Laravel con solo arrastrar y soltar (drag and drop), usando Dropzone.

Subir imágenes usando drag and drop
---

En este tutorial aprenderás a programar lo siguiente:

![Dropzone funcionamiento](/images/posts/2017/laravel-dropzone/dropzone-funcionamiento.gif)

Una zona en la que tus usuarios podrán **arrastrar y soltar imágenes**.

De hecho, ellos podrán ver una miniatura (**thumbnail**) de cada imagen que están subiendo, y una **barra de progreso** por cada una de ellas.

> ¿Y si simplemente quiero seleccionar y subir varias imágenes?

También se puede.

Con dropzone puedes dar un clic al área correspondiente, y podrás **seleccionar las imágenes desde tus archivos**.

Cómo usar Dropzone en nuestro proyecto
---

**Dropzone.js** es la librería Javascript que vamos a usar para conseguir implementar el área de "drag & drop".

A fin de que todo el proceso te parezca más claro, he dividido el tutorial en **4 simples pasos**:

1. Añadir dropzone a nuestro proyecto.
2. Configurar nuestro formulario para la subida de imágenes.
3. Procesar las peticiones en el servidor.
4. Verificar que todo funcione y sorprenderse de lo sencillo que es.

Paso 1: Añadir dropzone a nuestro proyecto
---

Para esto tienes 2 opciones:

- Descargar el JS desde la [página oficial de Dropzone][dropzone-web] y añadirlo a tu proyecto.
- O [usar una CDN que sirva el JS por nosotros][dropzone-cdn].

Si elegiste la primera opción tendrás algo como:

{% highlight html %}
<script src="/js/dropzone.js"></script>
{% endhighlight %}

Pero si elegiste la segunda opción:

{% highlight html %}
<script src="https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.3.0/min/dropzone.min.js"></script>
{% endhighlight %}

___

Muy bien, ya tenemos los archivos JS para que **dropzone** funcione.

Ahora solo nos falta añadir los estilos.

La CDN también nos facilita la forma de incluir un CSS básico:

{% highlight html %}
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.3.0/min/dropzone.min.css">
{% endhighlight %}


Paso 2: Configurar nuestro formulario 
---

Para agilizar este paso vamos a tomar el ejemplo de la documentación oficial.

Creamos nuestro formulario así:

{% highlight html %}
<form action="/file-upload"
      class="dropzone"
      id="my-awesome-dropzone">
</form>
{% endhighlight %}

E inicializamos dropzone usando Javascript de esta manera:

{% highlight javascript %}
// "myAwesomeDropzone" es el ID de nuestro formulario usando la notación camelCase
Dropzone.options.myAwesomeDropzone = {
    paramName: "file", // Las imágenes se van a usar bajo este nombre de parámetro
    maxFilesize: 2 // Tamaño máximo en MB
};
{% endhighlight %}

Y así es como tenemos nuestro dropzone ya configurado en el lado del cliente.

Sin embargo, hace falta configurar nuestro servidor (backend) para que esté listo para recibir estas imágenes y guardarlas.

Paso 3: Procesar las peticiones en nuestro controlador
---

¿Qué es lo que tenemos que hacer en este punto?

- **Guardar la imagen en una carpeta** de nuestro proyecto Laravel.
- **Guardar un registro en nuestra base de datos**, para poder acceder a la imagen posteriormente.

El código que tengas que usar a va a depender mucho del proyecto que estés desarrollando.

Podrías estar trabajando en un galería para cada uno de tus usuarios.
Podrías tener muchas galerías por cada usuario, o incluso, tener galerías compartidas.

> Todo ello va a influir en las tablas y modelos que vas a necesitar.

A modo de ejemplo, vamos a hacer lo siguiente.

- Cada usuario tendrá una lista de proyectos.
- Por cada proyecto un usuario podrá subir imágenes (ninguna, una o muchas).

En este caso particular, tenemos 3 modelos:

- User (con su correspondiente migración ```users```)
- Project (con su correspondiente migración ```projects```)
- ProjectImage (con su correspondiente migración ```project_images```)

Mm puedes considerar al proyecto como una galería de imágenes.

Pero lo cierto es que un proyecto tiene más datos en este ejemplo ficticio :p

Nuestro modelo y migración para las imágenes los podemos crear así:

```
php artisan make:model ProjectImage -m
```

Y entonces en nuestra migración tendríamos:

{% highlight php %}
<?php
Schema::create('project_images', function (Blueprint $table) {
    $table->increments('id');

    $table->integer('project_id')->unsigned();
    $table->foreign('project_id')->references('id')->on('projects');

    $table->integer('user_id')->unsigned();
    $table->foreign('user_id')->references('id')->on('users');

    $table->string('name');
    $table->string('description');
    $table->string('file_name');

    $table->timestamps();
});
{% endhighlight %}

- Tenemos una clave foránea, para saber **a qué proyecto pertence la imagen**.
- Y otra clave foránea para saber **qué usuario subió la imagen**.
- Puedes tener más datos, tantos como desees, pero nunca olvides de tener un campo para **guardar el nombre de la imagen**.

Todo esto lo puse para darte una idea más clara del ejemplo que estamos viendo.

Ahora sí entremos en materia.

___

El atributo ```action``` del formulario es importantísimo, porque allí se define la ruta a la que se harán las peticiones para subir las imágenes.

En el código de ejemplo, tiene el valor de ```/file-upload```. 

Aquí **puedes usar la ruta que creas correspondiente**.

Para este ejemplo usaremos ```/proyecto/{id}/imagenes```. 

De tal forma que en el parámetro de ruta ```id``` indicaremos el proyecto para el que se subirán las imágenes.

{% raw %}
``` html
<form action="{{ asset('/proyecto/'.$project->id.'/imagenes') }}"
    class="dropzone" id="my-awesome-dropzone">
      {{ csrf_field() }}
</form>
```
{% endraw %}

> No olvidar el CSRF Token. Laravel lo necesita porque se trata de una petición POST.

Y ya está. Ya lo tenemos.

Esta pequeña ruta será procesada por nuestro controlador cuando se trate de una petición POST.

{% highlight php %}
<?php
Route::get('/proyecto/{id}/imagenes', 'ProjectImageController@index');
Route::post('/proyecto/{id}/imagenes', 'ProjectImageController@upload');
{% endhighlight %}

Así, en ```ProjectImageController``` tenemos:

{% highlight php %}
<?php
public function index($id)
{
    $project = Project::find($id);
    return view('projects.images.index')->with(compact('project'));
}

public function upload($id, Request $request)
{
    //
}
{% endhighlight %}

El método ```upload``` es el que hará la magia.

Allí tenemos el ```$id``` del proyecto para el que se está subiendo la imagen.

Y un objeto ```$request``` con información de la imagen subida.

Por lo tanto:

{% highlight php %}
<?php
public function upload($id, Request $request)
{
    $file = $request->file('file');
    $path = public_path() . '/images/projects';
    $fileName = uniqid() . $file->getClientOriginalName();

    $file->move($path, $fileName);

    $projectImage = new ProjectImage();
    $projectImage->project_id = $id;
    $projectImage->user_id = auth()->user()->id;
    $projectImage->file_name = $fileName;
    $projectImage->save();
}
{% endhighlight %}

Con esto ya debería **funcionar todo**. Pero, de todas formas ...

**Repasemos línea por línea** lo que hace el método ```upload```:

- Obtiene la información del archivo que se ha subido en un objeto llamado ```$file```.
- Define una variable ```$path``` con la **ruta donde queremos guardar nuestras imágenes**.
- Define una variable ```$fileName``` con el **nombre que se usará para guardar la imagen**. Aquí se usa ```uniqid()``` para asegurarnos de que el nombre **no se repita** y ninguna imagen se termine sobreescribiendo.
- Guardamos la imagen usando ```move``` (le indicamos dónde guardar y con qué nombre).
- Por último **creamos en nuestra base de datos un registro** con información de la imagen que se acaba de guardar. Este registro nos permitirá mostrar la imagen en nuestra galería.

Conclusión
---

Laravel y PHP nos facilitan la tarea de **subir imágenes**. 

Como puedes ver en el último **snippet de código**, lo podemos hacer con muy pocas líneas.

Por otro lado, Dropzone nos permite subir imágenes con una interfaz amigable para el usuario.

Y todo esto se puede configurar rápidamente.

Tal vez el tutorial ha sido un poco extenso por entrar en detalles. Pero si sigues los pasos, verás que realmente es fácil.

Disculpa que vaya por allí con tantos rodeos, pero quiero que sea útil incluso para quienes empiezan a usar Laravel.

Gracias por tu visita, y recuerda compartir si te ha sido de ayuda.

___

Extra: reducir el tamaño de las imágenes antes de guardar
---

Si te interesa hacer alguna operación sobre las imágenes que suben tus usuarios, como:

- Disminuir el tamaño
- Rotar X grados
- Cortar la imagen
- O aplicar algún efecto sobre la misma

Te recomiendo ver el siguiente video:

<div class="text-center">
    <iframe width="858" height="480" src="//www.youtube.com/embed/ErU7mcIYPwA?vq=hd720" frameborder="0" allowfullscreen></iframe>   
</div>

___

Extra 2: capturar la respuesta del servidor
---

Generalmente tenemos **una sección donde están todas las imágenes subidas**, y una segunda sección con el dropzone.

Los usuarios pueden arrastrar y soltar sus imágenes sobre el área donde aplicamos el dropzone.

Estas imágenes se subirán al instante. Pero, no se mostrarán en el listado de imágenes ya subidas.

Si queremos mostrarlas de ese lado, es necesario usar el evento ```success``` de dropzone, para capturar la respuesta que se recibe desde el controlador, luego de una subida exitosa.

Entonces, en nuestro controlador devolvemos la información de la imagen que se acaba de subir, añadiendo una línea al final del método ```upload```:

{% highlight php %}
<?php
public function upload($id, Request $request)
{
    $file = $request->file('file');
    $path = public_path() . '/images/projects';
    $fileName = uniqid() . $file->getClientOriginalName();

    $file->move($path, $fileName);

    $projectImage = new ProjectImage();
    $projectImage->project_id = $id;
    $projectImage->user_id = auth()->user()->id;
    $projectImage->file_name = $fileName;
    $projectImage->save();

    return $projectImage;
}
{% endhighlight %}

Y en nuestro Javascript capturamos esa respuesta:

{% highlight js %}
Dropzone.options.myAwesomeDropzone = {
    paramName: "file", // The name that will be used to transfer the file
    maxFilesize: 2, // MB
    success: function (file, response) {
        console.log(response);
    }
};
{% endhighlight %}

Así, obtenemos en la consola algo como lo siguiente:

![Respuesta en la consola](/images/posts/2017/laravel-dropzone/console-log-response.png)

Aquí lo que nos interesa es principalmente el atributo ```file_name```, ya que con este dato podemos renderizar la imagen que se acaba subir.

Pero he devuelto toda la información para que veas que se puede **capturar la respuesta del servidor**.

[dropzone-web]: http://www.dropzonejs.com/#installation
[dropzone-cdn]: https://cdnjs.com/libraries/dropzone
