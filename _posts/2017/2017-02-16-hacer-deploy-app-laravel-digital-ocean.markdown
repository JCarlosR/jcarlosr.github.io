---
title:  "Hacer deploy de una aplicación Laravel a Digital Ocean"
categories: [Desarrollo web]
tags: [laravel]
image: posts/2017/laravel-digital-ocean/lamp-stack.png
---

En este tutorial aprenderás a hacer deployment de tus proyectos Laravel hacia un droplet de Digital Ocean.

¿Digital Ocean? ¿Droplet?
---
Digital Ocean ofrece uno de los mejores servicios de VPS y a un precio justo.

A diferencia de los hosting tradicionales, en Digital Ocean puedes configurar tú mismo el stack que tu aplicación requiere. Además, el equipo de soporte responde de forma atenta y en poco tiempo.

Un droplet es una máquina virtual, a la que tendrás acceso por SSH (vía consola). 

En Digital Ocean puedes crear tantos droplets como requieras. Además, puedes tener varias aplicaciones sobre el mismo droplet, si son proyectos en fase beta, o estás haciendo algunas pruebas.

Así mismo, en Digital Ocean el pago es por uso. Eso significa que si a mitad de mes deseas apagar el droplet que creaste, o cancelarlo, podrás hacerlo y pagar por lo que corresponde :)

Empecemos entonces.

Registro en Digital Ocean y los 10$ gratuitos
---
El registro en Digital Ocean es realmente fácil de seguir, y ahora te explicaré cómo hacerlo paso a paso, pero antes quiero comentarte una cosa.

Si te registras en la plataforma por invitación de algún usuario, obtienes 10$ gratuitos de bienvenida.
En este caso, yo [te invito a registrarte desde mi enlace de referidos][digital-ocean]{:target="_blank"}.

Registrarte como mi referido no te supone ningún costo adicional, pero sí te da un beneficio: obtener 10$ al registrarte, que podrás usar para contratar el servicio durante los 2 primeros meses.

Además, si te has registrado a través de mi invitación y tienes alguna duda sobre este tutorial, no dudes en usar la sección de contacto o escribir tu duda en los comentarios, que de seguro te ayudaré.


Tu primer Droplet
---

Para iniciar, debes dar clic al botón verde superior.
![Crear mi primer droplet](/images/posts/2017/laravel-digital-ocean/create-droplet-button.png)

Al presionar este botón, cargará una página para configurar los parámetros del droplet a crear; y lo primero será definir una imagen. 

En nuestro caso usaremos el **stack LAMP** para no hacer toda la configuración desde 0.

Para ello debes drigirte a la pestaña **One-click apps** y seleccionar **LAMP on 16.04**, tal como lo muestra la imagen.
![Stack LAMP](/images/posts/2017/laravel-digital-ocean/lamp-stack.png)

Lo siguiente será definir el tamaño que tendrá nuestro droplet. Cada opción tiene características distintas y suponen un precio a pagar por mes.

Incluso se detalla el precio por hora porque si decidimos susponder nuestro droplet, __solo se nos cobrará según el consumo__ correspondiente.

En nuestro caso vamos a elegir el plan más básico. Podremos escalar fácilmente en un futuro, de ser necesario.
![Tamaño del droplet](/images/posts/2017/laravel-digital-ocean/droplet-size.png)

Posterior a ello no es necesario cambiar nada más; a menos que desees usar un datacenter en específico, o asignar un nombre en particular a tu droplet.

Sin más, damos click al botón de crear, y se nos mostrará una barra de progreso que representa la creación de nuestro droplet.

![Finalizar creación del droplet](/images/posts/2017/laravel-digital-ocean/droplet-create-end.png)

Cuando la creación haya finalizado **recibirás un correo con los datos del droplet**. Este correo contendrá una contraseña por defecto para que puedas conectarte a tu droplet vía SSH.

Como yo me encuentro en Windows, usaré la herramienta PuTTy para hacer posible esta conexión. En Linux o Mac, la terminal de por sí ya soporta los comandos para conectarse vía SSH.

