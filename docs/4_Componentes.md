# Unidad 4. Componentes (Spring Framework)

<span class="mi_h3">Revisiones</span>

| Revisión | Fecha      | Descripción                                          |
|----------|------------|------------------------------------------------------|
| 1.0      | 30-12-2025 | Adaptación de los materiales a markdown              |

## 4.1. Introducción

Spring es un framework de código abierto para crear aplicaciones en Java o Kotlin de forma más fácil, rápida y ordenada.
Facilita el trabajo de crear objetos, conectar clases, preparar la base de datos, configurar servidores.
Spring se basa principalmente en dos ideas fundamentales:

- Inversión de Control (IoC): Spring se encarga de crear y gestionar los objetos de tu aplicación.

- Inyección de Dependencias (DI): Spring coloca los objetos donde hacen falta automáticamente.


Además de IoC y DI, Spring se basa en tres pilares prácticos:

**1. Anotaciones: indican qué hace cada clase**

| Anotación       | Descripción               |
|-----------------|---------------------------|
| @Controller     | muestra páginas           |
| @RestController | devuelve JSON             |
| @Service        | lógica de negocio         |
| @Repository     | acceso a datos            |
| @Entity         | tabla de la base de datos |


**2. Autoconfiguración (Spring Boot): prepara el proyecto por ti**
- servidor web
- conexión a BD
- estructura de proyecto
- dependencias necesarias

**3. Starters: paquetes listos para usar según lo que quieras hacer**

| Starter                        | Descripción                   |
|--------------------------------|-------------------------------|
| spring-boot-starter-web        | para rutas y controladores    |
| spring-boot-starter-data-jpa   | para BD y CRUD                |
| spring-boot-starter-thymeleaf  | para páginas HTML             |


Los componentes principales de Spring Framework son:


| Componente      | Descripción                                                                             |
|-----------------|-----------------------------------------------------------------------------------------|
| Spring Core     | El núcleo del framework, encargado de la inyección de dependencias                      |
| Spring MVC      | Permite el desarrollo de aplicaciones web utilizando el patrón Modelo-Vista-Controlador |
| Spring Boot     | Facilita la creación de aplicaciones basadas en Spring con una configuración mínima     |
| Spring Data     | Simplifica el acceso a datos con soporte para JPA, MongoDB, Redis, entre otros          |
| Spring Security | Proporciona herramientas para implementar seguridad en aplicaciones                     |
| Spring Cloud    | Ayuda en la construcción de aplicaciones distribuidas y microservicios                  |







## 4.2. Anotaciones

Las anotaciones son etiquetas especiales que se colocan encima de clases, funciones o atributos para decirle a Spring cómo debe comportarse con ese código.  
Las anotaciones son, por tanto, la forma en la que Spring entiende la aplicación.

Spring tiene muchísimas anotaciones, porque es un framework muy grande y sirve para muchos tipos de proyectos (web MVC, microservicios, seguridad, batch, mensajería, etc.).

En nuestro caso, como vamos a trabajar únicamente con Spring Boot, API REST, vistas HTML y JPA, no es necesario aprender todas las anotaciones que ofrece Spring.

Basta con conocer un conjunto reducido de anotaciones básicas, suficientes para desarrollar un backend completo y funcional.

En la siguiente tabla se recogen las anotaciones más importantes que utilizaremos a lo largo del tema. A medida que avancemos, irán apareciendo otras anotaciones adicionales que se introducirán solo cuando sean necesarias para la aplicación.

**Tabla de anotaciones básicas en Spring (para API REST/vistas HTML + JPA)**

| Categoría               | Anotación                | Dónde se usa           | Para qué sirve                                                                                                      |
| ----------------------- | ------------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Arranque de la app   | `@SpringBootApplication` | Clase principal        | Marca la clase de arranque de la aplicación Spring Boot y activa la auto-configuración y el escaneo de componentes. |
| API REST             | `@RestController`        | Clase                  | Indica que la clase es un controlador REST y que los métodos devuelven directamente datos (normalmente JSON).       |
|                         | `@RequestMapping`        | Clase o método         | Define la ruta base o una ruta concreta para acceder a un recurso.                                                  |
|                         | `@GetMapping`            | Método                 | Atiende peticiones HTTP **GET** (lectura de datos).                                                                 |
|                         | `@PostMapping`           | Método                 | Atiende peticiones HTTP **POST** (creación de datos).                                                               |
|                         | `@PutMapping`            | Método                 | Atiende peticiones HTTP **PUT** (actualización de datos).                                                           |
|                         | `@DeleteMapping`         | Método                 | Atiende peticiones HTTP **DELETE** (eliminación de datos).                                                          |
|                         | `@RequestBody`           | Parámetro              | Permite recibir datos enviados en el cuerpo de la petición (JSON).                                                  |
|                         | `@PathVariable`          | Parámetro              | Permite recoger valores de la URL (por ejemplo, un identificador).                                                  |
| MVC (vistas)        | `@Controller`            | Clase                  | Marca una clase como controlador MVC tradicional, devolviendo vistas (HTML con Thymeleaf).                          |
| Lógica de negocio    | `@Service`               | Clase                  | Marca una clase como servicio, donde se implementa la lógica de negocio.                                            |
|                         | `@Autowired`             | Atributo o constructor | Inyecta automáticamente una dependencia gestionada por Spring.                                                      |
| JPA / Base de datos | `@Entity`                | Clase                  | Indica que la clase representa una tabla de la base de datos.                                                       |
|                         | `@Table`                 | Clase                  | Define el nombre de la tabla asociada a la entidad.                                                                 |
|                         | `@Id`                    | Atributo               | Marca el atributo como clave primaria.                                                                              |
|                         | `@GeneratedValue`        | Atributo               | Indica que el valor de la clave primaria se genera automáticamente.                                                 |
|                         | `@Column`                | Atributo               | Configura una columna de la tabla (nombre, restricciones, unicidad, etc.).                                          |
|                         | `@OneToMany`             | Atributo               | Define una relación uno-a-muchos entre entidades.                                                                   |
|                         | `@ManyToOne`             | Atributo               | Define una relación muchos-a-uno entre entidades.                                                                   |
|                         | `@JoinColumn`            | Atributo               | Especifica la columna usada como clave foránea en una relación.                                                     |
| Acceso a datos      | `@Repository`            | Clase o interfaz       | Indica que la clase o interfaz se encarga del acceso a datos y de la gestión de excepciones de base de datos.       |





<!--



<span class="mi_h3">Introducción</span>


![Imagen 6](img/mongo/mongo06.png)



<span class="mis_ejemplos">Ejemplo 1: Plantas y jardineros</span>


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
