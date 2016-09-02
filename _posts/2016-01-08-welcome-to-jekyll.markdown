---
title:  "Bienvenido a mi nuevo blog !"
date:   2016-01-08 15:04:23
categories: [Anuncios]
tags: [jekyll]
---
Hola. Este primer post es para comentar un poco mi situación actual.

Actualmente tengo un [canal en Youtube][canal], sobre programación y temas relacionados a la informática.
Por cada video, en la mayoría de los casos, he creado una entrada en mi blog. Me refiero a [mi blog en blogspot][blog].

El punto es que ya no usaré más dicho blog, ya que las nuevas publicaciones las realizaré a través de este nuevo medio. A pesar de ello, he decidido no borrarlo, y mantener allí entradas allí que ya existen.

Quiero comentarles que este blog funciona gracias a jekyll. Jekyll es una tecnología que me permite escribir posts usando markdown, en vez de HTML o alguna interfaz para redacción, como lo provee Wordpress o Blogger.
Esto significa que uso un editor de texto, y redacto cada post como un archivo de texto plano, que posteriormente es interpretado.

Es posible importar contenido desde un sitio en blogspot hacia jekyll. De hecho, realicé tal migración, y ya tenía las entradas listas en jekyll, pero luego he decidido mantener las entradas como están, para evitar lidiar con temas de redirección y/o contenido duplicado.

En adelante, podré publicar snippets de código, como a continuación:

``` ruby
require "jekyll-import";
JekyllImport::Importers::Blogger.run({
	"source"                => "import/blog-08-30-2016.xml",
	"no-blogger-info"       => false,
	"replace-internal-link" => false,
});
```

Si les interesa tener un blog similar a este, pueden ver la [documentación de jekyll][jekyll] para más información.
Si tienen alguna duda, para cualquiera de las publicaciones, no duden en comentar. Sobre todo ahora que los comentarios funcionan gracias a Disqus !

[canal]: http://youtube.com/sorcjc
[blog]: https://programacion-innata.blogspot.pe/
[jekyll]: http://jekyllrb.com
