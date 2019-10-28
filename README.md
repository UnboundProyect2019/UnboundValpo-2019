# Inroduccion 
>Fundación Unbound es una ong internacional con sede en la quinta región, esta
organización se encarga de crear un vínculo entre un niño que necesite ayuda y un padrino que lo tome como su ahijado.
La organización busca almacenar la información de los ahijados, para esto se dispone a crear un software capaz de almacenar, editar y eliminar la información pertinente.

<h2 align="center">Herramientas de desarollo</h2>

	-	Backend con nodejs, express.
	-	Mongo DB como base de datos NoSql.
	-	Vuejs como framework del Frontend
	-	UI con Vuetify
	-	Gestion de roles de usuario con JWT
<h2 align="center">Patron de diseño</h2>
En el presente proyecto se ocupo un patron de diseño BFF ó Backend for Frontend, desacoplando el codigo generando capas de componentes, altamente acopladas.<br>
+ Dentro del backend se genero una **API REST**, en donde se separo los datos en:
		-  Controladores
		-  Middlewares
		-  Modelos de datos
		-  Rutas
		-  Servicios
+ En el frontend los componentes consumen los servicios de la api con la libreria **Axios**.
<h2 align="center">Instalacion</h2>Para instalar el proyecto se necesita tener instalado Node.js, con su respectivo gestor de paquetes NPM.
Ingresar por consola a las carpetas de "back-end" y "front-end" se debe ejecutar el comando :`$ npm install ` para generar los modulos ocupados.
Luego de esto se necesita estar corriendo de forma local/remoto un servidor de mongodb, al cual poder conectarse, y ingresar un usuario.(Con su respectivo token)

<h2 align="center">Aclaracion</h2>Este proyecto se genera para continuar desarollandolo a futuro y **hacemos enfasis que falta un estudio de factibilidad legal del uso de datos dentro de la Fundacion  Unbound**.