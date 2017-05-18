---
title:  "Cómo pedir una fecha en Android usando DatePicker"
categories: [Desarrollo móvil]
tags: [android]
---

En este tutorial Android aprenderás a solicitar a los usuarios que ingresen una fecha a través de un DatePicker.

DatePicker
---

Un bendito DatePicker se ve genial, y funciona de maravilla.

El problema con este pequeño es que no viene enlazado a ningún campo.

Y resulta inviable para nosotros ponerlo directamente sobre nuestro formularios.

Mostrando un DatePicker a través de un Dialog
---

Así es. Para solucionar este inconveniente es que **vamos a mostrarlo a través de un cuadro de diálogo**.

Entonces:

- Cuando el usuario haga clic sobre un **EditText de solo lectura** (donde necesitamos la fecha),
- vamos a **mostrar un DialogFragment** con un DatePicker en su interior, y
- cuando el usuario seleccione una fecha, vamos a **capturar la fecha ingresada**.

Existen varias formas de capturar la fecha ingresada por el usuario.

En este caso vamos a usar un método fácil de recordar, y que además **nos permitirá capturar tantas fechas como necesitemos**.

Veamos cómo lograr esto paso a paso.

Primer paso: EditText de solo lectura
---

Este paso puede parecerte muy obvio si ya tienes experiencia programando en Android.

Pero de todas formas es importante mencionarlo.

Debemos definir nuestro EditText como un campo de solo lectura en nuestro layout:

{% highlight xml %}
<android.support.design.widget.TextInputLayout
    android:id="@+id/tilPlannedDate"
    android:layout_width="match_parent"
    android:layout_height="wrap_content">

    <EditText
        android:id="@+id/etPlannedDate"
        android:hint="@string/report_planned_date"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:inputType="date"
        android:focusable="false"
        android:clickable="true"
        android:maxLines="1" />
</android.support.design.widget.TextInputLayout>
{% endhighlight %}

Como puedes ver, yo estoy encerrando el EditText dentro de un TextInputLayout.

Puedes hacer ello también, pero es opcional.

Yo lo hago de esta forma porque un TextInputLayout permite usar un texto de ayuda sobre el EditText, y este texto se desplaza hacia arriba cuando el EditText tiene un valor asignado.

También puedes asignarle el ```id``` que creas correspondiente. 
En el ejemplo es ```etPlannedDate``` porque el usuario ingresará una fecha planificada para un evento.

Lo importante es definir el atributo ```focusable``` en ```false``` y ```clickable``` en ```true```.

<p class="lead">Recuerda asignar estos 2 atributos al EditText. Así no se podrá escribir en él, pero sí funcionará el evento de clic.</p>

Y por favor no uses ```disabled``` en ```true```, porque en ese caso no podrás usar el evento de clic. Yo perdí un par de horas intentándolo de esta forma sin entender porqué no funcionaba :P

Segundo paso: Asociar un evento de clic al EditText
---

Ahora vamos a definir el evento de ```click``` sobre el EditText.

Así, cuando se haga clic sobre el mismo vamos a lanzar nuestro dialog al frente.

Podemos asignar nuestra clase actual como ```listener``` del evento clic de esta manera:

{% highlight java %}
EditText etPlannedDate = (EditText) view.findViewById(R.id.etPlannedDate);
etPlannedDate.setOnClickListener(this);
{% endhighlight %}

Y por último definir la acción así:

{% highlight java %}
@Override
public void onClick(View view) {
    switch (view.getId()) {
        case R.id.etPlannedDate:
            showDatePickerDialog();
            break;
    }
}
{% endhighlight %}

Eso hará que ante un clic, se ejecute el método ```showDatePickerDialog()```.

Tercer paso: Mostrar el DatePicker en un dialog
---

Vamos a definir el método que antes usamos:

{% highlight java %}
private void showDatePickerDialog() {
    DatePickerFragment newFragment = new DatePickerFragment();
    newFragment.show(getActivity().getSupportFragmentManager(), "datePicker")
}
{% endhighlight %}

En el código anterior estoy usando ```getActivity()``` porque actualmente estoy en un Fragment.

Si el código lo vas a añadir a un Activity, entonces puedes usar directamente ```getSupportFragmentManager()```.

