---
title: "Detectar cuándo nuestra aplicación Android se conecta o desconecta de internet"
categories: [Desarrollo móvil]
tags: [android]
image: posts/2017/android/evento-detectar-internet-o-wifi.png
---

Aprende a DETECTAR los cambios de estado de la conexión a internet en tus proyectos Android.

Aplicación sin conexión a internet
---

Una aplicación que funciona de modo online, consume y registra datos a través de una API.

Todo bien, ¿pero qué pasa si el dispositivo se queda sin internet?

Es una buena práctica que nuestras aplicaciones continúen funcionando incluso sin una conexión a internet.

Y que, los datos se sincronicen cuando el internet vuelva a estar disponible.

___

Lo más complicado cuando tenemos que hacer que nuestra app funcione de modo offline es determinar la lógica a seguir, sobre **en qué momento y cómo** sincronizar los datos.

Eso es un tema que podemos ver en otro post con más detalle.

Por ahora lo importante es **detectar el instante en que el dispositivo obtiene acceso a internet**.

¿Cómo lo hacemos?
---

Existen muchas formas de lograrlo.

En este caso vamos a seguir uno de los métodos más sencillos.

- Primero vamos a solicitar el permiso ```ACCESS_NETWORK_STATE``` en nuestro manifest.
- Vamos a crear un BroadcastReceiver en el Activity donde queremos detectar el cambio de estado.
- Vamos a registrar y des-registrar este broadcastReceiver según el ciclo de vida de nuestro Activity. De modo que solo esté operativo cuando el usuario esté usando la aplicación, y evitemos consumir recursos innecesariamente.

NOTA: El permiso para verificar el estado es independiente al permiso de ```INTERNET```.

Código de ejemplo
---

{% highlight java %}
private BroadcastReceiver networkStateReceiver = new BroadcastReceiver() {
    @Override
    public void onReceive(Context context, Intent intent) {
        ConnectivityManager manager = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo ni = manager.getActiveNetworkInfo();
        onNetworkChange(ni);
    }
};

@Override
public void onResume() {
    super.onResume();
    registerReceiver(networkStateReceiver, new IntentFilter(android.net.ConnectivityManager.CONNECTIVITY_ACTION));
}

@Override
public void onPause() {
    unregisterReceiver(networkStateReceiver);
    super.onPause();
}

private void onNetworkChange(NetworkInfo networkInfo) {
    if (networkInfo != null) {
        if (networkInfo.getState() == NetworkInfo.State.CONNECTED) {
            Log.d("MenuActivity", "CONNECTED");
        } else {
            Log.d("MenuActivity", "DISCONNECTED");
        }
    }
}
{% endhighlight %}

Y eso es todo amigos.
