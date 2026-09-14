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



!!! example "Autoevaluación"
    
    **Pregunta 1: Se inicia una sesión en la herramienta interactiva `mongosh` conectada a un servidor MongoDB recién levantado en Docker y se ejecutan las siguientes instrucciones consecutivas:**
    
    ```javascript
    test> use florabotanica
    switched to db florabotanica
    
    florabotanica> show dbs
    admin          0.000GB
    config         0.000GB
    local          0.000GB
    ```
    
    **Sabiendo que el comando `use florabotanica` se ejecutó sin errores, ¿cuál es el motivo por el que la base de datos `florabotanica` no aparece en el listado devuelto por `show dbs`?**
    
    A) Se produjo un fallo silencioso porque en MongoDB es obligatorio crear previamente la base de datos mediante la instrucción formal `db.createDatabase("florabotanica")` antes de poder usarla.
    
    B) MongoDB emplea creación diferida (*lazy creation*); el comando `use` establece únicamente el contexto de trabajo en memoria, pero la base de datos no se materializa físicamente en disco ni es listada por `show dbs` hasta que contenga al menos una colección con datos persistidos.
    
    C) El comando `show dbs` está reservado exclusivamente para listar bases de datos del sistema (`admin`, `config`, `local`), requiriendo el comando `show user dbs` para visualizar bases de datos creadas por el usuario.
    
    D) El usuario conectado no dispone del rol de administrador en el catálogo del motor, por lo que el servidor oculta las bases de datos recién creadas hasta que se reinicie el contenedor Docker.
    
    ??? quote "Solución"
    
        ❌ A) MongoDB no dispone ni requiere de un comando `createDatabase`. La creación de bases de datos es completamente implícita y dinámica.
        
        ✅ B) Esta es una característica clave del comportamiento de MongoDB: la creación es diferida (*lazy*). Cambiar de contexto con `use <nombre_bd>` prepara el entorno para trabajar con ella, pero mientras no se ejecute una operación de inserción (como `insertOne` o `insertMany`) que guarde documentos y reserve espacio de almacenamiento real, la base de datos no se escribirá en disco y, por tanto, no figurará en la salida de `show dbs`.
        
        ❌ C) La instrucción `show dbs` lista todas las bases de datos existentes en el servidor que contengan datos almacenados, independientemente de si son del sistema o creadas por usuarios. El comando `show user dbs` no existe en la sintaxis de `mongosh`.
        
        ❌ D) No se trata de una restricción de privilegios ni requiere el reinicio del servidor o del contenedor. Tan pronto como se inserte un documento en cualquier colección dentro de `florabotanica`, el motor la incluirá automáticamente en la lista de `show dbs`.

    
    **Pregunta 2: Sobre una base de datos recién seleccionada donde aún no existe ninguna colección creada, se ejecutan las siguientes operaciones desde la consola `mongosh`:**
    
    ```javascript
    florabotanica> db.plantas.insertOne({ 
      id_planta: 1, 
      nombre_comun: "Aloe Vera", 
      stock: 20 
    })
    
    florabotanica> db.plantas.insertOne({ 
      id_planta: 2, 
      nombre_comun: "Lavanda", 
      es_exterior: true, 
      cuidados: { riego: "semanal", sol_directo: true } 
    })
    ```
    
    **Teniendo en cuenta los principios de funcionamiento de MongoDB y la estructura documental, ¿cuál será el resultado de ejecutar estas dos operaciones consecutivas?**
    
    A) Ambas operaciones se completarán con éxito. MongoDB creará automáticamente la colección `plantas` durante la primera inserción y, al basarse en un esquema flexible, permitirá almacenar el segundo documento con campos y tipos diferentes (incluyendo objetos anidados), asignando a cada uno un `_id` único en formato BSON.
    
    B) La primera inserción fallará arrojando un error de tipo `NamespaceNotFoundException`, ya que el motor exige instanciar la colección previamente mediante `db.createCollection("plantas")`.
    
    C) La primera inserción se completará correctamente, pero la segunda fallará por conflicto de esquema, ya que MongoDB infiere la estructura de la colección a partir del primer documento insertado y rechaza registros con atributos nuevos como `es_exterior` o `cuidados`.
    
    D) Se insertarán ambos documentos, pero el motor convertirá automáticamente la colección en un formato tabular clásico, rellenando en el primer documento los campos ausentes con valores `null` para forzar la misma estructura.
    
    ??? quote "Solución"
    
        ✅ A) En MongoDB las colecciones se crean de manera automática en el momento en que reciben su primer documento. Además, al ser una base de datos orientada a documentos sin esquema rígido (*schemaless*), cada documento de una misma colección puede poseer una estructura, campos y niveles de anidamiento totalmente distintos, siendo almacenados internamente en formato binario BSON con su respectivo identificador único `_id`.
        
        ❌ B) Aunque el comando `db.createCollection()` existe y es válido para configuraciones avanzadas (como colecciones limitadas o validaciones), no es obligatorio para el uso cotidiano; MongoDB crea la colección de forma transparente al ejecutar un `insertOne` o `insertMany`.
        
        ❌ C) A diferencia de los SGBD relacionales (SQL), las colecciones de MongoDB no imponen un esquema fijo por defecto ni bloquean la inserción de documentos con estructuras heterogéneas o tipos diferentes.
        
        ❌ D) MongoDB almacena documentos BSON independientes y no transforma los datos a una estructura tabular ni añade pares clave-valor artificiales con valor `null` en documentos existentes para homogeneizar los registros.





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



!!! example "Autoevaluación"

    **Pregunta 3: Sobre la colección `plantas`, se ejecuta la siguiente consulta para recuperar información específica de los ejemplares registrados:**
    
    ```javascript
    db.plantas.find(
        { altura: { $gt: 100 } },
        { nombre_comun: 1, tipo: 1, _id: 0 }
    )
    ```
    
    **Teniendo en cuenta el funcionamiento de los filtros y proyecciones en MongoDB, ¿cuál será el resultado exacto de esta operación?**
    
    A) Se obtendrán todos los documentos con altura mayor o igual a 100, mostrando todos sus atributos originales salvo el identificador `_id`, que se omite automáticamente al aplicar cualquier filtro.
    
    B) Se producirá un error de sintaxis en `mongosh`, ya que no está permitido proyectar campos (`nombre_comun: 1`) y al mismo tiempo excluir otros (`_id: 0`) dentro del mismo objeto de proyección.
    
    C) Se recuperarán todos los documentos cuya altura sea estrictamente superior a 100, devolviendo únicamente los campos `nombre_comun` y `tipo`, y suprimiendo explícitamente el campo `_id` (el cual MongoDB incluye por defecto salvo que se indique `_id: 0`).
    
    D) Se devolverá únicamente el primer documento que coincida con el criterio de búsqueda, transformando el formato BSON en una cadena de texto plana sin procesar en memoria.
    
    ??? quote "Solución"
    
        ❌ A) El operador `$gt` (*greater than*) realiza una comparación estricta de mayor que (excluye el valor 100). Además, MongoDB incluye siempre el campo `_id` por defecto en todas las consultas a menos que se excluya de forma explícita en la proyección.
        
        ❌ B) En las proyecciones de MongoDB no se permite mezclar inclusiones (`1`) y exclusiones (`0`), con una única excepción: el campo `_id`. Es completamente válido proyectar los campos deseados con `1` y apagar la inclusión por defecto del identificador con `_id: 0`.
        
        ✅ C) El primer parámetro `{ altura: { $gt: 100 } }` actúa como filtro de selección (WHERE), seleccionando registros con altura superior a 100. El segundo parámetro `{ nombre_comun: 1, tipo: 1, _id: 0 }` corresponde a la proyección, permitiendo delimitar qué campos viajan al cliente y forzando la exclusión del `_id`.
        
        ❌ D) El método `find()` devuelve un cursor con todos los documentos coincidentes de la colección, no únicamente el primero (para obtener uno solo se emplearía `findOne()`), y mantiene la representación como documento BSON/JSON.

    
    **Pregunta 4: En la colección `plantas` existe un documento con la siguiente estructura:**
    
    ```json
    {
      "_id": ObjectId("650c1f2b4c8a2e1d84f9a012"),
      "id_planta": 3,
      "nombre_comun": "Cactus",
      "nombre_cientifico": "Cactaceae",
      "stock": 120,
      "altura": 100
    }
    ```
    
    **Un desarrollador desea modificar únicamente la altura del ejemplar y ejecuta por error la siguiente sentencia:**
    
    ```javascript
    db.plantas.replaceOne(
        { nombre_comun: "Cactus" },
        { altura: 130 }
    )
    ```
    
    **¿Cuál será el impacto real sobre el documento almacenado en la base de datos tras la ejecución de este comando?**
    
    A) La operación fallará y cancelará los cambios, ya que toda modificación en MongoDB requiere obligatoriamente el operador `$set` para poder aplicarse.
    
    B) El documento original se sustituirá por completo: conservará únicamente su `_id` original y el nuevo campo `altura: 130`, perdiéndose definitivamente el resto de campos (`id_planta`, `nombre_comun`, `nombre_cientifico`, `stock`).
    
    C) El comando actualizará correctamente la altura a 130 y mantendrá intactos todos los demás campos, comportándose de manera idéntica a `updateOne`.
    
    D) Se creará un documento duplicado en la colección con los nuevos datos, conservando el documento original en un histórico de versiones de la base de datos.
    
    ??? quote "Solución"
    
        ❌ A) La instrucción no fallará. `replaceOne()` es un comando sintácticamente válido en MongoDB cuyo propósito explícito es reemplazar la totalidad del documento por uno nuevo.
        
        ✅ B) Este es el comportamiento característico de `replaceOne`: reemplaza el contenido entero del documento coincidente por el nuevo objeto pasado como segundo argumento, manteniendo únicamente el identificador inmutable `_id`. Para actualizar campos concretos sin perder el resto de la información, se debe utilizar `updateOne` junto con el operador `$set`.
        
        ❌ C) Para modificar solo atributos concretos y preservar los demás se utiliza `updateOne(filtro, { $set: { altura: 130 } })`. Al haber invocado `replaceOne`, los campos ausentes en el nuevo objeto desaparecen del registro.
        
        ❌ D) MongoDB no crea copias automáticas ni versiona documentos ante un reemplazo. La sustitución es destructiva sobre los campos no incluidos en el nuevo documento.

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



