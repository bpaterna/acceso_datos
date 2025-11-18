# Instalación y administración de MongoDB

<span class="mi_h3">Revisiones</span>

| Revisión | Fecha      | Descripción                             |
|----------|------------|-----------------------------------------|
| 1.0      | 10-11-2025 | Adaptación de los materiales a markdown |
| 1.1      | 15-11-2025 | Sección MongoDB en EC2 (AWS)            |


<span class="mi_h3">Opciones de instalación y despliegue</span>

| Opción                         | Descripción                                                                                                 | Ideal para                                         |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| **MongoDB Community Server**   | Versión gratuita que se instala localmente en Windows, Linux o macOS.                                       | Prácticas locales, entornos educativos.            |
| **MongoDB en Docker**          | Se ejecuta como contenedor con `docker-compose` o comandos `docker run`.                                    | Entornos de desarrollo rápidos y reproducibles.    |
| **MongoDB Atlas**              | Servicio en la nube oficial de MongoDB. Permite crear clústeres gratuitos o de pago, gestionados por Mongo. | Proyectos web, microservicios, despliegues reales. |
| **MongoDB Local + Atlas Sync** | Permite sincronizar datos locales con una base remota en Atlas.                                             | Aplicaciones con modo offline/online.              |

<span class="mi_h3">Herramientas de administración y visualización</span>

| Herramienta                       | Tipo            | Descripción                                                        |
| --------------------------------- | --------------- | ------------------------------------------------------------------ |
| **MongoDB Compass**               | GUI oficial     | Interfaz gráfica para consultar, insertar y analizar datos.        |
| **DBeaver**                       | GUI universal   | Permite conectarse a Mongo y a otras bases de datos (SQL y NoSQL). |
| **Robo 3T** *(antiguo Robomongo)* | GUI ligera      | Muy utilizada para tareas básicas de exploración.                  |
| **mongosh**                       | Consola oficial | Shell de comandos moderno (sustituye a `mongo`).                   |

De entre todas las opciones posibles para instalar y administrar MongoDB, utilizaremos la versión **Community** junto con **Mongo Shell (mongosh)** por su simplicidad, ligereza y adecuación a los objetivos de esta unidad.

<span class="mi_h3">Instalación del servidor (Linux)</span>

Descargamos la versión apropiada para el sistema operativo con el que se está trabajando desde la página oficial de MongoDB: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community) Para ello entramos al menú **Products → Community Edition → Community Server**. (Para la realización de estos apuntes se ha descargado la versión 8.2.1 para Ubuntu 22.04 x64 en formato .tgz)

Descomprimimos el archivo descargado (para facilitar el trabajo se puede renombrar la carpeta descomprimida a `mongodb`). Después, dentro de la carpeta `mongodb`, creamos un directorio llamado `data` y dentro de él otro llamado `db`. Por último arrancamos el servidor ejecutando en una ventana de terminal el comando:

    mongodb/bin/mongod --dbpath mongodb/data/db

Si el servidor ha arrancado correctamente, aparecerán una serie de mensajes informativos y el servidor quedará en espera de recibir peticiones del cliente:

![Imagen Linux 1](img/mongo/mongo1.png)
![Imagen Linux 2](img/mongo/mongo2.png)

!!!Note ""
    No se debe cerrar esa ventana de terminal, porque el servidor se detendría.

<span class="mi_h3">Instalación del cliente Mongo Shell (Linux)</span>

Descargamos la versión apropiada para el sistema operativo con el que se está trabajando desde la página oficial de MongoDB: [https://www.mongodb.com/try/download/shell](https://www.mongodb.com/try/download/shell) Para ello entramos al menú **Products → Tools → MongoDB Shell**. (Para la realización de estos apuntes se ha descargado la versión 2.5.9 para Linux 64 en formato .tgz)

Descomprimimos el archivo descargado (para facilitar el trabajo se ha renombrado la carpeta descomprimida a  `mongosh`) y arrancamos el cliente ejecutando en una nueva ventana de terminal el comando siguiente:

    mongosh/bin/mongosh

Aparecerá la siguiente información:

![Imagen Linux 3](img/mongo/mongo3.png)

Para comprobar el funcionamiento ejecutamos el sigueinte comando:

    show dbs

Si aparecen las bases de datos (admin, config, local), todo está funcionando correctamente, son las bases de datos del sistema. Podemos ver que al final de la pantalla aparece la palabra `test>` es porque en realidad, estamos conectados a una base de datos llamada test.

![Imagen Linux 4](img/mongo/mongo4.png)



<span class="mi_h3">Instalación del servidor (Windows)</span>

Descargamos la versión apropiada para el sistema operativo con el que se está trabajando desde la página oficial de MongoDB: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community) Para ello entramos al menú **Products → Community Edition → Community Server**. (Para la realización de estos apuntes se ha descargado la versión 8.2.1 para Windows de 64 bits en formato .msi)

