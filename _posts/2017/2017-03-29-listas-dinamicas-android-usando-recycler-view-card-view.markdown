---
title:  "Listas dinámicas en Android usando RecyclerView y CardView"
categories: [Desarrollo móvil]
tags: [android]
image: posts/2017/android-recycler-view/listas-dinamicas-android.png
---

En este tutorial aprenderás a crear listas dinámicas en Android, usando las clases RecyclerView y CardView.

¿Qué es RecyclerView?
---
La clase RecyclerView nos permite **mostrar un listado (o bien una grilla)** de elementos.

Lleva este nombre porque a medida que se renderizan los elementos de la lista, los elementos que dejan de observarse se reciclan para mostrar los elementos siguientes.

**RecyclerView es un sustituto de la clase ListView**, principalmente cuando el número de elementos es variable, o los datos cambian como producto de un evento.

Es posible personalizar un ListView para lograr lo mismo, pero implicaría considerar varios detalles, para conseguir el mismo rendimiento.

¿Qué es CardView?
---
Si bien un **RecyclerView representa una lista de elementos**, cada elemento debe tener una UI definida.

Al usar Material Design se suele usar la clase **CardView para definir la apariencia de cada elemento** de un listado, en la mayoría de los casos.

RecyclerView + CardView, ¿siempre juntos?
---

No es obligatorio que se usen en conjunto, pero es usual hacerlo.

<blockquote>
    ¿En qué casos no se usarían en conjunto?
</blockquote>

Hay ocasiones en que se desea mostrar algo bien puntual, sin tener que usar CardViews como contenedores. 

**Cuando no se requiere usar "tarjetas" con bordes y elevaciones**, entonces se puede prescindir de la clase CardView.

En ese caso se podría usar un layout con un estilo más personalizado.

Lo que haremos
---

En nuestro ejemplo veremos un RecyclerView con elementos que estarán representados por un CardView cada uno.

Pero hay que tener en cuenta que **no siempre todos los elementos de un RecyclerView son iguales**.

Por ejemplo, podemos tener un listado de elementos, y entre ellos de forma aleatoria mostrar un mensaje. 

Tal vez una **frase inspiradora**, o tal vez algo más aburrido como un anuncio publicitario.

Un diagrama al rescate
---

![Diagrama para explicar un RecyclerView](https://developer.android.com/training/material/images/RecyclerView.png)

Si comprendemos estos conceptos. Lo hemos comprendido todo sobre RecyclerViews.

Veamos uno por uno:

- **RecyclerView**: Nuestro RecyclerView se va a "pintar" en función al LayoutManager que reciba como parámetro. También hará uso de un Adapter, que funcionará de acuerdo a un Dataset.

- **LayoutManager**: Este "gestor del diseño" va a definir la disposición de los elementos. Es decir, si van formando una lista vertical u horizontal, si van formando una cuadrícula, u otra variante.

- **Adapter**: El adaptador se encargará de **adaptar el dataset a lo que finalmente verá el usuario**. Es el encargado de **traducir datos en UI**.

- **Dataset**: Es el conjunto de datos que se espera mostrar en el RecyclerView. Se puede representar por un simple ```array``` de objetos ```String```, o ser algo más complejo como un ```ArrayList``` de objetos.

Primero lo primero
---

Primero que todo vamos a añadir las **2 dependencias a nuestro proyecto**:

```
compile 'com.android.support:cardview-v7:25.3.1'
compile 'com.android.support:recyclerview-v7:25.3.1'
```

Y a continuación una explicación más detallada.

¿Cómo usar un RecyclerView?
---

Lo primero es definir un RecyclerView en nuestro Layout, es decir, en el XML de nuestro activity:

{% highlight xml %}
<android.support.v7.widget.RecyclerView
    android:id="@+id/my_recycler_view"
    android:scrollbars="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent"/>
{% endhighlight %}

Una vez hecho ello:

- obtenemos una referencia del RecyclerView
- le asignamos un layout manager
- le asociamos un adapter

{% highlight java %}
public class MyActivity extends Activity {
    private RecyclerView mRecyclerView;
    private MyAdapter mAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.my_activity);
        mRecyclerView = (RecyclerView) findViewById(R.id.my_recycler_view);

        // Usar esta línea para mejorar el rendimiento
        // si sabemos que el contenido no va a afectar
        // el tamaño del RecyclerView
        mRecyclerView.setHasFixedSize(true);

        // Nuestro RecyclerView usará un linear layout manager
        LinearLayoutManager layoutManager = new LinearLayoutManager(getContext());
        mRecyclerView.setLayoutManager(layoutManager);

        // Asociamos un adapter (ver más adelante cómo definirlo)
        mAdapter = new MyAdapter(myDataSet);
        mRecyclerView.setAdapter(mAdapter);
    }
    
    // ...
}
{% endhighlight %}

¿Cómo definir un adapter?
---

Un adapter:

- contiene una **clase interna** ```ViewHolder```, que permite obtener referencias de los *componentes visuales* (```views```) de cada elemento de la lista

- presenta un **constructor** y/o **métodos para añadir, editar o eliminar elementos del DataSet**

- contiene un método ```onCreateViewHolder``` que infla el layout (archivo xml) que representa a nuestros elementos, y devuelve una instancia de la clase ViewHolder que antes definimos