!!! example "Autoevaluación"

    **Pregunta 5: Para calcular indicadores globales sobre la colección `plantas`, se ejecuta la siguiente canalización de agregación (*pipeline*):**
    
    ```javascript
    db.plantas.aggregate([
        { $match: { stock: { $gt: 0 } } },
        { $group: { 
            _id: null, 
            stockTotal: { $sum: "$stock" },
            precioMedio: { $avg: "$precio" }
        }}
    ])
    ```
    
    **Al analizar esta consulta, ¿cuál es el propósito técnico de indicar `_id: null` dentro de la etapa `$group` y qué estructura devolverá?**
    
    A) Permite tratar todos los documentos filtrados como un único grupo global, aplicando los acumuladores (`$sum` y `$avg`) sobre la totalidad de la colección para devolver un único documento de resumen.
    
    B) Se producirá un error de sintaxis en el motor de MongoDB, ya que la directiva `_id` dentro de `$group` exige obligatoriamente referenciar un campo existente precedido por el símbolo `$` (por ejemplo, `_id: "$tipo"`).
    
    C) Indica al optimizador de consultas que únicamente se deben acumular aquellos documentos cuyo identificador de clave primaria `_id` tenga asignado explícitamente un valor nulo.
    
    D) Agrupa los documentos de forma independiente por cada registro devuelto por `$match`, generando tantos documentos de salida como elementos cumplan la condición de stock.
    
    ??? quote "Solución"
    
        ✅ A) En la etapa `$group`, el campo `_id` define la clave de partición por la cual se dividen los datos. Al fijarlo en `null` (o en una constante), se le indica a MongoDB que no se desea subdividir por ningún atributo, agrupando todos los documentos procesados en una única bolsa global para calcular totales y medias de toda la colección.
        
        ❌ B) Asignar `_id: null` es una convención totalmente válida y estándar en las canalizaciones de agregación cuando el objetivo es obtener agregados globales (equivalente a ejecutar un `SELECT SUM(stock), AVG(precio) FROM plantas` sin cláusula `GROUP BY` en SQL).
        
        ❌ C) El valor `_id` especificado en `$group` determina el criterio de agrupación para la salida de la etapa, no debe confundirse con un filtro sobre el atributo `_id` original de los documentos almacenados en disco.
        
        ❌ D) Si se deseara una fila de salida por cada documento individual, no se emplearía `$group` con `_id: null`, sino etapas de proyección (`$project`) o selecciones convencionales.

    
    **Pregunta 6: Se ha diseñado la siguiente consulta compleja sobre la colección `plantas` combinando múltiples etapas de agregación:**
    
    ```javascript
    db.plantas.aggregate([
        { $match: { tipo: { $exists: true } } },
        { $group: { 
            _id: "$tipo", 
            mediaAltura: { $avg: "$altura" }, 
            cantidad: { $sum: 1 } 
        }},
        { $sort: { mediaAltura: -1 } }
    ])
    ```
    
    **¿Cuál de las siguientes afirmaciones describe de forma precisa el flujo de procesamiento de esta canalización y el resultado obtenido?**
    
    A) Las etapas se procesan en paralelo de forma asíncrona, combinando al final los documentos en memoria para optimizar los tiempos de respuesta.
    
    B) La expresión `{ $sum: 1 }` actúa acumulando de forma incremental el valor numérico del campo `id_planta` de cada registro procesado en la fase de agrupamiento.
    
    C) La fase `$sort` causará un fallo de ejecución porque no es posible ordenar por `mediaAltura`, ya que las ordenaciones únicamente pueden aplicarse sobre campos físicos indexados en la colección original.
    
    D) La canalización opera secuencialmente de modo que la salida de cada etapa sirve de entrada a la siguiente: descarta documentos sin el campo `tipo`, agrupa por categoría calculando la altura media y el conteo de elementos (sumando 1 por documento), y finalmente ordena las categorías de mayor a menor altura media.
    
    ??? quote "Solución"
    
        ❌ A) El *pipeline* de agregación de MongoDB no se ejecuta en paralelo entre etapas; funciona estrictamente como una tubería secuencial (*streaming pipeline*), donde los documentos fluyen paso a paso y la salida de una fase se convierte en la entrada de la subsiguiente.
        
        ❌ B) La construcción `{ $sum: 1 }` es el mecanismo estándar en MongoDB para contar documentos dentro de un grupo (equivalente funcional al `COUNT(*)` de SQL). Por cada documento que entra al acumulador, suma el valor literal 1.
        
        ❌ C) La etapa `$sort` puede ordenar por cualquier campo presente en los documentos que recibe en ese momento, independientemente de si es un campo original de la colección o un atributo calculado dinámicamente en una etapa anterior como `$group`.
        
        ✅ D) Describe fielmente la arquitectura de una tubería de agregación: primero se realiza un filtrado previo con `$match` (evitando procesar datos incompletos), después se compactan los registros en grupos por la clave `$tipo` extrayendo agregados, y por último se ordenan de manera descendente (`-1`) según el valor calculado.


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




<span class="mi_h3">Trabajando con MongoDB desde Kotlin</span>

Una vez comprendido el manejo desde el terminal, utilizaremos el *driver oficial de MongoDB para Kotlin* para acceder a nuestra BD desde Kotlin. Para ello crearemos un nuevo proyecto en IntelliJ con Gradle, añadiremos las dependencias necesarias y gestionaremos la conexión adecuadamente para tener abierta la conexión el tiempo estrictamente necesario. A continuación veremos varios ejemplos:



<span class="mis_ejemplos">Ejemplo 4: Conexión y lectura de información</span>

El siguiente ejemplo añade la dependencia del driver de MongoDB, crea algunas constantes y funciones para organizar el código y conectar correctamente a una BD llamada `florabotanica`. Luego muestra por consola la información de cada documento JSON almacenado en la colección `plantas`. Como acabamos de comentar, queremos mantener abierta la conexión con la BD el mínimo tiempo posible, por tanto, conectaremos justo antes de leer y cerraremos justo después. A continuación tienes los fragmentos de código necesarios:

**Dependencia en el fichero `build.gradle.kts`**

```kotlin
    implementation("org.mongodb:mongodb-driver-sync:4.11.0")
```


**Imports, variables globales y constantes**

```kotlin
import com.mongodb.client.MongoClient
import com.mongodb.client.MongoClients
import com.mongodb.client.MongoCollection
import com.mongodb.client.MongoDatabase
import org.bson.Document
import java.util.Scanner


//variables globales definidas sin inicializar
lateinit var cliente: MongoClient
lateinit var db: MongoDatabase
lateinit var coleccionPlantas: MongoCollection<Document>
lateinit var coleccionFacturas: MongoCollection<Document>
lateinit var coleccionClientes: MongoCollection<Document>

//servidor y BD con la que se trabajará
const val uri = "mongodb://admin:hola01@127.0.0.1:27017/admin"
const val NOM_BD = "florabotanica"
```



