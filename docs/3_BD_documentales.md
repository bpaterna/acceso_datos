# Unidad 3. Acceso a Bases de Datos documentales

<span class="mi_h3">Revisiones</span>

| Revisión | Fecha      | Descripción                             |
| -------- | ---------- | --------------------------------------- |
| 1.0      | 31-10-2025 | Adaptación de los materiales a markdown |

## 3.1. Introducción

Las bases de datos documentales nativas (como MongoDB, Redis o Firebase) almacenan información en forma de documentos, usualmente codificados en JSON, BSON o XML, en lugar de filas y columnas como en las bases de datos relacionales.

Cada documento puede tener una estructura diferente, lo que permite mayor flexibilidad y agilidad en el desarrollo.

Sin embargo, si el dominio de la aplicación tiene muchas relaciones fuertes entre entidades y se necesita garantizar una integridad referencial estricta, una base de datos relacional puede ser más adecuada.

**Ventajas**

| Ventaja                                | Descripción                                                                                                           |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Flexibilidad del esquema               | No es necesario definir un esquema fijo antes de insertar datos. Ideal para estructuras dinámicas.                    |
| Escalabilidad horizontal               | Se adaptan bien al escalado distribuyendo los datos en múltiples servidores (sharding).                               |
| Rendimiento en lectura y escritura     | Muy eficiente en operaciones de lectura y escritura sobre documentos completos.                                       |
| Modelo cercano a objetos               | Almacenan los datos de manera similar a como se manejan en el código (objetos serializados como JSON).                |
| Facilidad de integración con APIs REST | Los documentos JSON pueden ser enviados y recibidos fácilmente a través de APIs.                                      |
| Ideal para datos semiestructurados     | Útiles para trabajar con datos que no se ajustan a una estructura tabular, como respuestas de formularios, logs, etc. |

**Inconvenientes**

| Inconveniente                                       | Descripción                                                                                                                                              |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Falta de integridad referencial                     | No hay claves foráneas como en las bases de datos relacionales, lo que puede causar inconsistencias si no se gestiona adecuadamente desde la aplicación. |
| Redundancia de datos                                | Se repite información entre documentos al no haber normalización; esto puede generar más uso de espacio.                                                 |
| Curva de aprendizaje                                | Requiere aprender nuevos conceptos como agregaciones, operadores específicos y estructuras de documentos.                                                |
| Menor soporte para transacciones complejas          | Aunque existen transacciones en algunas bases (como MongoDB), su uso es más limitado que en sistemas relacionales.                                       |
| Consultas menos optimizadas en relaciones complejas | No es la mejor opción cuando los datos necesitan muchas relaciones y joins complejos.                                                                    |

**Estructuras básicas de almacenamiento de información**

| Concepto          | Equivalente en BD relacional | Descripción                                         |
| ----------------- | ---------------------------- | --------------------------------------------------- |
| **Base de datos** | Base de datos                | Conjunto de colecciones.                            |
| **Colección**     | Tabla                        | Agrupación de documentos relacionados.              |
| **Documento**     | Fila (registro)              | Unidad básica de almacenamiento. Es un objeto JSON. |
| **Campo**         | Columna                      | Atributo dentro del documento.                      |

## 3.2. JSON

**JSON** (JavaScript Object Notation) es un formato de texto ligero utilizado para almacenar e intercambiar información estructurada entre aplicaciones. Aunque su sintaxis proviene de JavaScript, hoy en día es independiente del lenguaje y se usa ampliamente en entornos como Kotlin, Java, Python, Node.js, bases de datos NoSQL, APIs REST, etc.

Un fichero JSON está compuesto por **pares clave–valor**, donde:

- Las **claves** siempre van entre comillas dobles " ".

- Los **valores** pueden ser:
  
  - Cadenas de texto ("texto")
  - Números (42)
  - Booleanos (true o false)
  - Objetos (otro conjunto de pares clave-valor { ... })
  - Arrays o listas ([ ... ])
  - Valor nulo (null)

**Ejemplos de estructuras JSON**

**Objeto simple**: Representa un único elemento con propiedades básicas.

    {
    "nombre": "Pol",
    "edad": 21,
    "ciudad": "Barcelona"
    }

**Objeto con array**(lista de valores): Incluye un campo que contiene una lista.

    {
    "nombre": "Pol",
    "aficiones": ["libros", "cine", "música"]
    }