- contiene un método ```onBindViewHolder``` que enlaza nuestra data con cada ViewHolder

- contiené un método ```getItemCount``` que devuelve un entero indicando la cantidad de elementos a mostrar en el RecyclerView

{% highlight java %}
public class MyAdapter extends RecyclerView.Adapter<MyAdapter.ViewHolder> {
    private String[] mDataSet;

    // Obtener referencias de los componentes visuales para cada elemento
    // Es decir, referencias de los EditText, TextViews, Buttons
    public static class ViewHolder extends RecyclerView.ViewHolder {
        // en este ejemplo cada elemento consta solo de un título
        public TextView textView;
        public ViewHolder(TextView tv) {
            super(v);
            textView = tv;
        }
    }

    // Este es nuestro constructor (puede variar según lo que queremos mostrar)
    public MyAdapter(String[] myDataSet) {
        mDataSet = myDataSet;
    }

    // El layout manager invoca este método
    // para renderizar cada elemento del RecyclerView
    @Override
    public MyAdapter.ViewHolder onCreateViewHolder(ViewGroup parent,
                                                   int viewType) {
        // Creamos una nueva vista
        TextView v = (TextView) LayoutInflater.from(parent.getContext())
                .inflate(R.layout.my_text_view, parent, false);

        // Aquí podemos definir tamaños, márgenes, paddings
        // ...

        ViewHolder vh = new ViewHolder(v);
        return vh;
    }

    // Este método reemplaza el contenido de cada view,
    // para cada elemento de la lista (nótese el argumento position)
    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        // - obtenemos un elemento del dataset según su posición
        // - reemplazamos el contenido de los views según tales datos

        holder.mTextView.setText(mDataSet[position]);
    }

    // Método que define la cantidad de elementos del RecyclerView
    // Puede ser más complejo en RecyclerViews que implementar filtros o búsquedas
    @Override
    public int getItemCount() {
        return mDataSet.length;
    }
}
{% endhighlight %}

DataSet
---
Como puedes observar, dentro del ```adapter``` tenemos un atributo de clase llamado ```mDataSet```.

En este caso, la fuente de datos que espera recibir el adaptador es solo un arreglo de objetos ```String```.

Pero esta fuente de datos puede ser más compleja, según se requiera.

Por ejemplo, si queremos mostrar información de usuarios es posible que el atributo ```mDataSet``` se defina como un ```ArrayList``` de objetos ```User``` (o de la entidad que deseamos mostrar en nuestra lista).

ViewHolder
---
En el método ```onCreateViewHolder``` hacemos uso de la clase ```LayoutInflater``` para "inflar" un layout XML.

En este caso, el layout se representa solo por un ```TextView```, pero también podría hacer referencia a un ```CardView``` y contener más datos.

Eso significa que debemos **definir un nuevo recurso XML con la apariencia que tendrán nuestros elementos** del listado, y luego usar ese layout en el método ```onCreateViewHolder```.

Aquí un ejemplo de un XML que representa los datos de una entidad "Informe" a través de un CardView:

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    xmlns:card_view="http://schemas.android.com/apk/res-auto"
    card_view:cardUseCompatPadding="true"
    card_view:cardElevation="4dp"
    card_view:cardCornerRadius="3dp"
    android:layout_margin="6dp">

    <LinearLayout
        android:id="@+id/linearLayout"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:padding="6dp"
        android:gravity="center">

        <TextView
            android:id="@+id/tvInformId"
            android:textColor="@color/colorPrimary"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="INFORME 777" />

        <TextView
            android:id="@+id/tvUserName"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:textAppearance="@android:style/TextAppearance"
            android:text="Juan Ramos" />

        <TextView
            android:id="@+id/tvCreatedAt"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Creado el día 01/02/2017"/>

        <TextView
            android:id="@+id/tvFromDate"
            android:textColor="@color/colorPrimaryDark"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:textAppearance="@style/Base.TextAppearance.AppCompat.Medium"
            android:text="Desde 17/03/2017" />

        <TextView
            android:id="@+id/tvToDate"
            android:textColor="@color/colorPrimaryDark"
            android:layout_width="wrap_content"
            android:textAppearance="@style/Base.TextAppearance.AppCompat.Medium"
            android:layout_height="wrap_content"
            android:text="Hasta 17/07/2017" />

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="horizontal">

            <Button
                android:id="@+id/btnGoToReports"
                style="@style/Widget.AppCompat.Button.Borderless.Colored"
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:layout_weight="1"
                android:text="Ver reportes" />

            <Button
                style="@style/Widget.AppCompat.Button.Borderless.Colored"
                android:layout_width="0dp"
                android:layout_weight="1"
                android:layout_height="wrap_content"
                android:text="Editar informe"
                android:id="@+id/btnEditInform" />
        </LinearLayout>

    </LinearLayout>

</android.support.v7.widget.CardView>
{% endhighlight %}

Y este es el resultado:

![Ejemplo de CardView](/images/posts/2017/android-recycler-view/card-view-ejemplo.png)

¿Te has perdido en algún punto?
---

Si tienes dudas puedes comentar aquí debajo.

Pero antes te recomiendo ver esta serie de tutoriales, sobre [**cómo crear desde cero una aplicación Android de diagnóstico médico**][diagnostic-vet-serie].

[diagnostic-vet-serie]: https://www.youtube.com/watch?v=RpWzd0-_47o