**Funciones para abrir y cerrar la conexión con la BD**

```kotlin
fun conectarBD(): Boolean {
    return try {
        println("Intentando establecer conexión con $uri")
        cliente = MongoClients.create(uri)
        db = cliente.getDatabase(NOM_BD)

        // Forzamos la comprobación de la conexión enviando un "ping"
        db.runCommand(Document("ping", 1))

        coleccionPlantas = db.getCollection("plantas")
        coleccionFacturas = db.getCollection("facturas")
        coleccionClientes = db.getCollection("clientes")

        println("Servidor iniciado en $uri")
        true
    } catch (e: Exception) {
        println("Error al conectar con MongoDB: ${e.message}")
        // Opcional: si falló la conexión, puedes cerrar el cliente si se llegó a instanciar
        try { cliente?.close() } catch (_: Exception) {}
        false
    }
}

fun desconectarBD() {
    cliente.close()
    println("Conexión cerrada")
}
```


**Función para leer la información de las plantas y mostrarla por consola**

```kotlin
fun mostrarPlantas() {
    if (conectarBD()) {
        println();
        println("**** Listado de plantas:")
        coleccionPlantas.find().forEach { doc ->
            val id = doc.getInteger("id_planta")
            val nombre_comun = doc.getString("nombre_comun")
            val nombre_cientifico = doc.getString("nombre_cientifico")
            val stock = doc.getInteger("stock")
            println("[$id] $nombre_comun ($nombre_cientifico): ${stock} ud.")
        }
        desconectarBD()
    }
}
```

!!! success "Prueba y analiza el ejemplo"

    1. Crea un proyecto kotlin con `Gradle` y añade las dependencias para trabajar con MongoDB.
    2. Prueba el código de ejemplo y verifica que funciona correctamente.


!!! example "Autoevaluación"

    **Pregunta 7: En el archivo de conexión de nuestra aplicación en Kotlin, se define la siguiente función para inicializar el acceso al servidor de MongoDB:**
    
    ```kotlin
    fun conectarBD(): Boolean {
        return try {
            cliente = MongoClients.create(uri)
            db = cliente.getDatabase(NOM_BD)
            
            // Comprobación explícita de la conexión
            db.runCommand(Document("ping", 1))
            
            coleccionPlantas = db.getCollection("plantas")
            println("Conexión establecida con éxito.")
            true
        } catch (e: Exception) {
            println("Error al conectar con MongoDB: ${e.message}")
            try { cliente?.close() } catch (_: Exception) {}
            false
        }
    }
    ```
    
    **¿Cuál es el motivo técnico principal por el que se envía de forma explícita la orden `db.runCommand(Document("ping", 1))` antes de considerar establecida la conexión?**
    
    A) Es un requisito obligatorio del protocolo de red para registrar la dirección IP del cliente en la colección interna de sesiones de MongoDB.
    
    B) Sirve para que el motor asigne un identificador único a la variable global `db`, impidiendo que el recolector de basura de la máquina virtual libere el objeto en memoria.
    
    C) El método `MongoClients.create()` instancia el cliente de forma diferida sin validar la red ni las credenciales en ese instante; enviar el comando `ping` fuerza una comunicación real con el servidor, garantizando que si el servicio está apagado o los datos de acceso son incorrectos, salte de inmediato al bloque `catch`.
    
    D) Su propósito es forzar la creación física del archivo de la base de datos en el disco del servidor antes de invocar `db.getCollection()`, evitando una excepción de catálogo vacío.
    
    ??? quote "Solución"
    
        ❌ A) MongoDB no requiere registrar la IP del cliente mediante comandos de ping para mantener la sesión abierta; la gestión del canal de red se maneja de forma transparente a través de sockets TCP en el pool de conexiones.
        
        ❌ B) La retención de objetos en memoria depende exclusivamente del ciclo de vida de las variables en Kotlin (en este caso globales con `lateinit`), no de la ejecución de comandos en el servidor.
        
        ✅ C) El driver oficial de MongoDB para Java/Kotlin gestiona las conexiones mediante un grupo de conexiones (*connection pool*) de inicialización diferida (*lazy*). Las llamadas a `MongoClients.create()` y `cliente.getDatabase()` no realizan una petición de red bloqueante al instante. Ejecutar `runCommand(Document("ping", 1))` obliga a realizar un viaje de ida y vuelta (*round-trip*) contra el servidor, permitiendo detectar inmediatamente errores de red, puertos inalcanzables o fallos de autenticación dentro del bloque `try-catch`.
        
        ❌ D) Las bases de datos en MongoDB se crean implícitamente cuando se inserta el primer documento en una colección, no mediante la ejecución del comando de diagnóstico `ping`.

    
    **Pregunta 8: Para recuperar y listar los documentos de la base de datos desde Kotlin, se implementa el siguiente método en la aplicación:**
    
    ```kotlin
    fun mostrarPlantas() {
        if (conectarBD()) {
            println("**** Listado de plantas:")
            coleccionPlantas.find().forEach { doc ->
                val id = doc.getInteger("id_planta")
                val nombre = doc.getString("nombre_comun")
                val stock = doc.getInteger("stock")
                println("[$id] $nombre: $stock ud.")
            }
            desconectarBD()
        }
    }
    ```
    
    **Al analizar este fragmento, ¿qué representa el parámetro `doc` recibido en la lambda de `.forEach` y cómo se recuperan sus atributos?**
    
    A) Es un cursor de tipo `ResultSet` heredado de la especificación JDBC, por lo que requiere posicionar el puntero en la siguiente fila antes de leer cada dato mediante su índice posicional.
    
    B) Es una cadena de texto en formato JSON plano (`String`), sobre la cual los métodos de ayuda como `getInteger()` aplican internamente expresiones regulares en cada iteración para extraer el número.
    
    C) Es una instancia de una clase entidad que requiere obligatoriamente haber sido anotada previamente con `@Entity` de JPA en Kotlin para que el driver pueda deserializarla.
    
    D) Es una instancia de la clase `org.bson.Document` (que implementa `Map<String, Any>`), la cual almacena en memoria los pares clave-valor recibidos en BSON y ofrece métodos tipados de lectura como `getInteger()` o `getString()` para acceder cómodamente a cada campo.
    
    ??? quote "Solución"
    
        ❌ A) `ResultSet` es un objeto exclusivo de la API relacional JDBC (utilizado en MySQL, SQLite, PostgreSQL). En el driver oficial de MongoDB no se manejan cursores JDBC ni se accede a los campos mediante índices numéricos de columnas.
        
        ❌ B) Los documentos no se reciben como cadenas de texto sin procesar ni se parsean con expresiones regulares. El driver de MongoDB decodifica la respuesta binaria en formato BSON y la transforma directamente en una estructura de datos en memoria.
        
        ❌ C) `MongoCollection<Document>` trabaja con documentos genéricos nativos sin necesidad de configurar JPA, anotaciones de entidades ni mapeos objeto-relacional (ORM).
        
        ✅ D) En la API estándar del driver síncrono de MongoDB, la clase `Document` representa la estructura BSON en Kotlin/Java comportándose como un mapa de pares clave-valor. Incorpora métodos de conveniencia tipados (`getString()`, `getInteger()`, `getDouble()`, etc.) que realizan el *cast* correspondiente a partir de la clave indicada en el argumento.




<span class="mis_ejemplos">Ejemplo 5: Resto de operaciones CRUD</span>

El siguiente ejemplo amplía el anterior para realizar inserción, actualización y eliminación de documentos sobre la colección `plantas`de la BD `florabotanica`.


Para pedir la información por consola se declara un scanner de forma global y una función para pedir un número entero que comprueba si el dato introducido es correcto y, si no lo es, lo vuelve a pedir hasta que lo sea.

```kotlin

import java.util.Scanner

// Creamos el Scanner de forma global
val scanner = Scanner(System.`in`)


fun pedirEntero(mensaje: String): Int {
    while (true) {
        print(mensaje)
        val entrada = scanner.nextLine()
        val numero = entrada.toIntOrNull()

        if (numero != null) return numero

        println("Debes introducir un número válido.")
    }
}
```




**Funciones para insertar, actualizar y eliminar información**

