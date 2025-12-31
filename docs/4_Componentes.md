# Unidad 4. Componentes (Spring Framework)

<span class="mi_h3">Revisiones</span>

| Revisión | Fecha      | Descripción                                          |
|----------|------------|------------------------------------------------------|
| 1.0      | 30-12-2025 | Adaptación de los materiales a markdown              |

## 4.1. Introducción

Spring es un framework de código abierto para crear aplicaciones en Java o Kotlin de forma más fácil, rápida y ordenada. Facilita el trabajo de crear objetos, conectar clases, preparar la base de datos y configurar servidores.


Los componentes principales de Spring Framework son:

| Componente      | Descripción                                                                             |
|-----------------|-----------------------------------------------------------------------------------------|
| Spring Core     | El núcleo del framework, encargado de la inyección de dependencias                      |
| Spring MVC      | Permite el desarrollo de aplicaciones web utilizando el patrón Modelo-Vista-Controlador |
| Spring Boot     | Facilita la creación de aplicaciones basadas en Spring con una configuración mínima     |
| Spring Data     | Simplifica el acceso a datos con soporte para JPA, MongoDB, Redis, entre otros          |
| Spring Security | Proporciona herramientas para implementar seguridad en aplicaciones                     |
| Spring Cloud    | Ayuda en la construcción de aplicaciones distribuidas y microservicios                  |



Spring se basa principalmente en:

- **Inversión de Control (IoC):** Se encarga de crear y gestionar los objetos de la aplicación.

- **Inyección de Dependencias (DI):** Coloca los objetos donde hacen falta automáticamente.



Además tiene tres pilares:

**1. Autoconfiguración (Spring Boot): prepara el proyecto por ti**

- Servidor web.

- Conexión a base de datos.

- Estructura de proyecto.

- Dependencias necesarias.




**2. Starters: paquetes listos para usar según lo que quieras hacer**

| Starter                        | Descripción                   |
|--------------------------------|-------------------------------|
| spring-boot-starter-web        | para rutas y controladores    |
| spring-boot-starter-data-jpa   | para BD y CRUD                |
| spring-boot-starter-thymeleaf  | para páginas HTML             |




**3. Anotaciones: indican qué hace cada clase**




Las anotaciones son etiquetas especiales que se colocan encima de clases, funciones o atributos para decirle a Spring cómo debe comportarse con ese código. Las anotaciones son, por tanto, la forma en la que Spring entiende la aplicación. Spring tiene muchísimas anotaciones, porque es un framework muy grande y sirve para muchos tipos de proyectos (web MVC, microservicios, seguridad, batch, mensajería, etc.).

En nuestro caso, como vamos a trabajar únicamente con Spring Boot, API REST, vistas HTML y JPA, no es necesario aprender todas las anotaciones que ofrece Spring. Basta con conocer un conjunto reducido de anotaciones básicas, suficientes para desarrollar un backend completo y funcional.

En la siguiente tabla se recogen las anotaciones más importantes que utilizaremos a lo largo del tema (para API REST/vistas HTML + JPA). A medida que avancemos, irán apareciendo otras anotaciones adicionales que se introducirán solo cuando sean necesarias para la aplicación.

**Anotaciones de arranque de la app**

| Anotación                | Dónde se usa           | Para qué sirve                          |
| ------------------------ | ---------------------- | --------------------------------------- |
| @SpringBootApplication | Clase principal        | Marca la clase de arranque de la aplicación Spring Boot y activa la auto-configuración y el escaneo de componentes |

**Anotaciones API REST**

