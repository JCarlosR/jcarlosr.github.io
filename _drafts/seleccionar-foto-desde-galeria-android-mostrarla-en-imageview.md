Hoy vamos a ver cómo seleccionar una imagen desde galería y cómo mostrar esta imagen en una ImageView.

Muchas veces necesitamos dar esta opción al usuario.

Debemos permitirle acceder a la galería desde nuestra aplicación, con el fin de usar la imagen seleccionada para algún propósito determinado. 

¿Cómo lo hacemos?

Usando una instancia de la clase Intent.

Esta clase nos permite iniciar otros activities. 
Así podemos llamar otro activity dentro de nuestra aplicación, pasarle parámetros e incluso esperar respuesta por parte de ellos.

Pero la clase Intent no limita su comunicación con activities de nuestra propia aplicación. Nos sirve también para comunicarnos con otras aplicaciones del dispositivo.

Por ejemplo:

- Podemos acceder a la información de nuestros contactos
- Podemos iniciar la cámara para la captura de fotos
- Y así mismo, iniciar la galería

Veamos como lograr esto último:

## Layout de nuestro activity

Este es el layout de nuestra activity que recibirá la imagen seleccionada desde galería:

```java
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <ImageView
        android:id="@+id/selected_image"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</android.support.constraint.ConstraintLayout>
```

Lo único que tenemos es una ImageView.
Cuando se haga clic sobre este elemento, vamos a iniciar la app de galería.

## Evento de clic para abrir la galería

El evento de clic lo asociamos de la siguiente manera:

```java
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ImageView selectedImage = (ImageView) findViewById(R.id.selected_image);
        selectedImage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Aquí mostramos la galería
            }
        });
    }
}
```

La pregunta ahora es, ¿cómo usamos la clase Intent para iniciar la galería y obtener una respuesta una vez que se ha seleccionado una imagen?

La respuesta es la siguiente:

La clase Intent espera 2 parámetros importantes: la acción a realizar, y sobre qué se va a operar para realizar esta acción.

Para iniciar la aplicación de galería, usamos los siguientes parámetros:

- La acción de seleccionar: `Intent.ACTION_PICK` 
- La URI que hace referencia a la galería: `MediaStore.Images.Media.EXTERNAL_CONTENT_URI`

Nótese que usamos `EXTERNAL_CONTENT_URI` para acceder a las imágenes del usuario. Esto es diferente a `INTERNAL_CONTENT_URI`, que se usa por las aplicaciones del sistema.

Así tenemos:

```java
selectedImage.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        // Abrir la galería
        Intent galleryIntent = new Intent(Intent.ACTION_PICK,
                MediaStore.Images.Media.EXTERNAL_CONTENT_URI);

        startActivityForResult(galleryIntent, RESULT_LOAD_IMAGE);
    }
});
``` 

## Obtener la selección del usuario

Ahora necesitamos conocer el resultado de la actividad iniciada.

Y debemos tener en cuenta que el resultado no siempre será una imagen seleccionada, porque es posible que el usuario haya cancelado la acción o haya ocurrido un error inesperado.

Cuando iniciamos una actividad y esperamos una respuesta para cuando ésta haya finalizado usamos la función `startActivityForResult`.

Y la respuesta la procesamos en el método `onActivityResult`, como sigue a continuación:

```java
@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);

    if (requestCode == RESULT_LOAD_IMAGE && resultCode == RESULT_OK && null != data) {

        Uri uriSelectedImage = data.getData();
        String pathColumnName = {MediaStore.Images.Media.DATA}; // [] ??

        Cursor cursor = getContentResolver().query(uriSelectedImage,
                pathColumnName, null, null, null);

        if (cursor != null && cursor.moveToFirst()) {

            int columnIndex = cursor.getColumnIndex(pathColumnName[0]);
            String path = cursor.getString(columnIndex);
            cursor.close();

            mSelectedImage.setImageBitmap(BitmapFactory.decodeFile(path));
        }
    } else {
        Toast.makeText(this, "No se ha seleccionado ninguna imagen",
                Toast.LENGTH_LONG).show();
    }
}
```

Dentro de este método:

- Vamos a procesar el contenido del intent de respuesta usando `getData()`.

- Éste último método nos devolverá una URI, que nos permitirá obtener la imagen seleccionada (así es, no obtenemos la imagen directamente sino una referencia que nos servirá luego).

- El ContentResolver nos permite obtener más información a partir de la URI, haciendo uso de cursores. A nosotros nos interesa la columna DATA (que contiene la ruta de la imagen). Por eso accedemos a esta columna usando la constante `MediaStore.Images.Media.DATA`.

- Usamos el cursor y nos posicionamos en el primer resultado (ya que la URI debería coincidir solo con uno). Y usando la constante `DATA` que antes mencionamos, accedemos a la ruta exacta de la imagen (ahora sabemos dónde se encuentra el archivo). 

- Finalmente usamos `BitmapFactory.decodeFile(path)` para obtener la imagen y asignarla al ImageView como planteamos inicialmente.

¿Interesante verdad?

¿Pero por qué hay que hacer tanto para acceder a una imagen?

Lo que ocurre es que tenemos acceso a más opciones, pero no las estamos usando, en este caso.
 