```kotlin
fun insertarPlanta() {
    if (conectarBD()) {

        val id_planta = pedirEntero("ID de la planta: ")
        print("Nombre común: ")
        val nombre_comun = scanner.nextLine()
        print("Nombre científico: ")
        val nombre_cientifico = scanner.nextLine()
        val stock = pedirEntero("Stock (unidades): ")
        val doc = Document("id_planta", id_planta)
            .append("nombre_comun", nombre_comun)
            .append("nombre_cientifico", nombre_cientifico)
            .append("stock", stock)

        val resultado = coleccionPlantas.insertOne(doc)
        println("Planta insertada con _id: ${resultado.insertedId}")
        desconectarBD()
    }
}


fun actualizarStock() {
    if (conectarBD()) {

        val id_planta = pedirEntero("ID de la planta: ")
        //comprobar si existe una planta con el id_planta proporcionado por consola
        val planta = coleccionPlantas.find(Filters.eq("id_planta", id_planta)).firstOrNull()
        if (planta == null) {
            println("No se encontró ninguna planta con id_planta = \"$id_planta\".")
        } else {
            // Mostrar información de la planta encontrada
            println("Planta encontrada: ${planta.getString("nombre_comun")} (stock: ${planta.get("stock")} ud.)")

            val stock = pedirEntero("Nuevo stock: ")

            // Actualizar el documento
            val result = coleccionPlantas.updateOne(
                Filters.eq("id_planta", id_planta),
                Document("\$set", Document("stock", stock))
            )

            if (result.modifiedCount > 0)
                println("Stock actualizado correctamente (${result.modifiedCount} documento modificado).")
            else
                println("No se modificó ningún documento (quizá se ha indicado el mismo stock).")
        }
        desconectarBD()
    }
}


fun eliminarPlanta() {
    if (conectarBD()) {

        val id_planta = pedirEntero("ID de la planta: ")

        val result = coleccionPlantas.deleteOne(Filters.eq("id_planta", id_planta))
        if (result.deletedCount > 0)
            println("Planta eliminada correctamente.")
        else
            println("No se encontró ninguna planta con ese ID.")

        desconectarBD()
    }
}
```

!!! success "Prueba y analiza el ejemplo"

    1. Modifica el ejemplo anterior añadiendo un menú con una opción por cada operación.
    2. Prueba el código de ejemplo y verifica que funciona correctamente.

!!! example "Autoevaluación"

    **Pregunta 9: En la función `insertarPlanta()` de nuestra aplicación en Kotlin, se prepara e inserta un nuevo documento en la colección mediante el siguiente bloque de código:**
    
    ```kotlin
    val doc = Document("id_planta", id_planta)
        .append("nombre_comun", nombre_comun)
        .append("nombre_cientifico", nombre_cientifico)
        .append("stock", stock)

    val resultado = coleccionPlantas.insertOne(doc)
    println("Planta insertada con _id: ${resultado.insertedId}")
    ```
    
    **Al construir el objeto `Document` no se ha establecido explícitamente el campo `_id`. ¿Qué ocurrirá durante la ejecución de `insertOne()` y cómo se obtiene el valor mostrado en `resultado.insertedId`?**
    
    A) El driver de MongoDB comprueba que el documento carece de la clave `_id` y genera automáticamente un identificador único de tipo `ObjectId` antes de persistirlo, el cual queda registrado en la base de datos y disponible en la propiedad `resultado.insertedId`.
    
    B) Se producirá una excepción de tipo `MongoWriteException` al ejecutar la inserción, ya que en MongoDB es un requisito obligatorio que el desarrollador defina manualmente el valor del campo `_id` en el código.
    
    C) El motor de la base de datos renombrará internamente el atributo `id_planta` como `_id` para utilizarlo como clave primaria, eliminando el campo numérico original del documento.
    
    D) El documento se guardará sin ningún campo identificador en la colección y `resultado.insertedId` devolverá un valor nulo (`null`), a menos que se haya configurado previamente una secuencia autonumérica en el servidor.
    
    ??? quote "Solución"
    
        ✅ A) En MongoDB, todo documento requiere obligatoriamente una clave primaria denominada `_id`. Si al instanciar el objeto `Document` en Kotlin no se añade dicha clave, el driver oficial genera de forma transparente un identificador único de tipo `ObjectId` (compuesto por una marca de tiempo, identificador de máquina, proceso y contador) antes de transmitir la orden al servidor, permitiendo acceder a él inmediatamente a través de `resultado.insertedId`.
        
        ❌ B) No se produce ninguna excepción. La generación automática del campo `_id` es una de las características básicas del driver de persistencia de MongoDB cuando este se omite en la inserción.
        
        ❌ C) MongoDB no altera los nombres de los atributos proporcionados por el programador. El campo `id_planta` se guardará como un campo entero independiente conviviendo junto al nuevo campo `_id`.
        
        ❌ D) En MongoDB ningún documento puede almacenarse sin un identificador primario `_id`. Por ello, `resultado.insertedId` nunca será nulo tras una inserción completada con éxito.

    
    **Pregunta 10: En la función `actualizarStock()` se ejecuta la actualización del inventario y se comprueba el resultado de la siguiente manera:**
    
    ```kotlin
    val result = coleccionPlantas.updateOne(
        Filters.eq("id_planta", id_planta),
        Document("\$set", Document("stock", stock))
    )

    if (result.modifiedCount > 0) {
        println("Stock actualizado correctamente (${result.modifiedCount} documento modificado).")
    } else {
        println("No se modificó ningún documento (quizá se ha indicado el mismo stock).")
    }
    ```
    
    **Supongamos que el usuario busca una planta que existe en la colección con `stock: 50` y, al solicitarle el nuevo stock por consola, introduce nuevamente el valor `50`. ¿Cuál será el comportamiento del programa y el estado de las propiedades del objeto `result`?**
    
    A) Se lanzará una excepción de ejecución en el driver, dado que MongoDB considera un error de redundancia enviar una orden de actualización con valores idénticos a los existentes.
    
    B) La propiedad `result.modifiedCount` valdrá 1 porque el comando `updateOne` sobrescribe físicamente el documento en disco sin evaluar previamente si los datos cambiaron.
    
    C) La propiedad `result.matchedCount` valdrá 0 debido a que el motor ignora la coincidencia al detectar que no hay variaciones en el contenido de los campos.
    
    D) El documento será localizado con éxito por el filtro (`matchedCount == 1`), pero al comprobar el motor que el valor de `stock` ya era 50 no efectuará ninguna modificación en el registro (`modifiedCount == 0`), por lo que el programa mostrará el mensaje de la rama `else`.
    
    ??? quote "Solución"
    
        ❌ A) Enviar los mismos valores no provoca ningún fallo de red ni lanza excepciones; el servidor procesa la instrucción con total normalidad como una operación válida.
        
        ❌ B) MongoDB optimiza el uso de disco y de logs de replicación comprobando los datos antes de escribir. Si los valores indicados en `$set` coinciden exactamente con los que ya contiene el documento, no realiza la escritura y, por tanto, `modifiedCount` permanece en 0.
        
        ❌ C) `matchedCount` refleja el número de documentos que cumplen el criterio del filtro (`Filters.eq`), independientemente de si sus campos se ven modificados o no. En este caso, al encontrar la planta, `matchedCount` será igual a 1.
        
        ✅ D) El objeto devuelto por `updateOne()` distingue entre documentos encontrados (`matchedCount`) y documentos realmente alterados (`modifiedCount`). Si se introduce el mismo stock, el documento coincide con el filtro (`matchedCount == 1`), pero al no haber cambios netos en la información almacenada, `modifiedCount` es 0, derivando el flujo de ejecución hacia el bloque `else` tal como refleja la lógica del ejemplo.


<span class="mis_ejemplos">Ejemplo 6: Consultas avanzadas</span>

El siguiente ejemplo amplía los anteriores añadiendo las siguientes operaciones:

1. Implementa consultas utilizando filtros como `Filters.eq` o `Filters.gt`, en este caso, muestra las plantas cuyo stock es mayor de 100 ud.
2. Muestra solo los nombres de las plantas con `Projections.include`.
3. Realiza una agregación que calcule la media del stock.


