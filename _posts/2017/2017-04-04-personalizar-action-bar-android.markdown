---
title:  "Personalizar el Action Bar"
categories: [Desarrollo móvil]
tags: [android]
image: posts/2017/android-retrofit/android-retrofit-http-cliente.png
---

En este tutorial aprenderás a personalizar el Action Bar de tus proyectos Android.

Toolbar
---
Toolbar es el componente que usaremos como reemplazo del Action Bar.

Este componente nos permitirá:

- Reemplazar el ActionBar por una vista personalizada, en la que podremos añadir imágenes, textos, botones, y asociar eventos, como lo hacemos con cualquier otro layout.
- Cambiar la ubicación del típico ActionBar. Por ejemplo, podemos usar el Toolbar en la parte inferior.

Reemplazando el ActionBar por un Toolbar
---

Es usual que nuestro proyecto haga uso del ActionBar por defecto.

Como nuestra intención es usar el Toolbar, entonces debemos deshabilitar el ActionBar.

Para ello, debemos ir a nuestro archivo ```styles.xml``` y asegurarnos de asignar las siguientes propiedades:

- ```windowActionBar``` en ```false```
- ```android:windowNoTitle``` en ```true```

Por ejemplo, mi archivo ```styles.xml``` se creó con el siguiente contenido:
{% highlight xml %}
<!-- Base application theme. -->
<style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
    <!-- Customize your theme here. -->
    <item name="colorPrimary">@color/colorPrimary</item>
    <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
    <item name="colorAccent">@color/colorAccent</item>
</style>
{% endhighlight %}

Para deshabilitar el ActionBar lo dejaré de la siguiente forma:
{% highlight xml %}
<style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
    <item name="colorPrimary">@color/colorPrimary</item>
    <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
    <item name="colorAccent">@color/colorAccent</item>

    <item name="windowNoTitle">true</item>
    <item name="windowActionBar">false</item>
</style>
{% endhighlight %}

A tener en cuenta
---

Ten en cuenta que modificar el ```AppTheme``` **afectará a todos tus activities**, por lo que será necesario definir un Toolbar para cada pantalla.

Si deseas evitar ello, **una alternativa** es crear un ```theme``` adicional, aparte del ```AppTheme``` y asignarás este tema a los activities que consideres necesario.

Por ejemplo, puedes crear un nuevo ```theme``` a partir del ```AppTheme```:

{% highlight xml %}
<style name="AppTheme.NoActionBar" parent="AppTheme">
    <item name="windowNoTitle">true</item>
    <item name="windowActionBar">false</item>
</style>
{% endhighlight %}

Ello hará que herede los mismos estilos, pero que adicionalmente **deshabilite el ActionBar**.

Entonces, supongamos que tienes un activity llamado ```DiseasesActivity```.

Para aplicar el tema solo a este activity, debes ir al ```manifest``` y especificarlo de esta forma:

![Aplicar tema a un Activity](/images/posts/2017/toolbar/deshabilitar-actionbar-theme.png)

Personalizando el Toolbar
---
Supongamos que has desactivado el ActionBar para tu activity ```DiseasesActivity```.

En ese caso debemos ir al layout correspondiente de este activity y añadir allí el Toolbar.

Lo más usual sería que ese recurso XML tenga como nombre ```activity_diseases```.

Allí vamos a añadir:

{% highlight xml %}
<android.support.v7.widget.Toolbar
    android:id="@+id/toolbar"
    android:minHeight="?attr/actionBarSize"
    android:background="@color/colorPrimaryDark"
    android:layout_width="match_parent"
    android:layout_height="wrap_content">
</android.support.v7.widget.Toolbar>
{% endhighlight %}

¿En qué parte añadir el XML del Toolbar?
---
¿Has llegado al layout de tu activity pero no sabes dónde añadir el Toolbar?

Permíteme darte **un ejemplo**.

En el layout ```activity_diseases``` yo he tenido lo siguiente:

- Un ```ConstraintLayout``` como contenedor
- Un ```RecyclerView``` en su interior

Lo que hice fue:

- Reemplazar el ```ConstraintLayout``` por un ```LinearLayout``` de orientación vertical
- Añadir el ```Toolbar``` antes del ```RecyclerView```

El resultado fue el siguiente:
{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:background="#fff"
    tools:context="com.programacionymas.diagnosticvet.ui.activity.MainActivity">

    <android.support.v7.widget.Toolbar
        android:id="@+id/toolbar"
        android:minHeight="?attr/actionBarSize"
        android:background="@color/colorPrimaryDark"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">
    </android.support.v7.widget.Toolbar>

    <android.support.v7.widget.RecyclerView
        android:id="@+id/recycler_view_diseases"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_marginBottom="8dp"
        android:layout_marginLeft="8dp"
        android:layout_marginRight="8dp"
        android:layout_marginTop="8dp"
        android:layout_marginStart="8dp"
        android:layout_marginEnd="8dp" />
</LinearLayout>
{% endhighlight %}

Toolbar vacío
---

> Amigo, lo he implementado y funciona de maravilla. Pero espera, veo un vacío existencial.

Creo que te refieres a lo siguiente, ¿verdad?

<div class="text-center">
    <img src="/images/posts/2017/toolbar/toolbar-vacio.jpg" alt="Toolbar vacío" title="Toolbar vacío" width="280">
</div>

Te entiendo, no hay nada más triste en esta vida que un Toolbar vacío.

Por favor sigue la serie en el canal para no quedarte a mitad del camino, mientras yo actualizo esta entrada.

¿Te has perdido en algún punto?
---

Si tienes dudas puedes comentar aquí debajo.

Pero antes te recomiendo ver esta serie de tutoriales, sobre [**cómo crear desde cero una aplicación Android de diagnóstico médico**][diagnostic-vet-serie].

[diagnostic-vet-serie]: https://www.youtube.com/watch?v=RpWzd0-_47o