| Anotación          | Dónde se usa | Para qué sirve |
| ------------------ |--------------|----------------|
| @RestController    | Clase            | Indica que la clase es un controlador REST y que los métodos devuelven directamente datos (normalmente JSON). |
| @RequestMapping    | Clase o método   | Define la ruta base o una ruta concreta para acceder a un recurso                    |
| @GetMapping        | Método           | Atiende peticiones HTTP **GET** (lectura de datos)                                   |
| @PostMapping       | Método           | Atiende peticiones HTTP **POST** (creación de datos)                                 |
| @PutMapping        | Método           | Atiende peticiones HTTP **PUT** (actualización de datos)                             |
| @DeleteMapping     | Método           | Atiende peticiones HTTP **DELETE** (eliminación de datos)                            |
| @RequestBody       | Parámetro        | Permite recibir datos enviados en el cuerpo de la petición (JSON)                    |
| @PathVariable      | Parámetro        | Permite recoger valores de la URL (por ejemplo, un identificador)                    |


**Anotaciones MVC (vistas)**

| Anotación        | Dónde se usa | Para qué sirve |
| ---------------- |--------------|----------------|
| @Controller      | Clase        | Marca una clase como controlador MVC tradicional, devolviendo vistas (HTML con Thymeleaf)       |


**Anotaciones de lógica de negocio**

| Anotación       | Dónde se usa | Para qué sirve |
| --------------- |--------------|----------------|
| @Service        | Clase            | Marca una clase como servicio, donde se implementa la lógica de negocio                  |
| @Autowired      | Atributo o constructor | Inyecta automáticamente una dependencia gestionada por Spring                      |


**Anotaciones JPA / Base de datos**

| Anotación       | Dónde se usa | Para qué sirve |
| --------------- |--------------|----------------|
| @Entity         | Clase        | Indica que la clase representa una tabla de la base de datos |
| @Table          | Clase        | Define el nombre de la tabla asociada a la entidad  |
| @Id             | Atributo     | Marca el atributo como clave primaria        |
| @GeneratedValue | Atributo     | Indica que el valor de la clave primaria se genera automáticamente |
| @Column         | Atributo     | Configura una columna de la tabla (nombre, restricciones, unicidad, etc.) |
| @OneToMany      | Atributo     | Define una relación uno-a-muchos entre entidades   |
| @ManyToOne      | Atributo     | Define una relación muchos-a-uno entre entidades    |
| @JoinColumn     | Atributo     | Especifica la columna usada como clave foránea en una relación |



**Anotaciones de acceso a datos**

| Anotación   | Dónde se usa | Para qué sirve |
| ----------- |--------------|----------------|
| @Repository | Clase o interfaz | Indica que la clase o interfaz se encarga del acceso a datos y de la gestión de excepciones de base de datos |




| Categoría               | Anotación                | Dónde se usa           | Para qué sirve                                                                   |
| ----------------------- | ------------------------ | ---------------------- | -------------------------------------------------------------------------------- |
| Arranque de la app   | `@SpringBootApplication` | Clase principal        | Marca la clase de arranque de la aplicación Spring Boot y activa la auto-configuración y el escaneo de componentes. |
| API REST             | `@RestController`        | Clase                  | Indica que la clase es un controlador REST y que los métodos devuelven directamente datos (normalmente JSON). |
|                         | `@RequestMapping`        | Clase o método         | Define la ruta base o una ruta concreta para acceder a un recurso.               |
|                         | `@GetMapping`            | Método                 | Atiende peticiones HTTP **GET** (lectura de datos).                              |
|                         | `@PostMapping`           | Método                 | Atiende peticiones HTTP **POST** (creación de datos).                            |
|                         | `@PutMapping`            | Método                 | Atiende peticiones HTTP **PUT** (actualización de datos).                        |
|                         | `@DeleteMapping`         | Método                 | Atiende peticiones HTTP **DELETE** (eliminación de datos).                       |
|                         | `@RequestBody`           | Parámetro              | Permite recibir datos enviados en el cuerpo de la petición (JSON).               |
|                         | `@PathVariable`          | Parámetro              | Permite recoger valores de la URL (por ejemplo, un identificador).               |
| MVC (vistas)        | `@Controller`            | Clase                  | Marca una clase como controlador MVC tradicional, devolviendo vistas (HTML con Thymeleaf). |
| Lógica de negocio    | `@Service`               | Clase                  | Marca una clase como servicio, donde se implementa la lógica de negocio.         |
|                         | `@Autowired`             | Atributo o constructor | Inyecta automáticamente una dependencia gestionada por Spring.                   |
| JPA / Base de datos | `@Entity`                | Clase                  | Indica que la clase representa una tabla de la base de datos.     |
|                         | `@Table`                 | Clase                  | Define el nombre de la tabla asociada a la entidad.      |
|                         | `@Id`                    | Atributo               | Marca el atributo como clave primaria.        |
|                         | `@GeneratedValue`        | Atributo               | Indica que el valor de la clave primaria se genera automáticamente |
|                         | `@Column`                | Atributo               | Configura una columna de la tabla (nombre, restricciones, unicidad, etc.).       |
|                         | `@OneToMany`             | Atributo               | Define una relación uno-a-muchos entre entidades.    |
|                         | `@ManyToOne`             | Atributo               | Define una relación muchos-a-uno entre entidades.      |
|                         | `@JoinColumn`            | Atributo               | Especifica la columna usada como clave foránea en una relación.   |
| Acceso a datos      | `@Repository`            | Clase o interfaz       | Indica que la clase o interfaz se encarga del acceso a datos y de la gestión de excepciones de base de datos. |