```kotlin
import com.mongodb.client.model.Projections

fun stockMayor(){
    if (conectarBD()) {
        println("*****Plantas con stock mayor de 100 unidades")
        // 1) Filtro: stock > 100
        coleccionPlantas.find(Filters.gt("stock", 100)).forEach { println(it.toJson()) }
        desconectarBD()
    }
}


fun nombreComun(){
    if (conectarBD()) {
        println("*****Nombre común de todas las plantas")
        // 2) Proyección: solo nombre_comun
        coleccionPlantas.find().projection(Projections.include("nombre_comun")).forEach { println(it.toJson()) }
        desconectarBD()
    }
}


fun stockMedio(){
    if (conectarBD()) {
        // 3) Agregación: media de stock
        val pipeline = listOf(
            Document("\$group", Document("_id", null).append("stockMedio", Document("\$avg", "\$stock")))
        )
        val aggCursor = coleccionPlantas.aggregate(pipeline).iterator()
        aggCursor.use {
            while (it.hasNext()) println(it.next().toJson())
        }
        desconectarBD()
    }
}
```

!!! success "Prueba y analiza el ejemplo"

    1. Añade al menú del ejemplo anterior una opción por cada operación nueva.
    2. Prueba el código de ejemplo y verifica que funciona correctamente.



!!! example "Autoevaluación"

    **Pregunta 11: En la función `nombreComun()` se realiza una consulta que emplea la utilidad `Projections.include` del driver de MongoDB de la siguiente forma:**
    
    ```kotlin
    fun nombreComun() {
        if (conectarBD()) {
            println("*****Nombre común de todas las plantas")
            coleccionPlantas.find()
                .projection(Projections.include("nombre_comun"))
                .forEach { doc -> 
                    println(doc.toJson()) 
                }
            desconectarBD()
        }
    }
    ```
    
    **Al ejecutar este código, ¿cuál será la estructura exacta de cada uno de los documentos JSON impresos por consola a través de `doc.toJson()`?**
    
    A) Mostrará documentos que contienen únicamente el atributo `nombre_comun`, ya que `Projections.include()` limita de forma estricta la salida y elimina automáticamente cualquier otro campo del documento original.
    
    B) Se producirá un error de ejecución (`IllegalArgumentException`), ya que no es válido aplicar una proyección con `Projections.include()` sobre un cursor de búsqueda `find()` sin haber especificado antes un filtro de coincidencia.
    
    C) Mostrará documentos que contienen tanto el campo `nombre_comun` como el identificador `_id`, debido a que MongoDB siempre incluye por defecto la clave primaria `_id` en las proyecciones a menos que se excluya de manera explícita (por ejemplo, con `Projections.excludeId()`).
    
    D) La llamada a `doc.toJson()` devolverá una cadena vacía porque los métodos de serialización JSON del driver solo pueden invocarse sobre documentos completos que no hayan sufrido recortes por proyección.
    
    ??? quote "Solución"
    
        ❌ A) Es un error común asumir que incluir un campo excluye automáticamente todos los demás. En MongoDB, el atributo `_id` es una excepción a esta regla y viaja siempre en el documento resultante salvo orden expresa en contra.
        
        ❌ B) La sintaxis es plenamente válida. Las proyecciones pueden encadenarse sobre cualquier consulta `find()`, tenga o no parámetros de filtrado previos.
        
        ✅ C) En el modelo de consultas de MongoDB, el campo `_id` forma parte por defecto de cualquier resultado proyectado. Al indicar `Projections.include("nombre_comun")`, se activa la proyección inclusiva para ese campo, pero el motor conserva el campo `_id`. Si se deseara obtener únicamente el nombre, sería necesario combinar la inclusión con una exclusión explícita del identificador: `Projections.fields(Projections.include("nombre_comun"), Projections.excludeId())`.
        
        ❌ D) El método `.toJson()` funciona correctamente con cualquier objeto `Document` en memoria, con independencia del número de campos o transformaciones que haya sufrido durante la proyección.

    
    **Pregunta 12: Para calcular el stock medio en la función `stockMedio()`, se recurre a una canalización de agregación y al uso de un cursor iterador en Kotlin:**
    
    ```kotlin
    val pipeline = listOf(
        Document("\$group", Document("_id", null).append("stockMedio",
            Document("\$avg", "\$stock")))
    )
    val aggCursor = coleccionPlantas.aggregate(pipeline).iterator()
    aggCursor.use {
        while (it.hasNext()) println(it.next().toJson())
    }
    ```
    
    **¿Por qué se debe anteponer la barra invertida `\` en las cadenas como `"\$group"`, `"\$avg"` o `"\$stock"`, y cuál es el propósito de envolver el iterador en el bloque `.use { ... }`?**
    
    A) La barra invertida indica al servidor MongoDB que los operadores deben ejecutarse en modo concurrente, y `.use` bloquea la colección para evitar lecturas sucias durante el cómputo de la media.
    
    B) La barra invertida escapa el símbolo `$` para que el compilador de Kotlin no lo interprete como una plantilla de interpolación de variables (*string template*), mientras que `.use` garantiza que el cursor abierto en el servidor (`MongoCursor`) se cierre automáticamente al finalizar el recorrido, liberando los recursos de memoria.
    
    C) El carácter `\` es obligatorio porque el símbolo `$` es una palabra reservada en la gramática de Kotlin que no puede formar parte de ningún literal de texto, y `.use` delega la ejecución de la consulta en una corrutina en segundo plano.
    
    D) La barra `\` es un delimitador exigido por el protocolo BSON para cifrar las funciones de agregación, mientras que `.use` reactiva la conexión en caso de que la respuesta supere el tiempo de espera por defecto (*timeout*).
    
    ??? quote "Solución"
    
        ❌ A) MongoDB no utiliza barras invertidas en sus protocolos de agregación para gestionar la concurrencia, ni `.use` tiene relación alguna con bloqueos de colecciones en el gestor.
        
        ✅ B) En Kotlin, el símbolo `$` se reserva para la interpolación de expresiones dentro de cadenas (ej. `"$variable"`). Dado que los operadores y acumuladores de MongoDB comienzan obligatoriamente por `$`, si no se escapa como `"\$"`, el compilador buscará variables inexistentes (como `group` o `stock`), provocando un error de compilación (`Unresolved reference`). Por su parte, `MongoCursor` implementa la interfaz `Closeable`; invocar `.use` garantiza que el cursor se cierre automáticamente al terminar la lectura, evitando el agotamiento de cursores y recursos en el servidor de base de datos.
        
        ❌ C) El símbolo `$` puede incluirse perfectamente en cualquier cadena literal siempre que se escape mediante `\$` para anular su significado como plantilla de interpolación. Asimismo, `.use` es una función de alcance síncrona estándar de la biblioteca de Java/Kotlin para liberar recursos cerrables, no un despachador de corrutinas.
        
        ❌ D) No interviene ningún proceso de cifrado en la sintaxis de las etapas; se trata de una simple necesidad de compatibilidad sintáctica entre el lenguaje Kotlin y la nomenclatura de MongoDB.



<span class="mi_h3">Exportar / Importar la BD con Kotlin a JSON</span>

Desde Kotlin podemos exportar nuestra BD a un archivo `.json` y también podemos importar un archivo `.json` a nuestra BD. Para ello hay que añadir la siguiente dependencia en el archivo `build.gradle.kts`.

```kotlin
implementation("org.json:json:20231013")
```

Además hemos de importar las siguientes librerías:

```kotlin
import com.mongodb.client.MongoClients
import org.bson.json.JsonWriterSettings
import java.io.File

