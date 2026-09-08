# RA5. Acceso a Bases de Datos documentales

!!! info "RA5"
    Desarrolla aplicaciones que gestionan la información almacenada en bases de datos documentales nativas evaluando y utilizando clases específicas.


<span class="mi_h3">Revisiones</span>

| Revisión | Fecha      | Descripción                                                   |
|----------|------------|---------------------------------------------------------------|
| 1.0      | 18-09-2026 | Adaptación de los materiales a markdown                       |
| 1.1      | 19-09-2026 | Ampliación con preguntas de autoevaluación |


## 1. Introducción

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

## 2. JSON

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


**A continuación se muestran algunos ejemplos del contenido de ficheros JSON**

**Un ejemplo con cadenas de texto:**

```json
[
  {
    "id_planta": 1,
    "nombre_comun": "Aloe Vera",
    "nombre_cientifico": "Aloe barbadensis miller",
    "stock": 7,
    "precio": 0.6
  },
  {
    "id_planta": 2,
    "nombre_comun": "Lavanda",
    "nombre_cientifico": "Lavandula angustifolia",
    "stock": 3,
    "precio": 1.0
  }
]
```

**Un ejemplo con objetos:**

A continuación tenemos información sobre algunas **plantas** y los **jardineros** que las cuidan. Dependiendo de cómo se deba acceder a la información, se pueden guardar las plantas con sus jardineros, o los jardineros con las plantas que cuidan.

De la primera manera podríamos tener una colección llamada **Plantas**. Observa cómo los objetos no tienen por qué tener la misma estructura y, en este caso, la forma de acceder al nombre de un jardinero sería la siguiente: **objeto.jardinero.nombre**:

```json
[
    {
        "id_planta": 1,
        "nombre_comun": "Aloe Vera",
        "nombre_cientifico": "Aloe barbadensis miller",
        "stock": 7,
        "precio": 0.6
        "jardinero": {
            "nombre": "Pol",
            "apellidos": "Ribas Colomer",
            "pais": "Espanya"
        },
        "localización": "Jardín Atenea"
    },
    {
        "id_planta": 2,
        "nombre_comun": "Rosa silvestre",
        "nombre_cientifico": "Aloe barbadensis miller",
        "stock": 7,
        "precio": 0.6
        "jardinero": {
            "nombre": "Eli",
            "apellidos": "Martínez Serra",
            "anyo_nacimiento": 1985
        },
        "localización": "Jardín Atenea"
    },
    {
        "id_planta": 2,
        "nombre_comun": "Lavanda",
        "nombre_cientifico": "Lavandula angustifolia",
        "stock": 3,
        "precio": 1.0
        "jardinero": {
            "nombre": "Pol",
            "apellidos": "Ribas Colomer",
            "pais": "Espanya"
        },
        "localización": "Jardín Olimpo"
    }
]
```

De la segunda manera tendríamos la colección **Jardineros** donde la información estaría organizasa por jardineros y cada uno de ellos tendría un array con las plantas que cuida (los corchetes: [ ]):

```json
[
    {
        "id_jardinero": 401,
        "nombre": "Pol",
        "apellidos": "Ribas Colomer",
        "pais": "Espanya",
        "plantas": [
            {
                "nombre": "Aloe Vera",
                "ubicacion": "Jardín Atenea"
            },
            {
                "nombre": "Lavanda",
                "ubicacion": "Jardín Olimpo"
            }
        ]
    },
    {
        "id_jardinero": 402,
        "nombre": "Eli",
        "apellidos": "Martínez Serra",
        "anyo_nacimiento": 1985,
        "plantas": [
            {
                "nombre_comun": "Rosa silvestre",
                "nombre_cientifico": "Aloe barbadensis miller",
                "stock": 7,
                "precio": 0.6,
                "ubicacion": "Jardín Atenea"
            }
        ]
    }
]
```


## 3. MongoDB

MongoDB es un sistema de gestión de bases de datos NoSQL **orientado a documentos**. A diferencia de las bases de datos relacionales, que almacenan la información en tablas con filas y columnas, MongoDB guarda los datos en **colecciones** formadas por documentos en formato **BSON** (una representación binaria de JSON).

