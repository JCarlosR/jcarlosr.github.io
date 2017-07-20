---
title: "¿Cómo funciona INNER JOIN, LEFT JOIN, RIGHT JOIN y FULL JOIN?"
categories: [Bases de datos]
tags: [sql]
---

Aprende (o repasa) cómo funcionan las consultas J0IN y sus variantes en SQL.

Los conceptos que vamos a revisar hoy aplican, en general, para las bases de datos relaciones.

Sin embargo, por esta vez, usaremos de forma específica SQL Server.

___

## Antes de iniciar: ¿Qué son las consultas JOIN y por qué son importantes?

- [Digital Ocean][do] es una empresa que nos ofrece el servicio de VPS. Esto significa que tenemos acceso a un servidor virtual privado, en vez de un hosting compartido. Si estamos desarrollando una aplicación, tendremos la libertad de configurar el servidor según nuestras necesidades (en un hosting compartido generalmente se tiene acceso a un panel y los permisos están restringidos).

- 

Ambos son servicios que uso a diario y los recomiendo (los enlaces de antes son de afiliación; si llegas a contratar uno de los servicios y tienes dudas, siempre puedes dejar un comentario aquí en la página para ayudarte). 

Nunca he tenido inconvenientes con ellos. De hecho he contactado a soporte en algunas ocasiones y he recibido atención inmediata.

___

## Asociar un dominio a nuestro droplet en Digital Ocean

- Primero que todo, iniciamos sesión en Digital Ocean.

CREATE DATABASE TestJoin
GO

USE TestJoin
GO

CREATE TABLE Departamentos
(
	ID int,
	Nombre varchar(20)
);

CREATE TABLE Empleados
(
	Nombre varchar(20),
	DepartamentoID int
);

INSERT INTO Departamentos VALUES(31, 'Sales');
INSERT INTO Departamentos VALUES(33, 'Engineering');
INSERT INTO Departamentos VALUES(34, 'Clerical');
INSERT INTO Departamentos VALUES(35, 'Marketing');

INSERT INTO Empleados VALUES('Rafferty', 31);
INSERT INTO Empleados VALUES('Jones', 33);
INSERT INTO Empleados VALUES('Heisenberg', 33);
INSERT INTO Empleados VALUES('Robinson', 34);
INSERT INTO Empleados VALUES('Smith', 34);
INSERT INTO Empleados VALUES('Williams', NULL);

![Añadimos un dominio a nuestro droplet en Digital Ocean](/images/posts/2017/dominio-hosting/digital-ocean-add-domain.png)

[do]: https://m.do.co/c/16e8c5d942fd
[domains]: https://affiliate.namecheap.com/?affId=105242