import com.mongodb.client.MongoClients
import org.bson.Document
import org.json.JSONArray
import java.io.File
```


A continuación se muestra el código que exporta una colección a un archivo `.json`.

```kotlin
fun exportarColeccion(coleccion: MongoCollection<Document>, rutaJSON: String) {
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



Como estamos pasando como parámetro la colección, hemos de conectar primero con la BD antes de llamar a la función de exportación. El código es el siguiente:


```kotlin
fun exportar(){
    if (conectarBD()) {
        exportarColeccion(coleccionPlantas,"datos/florabotanica_plantas.json")
        desconectarBD()
    }
}
```

A continuación se muestra el código que importa desde un archivo `.json` una colección a la BD

```kotlin
fun importarColeccion(rutaJSON: String, coleccion: MongoCollection<Document>) {

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
        doc.remove("_id")  // <-- eliminar _id para que Mongo genere uno nuevo
        documentos.add(doc)
    }

    if (documentos.isEmpty()) {
        println("El archivo JSON está vacío")
        return
    }


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

Como estamos pasando como parámetro la colección, hemos de conectar primero con la BD antes de llamar a la función de importación. El código es el siguiente:

```kotlin
fun importar(){
    if (conectarBD()) {
        importarColeccion("datos/florabotanica_plantas.json",coleccionPlantas)
        desconectarBD()
    }
}
```




!!! warning "Práctica 2: crea la base de tu proyecto"
    En esta práctica crearás tu aplicación para gestionar la información de tu BD con las opciones **CRUD**, es decir, **C**reate (crear), **R**ead (Leer), **U**pdate (Actualizar) y **D**elete (Borrar).

    **Realiza los siguientes pasos:**

    1. Crea un proyecto kotlin con `Gradle` y añade las dependencias para trabajar con MongoDB.
    2. Crea un menú con las opciones siguientes (sustituye el texto de las 3 últimos opciones por unos que describan su funcionalidad):

        ```text
        --------------------------------------        
        ---------- MENÚ PRINCIPAL ----------
        --------------------------------------
        1. Leer información
        2. Añadir un documento nuevo
        3. Modificar un documento existente (por ID)
        4. Eliminar un documento existente (por ID)
        5. (Operación utilizando filtros)
        6. (Consulta que muestra solo algunos datos)
        7. (Consulta de agregación que realice algún cálculo sobre tus datos)
        8. Exportar a JSON
        9. Importar de JSON
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

    - Opción **AÑADIR**: Pide el ID y comprueba se quea válido (para ser válido ha de ser un número y no existir en la colección de la BD), si no es válido lo vuelve a pedir hasta que lo sea. Después pide el resto de campos (los campos numéricos se pedirán hasta que sean válidos, es decir, ser número y ser del tipo correcto). Por último añade un documento a la colección de la BD con toda la información.
    - Opción **MODIFICAR**: Pide ID hasta que sea válido (debe ser un número entero) y comprueba si existe en la colección, si no lo encuentra informa con un mensaje y no realiza ningún cambio pero si lo encuentra muestra el nombre o algún otro campo representativo, pide alguno de los otros campos (comprobando que es correcto) y actualiza la información informando con un mensaje.
    - Opción **ELIMINAR**: Pide ID hasta que sea válido (debe ser un número entero) y comprueba si existe en la colección, si no lo encuentra informa con un mensaje pero si lo encuentra muestra el nombre o algún otro campo representativo y pide confirmación para eliminar, entonces, si se confirma el borrado se elimina el documento y en caso contrario no se elimina (en ambos casos se informa con un mensaje).
    - (Operación utilizando filtros) se realiza utilizando filtros con `Filters.eq`, `Filters.gt`, etc.
    - (Consulta que muestra solo algunos datos) se realiza utilizando `Projections.include`.
    - Las opciones de exportar e importar deben escribir / leer `.json` dentro de una carpeta llamada `datos` que deberás crear en la raíz del proyecto de IntelliJ (al mismo nivel que la carpeta `src` y que el archivo `build.gradle.kts`).


    **Aspectos técnicos:**
    
    - Se añaden las librerías necesarias en las dependencias del archivo `build.gradle.kts`.
    - Se gestionan adecuadamente las excepciones y la aplicación no se detiene inesperadamente.
    - Se controlan fallos de formato (ej. datos corruptos al parsear números) para asegurar que el programa no cae de forma inesperada si un fichero contiene errores.
    - El código es legible, con nombres descriptivos y bien organizado. Los mensajes informativos son claros.




<span class="mi_h3">Trabajando con más de una colección</span>

En este punto vamos a profundizar en la utilización de **`aggregate()`** para poder realizar **consultas complejas** y **procesamientos de datos**. Para ello utilizaremos una lista de etapas (*stages*) que MongoDB ejecutará **en orden** para transformar, combinar o procesar documentos de una colección. Esa lista la guardaremos en una **tubería de pasos** (*pipeline*), donde la salida de un paso es la entrada del siguiente.

Ya hemos visto que listar el contenido de una colección es muy fácil utilizando `find`, pero si queremos realizar consultas que obtengan datos de varias colecciones hay que realizar operaciones similares al `JOIN` de `SQL`.

Para los ejemplos siguientes añadiremos una nueva colección (`facturas`) a nuestra BD. A continuación se muestra su estructura e información inicial:

| Campo           | Tipo                        |
|-----------------|-----------------------------|
| fecha | String (formato YYYY-MM-DD) |
| id_factura      | Integer                     |
| id_planta      | Integer                     |
| precio      | Integer                     |
| cantidad      | Integer                     |


```json
[
{
"fecha": "2025-11-28",
"id_factura": 1,
"id_planta": 1,
"precio": 13,
"cantidad": 3
},
{
"fecha": "2025-11-28",
"id_factura": 1,
"id_planta": 3,
"precio": 7,
"cantidad": 2
},
{
"fecha": "2025-11-28",
"id_factura": 1,
"id_planta": 5,
"precio": 5,
"cantidad": 1
},
{
"fecha": "2025-11-28",
"id_factura": 2,
"id_planta": 2,
"precio": 35,
"cantidad": 1
},
{
"fecha": "2025-11-28",
"id_factura": 2,
"id_planta": 4,
"precio": 9,
"cantidad": 2
},
{
"fecha": "2025-11-29",
"id_factura": 3,
"id_planta": 1,
"precio": 13,
"cantidad": 1
},
{
"fecha": "2025-11-29",
"id_factura": 3,
"id_planta": 3,
"precio": 7,
"cantidad": 3
},
{
"fecha": "2025-11-29",
"id_factura": 4,
"id_planta": 2,
"precio": 35,
"cantidad": 2
},
{
"fecha": "2025-11-29",
"id_factura": 4,
"id_planta": 5,
"precio": 5,
"cantidad": 4
}
]
```



<span class="mis_ejemplos">Ejemplo 7: Mostrar listado de facturas con el nombre de la planta</span>

En este ejemplo consultamos la colección facturas, pero combinamos sus datos con la colección plantas para poder mostrar el nombre de la planta asociada a cada línea de factura:


```kotlin

fun listaFacturas(){
    if (conectarBD()) {
        val pipeline = listOf(
            Document(
                "\$lookup", Document()
                    .append("from", "plantas")
                    .append("localField", "id_planta")
                    .append("foreignField", "id_planta")
                    .append("as", "planta")
            ),
            Document("\$unwind", "\$planta")
        )

        coleccionFacturas.aggregate(pipeline).forEach { doc ->
            val idFactura = doc.getInteger("id_factura")
            val fecha = doc.getString("fecha")
            val idPlanta = doc.getInteger("id_planta")
            val cantidad = doc.getInteger("cantidad")
            val precio = doc.getInteger("precio")

            val planta = doc["planta"] as Document
            val nombreComun = planta.getString("nombre_comun")

            println("[$idFactura] ($fecha): $nombreComun (id $idPlanta) – $cantidad uds. $precio €")
        }
        desconectarBD()
    }
}
```


**Explicación del código:**

Para realizar la unión entre las dos colecciones (`facturas` y `plantas`), se define una `pipeline` con una secuencia de **dos etapas**:



Etapa 1: `$lookup` (Equivalente al `JOIN` de SQL)

Partimos de un documento original de la colección `facturas`:

```json
{
  "fecha": "2025-11-28",
  "id_factura": 1,
  "id_planta": 1,
  "precio": 13,
  "cantidad": 3
}
```

Utilizamos `$lookup` para buscar en la colección **`plantas`** todos los documentos cuyo `id_planta` (`foreignField`) coincida con el `id_planta` de nuestra factura actual (`localField`). El resultado de esa búsqueda se almacena en un nuevo campo llamado **`planta`** (`as`):

```kotlin
Document("\$lookup", Document()
    .append("from", "plantas")
    .append("localField", "id_planta")
    .append("foreignField", "id_planta")
    .append("as", "planta")
)
```

Por defecto, `$lookup` siempre genera un **array**, incluso cuando la coincidencia es de un único documento. El documento tras este paso queda así:

```json
{
  "fecha": "2025-11-28",
  "id_factura": 1,
  "id_planta": 1,
  "precio": 13,
  "cantidad": 3,
  "planta": [
    {
      "nombre_comun": "Aloe",
      "nombre_cientifico": "Aloe barbadensis miller",
      "altura": 60,
      "id_planta": 1
    }
  ]
}
```

Etapa 2: `$unwind` (concersión del array a un objeto normal)

Tener `planta` como un array con un único elemento (`[ { ... } ]`) dificulta la lectura directa de sus propiedades en Kotlin. Para convertir ese array en un objeto/documento normal utilizamos `$unwind`:

```kotlin
Document("\$unwind", "\$planta")
```

Tras pasar por `$unwind`, el campo `planta` pasa de ser una lista a ser un subdocumento plano:

```json
"planta": {
  "nombre_comun": "Aloe",
  "nombre_cientifico": "Aloe barbadensis miller",
  "altura": 60,
  "id_planta": 1
}
```


!!! success "Prueba y analiza el ejemplo"

    1. Añade a la BD florabotanica una nueva colección a partir del JSON de facturas (utiliza la función de importar explicada anteriormente).
    2. Añade al menú del ejemplo anterior una opción para mostrar el listado de facturas.
    3. Prueba el código de ejemplo y verifica que funciona correctamente.




!!! example "Autoevaluación"

    **Pregunta 13: En el archivo de operaciones de nuestra aplicación se define la siguiente etapa `$lookup` para cruzar información entre las colecciones `facturas` y `plantas`:**
    
    ```kotlin
    val etapaLookup = Document(
        "\$lookup", Document()
            .append("from", "plantas")
            .append("localField", "id_planta")
            .append("foreignField", "id_planta")
            .append("as", "planta")
    )
    ```
    
    **Al analizar esta instrucción ejecutada dentro del *pipeline* sobre `facturas`, ¿cuál es el significado de sus parámetros y qué estructura genera en el documento resultante antes de aplicar etapas posteriores?**
    
    A) Busca en la colección `plantas` (`from`) aquellos documentos cuyo `id_planta` (`foreignField`) coincida con el `id_planta` de la factura de origen (`localField`), incorporando las coincidencias en un nuevo campo denominado `planta` (`as`), el cual se crea por defecto siempre como una lista o array (`[ ... ]`), incluso si la relación produce una única coincidencia.
    
    B) Realiza una combinación interna estricta eliminando de forma física los registros de `facturas` que no coincidan, insertando el resultado como un subdocumento embebido plano en lugar de un array para ahorrar espacio.
    
    C) El parámetro `localField` hace referencia al campo identificador de la colección foránea (`plantas`), mientras que `foreignField` define el atributo de la colección base (`facturas`), volcando la combinación en una tabla temporal del servidor.
    
    D) Copia físicamente los documentos vinculados desde la colección `plantas` dentro del archivo persistente de `facturas` en el disco duro, sobrescribiendo el identificador `_id` de la factura original.
    
    ??? quote "Solución"
    
        ✅ A) En MongoDB, la etapa `$lookup` realiza una operación equivalente al `LEFT OUTER JOIN` de SQL. El parámetro `from` especifica la colección con la que se une, `localField` el campo en la colección actual (`facturas`), `foreignField` el campo en la colección de destino (`plantas`) y `as` el nombre del nuevo atributo. Por especificación del motor, `$lookup` siempre deposita el resultado de la búsqueda en un array o lista, independientemente de que se encuentre uno, varios o ningún documento coincidente.
        
        ❌ B) `$lookup` no altera ni borra documentos en disco, ni produce directamente un subdocumento plano por defecto. Si una factura no tiene coincidencia en `plantas`, el campo `planta` simplemente se genera como un array vacío `[]`.
        
        ❌ C) Los papeles de `localField` y `foreignField` están invertidos en esta opción: `localField` siempre pertenece a la colección receptora de la agregación (`facturas`), y `foreignField` a la colección remota consultada (`plantas`).
        
        ❌ D) Las agregaciones operan como consultas de lectura y transformación en memoria y streaming; en ningún caso alteran la estructura física ni sobrescriben los identificadores `_id` en el almacenamiento del servidor.

    
    **Pregunta 14: En la función `listaFacturas()`, la canalización de agregación y el posterior tratamiento de datos en Kotlin se implementan de la siguiente manera:**
    
    ```kotlin
    val pipeline = listOf(
        Document(
            "\$lookup", Document()
                .append("from", "plantas")
                .append("localField", "id_planta")
                .append("foreignField", "id_planta")
                .append("as", "planta")
        ),
        Document("\$unwind", "\$planta")
    )

    coleccionFacturas.aggregate(pipeline).forEach { doc ->
        val planta = doc["planta"] as Document
        val nombreComun = planta.getString("nombre_comun")
        // ...
    }
    ```
    
    **¿Por qué es indispensable incluir la etapa `Document("\$unwind", "\$planta")` en la canalización para que la lectura posterior en Kotlin funcione adecuadamente?**
    
    A) Porque `$unwind` es la instrucción encargada de disparar la ejecución asíncrona de la consulta; si se omite, el método `aggregate()` fallará lanzando una excepción `UnclosedCursorException`.
    
    B) Porque `$lookup` almacena el resultado como una lista (`List<Document>`), de modo que `$unwind` descompone el array extrayendo su único elemento y transformándolo en un subdocumento plano (`Document`), permitiendo realizar el *cast* directo `as Document` sin arrojar una excepción `ClassCastException`.
    
    C) Porque `$unwind` actúa como una cláusula `DISTINCT`, eliminando automáticamente del cursor las facturas que hagan referencia a una misma planta para evitar resultados duplicados en el bucle.
    
    D) Porque el compilador de Kotlin exige convertir todos los campos de tipo texto a representaciones BSON binarias antes de poder invocar métodos de acceso tipados como `getString()`.
    
    ??? quote "Solución"
    
        ❌ A) La etapa `$unwind` es un operador de transformación de documentos en la canalización, no un disparador de ejecución. La ejecución de la consulta la inicia el propio método `aggregate()` del driver.
        
        ✅ B) Dado que `$lookup` devuelve siempre una lista (un array de documentos: `planta: [ { ... } ]`), en Kotlin `doc["planta"]` es recibido como un objeto de tipo `java.util.List`. Si se intentara hacer `doc["planta"] as Document` sin `$unwind`, el programa se detendría con una excepción en tiempo de ejecución de tipo `ClassCastException` (no se puede convertir una lista a un `Document`). Al aplicar `$unwind`, el array se «desenrolla» y el atributo `planta` pasa a contener directamente el subdocumento plano (`planta: { ... }`), haciendo que el *cast* sea seguro y directo.
        
        ❌ C) `$unwind` no elimina duplicados ni filtra registros; al contrario, si un array contuviera varios elementos, duplicaría el documento padre por cada elemento del array. En este caso de relación 1 a 1, simplemente extrae el objeto del array unitario.
        
        ❌ D) La invocación de `getString()` se realiza sobre el subdocumento ya parseado; no requiere ninguna conversión manual previa a binario por parte del desarrollador.


