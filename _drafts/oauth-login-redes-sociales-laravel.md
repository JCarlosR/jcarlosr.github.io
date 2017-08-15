Socialite

Este paquete de Laravel nos permite iniciar sesión mediante distintos proveedores:
- Facebook
- Twitter
- Google
- Github
- Bitbucket

Estos proveedores exponen un método de autenticación basado en OAuth.

Y el paquete nos facilita el uso de este protocolo.

Paso 1
---

Solicitar las credenciales de acceso en la página de desarrolladores de Facebook:
https://developers.facebook.com/

Solicitar las credenciales de acceso en la página de desarrolladores de Twitter:
https://apps.twitter.com/

Paso 2
---

Definir estas credenciales en el archivo de configuración `config/services.php`:

```php
<?php
return [
	'facebook' => [
        'client_id' => env('FACEBOOK_KEY'),
        'client_secret' => env('FACEBOOK_SECRET'),
        'redirect' => Config('app.url') . '/facebook/callback'
    ],

    'twitter' => [
        'client_id' => env('TWITTER_KEY'),
        'client_secret' => env('TWITTER_SECRET'),
        'redirect' => Config('app.url') . '/twitter/callback'
    ]
];
?>
```

Como se observa, estas variables las estamos definiendo en nuestro archivo `.env`, por tratarse de datos sensibles.

En nuestro `.env` tendríamos algo como lo siguiente:

```
FACEBOOK_KEY=314269922316594
FACEBOOK_SECRET=e23d9bbd406571f2cf9b0ae0f86a6d89

TWITTER_KEY=bkLqGFN2f1CB2qOj57z4OnWtb
TWITTER_SECRET=mAhiTKtSsYxFpVNgDdDS82qxcBrAIiwgluv8B2wqK03UiLCAgS
```

Paso 3
---

Veamos cómo funciona OAuth, en terminos sencillos.
Imaginemos que queremos iniciar sesión vía facebook:

- Un usuario entra a nuestra página (digamos que nuestra página se llama PYM), y hace clic en "Ingresar usando Facebook".

- Nuestra aplicación lo va a redirigir a una URL como la siguiente:
`facebook.com/oauth2/auth?client_id=ABC&redirect_uri=programacionymas.com/oauth_response`

Ésta URL contiene los siguientes parámetros: un `client_id`, una `redirect_uri` y opcionalmente un parámetro `scopes` (para indicar a qué información queremos acceder).

- Facebook primero va a ver si nuestro `client_id` es válido (comparándolo con la lista de `oauth_client` permitidos).
Si todo está correcto, entonces define una variable de sesión que guarda nuestro `client_id` y `redirect_uri`:

a. Redirige al usuario a facebook.com/login (muestra un formulario de inicio de sesión) si el usuario aún no ha iniciado sesión.
b. O avanza directamente al siguiente paso si ya hay una sesión activa en Facebook.

- Facebook muestra el logo de PYM y el nombre de la app (lo reconoce a partir del `client_id`), indicando al usuario: "Esta app quiere acceder a tus datos de Facebook, ¿le das permiso?" (según el `scope` indicado previamente). 
Si aceptamos, entonces ...

- Facebook genera un código (que tiene un sólo uso válido para PYM, el usuario en cuestión y el scope solicitado).
Facebook redirige al usuario según la `redirect_uri` indicada al inicio. Y le pasa el código que ha generado para ella: `pym.com/oauth_response?code=big_long_thing`


**Pregunta: ¿Por qué Facebook le pasa un código único y no el AuthToken directamente en este punto?**
Respuesta: Porque Facebook necesita validar que realmente PYM ha solicitado el acceso.
El `client_id` suele ser un dato que está expuesto (es público, ya que forma parte de la URL de Facebook a donde el usuario es redirigido desde un inicio). Cualquiera podría hacer una petición usando dicho `client_id`.
Pero existe un `client_secret` que sólo PYM posee (si un "hacker" robó este dato, y un usuario ha otorgado permiso previamente a PYM para acceder a sus datos; dicho "hacker" tendrá también permiso de ver su información). 

Por eso Facebook debe asegurar que quien solicitó los permisos sea el mismo que va a acceder a ellos. 
Aquí es donde inicia el siguiente paso, PYM se identifica frente a Facebook con su `client_secret`.

**Otra pregunta: en vez de redirigir a una URL que contenga el código como un parámetro, ¿por qué no se envía el AccessToken a PYM directamente?**
Respuesta: El redirect de Facebook a una ruta de PYM, le da control a la aplicación, de hacer lo que mejor le parezca luego que el usuario ha otorgado los permisos necesarios.

PYM toma el código que recibe de Facebook y vuelve a hacer una petición directa incluyendo también su `client_secret`.
No se trata de una petición a nivel de navegador, sino más bien de una solicitud de servidor a servidor, para probar su identidad: 
`facebook.com/oauth2/token?client_id=ABC&client_secret=XYZ&code=big_long_thing`

Facebook verifica que el código sea válido, y lo invalida también en ese instante (recordar que son de un único uso).
Entonces Facebook responde con un AccessToken, que PYM podrá usar (hasta que expire) para hacer peticiones a la API en nombre del usuario que ha otorgado los permisos (por ejemplo, para acceder a su información, y posiblemente realizar otras acciones en su nombre, todo basado en el `scope` solicitado inicialmente).
