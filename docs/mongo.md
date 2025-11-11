# Instalación y administración de MongoDB

<span class="mi_h3">Revisiones</span>

| Revisión | Fecha      | Descripción                                                       |
|----------|------------|-------------------------------------------------------------------|
| 1.0      | 10-11-2025 | Adaptación de los materiales a markdown                           |


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


<span class="mi_h3">Instalación en EC2 (AWS)</span>

**1. Conectar al servidor por ssh**

Para conectar, abre una ventana de comandos y escribe la instrucción siguiente (puedes utilizar el nombre del servidor o su IP pública) `ssh -i nombre_clave ubuntu@nombre_IP_servidor`

Asegurate que el archivo .pem está en la carpeta desde la que lanzas el comando y sustituye nombre_clave por el de tu archivo .pem y nombre_IP_servidor por el nombre o la IP pública de tu servidor. Por ejemplo:
```
ssh -i bpl.pem ubuntu@100.25.102.165
```
**2. Actualizando repositorios**
```
sudo apt update
```
**3. Importa la clave pública**
```
sudo apt install -y curl gnupg

curl -fsSL https://pgp.mongodb.com/server-7.0.asc | \
 sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
```
**4. Crear una lista de verificación**
```
echo "deb [signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
 sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
```
**5. Actualizar lista de paquetes**
```
sudo apt update
```
**6. Instala MongoDB Community Edition**
```
sudo apt install -y mongodb-org
```
**7. Habilitar y arrancar el servicio MongoDB**
``` 
sudo systemctl enable mongod    
sudo systemctl start mongod
```
**8. Configurar autenticación y acceso local**
```
sudo nano /etc/mongod.conf
```
Asegurarse de que solo escucha en localhost

```
# network interfaces
net:
port: 27017
bindIp: 127.0.0.1
```
Desactiva autenticación
```
security:
authorization: disabled
```
Reinicia servicio
```
sudo systemctl restart mongod
```
crear usuario para poder administrar cualquier bd
```
mongosh --port 27017

text > use admin
admin >   
db.createUser({
user: "bpl3",
pwd: "holaHOLA01+",
roles: [ { role: "root", db: "admin" } ]
})
```
Comprueba que el usuario se ha creado correctamente
```
admin > db.getUsers()
{
users: [
{
_id: 'admin.bpl3',
userId: UUID('385b7246-6f87-42b2-892d-b6cda1ede907'),
user: 'bpl3',
db: 'admin',
roles: [ { role: 'root', db: 'admin' } ],
mechanisms: [ 'SCRAM-SHA-1', 'SCRAM-SHA-256' ]
}
],
ok: 1
}
```
Activar autenticación y reiniciar servicio
```
sudo nano /etc/mongod.conf
security:
authorization: enabled

sudo systemctl restart mongod
```

Con estos pasos:
MongoDB se está ejecutando solo en localhost (127.0.0.1)

Usuario: bpl3
Contraseña: holaHOLA01+


Para acceder a la BD

Conecta desde terminal (y deja la ventana abierta)
```
ssh -i bpl.pem -L 27018:localhost:27017 ubuntu@100.25.102.165
```

Desde otra ventana de terminal, conecta localmente a:
```
mongosh "mongodb://bpl3:holaHOLA01+@localhost:27018/admin"
```

Para conectar desde Kotlin

```kotlin
const val NOM_SRV = "mongodb://bpl3:holaHOLA01+@localhost:27018/admin"
const val NOM_BD = "florabotanica"
const val NOM_COLECCION = "plantas"

val cliente = MongoClients.create(NOM_SRV)
val db = cliente.getDatabase(NOM_BD)
val coleccion = db.getCollection(NOM_COLECCION)
// resto de código del programa
```