Configuración del droplet
---
Para esto tenemos que conectarnos a la máquina virtual, e instalar lo necesario para que nuestro proyecto de Laravel funcione sin inconvenientes.

Si lo deseas, puedes ver este tutorial en formato de video. Si no, continuamos.

<iframe width="480" height="360" src="//www.youtube.com/embed/QTpd7fulA7o?vq=hd720" frameborder="0" allowfullscreen></iframe>

Lo primero que haremos será asegurarnos de que todo está correctamente actualizado:

{% highlight bash %}
sudo apt-get update
sudo apt-get dist-upgrade
{% endhighlight %}

*De seguro tu droplet ya está preconfigurado, si escogiste la opción LAMP. Pero estos comandos nos dan la seguridad de tener todo al día.*

Una vez que hemos actualizado, activamos el módulo ```mod_rewrite``` de Apache con el siguiente comando:

{% highlight bash %}
sudo a2enmod rewrite
{% endhighlight %}

Configurando MySQL para producción
---
Al crear un droplet, una contraseña para MySQL se genera por defecto y se guarda en ```/root/.digitalocean_password```.

Como vamos a necesitar esta contraseña para hacer la configuración de nuestra base de datos, accedemos a este archivo usando el comando ```nano```, de esta forma:

{% highlight bash %}
nano /root/.digitalocean_password
{% endhighlight %}

Al acceder encontraremos algo como lo siguiente:

```
root_mysql_pass="6f7e9dc57de26a6f283585d733315b39a0f31f3dcecb1bc7"
```

Entonces simplemente copiamos lo que está entre las comillas dobles, e iniciamos nuestra configuración con el siguiente comando:

```
mysql_secure_installation
```

El comando iniciará la configuración, y lo primero que nos pedirá será la contraseña. 

Luego de ingresar la contraseña te preguntará por varios detalles. 
Para responder con un sí debes escribir una "y", o pulsar cualquier otro caracter para responder con un no, según convenga.

En resumen, las preguntas serán las siguientes (y las respuestas que usaremos en este caso son también las siguientes):

- ¿Desea instalar un plugin para validar la fortaleza de las contraseñas?: No
- ¿Desea cambiar la contraseña para el usuario principal de la base de datos?: Sí
- Nueva contraseña: [Aquí debes ingresar la que consideres adecuada; es importante cambiar la contraseña por motivos de seguridad y tenerla guardada en algún lugar importante]
- Volver a ingresar la contraseña: [Repetimos la nueva contraseña que usaremos en adelante]
- ¿Desea eliminar los usuarios anónimos? Sí
- Deshabilitar conexión remota a la base de datos: Sí
- ¿Desea eliminar las tablas de prueba y sus accesos? Sí
- ¿Desea recargar los privilegios de las tablas ahora? Sí

Instalación de phpMyAdmin
---
Ejecuta el siguiente comando para iniciar con el proceso de instalación:

```
sudo apt-get install phpmyadmin
```

El instalador te hará varias preguntas; tenemos que:

- Seleccionar Apache2
- Escoger YES cuando nos pregunte ```Configure database for phpmyadmin with dbconfig-common?```
- Ingresar nuestra nueva contraseña de MySQL (que configuramos hace instantes)
- Repetir nuevamente con la contraseña

Una vez instalado editamos el archivo de configuración de Apache:

```
sudo nano /etc/apache2/apache2.conf
```

Y añadimos esta línea al final de todo:

```
Include /etc/phpmyadmin/apache.conf
```

Con ello finalizamos la instalación, y debemos reiniciar Apache antes de continuar:

```
sudo service apache2 restart
```

La instalación que hemos hecho hasta ahora nos permitirá administrar nuestras base de datos fácilmente accediendo a ```/phpmyadmin``` desde la IP de nuestro droplet.

Hasta aquí, la configuración resulta útil para cualquier proyecto de PHP. Ahora pasaremos a configurar puntos más específicos con relación a Laravel.

Configuración específica para Laravel
---

Lo primero que haremos será instalar composer:

```
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

Y luego GIT, para hacer deploy a través de un repositorio:

```
sudo apt-get install git
```

Genial. Ya tenemos todo listo para clonar nuestro proyecto de Laravel (a partir de un repositorio remoto que se puede encontrar en Github, Bitbucket, Gitlab u otro).

Así que nos ubicamos en /var/www de la siguiente manera:

![Carpeta var/www](/images/posts/2017/laravel-digital-ocean/cd-var-www.png)

¡Y clonamos nuestro repositorio! En mi caso usaré:

```
git clone https://github.com/JCarlosR/gestion-incidencias.git
```

Como mi proyecto se llama ```gestion-incidencias``` voy a verificar que esta carpeta se haya creado correctamente ingresando con ```cd``` y luego consultando su contenido con ```ls``` como lo muestra la imagen:

![Carpeta creada](/images/posts/2017/laravel-digital-ocean/directory-created.png)

Nuestra carpeta se ha creado. Pero recuerda: un proyecto Laravel tiene dependencias sobre otros paquetes. Estas dependencias se especifican en el archivo ```composer.json```. 

Entonces para instalar lo necesario solo ejecutamos el siguiente comando:

```
composer install
```

La descarga de las dependencias probablemente tarde un par de minutos, dependiendo del proyecto:

Una vez que haya finalizado esta descarga, debemos dar permisos a la carpeta storage. Para ello ejecutamos:

```
sudo chown -R www-data: storage
sudo chmod -R 755 storage
```

Apuntar a la carpeta /public
---

Así es. Estamos muy cerca del final. Lo que nos falta es que nuestro host reconozca a la carpeta public como la ruta base de nuestro proyecto.

Para ello tenemos que editar un archivo de configuración de Apache con el siguiente comando:

```
nano /etc/apache2/sites-enabled/000-default.conf
```

Aquí tenemos que reemplazar estas lineas:

```
DocumentRoot /var/www/html

<Directory /var/www/html/>
```

Por estas 2, respectivamente:

```
DocumentRoot /var/www/gestion-incidencias/public

<Directory /var/www/gestion-incidencias/public/>
```

Y agregar estas 2 líneas dentro de la etiqueta Directory:

```
RewriteEngine On
RewriteBase /var/www/gestion-incidencias/public
```

Guardamos los cambios en el archivo, y reiniciamos Apache por una última vez:
```
sudo service apache2 restart
```

Creando nuestro archivo de configuración .env
--- 
Nuestro servidor ya está configurado, pero recordemos que todo proyecto Laravel se basa en un archivo .env para guardar allí todas las credenciales que usa nuestro sistema.

Este archivo .env forma parte del ```.gitignore``` por lo que lógicamente no fue clonado y tenemos que crearlo.

Para crear este archivo escribimos:

```
nano .env
```

Y para definir su contenido simplemente vamos a copiar nuestro archivo .env que usamos de forma local (como guía).

Ten en cuenta que podemos tener una configuración distinta para producción y desarrollo. En ese caso nuestros archivos .env serán distintos.

Un ejemplo simple para que se entienda esto es lo siguiente: 
de forma local no uso contraseña para conectarme a mi base de datos MySQL, pero en producción de hecho que existe una contraseña, que hace poco definimos.

Migraciones, seeders y demás
---
En mi archivo .env la variable ```DB_DATABASE``` tiene como valor ```incidencias```. Eso significa que ese es el nombre de la base de datos que usa mi proyecto.

Lo que haré entonces será crear esta base de datos desde phpMyAdmin.

Tú debes hacer lo mismo. Crear la base de datos que tu proyecto requiere.

Esta base de datos estará totalmente vacía, pero las migraciones harán magia:

```
php artisan migrate
```

Si tus seeders solo contienen datos de prueba que usas de forma local, no será necesario ejecutarlos aquí.

En caso que los datos sean importantes para el funcionamiento en producción, puedes usar:

```
php artisan db:seed
```

O en su defecto, usar el siguiente comando (equivalente a los 2 anteriores):

```
php artisan migrate --seed
```

Y eso es todo.

[digital-ocean]: https://m.do.co/c/16e8c5d942fd