<!--
| Anotación       | Descripción               |
|-----------------|---------------------------|
| @Controller     | muestra páginas           |
| @RestController | devuelve JSON             |
| @Service        | lógica de negocio         |
| @Repository     | acceso a datos            |
| @Entity         | tabla de la base de datos |

-->

## 4.2. Spring Boot

**Spring** es el framework completo y **Spring Boot** es la forma fácil y moderna de usar Spring. Se enfoca en simplificar y acelerar el desarrollo de aplicaciones web ya que:

- Configura todo automáticamente.

- Trae un servidor web incorporado (permite crear aplicaciones que se ejecutan de forma independiente sin necesidad de un servidor web externo).

- Evita escribir XML.

- Permite arrancar una app con un botón.

- Usa starters (dependencias ya preparadas).

- Permite crear proyectos en segundos.


**Pasos para crear una aplicación con Spring Boot**

**1. Crear el proyecto Maven/Gradle y descargar las dependencias necesarias** 
Para ello hay dos opciones:

- Crear un proyecto Spring Boot utilizando la herramienta Spring Initializr (https://start.spring.io/) la cual genera un proyecto base con la estructura de una aplicación Spring Boot en un archivo .zip que podemos abrir directamente desde un IDE.

- Crear un proyecto Spring Boot utilizando un IDE que tenga instalados los plugins necesarios. En el caso de IntelliJ solamente es posible utilizar el plugin de Spring en la versión Ultimate.

**2. Desarrollar la aplicación**

**3. Desplegar la aplicación en un servidor**


**Spring Boot** nace con la intención de simplificar los pasos 1 y 3 y que nos podamos centrar en el desarrollo de nuestra aplicación. Eso lo hace a través de los archivos siguientes:

- **applicantion.properties** que será donde configuraremos aspectos tales como las conexiones a base de datos o el puerto por donde acceder a nuestra aplicación por ejemplo. 

- **pom.xml** en el que podemos ver todas las dependencias.


<span class="mis_ejemplos">Ejemplo 1: Aplicación que saluda al usuario a través del navegador web</span>

Vamos a crear la aplicación paso a paso para poder explicar cada concepto.

**PASO 1: Crear el proyecto**

Para ello accedemos a Spring Initializr, indicamos el nombre de la aplicación y añadimos la dependencia **Spring Web** que:

- Se utiliza para desarrollar aplicaciones web, ya sea basadas en REST o tradicionales con HTML dinámico.   

- Incluye un servidor web embebido (por defecto, Tomcat) para ejecutar la aplicación sin necesidad de configurarlo manualmente.   

- Facilita el manejo de rutas HTTP (GET, POST, PUT, DELETE, etc.) y parámetros de solicitud a través de métodos en los controladores.  

- Usa la biblioteca Jackson (incluida por defecto) para convertir automáticamente objetos Kotlin/Java a JSON y viceversa.  

- Ofrece herramientas para manejar errores y excepciones de forma global mediante @ControllerAdvice o controladores personalizados.

![Spring 1](img/spring/spring01.jpg)


**PASO 2: Abrir el proyecto y ejecutarlo**

Abrimos el proyecto con IntelliJ. Vemos que, además de los archivos **applicantion.properties** y **pom.xml** se ha creado automaticamente la clase **SaludoApplication** (con la anotación **@SpringBootApplication**) y la función de extensión **runApplication** que sirve para lanzar la aplicación.

![Spring 2](img/spring/spring02.jpg)

Al ejecutar la aplicación veremos por Consola la salida de los mensajes de registro de Spring.

![Spring 3](img/spring/spring03.jpg)

!!!Note ""
    Si el puerto 8080 está ocupado aparecerá un mensaje diciento que no se puede iniciar el servidor Tomcat. Puedes cambiar el puerto, por ejemplo al 8888, añadiendo la sigueinte línea en el archivo `application.properties` (que se encuentra en la carpeta resources del proyecto):
    ```
    server.port=8888
    ```


**PASO 3: Añadir el código para saludar**

Añadimos el código necesario para que nuestra aplicación envíe un saludo directamente a la clase principal (SaludoApplication). En este caso es el método sayHello() con todas las anotaciones e importaciones necesarias:

```kotlin
@SpringBootApplication
@RestController
class SaludoApplication{
    @GetMapping("/hello")
    fun sayHello(
        @RequestParam(value = "myName", defaultValue = "World") name: String): String
    {
        return "Hello $name!"
    }
}
```

* **@RestController**: se utiliza para que Spring reconozca la clase como un controlador que maneja solicitudes HTTP. Combina:
    * @Controller: Define la clase como un controlador web.
    * @ResponseBody: Indica que los métodos devolverán directamente el cuerpo de la respuesta (en este caso, texto plano en lugar de una vista HTML).

* **@GetMapping("/hello")**: Es una anotación de Spring que indica que este método debe manejar las solicitudes HTTP GET que lleguen a la URL /hello.
    * Enlaza la URL /hello con el método sayHello.
    * Cada vez que se acceda a la ruta http://localhost:8080/hello (asumiendo el puerto predeterminado 8080) en un navegador con un método GET, Spring ejecutará el método `sayHello`.

* **@RequestParam**: se usa para extraer un parámetro de la consulta (query parameter) enviado en la URL.
    * El método espera un parámetro de consulta llamado `myName`.
    * Si el cliente no incluye myName en la solicitud, el valor predeterminado será "World", gracias a defaultValue = "World".

**PASO 4: Volvemos a ejecutar la aplicación**

Ejecutamos la aplicación para levantar el servidor Tomacat y abrimos la dirección [http://localhost:8080/hello](http://localhost:8080/hello) en el navegador web. La aplicación responde con Hello World!

![Spring 4](img/spring/spring04.jpg)


La aplicación también admite un parámetro, si abrimos 
[http://localhost:8080/hello?myName=Atenea](http://localhost:8080/hello?myName=Atenea) el navegador muestra la siguiente respuesta:

![Spring 5](img/spring/spring05.jpg)


**PASO 5: Entender el funcionamiento**

Spring Boot está configurado para servir automáticamente cualquier archivo colocado en:

- static/

- public/

- resources/

- META-INF/resources/


Esto significa que al poner un archivo estático ahí:

- el servidor embebido (Tomcat) lo devuelve tal cual.

- no pasa por ningún controlador.

- no necesita anotaciones.

- no tienes que hacer un @GetMapping.  


Los pasos que sigue la ejecución de la aplicación son los siguientes:

- **Inicio de la aplicación:** Se ejecuta el método main, lo que inicia un servidor web embebido (por defecto, `Tomcat`) en el puerto 8080.

- **Solicitudes HTTP:**  En nuestro caso la aplicación solamente está disponible en `/hello` y cuando un cliente envía una `solicitud GET` a [http://localhost:8080/hello](http://localhost:8080/hello) (con o sin el parámetro `myName`), el método `sayHello` maneja la solicitud. [http://localhost:8080](http://localhost:8080) dará error porque no hay ningún recurso raíz definido.

- **Respuesta:**  La aplicación devuelve un mensaje personalizado en texto plano según el parámetro `myName`.



**PASO 6: Añadir una página de inicio HTML** 

Creamos el archivo `index.html` en `/src/main/resources/static/` y sustituimos su contenido por:

```html
<!DOCTYPE HTML>
<html>
<head>
    <title>Saludo</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>
<a href="/hello">Link a saludar</a>

<form action="/hello" method="GET" id="nameForm">
    <div>
        <label for="nameField">Indica tu nombre</label>
        <input name="myName" id="nameField">
        <button>Saludar</button>
    </div>
</form>
</body>
</html>
```

Ahora la aplicación ya se ejecutará en [http://localhost:8080/](http://localhost:8080/) y servirá index.html como recurso raíz.


![Spring 6](img/spring/spring06.jpg)



!!! success "Prueba y analiza el ejemplo 1"
    1. Crea tu primer proyecto Stpring Boot.
    2. Prueba el código del ejemplo, verifica que funciona correctamente y pregunta tus dudas.







<!--

<span class="mi_h3">Proyecto</span>





```
    {
        "id_planta": 301,
        "nombre": "Rosa silvestre",
        "tipo": "Arbust",
        "jardinero": {
            "nombre": "Eli",
            "apellidos": "Martínez Serra",
            "anyo_nacimiento": 1985
        },
        "localitzacio": "Jardí Mediterrani"
    },
  
```

!!! warning "Práctica 2: Amplía tu JSON"
    1. Amplía el JSON de la práctica anterior para que contenga información estructurada como la del ejemplo anterior (utilizando uno de los dos ejemplos).
    2. Valida el archivo utilizando [https://jsonlint.com](https://jsonlint.com)



!!! warning "Práctica 3: Instala MongoDB"
    Instala MongoDB en tu ordenador siguiendo la guía [Instalación y administración de MongoDB](mongo.html).


<span class="mis_ejemplos">Ejemplo 2: Crear BD, insertar plantas y mostrarlas</span>



!!! success "Prueba y analiza el ejemplo 2"
    Prueba el código de ejemplo y verifica que funciona correctamente.

!!! warning "Práctica 4: Crea tu BD, inserta y muestra información"
    2. Abre la terminal (`mongosh`) y crea tu BD.
    3. Crea una colección e inserta tres documentos con los campos que quieras.
    4. Muestra todas las bases de datos y las colecciones creadas.



    <span class="mi_consola">**** Listado de plantas: <br>
    [1] Aloe (Aloe vera): 30 cm <br>
    [2] Pino (Pinus sylvestris): 330 cm <br>
    [3] Cactus (Cactaceae): 120 cm </span>


!!!Note ""
    **Operadores comunes**:  
    `$eq` (igual), `$ne` (distinto), `$gt` (mayor que), `$lt` (menor que), `$gte` (mayor o igual), `$lte` (menor o igual), `$in`, `$and`, `$or`.



-->

---

<span class="mi_h3">Autoría</span>

Obra realizada por Begoña Paterna Lluch basada en materiales desarrollados por Alicia Salvador Contreras. Publicada bajo licencia [Creative Commons Atribución/Reconocimiento-CompartirIgual 4.0 Internacional](https://creativecommons.org/licenses/by-sa/4.0/)

---