En **MongoDB** cada documento es una **estructura flexible**, parecida a un objeto de programación, donde los datos se organizan en pares **clave–valor**. Esta flexibilidad permite que cada **documento** tenga una estructura diferente, lo que hace que MongoDB se adapte fácilmente a los cambios en los datos sin necesidad de modificar esquemas.


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

<img class="con_borde" src="img/RA5/mongo06.png" alt="mongoDB">

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



<span class="mis_ejemplos">Ejemplo 1: Crear una BD, insertar plantas y mostrarlas</span>

Para el siguiente ejemplo se parte de un servidor mongoDB ya montado sobre un contenedor llamado `mongo-srv`. El siguiente ejemplo crea una base de datos llamada `florabotanica`. Crea una colección llamada `plantas` e inserta tres documentos con campos: `nombre_comun`, `nombre_cientifico`, `altura`. Por último muestra todas las bases de datos y las colecciones creadas.

```js
// Abrir el terminal dentro del contenedor
docker exec -it mongo-srv bash

// Conectar al servidor MongoDB
mongosh "mongodb://admin:hola01@127.0.0.1:27017/admin"

// Crear y seleccionar la base de datos
use florabotanica

// Insertar documentos (si la colección no existe, se crea automáticamente)
db.plantas.insertMany([
  { id_planta: 1, nombre_comun: "Aloe", nombre_cientifico: "Aloe vera", stock: 30 },
  { id_planta: 2, nombre_comun: "Pino", nombre_cientifico: "Pinus sylvestris", stock: 50 },
  { id_planta: 3, nombre_comun: "Cactus", nombre_cientifico: "Cactaceae", stock: 120 }
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

!!! success "Prueba y analiza el ejemplo"

    1. Monta tu servidor MongoDB en docker siguiendo los pasos del documento [Docker](docker.html).
    2. Prueba los comandos del ejemplo y verifica que funciona correctamente.



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



> **Operadores comunes:** `$eq` (igual), `$ne` (distinto), `$gt` (mayor que), `$lt` (menor que), `$gte` (mayor o igual), `$lte` (menor o igual), `$in`, `$and`, `$or`.



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


<span class="mis_ejemplos">Ejemplo 2: Operaciones básicas</span>

El siguiente ejemplo realiza las siguientes operaciones sobre la colección `plantas`:

1. Inserta tres nuevos documentos con `insertMany()`.
2. Recupera todos los documentos con `find()`.
3. Filtra aquellos cuya `altura` sea mayor de 100.
4. Actualiza uno de los documentos cambiando la altura.
5. Elimina una planta específica mediante `deleteOne()`.


```js
// 1) Insertar tres nuevos documentos
db.plantas.insertMany([
  { id_planta: 4, nombre_comun: "Lavanda", nombre_cientifico: "Lavandula", altura: 50, tipo: "arbusto" },
  { id_planta: 5, nombre_comun: "Rosal", nombre_cientifico: "Rosa", altura: 120, tipo: "arbusto" },
  { id_planta: 6, nombre_comun: "Olivo", nombre_cientifico: "Olea europaea", altura: 800, tipo: "árbol" }
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

!!! success "Prueba y analiza el ejemplo"

    1. Abre el terminal dentro del contenedor.
    2. Conecta al servidor MongoDB desde el terminal
    3. Prueba los comandos del ejemplo y verifica que funciona correctamente.





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



<span class="mi_h3">Consultas complejas</span>

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



<span class="mis_ejemplos">Ejemplo 3: Consultas avanzadas y agregaciones</span>

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



!!! success "Prueba y analiza el ejemplo"

    1. Abre el terminal dentro del contenedor.
    2. Conecta al servidor MongoDB desde el terminal
    3. Prueba los comandos del ejemplo y verifica que funciona correctamente.



!!! warning "Práctica 1: Trabaja con tu BD" 
    Realiza lo siguiente:

    1. Abre el terminal dentro del contenedor.
    2. Conecta al servidor MongoDB desde el terminal.
    3. Crea tu BD.
    4. Crea una colección e inserta tres documentos con los campos que quieras.
    5. Muestra todas las bases de datos y la colección creada.
    6. Inserta tres nuevos documentos con `insertMany()`.
    7. Recupera todos los documentos con `find()`.
    8. Aplica algún filtro.
    9. Actualiza uno de los documentos cambiando el valor de un campo.
    10. Elimina un documento específico mediante `deleteOne()`.
    11. Usa `aggregate()` para realizar algún cálculo.
    12. Agrupa por tipo o categoría utilizando `$group` y ordena los resultados.
    13. Limita la salida a los tres resultados más altos con `$limit`.




<span class="mi_h3">Trabajando en kotlin con MongoDB</span>

Una vez comprendido el manejo desde terminal, trabajaremos con kotlin a través del *driver oficial de MongoDB para Kotlin*. Para ello crearemos un nuevo proyecto en IntelliJ con Gradle. Además, para los ejemplos realizados en `Kotlin` de esta unidad, se han declarado tres constantes para almacenar el servidor, el nombre de la BD y el nombre de la colección con los que vamos a trabajar. También se crea una variable Scanner de forma global para poder utilizarla en cualquier parte del programa.

```kotlin
const val NOM_SRV = "mongodb://localhost:27017"
const val NOM_BD = "florabotanica"
const val NOM_COLECCION = "plantas"

// Creamos el Scanner de forma global
val scanner = Scanner(System.`in`)
```


<span class="mis_ejemplos">Ejemplo 4: Conexión y lectura de información</span>

El siguiente ejemplo añade la dependencia del driver de MongoDB, conecta a la BD `florabotanica` y muestra por consola la información de cada documento JSON almacenado en `plantas`.

**1. Añadir dependencia al fichero `build.gradle.kts`**
```kotlin
    implementation("org.mongodb:mongodb-driver-sync:4.11.0")
```

**2. Conectar a la BD y leer la información**
```kotlin
import com.mongodb.client.MongoClients

fun mostrarPlantas() {
    val cliente = MongoClients.create(NOM_SRV)
    val db = cliente.getDatabase(NOM_BD)
    val coleccion = db.getCollection(NOM_COLECCION)

    // Mostrar documentos de la colección plantas
    val cursor = coleccion.find().iterator()
    cursor.use {
        while (it.hasNext()) {
            val doc = it.next()
            println(doc.toJson())
        }
    }

    cliente.close()
}
```

!!! success "Prueba y analiza el ejemplo"

    1. Crea un proyecto kotlin con `Gradle` y añade las dependencias para trabajar con MongoDB.
    3. Prueba el código de ejemplo y verifica que funciona correctamente.




<span class="mis_ejemplos">Ejemplo 5: Operaciones CRUD</span>

El siguiente fragmento de código realiza las siguientes operaciones sobre la colección `plantas`de la BD `florabotanica`:

1. Insertar un nuevo documento a partir de los datos introducidos por el usuario.
2. Actualizar la altura de una planta dada.
3. Eliminar una planta por nombre.

```kotlin
import com.mongodb.client.MongoClients
import com.mongodb.client.MongoDatabase
import com.mongodb.client.model.Filters
import org.bson.Document
import java.util.Scanner

fun insertarPlanta() {
    //conectar con la BD
    val cliente = MongoClients.create(NOM_SRV)
    val db = cliente.getDatabase(NOM_BD)
    val coleccion = db.getCollection(NOM_COLECCION)

    var id_planta: Int? = null
    while (id_planta == null) {
        print("ID de la planta: ")
        val entrada = scanner.nextLine()
        id_planta = entrada.toIntOrNull()
        if (id_planta == null) {
            println("El ID debe ser un número !!!")
        }
    }

    print("Nombre común: ")
    val nombre_comun = scanner.nextLine()
    print("Nombre científico: ")
    val nombre_cientifico = scanner.nextLine()

    var altura: Int? = null
    while (altura == null) {
        print("Altura (en cm): ")
        val entrada = scanner.nextLine()
        altura = entrada.toIntOrNull()
        if (altura == null) {
            println("¡¡¡ La altura debe ser un número !!!")
        }
    }

    val doc = Document("id_planta", id_planta)
        .append("nombre_comun", nombre_comun)
        .append("nombre_cientifico", nombre_cientifico)
        .append("altura", altura)

    coleccion.insertOne(doc)
    println("Planta insertada con ID: ${doc.getObjectId("_id")}")

    cliente.close()
    println("Conexión cerrada")
}


fun actualizarAltura() {
    //conectar con la BD
    val cliente = MongoClients.create(NOM_SRV)
    val db = cliente.getDatabase(NOM_BD)
    val coleccion = db.getCollection(NOM_COLECCION)

    var id_planta: Int? = null
    while (id_planta == null) {
        print("ID de la planta a actualizar: ")
        val entrada = scanner.nextLine()
        id_planta = entrada.toIntOrNull()
        if (id_planta == null) {
            println("El ID debe ser un número !!!")
        }
    }

    //comprobar si existe una planta con el id_planta proporcionado por consola
    val planta = coleccion.find(Filters.eq("id_planta", id_planta)).firstOrNull()
    if (planta == null) {
        println("No se encontró ninguna planta con id_planta = \"$id_planta\".")
    }
    else {
        // Mostrar información de la planta encontrada
        println("Planta encontrada: ${planta.getString("nombre_comun")} (altura: ${planta.get("altura")} cm)")

        //pedir nueva altura
        var altura: Int? = null
        while (altura == null) {
            print("Nueva altura (en cm): ")
            val entrada = scanner.nextLine()
            altura = entrada.toIntOrNull()
            if (altura == null) {
                println("¡¡¡ La altura debe ser un número !!!")
            }
        }

        // Actualizar el documento
        val result = coleccion.updateOne(
            Filters.eq("id_planta", id_planta),
            Document("\$set", Document("altura", altura))
        )

        if (result.modifiedCount > 0)
            println("Altura actualizada correctamente (${result.modifiedCount} documento modificado).")
        else
            println("No se modificó ningún documento (la altura quizá ya era la misma).")
    }

    cliente.close()
    println("Conexión cerrada.")
}


fun eliminarPlanta() {
    //conectar con la BD
    val cliente = MongoClients.create(NOM_SRV)
    val db = cliente.getDatabase(NOM_BD)
    val coleccion = db.getCollection(NOM_COLECCION)

    var id_planta: Int? = null
    while (id_planta == null) {
        print("ID de la planta a eliminar: ")
        val entrada = scanner.nextLine()
        id_planta = entrada.toIntOrNull()
        if (id_planta == null) {
            println("El ID debe ser un número !!!")
        }
    }

    val result = coleccion.deleteOne(Filters.eq("id_planta", id_planta))
    if (result.deletedCount > 0)
        println("Planta eliminada correctamente.")
    else
        println("No se encontró ninguna planta con ese nombre.")

    cliente.close()
    println("Conexión cerrada.")
}
```

!!! success "Prueba y analiza el ejemplo"
    Prueba el código de ejemplo y verifica que funciona correctamente.



<span class="mis_ejemplos">Ejemplo 6: Consultas avanzadas</span>

El siguiente ejemplo conecta a la BD `florabotanica`y realiza las siguientes operaciones:

1. Implementa consultas utilizando filtros con `Filters.eq`, `Filters.gt`, etc.
2. Muestra solo los nombres de las plantas con `Projections.include`.
3. Realiza una agregación que calcule la media de alturas.


```kotlin
import com.mongodb.client.model.Projections

fun variasOperaciones() {
    val client = MongoClients.create(NOM_SRV)
    val col = client.getDatabase(NOM_BD).getCollection(NOM_COLECCION)

    println("*****Plantas que miden más de 100cm")
    // 1) Filtro: altura > 100
    col.find(Filters.gt("altura", 100)).forEach { println(it.toJson()) }

    println("*****Nombre común de todas las plantas")
    // 2) Proyección: solo nombre_comun
    col.find().projection(Projections.include("nombre_comun")).forEach { println(it.toJson()) }

    println("*****Altura media de todas las plantas")
    // 3) Agregación: media de altura
    val pipeline = listOf(
        Document("\$group", Document("_id", null).append("alturaMedia", Document("\$avg", "\$altura")))
    )
    val aggCursor = col.aggregate(pipeline).iterator()
    aggCursor.use {
        while (it.hasNext()) println(it.next().toJson())
    }

    client.close()
}
```

!!! success "Prueba y analiza el ejemplo"
    Prueba el código de ejemplo y verifica que funciona correctamente.



!!! warning "Práctica 2: Trabaja con tu BD"
    En esta práctica crearás tu aplicación para gestionar la información de tu BD con las opciones **CRUD**, es decir, **C**reate (crear), **R**ead (Leer), **U**pdate (Actualizar) y **D**elete (Borrar).

    **Realiza los siguientes pasos:**

    1. Crea un proyecto kotlin con `Gradle` y añade las dependencias para trabajar con MongoDB.
    2. Crea un menú con las opciones siguientes:

        ```text
        --------------------------------------        
        ---------- MENÚ PRINCIPAL ----------
        --------------------------------------
        1. Leer información
        2. Añadir un registro nuevo
        3. Modificar un registro existente (por ID)
        4. Eliminar un registro existente (por ID)
        5. (Operación utilizando filtros)
        6. (Consulta que muestra solo algunos datos)
        7. (Consulta de agregación que realice algún cálculo sobre tus datos)
        0. Salir
        ```


    **Requisitos de funcionamiento:**

    - Opción **LEER**: Muestra por consola la información formateada para que tenga un aspecto amigable, por ejemplo:

        ```text
        **** Listado de plantas:
        [1] Aloe (Aloe vera): 30 unidades
        [2] Pino (Pinus sylvestris): 50 unidades
        [3] Cactus (Cactaceae): 120 cm
        ```

    - Opción **AÑADIR**: Pide el ID y comprueba se quea válido (para ser válido ha de ser un número y no existir en el fichero binario), si no es válido lo vuelve a pedir hasta que lo sea. Después pide el resto de campos (los campos numéricos se pedirán hasta que sean válidos, es decir, ser número y ser del tipo correcto). Por último añade un registro al final del fichero con toda la información.
    - Opción **MODIFICAR**: Pide ID hasta que sea válido (debe ser un número entero) y recorre el fichero binario para ver si existe, si no lo encuentra informa con un mensaje y no realiza ningún cambio pero si lo encuentra muestra el nombre o algún otro campo representativo, pide alguno de los otros campos (comprobando que es correcto) y actualiza la información en el fichero informando con un mensaje.
    - Opción **ELIMINAR**: Pide ID hasta que sea válido (debe ser un número entero) y recorre el fichero binario para ver si existe, si no lo encuentra informa con un mensaje pero si lo encuentra muestra el nombre o algún otro campo representativo y pide confirmación para eliminar, entonces, si se confirma el borrado se elimina el registro y en caso contrario no se elimina (en ambos casos se informa con un mensaje).
    - (Operación utilizando filtros) se realiza utilizando filtros con `Filters.eq`, `Filters.gt`, etc.
    - (Consulta que muestra solo algunos datos) se realiza utilizando `Projections.include`.


    **Aspectos técnicos:**
    
    - Se añaden las librerías necesarias en las dependencias del archivo `build.gradle.kts`.
    - Se gestionan adecuadamente las excepciones y la aplicación no se detiene inesperadamente.
    - Se controlan fallos de formato (ej. datos corruptos al parsear números) para asegurar que el programa no cae de forma inesperada si un fichero contiene errores.
    - El código es legible, con nombres descriptivos y bien organizado. Los mensajes informativos son claros.




!!! danger "Entrega final"
Entrega en Aules un solo archivo comprimido en formato `.zip` que contenga únicamente la carpeta `src` y un archivo `.json` con tu BD exportada. (Puedes consultar el apartado `Exportar / Importar la BD con Kotlin` al final de este documento). Tu trabajo se calificará con la siguiente tabla:

    | <span class="mi_sombreado_entrega">Bloque de evaluación</span>             | <span class="mi_sombreado_entrega">Criterios de calificación</span>          | <span class="mi_sombreado_entrega">Puntos</span>                            |
    | :------------------------- | :--------------------------------------- | :-----------------------------: |
    | **Requisitos técnicos y funcionamiento** | \- La entrega cumple el formato solicitado (un `.zip` con carpeta `src` y archivo `.sql`).<br>\- La aplicación compila, es funcional y cumple con todo lo solicitado en el enunciado.<br>\- No contiene código muerto ni restos de prácticas anteriores.                 | 2,5 |
    | **Prueba escrita de autoría**            | \- Respuestas correctas a las preguntas conceptuales y técnicas sobre tu propio código.<br>\- Capacidad para explicar el flujo del programa. | 7,5 |

    
    ⚠️ Nota aclaratoria: la entrega correcta y funcional de la aplicación es un requisito indispensable para poder realizar la prueba escrita. Si no se realiza la entrega del proyecto o si éste no compila o no funciona como pide el enunciado, la calificación global de la tarea será un 0.







<span class="mi_h3">Exportar / Importar la BD con Kotlin</span>

Desde Kotlin podemos exportar nuestra BD a un archivo .json y también podemos importar un archivo .json a nuestra BD. Para ello hay que añadir la siguiente dependencia en el archivo `build.gradle.kts`.

```kotlin
implementation("org.json:json:20231013")
```


A continuación se muestra el código que exporta la BD a un archivo `.json` (actualizado para tomar como parámetros la ruta del `json` y el nombre de la colección).

```kotlin
import com.mongodb.client.MongoClients
import org.bson.json.JsonWriterSettings
import java.io.File

fun exportarBD(coleccion: MongoCollection<Document>, rutaJSON: String) {
    val settings = JsonWriterSettings.builder().indent(true).build()
    val file = File(rutaJSON)
    file.printWriter().use { out ->
        out.println("[")
        val cursor = coleccion.find().iterator()
        var first = true
        while (cursor.hasNext()) {
            if (!first) out.println(",")
            val doc = cursor.next()
            out.print(doc.toJson(settings))
            first = false
        }
        out.println("]")
        cursor.close()
    }

    println("Exportación de ${coleccion.namespace.collectionName} completada")
}
```

A continuación se muestra el código que importa la BD desde un archivo `.json`(actualizado para tomar como parámetros la ruta del `json` y el nombre de la colección).

```kotlin
import com.mongodb.client.MongoClients
import org.bson.Document
import org.json.JSONArray
import java.io.File

fun importarBD(rutaJSON: String, coleccion: MongoCollection<Document>) {
    println("Iniciando importación de datos desde JSON...")

    val jsonFile = File(rutaJSON)
    if (!jsonFile.exists()) {
        println("No se encontró el archivo JSON a importar")
        return
    }

    // Leer JSON del archivo
    val jsonText = try {
        jsonFile.readText()
    } catch (e: Exception) {
        println("Error leyendo el archivo JSON: ${e.message}")
        return
    }

    val array = try {
        JSONArray(jsonText)
    } catch (e: Exception) {
        println("Error al parsear JSON: ${e.message}")
        return
    }

    // Convertir JSON a Document y eliminar _id si existe
    val documentos = mutableListOf<Document>()
    for (i in 0 until array.length()) {
        val doc = Document.parse(array.getJSONObject(i).toString())
        doc.remove("_id")  // <-- eliminar _id para que MongoDB genere uno nuevo
        documentos.add(doc)
    }

    if (documentos.isEmpty()) {
        println("El archivo JSON está vacío")
        return
    }

    val db = cliente.getDatabase(NOM_BD)

    val nombreColeccion =coleccion.namespace.collectionName

    // Borrar colección si existe
    if (db.listCollectionNames().contains(nombreColeccion)) {
        db.getCollection(nombreColeccion).drop()
        println("Colección '$nombreColeccion' eliminada antes de importar.")
    }

    // Insertar documentos
    try {
        coleccion.insertMany(documentos)
        println("Importación completada: ${documentos.size} documentos de $nombreColeccion.")
    } catch (e: Exception) {
        println("Error importando documentos: ${e.message}")
    }
}
```









---
<span class="mi_h3">Autoría</span>

<span class="mi_autoria">
Obra realizada por Begoña Paterna Lluch. Publicada bajo licencia [Creative Commons Atribución/Reconocimiento-CompartirIgual 4.0 Internacional](https://creativecommons.org/licenses/by-sa/4.0/)
</span>
---