**Objeto con otro objeto anidado**: Un campo puede contener a su vez otro objeto JSON.

    {
    "nombre": "Pol",
    "edad": 21,
    "direccion": {
        "calle": "Mayor",
        "ciudad": "Castellón",
        "codigo_postal": 12001
    }
    }

**Array de objetos**: Cuando necesitamos almacenar varios elementos similares (por ejemplo, una lista de productos o alumnos).

    {
    "alumnos": [
        { "nombre": "Pol", "nota": 7.6 },
        { "nombre": "Eli", "nota": 8.2 },
        { "nombre": "Mar", "nota": 9.8 }
    ]
    }

**Combinación compleja (objetos + arrays + anidamientos)**: Para representar datos estructurados, como los de una tienda online.

    {
    "pedido": {
        "id": 101,
        "fecha": "2025-10-11",
        "cliente": {
        "nombre": "Pol Casas",
        "email": "p.casas@dominio.com"
        },
        "productos": [
        { "nombre": "Ensalada de piña", "precio": 10.50, "cantidad": 1 },
        { "nombre": "Tarta de manzana", "precio": 3.50, "cantidad": 1 }
        ],
        "total": 14.00
    }
    }

**Array de objetos principales**: También se puede usar un array como estructura raíz, por ejemplo, para representar varios registros en un mismo fichero:

    [
        { "nombre": "Pol", "edad": 21 },
        { "nombre": "Eli", "edad": 22 },
        { "nombre": "Mar", "edad": 18 }
    ]