<span class="mis_ejemplos">Ejemplo 8: Mostrar datos de una factura</span>

En este ejemplo se pide un número de factura por consola y se muestran sus datos.

```kotlin

fun mostrarFactura() {
    if (conectarBD()) {
        val idFactura = pedirEntero("ID de la factura: ")

        // Obtener la fecha de la factura y verificar que la factura indicada existe
        val facturaDoc = coleccionFacturas
            .find(Document("id_factura", idFactura))
            .first()

        if (facturaDoc == null) {
            println("No existe ninguna factura con ID $idFactura")
            return
        }

        val fecha = facturaDoc["fecha"] as String

        // Crear un pipeline de agregación para obtener las líneas de la factura con datos de la planta
        val pipeline = listOf(
            Document("\$match", Document("id_factura", idFactura)),
            Document(
                "\$lookup", Document()
                    .append("from", "plantas")
                    .append("localField", "id_planta")
                    .append("foreignField", "id_planta")
                    .append("as", "planta")
            ),
            Document("\$unwind", "\$planta"),
            Document(
                "\$project", Document()
                    .append("nombre_planta", "\$planta.nombre_comun")
                    .append("cantidad", 1)
                    .append("precio", 1)
                    .append("subtotal", Document("\$multiply", listOf("\$precio", "\$cantidad")))
            )
        )

        // Ejecutar la agregación para obtener la lista de líneas
        val lineas = coleccionFacturas.aggregate(pipeline).toList()

        if (lineas.isEmpty()) {
            println("No se encontraron líneas para la factura $idFactura")
            return
        }

        // Encabezado de la factura
        println("===============================================================")
        println("Factura ID: $idFactura")
        println("Fecha: $fecha")
        println("---------------------------------------------------------------")
        println(String.format("%-15s %-10s %-10s %-12s", "Planta", "Cantidad", "Precio", "Subtotal"))
        println("---------------------------------------------------------------")

        var totalFactura = 0.0

        // Iterar sobre las líneas de la factura
        lineas.forEach { linea ->
            val nombre = linea["nombre_planta"] as String
            val cantidad = linea["cantidad"] as Int
            val precio = linea["precio"] as Int
            val subtotal = (linea["subtotal"] as Number).toDouble()

            totalFactura += subtotal

            println(
                String.format(
                    "%-15s %-10d %-10s %-12s",
                    nombre, cantidad, precio, subtotal
                )
            )
        }

        var totalIVA = totalFactura * 0.21

        // Mostrar pie de factura con totales
        println("---------------------------------------------------------------")
        println(String.format("%-15s %-10s %-10s %-12s", "", "TOTAL:", totalFactura, ""))
        println(String.format("%-15s %-10s %-10s %-12s", "", "IVA 21%:", totalIVA, ""))
        println(String.format("%-15s %-10s %-10s %-12s", "", "TOTAL CON IVA:", totalFactura + totalIVA, ""))
        println("===============================================================")

        desconectarBD()
    }
}

```