Ahora de seguro que te aparece resaltado en rojo ```DatePickerFragment```.

Eso es porque aun nos falta definir esa clase:

{% highlight java %}
public class DatePickerFragment extends DialogFragment
        implements DatePickerDialog.OnDateSetListener {

    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        // Use the current date as the default date in the picker
        final Calendar c = Calendar.getInstance();
        int year = c.get(Calendar.YEAR);
        int month = c.get(Calendar.MONTH);
        int day = c.get(Calendar.DAY_OF_MONTH);

        // Create a new instance of DatePickerDialog and return it
        return new DatePickerDialog(getActivity(), this, year, month, day);
    }

    public void onDateSet(DatePicker view, int year, int month, int day) {
        // Do something with the date chosen by the user
    }
}
{% endhighlight %}

Lo que esta clase hace es instanciar un ```DatePickerDialog``` y marcar la fecha actual.

En su interior también podemos ver un método ```onDateSet```. 

Este método es invocado cada vez que el usuario cambia la fecha en el DatePicker.

Cuarto paso: Capturar la fecha seleccionada
--- 

La interfaz ```DatePickerDialog.OnDateSetListener``` es la encargada de invocar el método ```onDateSet``` cada vez que una nueva fecha es seleccionada.

Pero si el método está definido sobre el mismo ```DatePickerFragment``` no nos resulta muy útil.

Nuestra intención es acceder a la fecha seleccionada desde nuestro fragment, activity, o desde donde sea que estemos creando nuestro ```DatePickerFragment```.

Para lograr ello, lo que tenemos que hacer es definir el ```listener``` en la clase que hará uso del ```DatePickerFragment```, mas no en el mismo ```DatePickerFragment```.

> ¿En dónde es que se está definiendo el listener actualmente y dónde es que debe definirse?

El ```listener``` (oyente del evento de cambio de fecha) se está definiendo en nuestra clase ```DatePickerFragment```.

Eso se define al crear la instancia de ```DatePickerDialog```, exactamente en esta línea (como segundo parámetro):

{% highlight java %}
return new DatePickerDialog(getActivity(), this, year, month, day);
{% endhighlight %}

Ese ```this``` es lo que hace que la misma clase sea la que tenga que actuar de ```listener```, y es por eso que en la cabecera de nuestra clase nos encontramos con ```implements DatePickerDialog.OnDateSetListener```.

> Ya entiendo, pero, ¿cómo hacemos que el listener se defina en la clase desde la que creamos el dialog?

Para ello debemos crear el listener en la clase que invoca el dialog (puede ser un fragment o un activity).

Luego debemos pasarle el listener como parámetro al ```DialogFragment```.

Para pasarle el ```listener``` como parámetro debemos tener un método que cree instancias ```DialogFragment```. No lo podemos hacer en el mismo constructor, porque Android no lo permite.

Entonces **nos quedaría de esta forma**:

{% highlight java %}
public class DatePickerFragment extends DialogFragment {

    private DatePickerDialog.OnDateSetListener listener;

    public static DatePickerFragment newInstance(DatePickerDialog.OnDateSetListener listener) {
        DatePickerFragment fragment = new DatePickerFragment();
        fragment.setListener(listener);
        return fragment;
    }

    public void setListener(DatePickerDialog.OnDateSetListener listener) {
        this.listener = listener;
    }
    
    @Override
    @NonNull
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        // Use the current date as the default date in the picker
        final Calendar c = Calendar.getInstance();
        int year = c.get(Calendar.YEAR);
        int month = c.get(Calendar.MONTH);
        int day = c.get(Calendar.DAY_OF_MONTH);

        // Create a new instance of DatePickerDialog and return it
        return new DatePickerDialog(getActivity(), listener, year, month, day);
    }

}
{% endhighlight %}

Último paso: Usar nuestro DatePickerFragment
---

Nuestra clase ```DatePickerFragment``` nos va a permitir pedir una fecha al usuario, tantas veces como sea necesario!

Solo tenemos que instanciar dicha clase y decirle qué hacer con la fecha escogida:

{% highlight java %}
    private void showDatePickerDialog() {
        DatePickerFragment newFragment = DatePickerFragment.newInstance(new DatePickerDialog.OnDateSetListener() {
            @Override
            public void onDateSet(DatePicker datePicker, int year, int month, int day) {
                // +1 because january is zero
                final String selectedDate = day + " / " + (month+1) + " / " + year;
                etPlannedDate.setText(selectedDate);
            }
        });
        newFragment.show(getActivity().getSupportFragmentManager(), "datePicker");
    }
{% endhighlight %}

Conclusión
---

Prácticamente todo se resume a los **2 últimos snippets** de código.

Pero he querido explicar paso a paso cómo es que llegamos a ese código.

Si entendemos el código que usamos, entonces nos será más fácil recordar lo que hace, cada vez que lo necesitemos.

Si tienes alguna duda, o crees que podemos mejorar el código, por favor deja un comentario.

Siempre estoy dispuesto a escuchar sugerencias. De hecho últimamente he desarrollado un gusto inmenso por ser corregido.

Extras: Cómo solicitar varias fechas y capturar con el formato adecuado
---

Si necesitas leer varias fechas, entonces necesitas un ```EditText``` para cada una.

En mi caso voy a leer 2 fechas, una fecha de planificación y una de cierre.

Entonces mi XML está de esta forma:

{% highlight java %}
<android.support.design.widget.TextInputLayout
    android:id="@+id/tilPlannedDate"
    android:layout_width="match_parent"
    android:layout_height="wrap_content">

    <EditText
        android:id="@+id/etPlannedDate"
        android:hint="@string/report_planned_date"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:inputType="date"
        android:focusable="false"
        android:clickable="true"
        android:maxLines="1" />
</android.support.design.widget.TextInputLayout>

<android.support.design.widget.TextInputLayout
    android:id="@+id/tilDeadline"
    android:layout_width="match_parent"
    android:layout_height="wrap_content">

    <EditText
        android:id="@+id/etDeadline"
        android:hint="@string/report_deadline"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:inputType="date"
        android:focusable="false"
        android:clickable="true"
        android:maxLines="1" />
</android.support.design.widget.TextInputLayout>
{% endhighlight %}

Luego en mi Fragment (tú podrías estar usando un activity, también funciona) hago lo siguiente:

{% highlight java %}
etPlannedDate = (EditText) view.findViewById(R.id.etPlannedDate);
etPlannedDate.setOnClickListener(this);

etDeadline = (EditText) view.findViewById(R.id.etDeadline);
etDeadline.setOnClickListener(this);
{% endhighlight %}

Y resuelvo los eventos de clic de esta forma:

{% highlight java %}
@Override
public void onClick(View view) {
    switch (view.getId()) {
        case R.id.etPlannedDate:
            showDatePickerDialog(etPlannedDate);
            break;

        case R.id.etDeadline:
            showDatePickerDialog(etDeadline);
            break;
    }
}
{% endhighlight %}

Finalmente el método ```showDatePickerDialog``` muestra el diálogo al usuario, y se encarga de asignar la cadena ```dd/mm/YYYY``` al EditText correspondiente para cada caso:

{% highlight java %}
private void showDatePickerDialog(final EditText editText) {
    DatePickerFragment newFragment = DatePickerFragment.newInstance(new DatePickerDialog.OnDateSetListener() {
        @Override
        public void onDateSet(DatePicker datePicker, int year, int month, int day) {
            // +1 because january is zero
            final String selectedDate = twoDigits(day) + " / " + twoDigits(month+1) + " / " + year;
            editText.setText(selectedDate);
        }
    });
    newFragment.show(getActivity().getSupportFragmentManager(), "datePicker");
}
{% endhighlight %}

> ¿Y el método twoDigits?

Es para que los días o meses se muestren a 2 dígitos.

En vez de ```7/7/2080``` mostrará ```07/07/2080```.

Y aquí está:

{% highlight java %}
private String twoDigits(int n) {
    return (n<=9) ? ("0"+n) : String.valueOf(n);
}
{% endhighlight %}

Como sabes, los paréntesis son opcionales, pero te recomiendo dejarlos, por legibilidad.

Gracias por leer hasta el final.

Cualquier duda, deja un comentario, que iremos haciendo más completa esta guía.
