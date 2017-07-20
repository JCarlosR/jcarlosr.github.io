---
title: "Cómo asociar un dominio a un hosting (Por ejemplo, Namecheap con DigitalOcean)"
categories: [Desarrollo web]
tags: [dominio,hosting]
image: posts/2017/dominio-hosting/dominio-hosting-asociar.jpg
---

En este tutorial vamos a ver de forma muy puntual como asociar un dominio adquirido en Namecheap con un droplet de Digital Ocean.

La misma idea se puede aplicar sobre un dominio adquirido a través de otro proveedor, y así mismo otro servicio de hosting.

___

## Antes de iniciar: ¿Qué son Namecheap y Digital Ocean?

- [Digital Ocean][do] es una empresa que nos ofrece el servicio de VPS. Esto significa que tenemos acceso a un servidor virtual privado, en vez de un hosting compartido. Si estamos desarrollando una aplicación, tendremos la libertad de configurar el servidor según nuestras necesidades (en un hosting compartido generalmente se tiene acceso a un panel y los permisos están restringidos).

- [Namecheap][domains] es un proveedor de dominios. Como su mismo nombre lo indica, ellos prometen vendernos dominios a un precio bastante asequible. Lo mejor es que, es un servicio que cuenta con muchos clientes, pero aún así atienden de forma oportuna nuestras dudas.

Ambos son servicios que uso a diario y los recomiendo (los enlaces de antes son de afiliación; si llegas a contratar uno de los servicios y tienes dudas, siempre puedes dejar un comentario aquí en la página para ayudarte). 

Nunca he tenido inconvenientes con ellos. De hecho he contactado a soporte en algunas ocasiones y he recibido atención inmediata.

___

## Asociar un dominio a nuestro droplet en Digital Ocean

- Primero que todo, iniciamos sesión en Digital Ocean.

- En el listado de droplets, hacemos clic sobre "More" y luego "Add a domain" para el dominio que queremos asociar.

![Añadimos un dominio a nuestro droplet en Digital Ocean](/images/posts/2017/dominio-hosting/digital-ocean-add-domain.png)

- Ahora escribimos nuestro dominio (en nuestro ejemplo es `clickstream.store`) y hacemos clic sobre "Add Domain".

![Escribimos nuestro dominio en Digital Ocean](/images/posts/2017/dominio-hosting/digital-ocean-domain.png)

- Digital Ocean cargará un par de segundos, y al finalizar habrá configurado lo siguiente por nosotros.

![Registros DNS en Digital Ocean](/images/posts/2017/dominio-hosting/digital-ocean-dns-records.png)

Tenemos un registro A cuyo valor es la IP de nuestro droplet.

Lo que nos falta ahora es configurar por el lado de Namecheap. Vamos con ello.

## Configurar los Nameservers en Namecheap

En Namecheap adquirir un dominio es muy sencillo. Basta con entrar a su página, teclear el dominio que nos interesa, y finalizar la compra seleccionando uno de los métodos de pago.

Lo que veremos ahora es, lo que viene **después de comprar un dominio**.

- Iniciamos sesión.

- Vamos a nuestro Dashboard.

![Acceder a Dashboard en Namecheap](/images/posts/2017/dominio-hosting/namecheap-dashboard.png)

- Hacemos clic sobre "Manage" para el dominio que queremos asociar.

![Gestionar un dominio en Namecheap](/images/posts/2017/dominio-hosting/namecheap-manage-domain.png)

- En la parte inferior tenemos una sección "Nameservers". Aquí el valor por defecto es "Namecheap BasicDNS". Modificamos aquí el valor por "Custom DNS".

![Seleccionamos la opción para ingresar nuestros propios DNS](/images/posts/2017/dominio-hosting/namecheap-nameservers.png)

- Al hacer clic sobre esta nueva opción, aparecerán unos 2 campos debajo. Procedemos a agregar los 3 nameservers que nos prové Digital Ocean (haciendo clic sobre `ADD NAMESERVER` para añadir un tercer campo).

![Escribimos los 3 nameservers de Digital Ocean en Namecheap](/images/posts/2017/dominio-hosting/namecheap-do-ns.png)

- Luego de presionar guardar (usando el ícono de la aspa verde), solo nos queda esperar a que se propaguen los cambios.

![Esperar para que se apliquen los cambios](/images/posts/2017/dominio-hosting/namecheap-48h.png)

El alerta nos dice que puede tardar hasta 48 horas. Sin embargo, muchas veces podemos ver los cambios a los pocos minutos o las primeras horas.

## A tener en cuenta

Los pasos anteriores asocian nuestro dominio con nuestro droplet, y deberían ser suficientes para empezar a usar el dominio en vez de la IP.

Sin embargo, dependiendo de la aplicación que tenemos configurada en nuestro droplet, es probable que haya que cambiar algún detalle más.

Es decir, si has seguido todos los pasos, han pasado algunas horas y aún no puedes ver los cambios, debes considerar también hacer algunas evaluaciones a nivel de aplicación.

Por ejemplo, en este caso yo he instalado Prestashop en el droplet.

Esta instalación de Prestashop estaba ocasionando una redirección de `clickstream.store` a `138.197.76.216/es/`. Y la solución fue declarar en la base de datos que el dominio principal es `clickstream.store` (en vez de la IP del droplet).

Luego de este cambio, ya puedo acceder al dominio. Y aunque se aplique una redirección a `/es`, el dominio continúa mostrándose en la barra de direcciones.

![Resultado final luego de asociar el dominio al droplet](/images/posts/2017/dominio-hosting/dominio-funcionando.png)

### Registro CNAME para www

Debemos tener en cuenta que `clickstream.store` ya funciona correctamente. Sin embargo, si accedemos a `www.clickstream.store` veremos un mensaje, indicando que la página no existe.

Para solucionar esto creamos un registro `CNAME`, con hostname `www` y alias `@`. Este arroba indica que usar `www` debe ser equivalente a visitar el dominio principal.

![Crear un registro CNAME para www](/images/posts/2017/dominio-hosting/digital-ocean-cname-www.png)

Y eso es todo.

[do]: https://m.do.co/c/16e8c5d942fd
[domains]: https://affiliate.namecheap.com/?affId=105242