Durante la instalación marcamos la opción de instalar MongoDB como servicio para que el programa se iniciará automáticamente con el sistema.

![Imagen Windows 1](img/mongo/mongoWIN1.jpg)

Durante la instalación también podemos marcar la opción de instalar **MongoDB Compass**, que es la herramienta gráfica oficial de MongoDB, la cual permite visualizar, explorar y administrar bases de datos MongoDB sin necesidad de utilizar la línea de comandos.

![Imagen Windows 2](img/mongo/mongoWIN2.jpg)

Una vez finalizada la instalación podemos arrancar el cliente y ver que nos pide que creemos uns nueva conexión:

![Imagen Windows 3](img/mongo/mongoWIN3_1.jpg)
![Imagen Windows 4](img/mongo/mongoWIN3_2.jpg)

Una vez conectados (no hace falta indicar ningún dato de conexión), veremos las bases de datos del sistema:

![Imagen Windows 5](img/mongo/mongoWIN3_3.jpg)


Si preferimos comunicarnos con el servidor por comandos, podemos instalar el cliente Mongo Shell.


<span class="mi_h3">Instalación del cliente Mongo Shell (Windows)</span>

Podermos descargarlo desde la página oficial: [https://www.mongodb.com/try/download/shell](https://www.mongodb.com/try/download/shell) Para ello entramos al menú **Products → Tools → MongoDB Shell**. (Para la realización de estos apuntes se ha descargado la versión 2.5.9 para Windows de 64 bits en formato .msi)

Escribe el siguiente comando en una ventana de terminal:

    mongosh

Si el servidor está arrancado aparecerá la siguiente información:

![Imagen Windows 6](img/mongo/mongoWIN5.jpg)

Para comprobar el funcionamiento ejecuta el siguiente comando:

    show dbs

Si aparecen las bases de datos (admin, config, local), todo está funcionando correctamente, son las bases de datos del sistema. Podemos ver que al final de la pantalla aparece la palabra `test>` es porque en realidad, estamos conectados a una base de datos llamada test.

![Imagen Windows 7](img/mongo/mongoWIN6.jpg)




<span class="mi_h3">Instalación de MongoDB en EC2 (AWS)</span>

A continuación se describen los pasos para instalar y configurar MongoDB en nuestra instancia EC2 de AWS.


<span class="mi_h4">Conectar al servidor por ssh</span>

Para conectar, abre una ventana de comandos y asegurate que el archivo .pem está en la carpeta desde la que lanzas el siguiente comando (puedes utilizar el nombre del servidor o su IP pública). Sustituye `[nombre_clave]` por el nombre del archivo de tu clave y `[nombre_IP_servidor]` por el nombre o IP de tu servidor:
```
ssh -i [nombre_clave] ubuntu@[nombre_IP_servidor]
```

!!!Note ""
    Si aparece el siguiente aviso:

    ![Imagen warning conexión](img/warning.png)
    
    Ejecuta el comando siguiente:
    ```
    chmod 400 [nombre_clave]
    ```

<span class="mi_h4">Instalar MongoDB Community Edition</span>

**1. Importar la clave pública**
```
sudo apt install -y curl gnupg

curl -fsSL https://pgp.mongodb.com/server-7.0.asc | \
 sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
```
**2. Crear una lista de verificación**
```
echo "deb [signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
 sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
```
**3. Actualizar lista de paquetes**
```
sudo apt update
```
**4. Instalar MongoDB Community Server**
```
sudo apt install -y mongodb-org
```

<span class="mi_h4">Iniciar y verificar el funcionamiento</span>

**1. Iniciar el servidor**
``` 
sudo systemctl start mongod   
```

!!!Note ""
    Si aparece un error parecido a `Failed to start mongod.service: Unit mongod.service not found`, ejecutar estos dos comandos:
    ``` 
    sudo systemctl daemon-reload
    sudo systemctl start mongod   
    ```

**2. Comprobar el estado del servidor**
```
sudo systemctl status mongod
```
**3. Configurar para que se inicie al arrancar el sistema**
``` 
sudo systemctl enable mongod    
```
**4. Parar y reiniciar**
``` 
sudo systemctl stop mongod    
sudo systemctl restart mongod
```

<span class="mi_h4">Configurar acceso remoto</span>

**1. Editar el fichero de configuración**
```
sudo nano /etc/mongod.conf
```

Busca el bloque de instrucciones siguiente:
```
# network interfaces
net:
port: 27017
bindIp: 127.0.0.1
```

Modifícalo para que quede así:
```
# network interfaces
net:
port: 27017
#bindIp: 127.0.0.1
bindIp: 0.0.0.0
```


**2. Reiniciar servicio**

Rainicia y comprueba que ha arrancado correctamente
```
sudo systemctl restart mongod
sudo systemctl status mongod
```


<span class="mi_h4">Configura el servidor para permitir tráfico entrante</span>

Añade una regla en el servidor para permitir el tráfico entrante del puerto 27017. Para ello haz clic en la pestaña Seguridad y luego en el enlace de Grupos de seguridad

![Imagen mongo AWS](img/mongo/mongoAWS2.png)

Entra en Reglas de entrada y haz clic en el botón Editar reglas de entrada

![Imagen mongo AWS](img/mongo/mongoAWS3.png)

Haz clic en Agregar regla, configura el tipo, el puerto y la IP de origen 0.0.0.0/0 para permitir acceso desde cualquier lugar y por último haz clic en el botón Guardar reglas

![Imagen mongo AWS](img/mongo/mongoAWS4.png)

En unos segundos aparecerá tu nueva regla en la lista

![Imagen mongo AWS](img/mongo/mongoAWS5.png)


<span class="mi_h4">Securizar MongoDB</span>

**1. Inicia el cliente (shell)**

Ejecuta el comando siguiente:
```
mongosh
```
**2. Crear usuario administrador**

Conecta a la base de datos admin con el comando:
```
use admin
```

Crea el usuario con permisos sobre todas las bases de datos con el comando siguiente. Sustituye `[usuario]` y `[contraseña]` por los datos que quieras utilizar:
```
db.createUser({ user: "[usuario]", pwd: "[contraseña]", roles: [{ role: "root", db: "admin" }] })
```

Comprueba que se ha creado correctamente:
```
db.getUsers()
```
![Imagen mongo AWS](img/mongo/mongoAWS10.jpg)


**3. Activa la autenticación**

Sal del cliente (shell) y edita el fichero /etc/mongod.conf
```
sudo nano /etc/mongod.conf
```

Busca la sección `security` y descoméntala, luego añade la línea `authorization: enabled`.
```
security:
  authorization: enabled
```

Guarda los cambios de configuración, reinicia el servicio y comprueba que se ha iniciado correctamente:
```
sudo systemctl restart mongod
sudo systemctl status mongod
```

Comprueba que no puedes realizar operaciones entrando con `mongosh`:

![Imagen mongo AWS](img/mongo/mongoAWS11.jpg)


Sal del cliente (shell) y vuelve a entrar con el comando siguiente. Sustituye `[usuario]` por el usuario que has creado anteriormente y espera a que te pida la contraseña: 
```
mongosh -u [usuario] -p --authenticationDatabase admin
```

Comprueba que ya puedes ver las bd con show dbs:

![Imagen mongo AWS](img/mongo/mongoAWS12.jpg)


<span class="mi_h4">Crear base de datos y conecta desde Kotlin</span>

**1. Crear la BD**
Ejecuta el comando siguiente:
```
use florabotanica
```

**2. Añadir información**
```
// Insertar documentos (si la colección no existe, se crea automáticamente)
db.plantas.insertMany([
  { id_planta: 1, nombre_comun: "Aloe", nombre_cientifico: "Aloe vera", altura: 30 },
  { id_planta: 2, nombre_comun: "Pino", nombre_cientifico: "Pinus sylvestris", altura: 330 },
  { id_planta: 3, nombre_comun: "Cactus", nombre_cientifico: "Cactaceae", altura: 120 }
])
```

**3. Conectar desde Kotlin**

Para conectar desde `Kotlin` necesitarás añadir la siguiente dependencia en al fichero `build.gradle.kts`
```kotlin
    implementation("org.mongodb:mongodb-driver-sync:4.11.0")
```
Prueba el siguiente fragmento de código para comprobar que puedes acceder a la base de datos y mostrar la información que has insertado anteriormente. Sustituye `USUARIO` por tu nombre de uauario, `PASSWORD` por tu contraseña, `HOST` por el nombre o IP de tu servidor y `PUERTO` por 27017:

```kotlin
const val NOM_SRV = "mongodb://USUARIO:PASSWORD@HOST:PUERTO"
const val NOM_BD = "florabotanica"
const val NOM_COLECCION = "plantas"

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

---

<span class="mi_h3">Autoría</span>

Obra realizada por Begoña Paterna Lluch. Publicada bajo licencia [Creative Commons Atribución/Reconocimiento-CompartirIgual 4.0 Internacional](https://creativecommons.org/licenses/by-sa/4.0/)

---