!!! warning "Práctica 1: Crea y valida tu JSON"
    1. Crea un fichero `datos.json` con la información con la que estás trabajando.
    2. Asegúrate de incluir diferentes tipos de datos (texto, número, booleano, array y objeto anidado).
    3. Valida el archivo utilizando [https://jsonlint.com](https://jsonlint.com)



## 3.3. MongoDB

<span class="mi_h3">Introducción</span>

MongoDB es un sistema de gestión de bases de datos NoSQL **orientado a documentos**. A diferencia de las bases de datos relacionales, que almacenan la información en tablas con filas y columnas, MongoDB guarda los datos en **colecciones** formadas por documentos en formato **BSON** (una representación binaria de JSON).

En **MongoDB** cada documento es una **estructura flexible**, parecida a un objeto de programación, donde los datos se organizan en pares **clave–valor**. Esta flexibilidad permite que cada **documento** tenga una estructura diferente, lo que hace que MongoDB se adapte fácilmente a los cambios en los datos sin necesidad de modificar esquemas.


<span class="mis_ejemplos">Ejemplo 1: Plantas y jardineros</span>

A continuación tenemos información sobre algunas **plantas** y los **jardineros** que las cuidan. Dependiendo de cómo se deba acceder a la información, se pueden guardar las plantas con sus jardineros, o los jardineros con las plantas que cuidan.

De la primera manera podríamos tener una colección llamada **Plantas**. Observa cómo los objetos no tienen por qué tener la misma estructura y, en este caso, la forma de acceder al nombre de un jardinero sería la siguiente: **objeto.jardinero.nombre**:

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
    {
        "id_planta": 302,
        "nombre": "Ficus lyrata",
        "tipo": "Planta de interior",
        "jardinero": {
            "nombre": "Pol",
            "apellidos": "Ribas Colomer",
            "pais": "Espanya"
        },
        "altura": 150,
        "riego_semanal": 2
    }
```

De la segunda manera tendríamos la colección **Jardineros** donde la información estaría organizasa por jardineros y cada uno de ellos tendría un array con las plantas que cuida (los corchetes: [ ]):

```
    {
        "id_jardinero": 401,
        "nombre": "Eli",
        "apellidos": "Martínez Serra",
        "anyo_nacimiento": 1985,
        "plantas": [
            {
                "nombre": "Rosa silvestre",
                "tipo": "Arbust",
                "ubicacion": "Jardí Mediterrani"
            },
            {
                "nombre": "Lavanda officinalis",
                "ubicacion": "Parterre aromàtic"
            }
        ]
    },
    {
        "id_jardinero": 402,
        "nombre": "Pol",
        "apellidos": "Ribas Colomer",
        "pais": "España",
        "plantas": [
            {
                "nombre": "Ficus lyrata",
                "tipo": "Planta d’interior",
                "altura": 150,
                "riego_semanal": 2
            }
        ]
    }
```

!!! warning "Práctica 2: Amplía tu JSON"
    1. Amplía el JSON de la práctica anterior para que contenga información estructurada como la del ejemplo anterior (utilizando uno de los dos ejemplos).
    2. Valida el archivo utilizando [https://jsonlint.com](https://jsonlint.com)


<span class="mi_h3">Trabajar con MongoDB</span>

MongoDB utiliza su propia **shell interactiva**, llamada **`mongosh`**, que permite ejecutar comandos para administrar bases de datos, colecciones y documentos. Su sintaxis es **muy similar a JavaScript**, ya que cada comando se ejecuta sobre un **objeto base**:

    db.coleccion.operacion()

- db → representa la base de datos actual.
- coleccion → el nombre de la colección sobre la que actuamos.
- operacion() → el comando que deseamos ejecutar.


En cualquier operación, debemos escribir db seguido del nombre de la colección y después la operación a realizar. Para guardar un documento ejecutamos el siguiente comando:

    db.ejemplo.insertOne({ msg: "Hola, ¿qué tal?" })

Obtendremos una respuesta indicando que se ha insertado un documento en la **colección ejemplo** (si no existía, la creará automáticamente):

        {
        acknowledged: true,
        insertedId: ObjectId('68ff6004ab24a06f35cebea4')
        }

Y con el siguiente comando recuperamos la información:

    db.ejemplo.find()

Lo que nos devolverá algo como:

    { "_id" : ObjectId("56cc1acd73b559230de8f71b"), "msg" : "Hola, ¿qué tal?" }

Todo esto se realiza en la misma terminal, y cada uno de nosotros obtendrá un número diferente en el campo **ObjectId**. En la siguiente imagen pueden verse las dos operaciones.

![Imagen 6](img/mongo/mongo06.png)


<span class="mi_h3">Información útil del entorno</span>

| Comando                | Descripción                                                                    |
| ---------------------- | ------------------------------------------------------------------------------ |
| `db.stats()`           | Muestra estadísticas sobre la base de datos.<br>**Ejemplo:** `db.stats()`      |
| `db.coleccion.stats()` | Muestra estadísticas sobre una colección.<br>**Ejemplo:** `db.alumnos.stats()` |
| `db.version()`         | Devuelve la versión de MongoDB.<br>**Ejemplo:** `db.version()`                 |



<span class="mi_h3">Comandos sobre bases de datos</span>

| Comando             | Descripción                                        | Ejemplo             |
| ------------------- | -------------------------------------------------- | ------------------- |
| `show dbs`          | Muestra todas las bases de datos existentes.       | `show dbs`          |
| `use <nombre>`      | Cambia a una base de datos (la crea si no existe). | `use biblioteca`    |
| `db.getName()`      | Muestra el nombre de la base de datos actual.      | `db.getName()`      |
| `db.dropDatabase()` | Elimina la base de datos actual.                   | `db.dropDatabase()` |


<span class="mi_h3">Comandos sobre colecciones</span>

| Comando                                        | Descripción                                                                                     |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `show collections`                             | Lista todas las colecciones de la base de datos.<br>**Ejemplo:** `show collections`             |
| `db.createCollection("nombre")`                | Crea una colección vacía.<br>**Ejemplo:** `db.createCollection("alumnos")`                      |
| `db.coleccion.drop()`                          | Elimina una colección completa.<br>**Ejemplo:** `db.alumnos.drop()`                             |
| `db.coleccion.renameCollection("nuevoNombre")` | Cambia el nombre de una colección.<br>**Ejemplo:** `db.alumnos.renameCollection("estudiantes")` |



!!! warning "Práctica 3: Instala MongoDB"
    Instala MongoDB en tu ordenador siguiendo la guía [Instalación y administración de MongoDB](mongo.html).


<span class="mis_ejemplos">Ejemplo 2: Crear BD, insertar plantas y mostrarlas</span>

El siguiente ejemplo crea una base de datos llamada `florabotanica`. Crea una colección llamada `plantas` e inserta tres documentos con campos: `nombre_comun`, `nombre_cientifico`, `altura`. Por último muestra todas las bases de datos y las colecciones creadas.

```js
// Abrir mongosh
mongosh

// Crear/usar la base de datos
use florabotanica

// Insertar documentos (si la colección no existe, se crea automáticamente)
db.plantas.insertMany([
  { nombre_comun: "Aloe", nombre_cientifico: "Aloe vera", altura: 30 },
  { nombre_comun: "Pino", nombre_cientifico: "Pinus sylvestris", altura: 330 },
  { nombre_comun: "Cactus", nombre_cientifico: "Cactaceae", altura: 120 }
])

// Comprobar bases de datos y colecciones
show dbs
show collections
```

El ejemplo funciona de la siguiente manera:

- `use florabotanica` cambia el contexto
- `insertMany` inserta varios documentos
- `show dbs` no mostrará `florabotanica` hasta que la colección tenga datos persistidos;
- tras insertar, aparecerá en la lista


**Salida esperada:**

```text
{ acknowledged: true, insertedIds: { '0': ObjectId("..."), '1': ObjectId("..."), '2': ObjectId("...") } }

> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
florabotanica 0.001GB

> show collections
plantas
```

!!! success "Prueba y analiza el ejemplo 2"
    Prueba el código de ejemplo y verifica que funciona correctamente.

!!! warning "Práctica 4: Crea tu BD, inserta y muestra información"
    2. Abre la terminal (`mongosh`) y crea tu BD.
    3. Crea una colección e inserta tres documentos con los campos que quieras.
    4. Muestra todas las bases de datos y las colecciones creadas.


Una vez comprendido el manejo desde terminal, trabajaremos con kotlin a través del *driver oficial de MongoDB para Kotlin*. Para ello crearemos un nuevo proyecto en IntelliJ con Gradle.

<span class="mis_ejemplos">Ejemplo 3: Conexión y lectura de información en Kotlin</span>

El siguiente ejemplo añade la dependencia del driver de MongoDB, conecta a la BD `florabotanica` y muestra los documentos de la colección `plantas`.

**1. Añadir dependencia al fichero `build.gradle.kts`**

```kotlin
    implementation("org.mongodb:mongodb-driver-sync:4.11.0")
```

**2. Conectar a la BD y leer la información**

```kotlin
import com.mongodb.client.MongoClients
import org.bson.Document

fun main() {
    val cliente = MongoClients.create("mongodb://localhost:27017")
    val db = cliente.getDatabase("florabotanica")
    val coleccion = db.getCollection("plantas")

    // Mostrar documentos
    val cursor = collection.find().iterator()
    cursor.use {
        while (it.hasNext()) {
            val doc = it.next()
            println(doc.toJson())
        }
    }
    
    //insertar documento
    //val doc = org.bson.Document("nombre_comun", "Aloe").append("altura", 35)
    //coleccion.insertOne(doc)

    //for (p in coleccion.find()) {
    //    println(p)
    //}

    client.close()
}
```

**Salida esperada:** impresión en consola de cada documento JSON almacenado en `plantas`.

**Notas:** si aparecen excepciones de conexión, comprobar que el servidor MongoDB local está en marcha (`sudo systemctl start mongod` o equivalente en Windows/Mac).

!!! success "Prueba y analiza el ejemplo 3"
    Prueba el código de ejemplo y verifica que funciona correctamente.

!!! warning "Práctica 5: Trabaja con tu BD"
    1. Crea un proyecto Kotlin en IntelliJ IDEA.
    2. Añade la dependencia del driver de MongoDB (`org.mongodb:mongodb-driver-sync`).
    3. Conéctate a tu base de datos y muestra los documentos de tu colección.


<span class="mi_h3">Operaciones básicas</span>

**Inserción** (Si la colección no existe, MongoDB la **creará automáticamente** en el momento de la inserción)

| Comando        | Descripción                                                                                                                      |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `insertOne()`  | Inserta un solo documento.<br>**Ejemplo:** `db.alumnos.insertOne({nombre:"Ana", nota:8})`                                        |
| `insertMany()` | Inserta varios documentos a la vez.<br>**Ejemplo:** `db.alumnos.insertMany([{nombre:"Luis", nota:7}, {nombre:"Marta", nota:9}])` |

**Búsqueda**

| Comando                      | Descripción                                                                                                          |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `find()`                     | Devuelve todos los documentos de la colección.<br>**Ejemplo:** `db.alumnos.find()`                                   |
| `findOne()`                  | Devuelve el primer documento que cumple una condición.<br>**Ejemplo:** `db.alumnos.findOne({nombre:"Ana"})`          |
| `find(criterio, proyección)` | Permite filtrar y mostrar solo algunos campos.<br>**Ejemplo:** `db.alumnos.find({nota:{$gte:8}}, {nombre:1, _id:0})` |

!!!Note ""
    **Operadores comunes**:  
    `$eq` (igual), `$ne` (distinto), `$gt` (mayor que), `$lt` (menor que), `$gte` (mayor o igual), `$lte` (menor o igual), `$in`, `$and`, `$or`.

**Actualización** (Usa `$set` para modificar solo algunos campos y **no perder el resto**)

| Comando                        | Descripción                                                                                                                               |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `updateOne(filtro, cambios)`   | Actualiza el primer documento que cumpla la condición.<br>**Ejemplo:** `db.alumnos.updateOne({nombre:"Ana"}, {$set:{nota:9}})`            |
| `updateMany(filtro, cambios)`  | Actualiza todos los documentos que cumplan la condición.<br>**Ejemplo:** `db.alumnos.updateMany({nota:{$lt:5}}, {$set:{aprobado:false}})` |
| `replaceOne(filtro, nuevoDoc)` | Sustituye el documento completo.<br>**Ejemplo:** `db.alumnos.replaceOne({nombre:"Ana"}, {nombre:"Ana", nota:10})`                         |

**Eliminación**

| Comando        | Descripción                                                                                                    |
| -------------- | -------------------------------------------------------------------------------------------------------------- |
| `deleteOne()`  | Elimina el primer documento que cumpla la condición.<br>**Ejemplo:** `db.alumnos.deleteOne({nombre:"Luis"})`   |
| `deleteMany()` | Elimina todos los documentos que cumplan la condición.<br>**Ejemplo:** `db.alumnos.deleteMany({nota:{$lt:5}})` |


<span class="mis_ejemplos">Ejemplo 4: Operaciones CRUD en terminal. Trabajando con la colección `plantas`</span>

El siguiente ejemplo realiza las siguientes operaciones sobre la colección `plantas`:
1. Inserta tres nuevos documentos con `insertMany()`.
2. Recupera todos los documentos con `find()`.
3. Filtra aquellos cuya `altura` sea mayor de 100.
4. Actualiza uno de los documentos cambiando la altura.
5. Elimina una planta específica mediante `deleteOne()`.


```js
// 1) Insertar tres nuevos documentos
db.plantas.insertMany([
  { nombre_comun: "Lavanda", nombre_cientifico: "Lavandula", altura: 50, tipo: "arbusto" },
  { nombre_comun: "Rosal", nombre_cientifico: "Rosa", altura: 120, tipo: "arbusto" },
  { nombre_comun: "Olivo", nombre_cientifico: "Olea europaea", altura: 800, tipo: "árbol" }
])

// 2) Recuperar todos los documentos
db.plantas.find().pretty()

// 3) Filtrar altura > 100
db.plantas.find({ altura: { $gt: 100 } }).pretty()

// 4) Actualizar: cambiar altura de "Cactus" a 130
db.plantas.updateOne({ nombre_comun: "Cactus" }, { $set: { altura: 130 } })

// 5) Eliminar una planta por nombre
db.plantas.deleteOne({ nombre_comun: "Rosal" })
```

El ejemplo funciona de la siguiente manera:

- `insertMany` devuelve `acknowledged: true` con `insertedIds`.
- `find().pretty()` muestra documentos en JSON formateado.
- `find({ altura: { $gt: 100 }})` listará pinos, olivos, etc.
- `updateOne` devuelve un objeto con `matchedCount` y `modifiedCount`.
- `deleteOne` devuelve `deletedCount: 1` si eliminó un documento.

**Salida de `updateOne`:**

```text
{ acknowledged: true, matchedCount: 1, modifiedCount: 1, upsertedId: null }
```

**Salida de `deleteOne`:**

```text
{ acknowledged: true, deletedCount: 1 }
```


!!! success "Prueba y analiza el ejemplo 4"
    Prueba el código de ejemplo y verifica que funciona correctamente.


!!! warning "Práctica 6: Trabaja con tu BD"
    1. Inserta tres nuevos documentos con `insertMany()`.
    2. Recupera todos los documentos con `find()`.
    3. Aplica algún filtro.
    4. Actualiza uno de los documentos cambiando un atributo.
    5. Elimina un documento específico mediante `deleteOne()`.


<span class="mis_ejemplos">Ejemplo 5: Operaciones CRUD desde Kotlin. Trabajando con la colección `plantas`</span>

El siguiente ejemplo conecta a la BD `florabotanica`y realiza las siguientes operaciones:
    1. Insertar un nuevo documento a partir de los datos introducidos por el usuario.
    2. Listar todas las plantas existentes.
    3. Actualizar la altura de una planta dada.
    4. Eliminar una planta por nombre.

```kotlin
import com.mongodb.client.MongoClients
import com.mongodb.client.model.Filters
import org.bson.Document
import java.util.Scanner

fun main() {
    val client = MongoClients.create("mongodb://localhost:27017")
    val db = client.getDatabase("florabotanica")
    val col = db.getCollection("plantas")

    val scanner = Scanner(System.`in`)
    println("1) Insertar  2) Listar  3) Actualizar  4) Eliminar")
    when (scanner.nextLine().trim()) {
        "1" -> {
            print("Nombre común: ")
            val nombre = scanner.nextLine()
            print("Altura: ")
            val altura = scanner.nextLine().toIntOrNull() ?: 0
            val doc = Document("nombre_comun", nombre).append("altura", altura)
            col.insertOne(doc)
            println("Insertado: ${doc.getObjectId("_id")}")
        }
        "2" -> {
            col.find().forEach { println(it.toJson()) }
        }
        "3" -> {
            print("Nombre a actualizar: ")
            val nombre = scanner.nextLine()
            print("Nueva altura: ")
            val nuevaAltura = scanner.nextLine().toIntOrNull() ?: 0
            val result = col.updateOne(Filters.eq("nombre_comun", nombre), Document("$set", Document("altura", nuevaAltura)))
            println("Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}")
        }
        "4" -> {
            print("Nombre a eliminar: ")
            val nombre = scanner.nextLine()
            val result = col.deleteOne(Filters.eq("nombre_comun", nombre))
            println("Deleted: ${result.deletedCount}")
        }
        else -> println("Opción no válida")
    }

    client.close()
}
```

**Explicación:**
- `insertOne` inserta el documento y asigna `_id` automáticamente.
- `find()` itera sobre los documentos.
- `updateOne` devuelve `UpdateResult` con `matchedCount` y `modifiedCount`.
- `deleteOne` devuelve `DeleteResult` con `deletedCount`.

**Salida esperada (ejemplo al listar):**

```text
{"_id": {"$oid": "..."}, "nombre_comun": "Aloe", "altura": 30}
```


!!! success "Prueba y analiza el ejemplo 5"
    Prueba el código de ejemplo y verifica que funciona correctamente.


!!! warning "Práctica 7: Trabaja con tu BD"
    Amplía tu proyecto con un menú para controlar las siguientes opciones:
    1. Insertar un nuevo documento a partir de los datos introducidos por el usuario.
    2. Listar todas los documentos existentes.
    3. Actualizar la informaión de un documento dad.
    4. Eliminar un documento por ID.




<span class="mi_h3">Consultas avanzadas y ordenación</span>

| Comando            | Descripción                                                                                                          |
| ------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `sort()`           | Ordena los resultados. `1` ascendente, `-1` descendente.<br>**Ejemplo:** `db.alumnos.find().sort({nota:-1})`         |
| `limit()`          | Limita el número de resultados.<br>**Ejemplo:** `db.alumnos.find().limit(3)`                                         |
| `countDocuments()` | Devuelve el número de documentos que cumplen un filtro.<br>**Ejemplo:** `db.alumnos.countDocuments({nota:{$gte:5}})` |




<span class="mi_h3">Índices</span>

| Comando                  | Descripción                                                                     |
| ------------------------ | ------------------------------------------------------------------------------- |
| `createIndex({campo:1})` | Crea un índice ascendente.<br>**Ejemplo:** `db.alumnos.createIndex({nombre:1})` |
| `getIndexes()`           | Muestra los índices existentes.<br>**Ejemplo:** `db.alumnos.getIndexes()`       |
| `dropIndex("nombre_1")`  | Elimina un índice.<br>**Ejemplo:** `db.alumnos.dropIndex("nombre_1")`           |



<span class="mi_h3">Consultas avanzadas con `aggregate()`</span>

El método **`aggregate()`** permite realizar **consultas complejas** y **procesamientos de datos** en varias etapas, similares a las funciones de **GROUP BY, JOIN o HAVING** en SQL. Cada etapa del *pipeline* (tubería) transforma los datos paso a paso. Cada etapa (stage) se representa mediante un objeto precedido por $, que indica la operación a realizar.

**Estructura básica**

    db.coleccion.aggregate([
    { <etapa1> },
    { <etapa2> },
    ...
    ])

| Etapa      | Descripción                                                                                                                                                                      |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `$match`   | Filtra documentos (equivalente a `WHERE`).<br>**Ejemplo:** `{ $match: { ciudad: "Valencia" } }`                                                                                  |
| `$project` | Selecciona campos específicos o crea nuevos.<br>**Ejemplo:** `{ $project: { _id:0, nombre:1, nota:1 } }`                                                                         |
| `$sort`    | Ordena los resultados.<br>**Ejemplo:** `{ $sort: { nota: -1 } }`                                                                                                                 |
| `$limit`   | Limita el número de resultados.<br>**Ejemplo:** `{ $limit: 5 }`                                                                                                                  |
| `$skip`    | Omite un número de documentos.<br>**Ejemplo:** `{ $skip: 10 }`                                                                                                                   |
| `$group`   | Agrupa los documentos por un campo y calcula valores agregados (como `COUNT`, `SUM`, `AVG`).<br>**Ejemplo:** `{ $group: { _id: "$curso", media: { $avg: "$nota" } } }`           |
| `$count`   | Devuelve el número total de documentos resultantes.<br>**Ejemplo:** `{ $count: "total" }`                                                                                        |
| `$lookup`  | Realiza una unión entre colecciones (similar a `JOIN`).<br>**Ejemplo:** `{ $lookup: { from: "profesores", localField: "idProfesor", foreignField: "_id", as: "infoProfesor" } }` |
| `$unwind`  | Descompone arrays en múltiples documentos.<br>**Ejemplo:** `{ $unwind: "$aficiones" }`                                                                                           |



<span class="mis_ejemplos">Ejemplo 6: Consultas avanzadas y agregaciones</span>

El siguiente ejemplo realiza lo siguiente:
1. Usa `aggregate()` para calcular la altura media de las plantas.
2. Agrupa por tipo de planta con `$group` y ordena los resultados.
3. Limita la salida a los tres resultados más altos con `$limit`.


```js
// Calcular altura media de todas las plantas
db.plantas.aggregate([
  { $group: { _id: null, alturaMedia: { $avg: "$altura" } } }
])

// Agrupar por tipo y calcular media, ordenar descendente
db.plantas.aggregate([
  { $match: { tipo: { $exists: true } } },
  { $group: { _id: "$tipo", mediaAltura: { $avg: "$altura" }, cantidad: { $sum: 1 } } },
  { $sort: { mediaAltura: -1 } }
])

// Obtener los 3 más altos
db.plantas.aggregate([
  { $sort: { altura: -1 } },
  { $limit: 3 },
  { $project: { _id:0, nombre_comun:1, altura:1 } }
])
```

**Salida esperada:**

```json
// Resultado del primer aggregate
{ "_id" : null, "alturaMedia" : 250.25 }

// Resultado del group
{ "_id" : "árbol", "mediaAltura" : 540, "cantidad" : 1 }

// Resultado del limit
{ "nombre_comun" : "Olivo", "altura" : 800 }
{ "nombre_comun" : "Pino", "altura" : 330 }
{ "nombre_comun" : "Cactus", "altura" : 130 }
```


!!! success "Prueba y analiza el ejemplo 6"
    Prueba el código de ejemplo y verifica que funciona correctamente.


!!! warning "Práctica 8: Trabaja sobre tu BD"
    1. Usa `aggregate()` para realizar algún cálculo.
    2. Agrupa por tipo o categoría utilizando `$group` y ordena los resultados.
    3. Limita la salida a los tres resultados más altos con `$limit`.


<span class="mis_ejemplos">Ejemplo 7: Consultas avanzadas en Kotlin</span>

El siguiente ejemplo conecta a la BD `florabotanica`y realiza las siguientes operaciones:
1. Implementa consultas utilizando filtros con `Filters.eq`, `Filters.gt`, etc.
2. Muestra solo los nombres de las plantas con `Projections.include`.
3. Realiza una agregación que calcule la media de alturas.


```kotlin
import com.mongodb.client.MongoClients
import com.mongodb.client.model.Filters
import com.mongodb.client.model.Projections
import org.bson.Document

fun main() {
    val client = MongoClients.create("mongodb://localhost:27017")
    val col = client.getDatabase("florabotanica").getCollection("plantas")

    // 1) Filtro: altura > 100
    col.find(Filters.gt("altura", 100)).forEach { println(it.toJson()) }

    // 2) Proyección: solo nombre_comun
    col.find().projection(Projections.include("nombre_comun")).forEach { println(it.toJson()) }

    // 3) Agregación: media de altura
    val pipeline = listOf(
        Document("$group", Document("_id", null).append("alturaMedia", Document("$avg", "$altura")))
    )
    val aggCursor = col.aggregate(pipeline).iterator()
    aggCursor.use {
        while (it.hasNext()) println(it.next().toJson())
    }

    client.close()
}
```

**Salida esperada de agregación:**
```json
{ "_id" : null, "alturaMedia" : 250.25 }
```


!!! success "Prueba y analiza el ejemplo 7"
    Prueba el código de ejemplo y verifica que funciona correctamente.


!!! warning "Práctica 9: Trabaja con tu BD"
    1. Implementa consultas utilizando filtros con `Filters.eq`, `Filters.gt`, etc.
    2. Muestra solo algunos datos con `Projections.include`.
    3. Realiza una agregación que realice algún cálculo sobre tus datos.





!!! danger "Entrega 1"
    Entrega en Aules la carpeta `main/kotlin` de tu proyecto comprimida en formato `.zip`.

    **IMPORTANTE**: El documento se debe entregar utilizando la plantilla de entrega de trabajos.


<span class="mi_h3">Resumen</span>

| Categoría         | Comandos clave                                                                        |
| ----------------- | ------------------------------------------------------------------------------------- |
| **Base de datos** | `show dbs`, `use`, `db.getName()`, `db.dropDatabase()`                                |
| **Colecciones**   | `show collections`, `db.createCollection()`, `db.coleccion.drop()`                    |
| **Inserción**     | `db.coleccion.insertOne()`, `db.coleccion.insertMany()`                               |
| **Consulta**      | `db.coleccion.find()`, `db.coleccion.findOne()`, `.sort()`, `.limit()`                |
| **Actualización** | `db.coleccion.updateOne()`, `db.coleccion.updateMany()`, `$set`                       |
| **Eliminación**   | `db.coleccion.deleteOne()`, `db.coleccion.deleteMany()`                               |
| **Índices**       | `db.coleccion.createIndex()`, `db.coleccion.getIndexes()`, `db.coleccion.dropIndex()` |
| **Estadísticas**  | `db.stats()`, `db.coleccion.stats()`, `db.version()`                                  |


<span class="mi_h3">Errores comunes y cómo resolverlos</span>

**1) Error: `Error opening socket` / `Unable to connect`**
- **Causa:** el servidor MongoDB no está en ejecución o la URI es incorrecta.
- **Solución:** arrancar el servicio (`sudo systemctl start mongod` en Linux) o comprobar `mongod` en Windows (servicios) y verificar la URI `mongodb://localhost:27017`.

**2) `Authentication failed`**
- **Causa:** autenticación habilitada y credenciales no proporcionadas.
- **Solución:** crear un usuario en `admin` con `db.createUser()` o usar una URI con usuario/contraseña: `mongodb://user:pwd@localhost:27017`.