!!! success "Prueba y analiza el ejemplo"

    1. Añade al menú del ejemplo anterior una opción para mostrar los datos de una factura.
    2. Prueba el código de ejemplo y verifica que funciona correctamente.



!!! example "Autoevaluación"

    **Pregunta 15: En el *pipeline* de agregación de la función `mostrarFactura()` se define la siguiente etapa `$project`:**
    
    ```kotlin
    Document(
        "\$project", Document()
            .append("nombre_planta", "\$planta.nombre_comun")
            .append("cantidad", 1)
            .append("precio", 1)
            .append("subtotal", Document("\$multiply", listOf("\$precio", "\$cantidad")))
    )
    ```
    
    **Al analizar esta etapa dentro de la canalización, ¿cuál es su función técnica y qué transformaciones aplica sobre los documentos de salida?**
    
    A) Modela la proyección de cada línea: extrae el nombre de la planta accediendo al subdocumento mediante la notación de punto (`"\$planta.nombre_comun"`), conserva los atributos `cantidad` y `precio` (al indicarse con `1`), y genera dinámicamente un nuevo campo `subtotal` calculando el producto de ambos valores en el servidor mediante el operador `$multiply`.
    
    B) Actualiza de forma destructiva y permanente los documentos en la colección `facturas` del disco duro, añadiendo el campo físico `subtotal` para evitar recomputarlo en futuras consultas.
    
    C) Filtra y descarta todas las líneas de factura donde el producto de `precio` por `cantidad` sea igual a 1, renombrando la colección de origen como `nombre_planta`.
    
    D) Establece una restricción de validación en tiempo de compilación que fuerza a que `precio` y `cantidad` no admitan valores nulos, lanzando un error de tipo en el cliente si alguno de los operandos no es un número decimal (`Double`).
    
    ??? quote "Solución"
    
        ✅ A) La etapa `$project` cumple una doble función: por un lado, realiza una proyección y renombrado de campos (usando la notación de punto `"$planta.nombre_comun"` para "aplanar" el acceso a propiedades del subdocumento resultante del `$unwind`), y por otro, crea campos calculados al vuelo en el servidor. El operador aritmético de agregación `$multiply` toma una lista con las referencias a los dos campos (`"$precio"` y `"$cantidad"`) y genera el atributo dinámico `subtotal` en cada documento de salida sin modificar la colección persistida.
        
        ❌ B) Las etapas dentro de `aggregate()` operan en memoria durante la ejecución de la consulta; en ningún caso alteran ni persisten modificaciones en los documentos de la colección original en disco.
        
        ❌ C) El número `1` en una etapa `$project` representa la inclusión del campo en el resultado final (equivalente a `true`), no un valor numérico de comparación o filtrado.
        
        ❌ D) `$project` es una etapa evaluada internamente en el motor de base de datos durante el tiempo de ejecución (*runtime*), no una instrucción de validación estática del compilador de Kotlin.

    
    **Pregunta 16: Durante el recorrido de las líneas de la factura devueltas por la consulta de agregación en Kotlin, el campo calculado `subtotal` se recupera mediante la siguiente instrucción:**
    
    ```kotlin
    lineas.forEach { linea ->
        val nombre = linea["nombre_planta"] as String
        val cantidad = linea["cantidad"] as Int
        val precio = linea["precio"] as Int
        val subtotal = (linea["subtotal"] as Number).toDouble()
        totalFactura += subtotal
        // ...
    }
    ```
    
    **¿Cuál es el motivo técnico por el que se realiza el casteo previo a `Number` antes de invocar `.toDouble()`, en lugar de hacer directamente `linea["subtotal"] as Double`?**
    
    A) En la jerarquía de tipos de Kotlin, la clase `Double` no hereda de `Number`, por lo que es obligatorio emplear este patrón como puente para formatear números en la consola.
    
    B) Porque el operador `$multiply` de MongoDB puede retornar el cálculo como `Integer`, `Long` o `Double` dependiendo de los tipos originales de los factores; un casteo directo `as Double` lanzaría una excepción `ClassCastException` si el resultado fuera entero, mientras que `Number` engloba a todos los tipos numéricos y permite una conversión segura con `.toDouble()`.
    
    C) Porque el driver síncrono de MongoDB serializa por defecto todos los campos resultantes de una agregación como texto plano (`String`), requiriendo que `Number` realice el parseo de los caracteres.
    
    D) Porque la función de salida `String.format` exige obligatoriamente que cualquier valor numérico sea instanciado como una referencia polimórfica estricta de `java.lang.Number`.
    
    ??? quote "Solución"
    
        ❌ A) En Kotlin y Java, `Double` sí hereda directamente de la clase abstracta `Number` (al igual que `Int`, `Long` o `Float`).
        
        ✅ B) En la base de datos, si tanto `precio` como `cantidad` son enteros (por ejemplo `13` y `3`), MongoDB calcula su producto como un valor entero (`Integer`). Si en Kotlin intentamos hacer `linea["subtotal"] as Double`, la máquina virtual arrojará un error en tiempo de ejecución: `ClassCastException: java.lang.Integer cannot be cast to java.lang.Double`. Al castear primero a la clase base común `Number` y llamar a su método polimórfico `.toDouble()`, el código se vuelve robusto y procesa con éxito tanto resultados enteros como flotantes.
        
        ❌ C) Los resultados calculados de operaciones aritméticas en MongoDB viajan como tipos numéricos nativos BSON en memoria (`BsonInt32`, `BsonInt64` o `BsonDouble`), no como cadenas de texto plano.
        
        ❌ D) `String.format` admite tipos primitivos (`Double`, `Int`, etc.) mediante *boxing* automático; el uso de `as Number` responde exclusivamente a la seguridad de tipos frente a las respuestas BSON del driver.



!!! warning "Práctica 3: finaliza tu proyecto"

    1. Añade una nueva colección a tu BD (puedes crear un archivo `.json` e importarlo directamente a tu BD desde tu aplicación).
    2. Añade al menú las operaciones CRUD de esa nueva colección. Si te es más cómodo divide el menú en varios submenús para no tener todas las opciones en un único menú.
    3. Programa dos funciones parecidas a las de los ejemplos en la que tengas que extraer información de las dos colecciones de tu BD.
    4. Recuerda ampliar las funciones de importar y exportar para tener en cuenta la nueva colección.





!!! danger "Entrega"
    Entrega en Aules un solo archivo comprimido en formato `.zip` que contenga únicamente la carpeta `src` y la carpeta `datos` (con tus colecciones exportadas a archivos `.json` dentro de ella). Tu trabajo se calificará con la siguiente tabla:

    | <span class="mi_sombreado_entrega">Bloque de evaluación</span>             | <span class="mi_sombreado_entrega">Criterios de calificación</span>          | <span class="mi_sombreado_entrega">Puntos</span>                            |
    | :------------------------- | :--------------------------------------- | :-----------------------------: |
    | **Requisitos técnicos y funcionamiento** | \- La entrega cumple el formato solicitado (un `.zip` con carpeta `src` y archivo `.json`).<br>\- La aplicación compila, es funcional y cumple con todo lo solicitado en el enunciado.<br>\- No contiene código muerto ni restos de prácticas anteriores.                 | 2,5 |
    | **Prueba escrita de autoría**            | \- Respuestas correctas a las preguntas conceptuales y técnicas sobre tu propio código.<br>\- Capacidad para explicar el flujo del programa. | 7,5 |

    
    ⚠️ Nota aclaratoria: la entrega correcta y funcional de la aplicación es un requisito indispensable para poder realizar la prueba escrita. Si no se realiza la entrega del proyecto o si éste no compila o no funciona como pide el enunciado, la calificación global de la tarea será un 0.






---
<span class="mi_h3">Autoría</span>

<span class="mi_autoria">
Obra realizada por Begoña Paterna Lluch. Publicada bajo licencia [Creative Commons Atribución/Reconocimiento-CompartirIgual 4.0 Internacional](https://creativecommons.org/licenses/by-sa/4.0/)
</span>
---