**3) `NamespaceNotFound` / colección no encontrada**
- **Causa:** la colección no existe (no se creó o no tiene documentos).
- **Solución:** insertar un documento o crear la colección explícitamente con `db.createCollection("plantas")`.

**4) `BSONTypeError` o problemas de tipo al recuperar datos**
- **Causa:** tipos inconsistentes (por ejemplo, altura a veces string, a veces número).
- **Solución:** normalizar datos o validar antes de insertar; usar `$convert` en agregaciones o transformar en la app.

**5) Problemas con dependencias en Kotlin**
- **Causa:** dependencia no encontrada o versión incompatible.
- **Solución:** comprobar `build.gradle(.kts)` y usar `mavenCentral()`; actualizar la versión del driver.

**6) `No primary found` en replicación o clúster**
- **Causa:** intentando escribir en un conjunto de réplicas sin primario.
- **Solución:** comprobar estado del replicaset (`rs.status()`) o arrancar una instancia standalone para prácticas locales.









## 3.4. Firebase



<!--


En construcción

!!! success "Prueba y analiza el ejemplo 5"
    Prueba el código de ejemplo y verifica que funciona correctamente.

!!! warning "Práctica 5: Amplía tu proyecto"
    Incluye .

!!! danger "Entrega 2"
    Entrega en Aules la carpeta `main/kotlin` de tu proyecto comprimida en formato .zip

    **IMPORTANTE**: El proyecto no debe contener código que no se utilice, ni restos de pruebas de los ejemplos y no debe estar separado por prácticas. Debe ser un proyecto totalmente funcional.


-->


---

<span class="mi_h3">Autoría</span>

Obra realizada por Begoña Paterna Lluch basada en materiales desarrollados por Alicia Salvador Contreras. Publicada bajo licencia [Creative Commons Atribución/Reconocimiento-CompartirIgual 4.0 Internacional](https://creativecommons.org/licenses/by-sa/4.0/)