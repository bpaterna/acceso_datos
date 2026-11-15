# Docker

![docker](img/docker-logo.png){ width="400" }


<span class="mi_h3">Revisiones</span>

| Revisión | Fecha      | Descripción                             |
|----------|------------|-----------------------------------------|
| 1.0      | 06-05-2026 | Adaptación de los materiales a markdown |




!!! info "Cómo leer los comandos de este documento"
    El símbolo al inicio de cada línea indica **dónde** debes escribir el comando. **No debes copiar el símbolo, solo el comando**:

    * **`$`** *(en Linux/Mac/Git Bash)*, **`PS>`** *(en PowerShell)* o **`C:\>`** *(en CMD)* → En la **terminal de tu ordenador** (anfitrión).
    * **`#`** → En la **terminal dentro del contenedor** Docker (`bash` o `sh`).
    * **`mysql>`** → Dentro de la **consola de MySQL**.
    * **`mongosh>`** *(en pantalla verás `admin>` o `florabotanica>`)* → Dentro de la **consola de MongoDB**.



## 1. Introducción

Docker es una plataforma para empaquetar aplicaciones y dependencias en contenedores ligeros y reproducibles. Es útil, entre otros, en desarrollo aislado, testing, despliegue de microservicios y en reproducir entornos. Un contenedor es una instancia en ejecución de una imagen.


## 2. Comandos básicos

La siguiente tabla recoge algunos de los comandos que utilizaremos durante este curso:

| Comando | Ejemplo y descripción         |
|---------|------------------|
|--version| **docker --version** Muestra la versión instalada de Docker        |
|pull| **docker pull mysql:8.0** Descarga imagen desde un registry (por defecto Docker Hub) al host local (se indica tag para evitar :latest)        |
|run| **docker run --name mi-c -e VAR=valor -p 8080:80 -v datos:/data -d imagen:tag** Crea y ejecuta un contenedor a partir de una imagen; opciones controlan nombre, puertos, volúmenes, variables, modo detached, etc          |
|ps| **docker ps** Lista contenedores en ejecución <br />**docker ps -a** Lista todos (incluidos detenidos)         |
|logs| **docker logs mi-c** Muestra la salida (stdout/stderr) del contenedor <br />**docker logs -n 10 mi-c** Muestra las 10 últimas líneas <br />**docker logs -f** Para seguir en tiempo real    |
|exec -it| Ejecuta un comando dentro de un contenedor en ejecución<br /> -i mantiene stdin <br />-t asigna un pseudo-TTY (útil para shells interactivos) <br />**docker exec -it mi-c bash** Ejecuta “bash” en el  contenedor <br />**docker exec -d mi-c touch /tmp/prueba** Ejecuta “touch” en el contenedor, (creará un fichero llamado “prueba” dentro del directorio “tmp”) |
|start| **docker start mi-c** Inicia un contenedor detenido       |
|stop| **docker stop mi-c** Detiene un contenedor iniciado     |
|rm| **docker rm mi-c** Elimina un contenedor     |
|cp| **docker cp host_file mi-c:/ruta/** Copia del anfitrión al contenedor<br />**docker cp mi-c:/tmp/prueba ./** Copia del contenedor al directorio actual del anfitrión                    |


## 3. Instalar Docker en Windows

**1. Descargar Docker Desktop**

- Accede a: https://www.docker.com/products/docker-desktop/
- Haz clic en **Download for Windows** y descarga el instalador (`Docker Desktop Installer.exe`).

> **Nota:** Para saber si tienes Windows ARM o Intel/AMD (x64) ve a **Configuración → Sistema → Acerca de** y revisa el campo **"Tipo de sistema"**:
> 
> - **Procesador basado en x64** → Intel/AMD.
> - **Procesador basado en ARM** → Qualcomm, Microsoft SQ, etc.

**2. Instalar Docker Desktop**

- Ejecuta el instalador.
- Marca las siguientes opciones:
    - `Use WSL 2 instead of Hyper-V`
    - `Add shortcut to desktop` (opcional)
- Pulsa **OK / Install**.
- Espera a que finalice la instalación.
- Reinicia el equipo si el instalador lo solicita.

**3. Instalar WSL 2 (si no lo tienes)**

- Abre **PowerShell** como administrador.
- Ejecuta:

```powershell
PS> wsl --install
```

- Asegúrate de instalar:
    - WSL
    - Linux Kernel
    - Ubuntu (distribución predeterminada)

- Reinicia el equipo si es necesario.

**4. Configurar Docker para usar WSL 2**

- Abre **Docker Desktop**.
- Ve a **Settings → General**
- Comprueba que está activada la opción `Use the WSL 2 based engine`
- Después ve a **Resources → WSL Integration**
- Activa tu distribución Linux (por ejemplo, **Ubuntu**).
- Haz clic en **Apply & Restart**.

**5. Verificar que Docker funciona**

- Abre **PowerShell**, **CMD** o **Ubuntu (WSL)**.
- Comprueba la versión instalada:

```console
$ docker --version
```

- Ejecuta la imagen de prueba:

```console
$ docker run hello-world
```

> **Nota:** Si aparece el mensaje de bienvenida de Docker, la instalación funciona correctamente.


## 4. Contenedor de MySQL

<span class="mi_h3">4.1. Crear contenedor y BD</span>

**1. Crear el contenedor**

```console
$ docker run -d --name mysql-srv -e MYSQL_ROOT_PASSWORD=hola01 -p 3306:3306 mysql:8  
```

Explicación de las opciones utilizadas

- `-d`: ejecuta el contenedor en segundo plano (*detached mode*).
- `--name`: asigna un nombre al contenedor.
- `-e`: define variables de entorno (en este caso, la contraseña del usuario root).
- `-p`: realiza el mapeo de puertos `host:contenedor`.

> **Nota:** En este ejemplo se utiliza la contraseña `hola01` porque es un entorno de pruebas. En entornos reales se recomienda utilizar contraseñas más robustas.



**2. Comprobar que el contenedor está funcionando**

```console
$ docker ps -a
```

Deberías ver un contenedor llamado `mysql-srv` en la lista que ha aparecido.


**3. Abrir una terminal dentro del contenedor**

```console
$ docker exec -it mysql-srv bash
```

> Si la imagen no dispone de `bash`, utiliza:
>
> ```console
> $ docker exec -it mysql-srv sh
> ```



**4. Conectarse a MySQL**

Introduce la contraseña configurada en el paso 1:

```console
# mysql -u root -p
```



**5. Consultar las bases de datos existentes**

```sql
mysql> SHOW DATABASES;
```



**6. Crear la base de datos**

```sql
mysql> CREATE DATABASE florabotanica;
```



**7. Seleccionar la base de datos**

```sql
mysql> USE florabotanica;
```



**8. Crear una tabla e insertar datos**

Puedes copiar y pegar los scripts SQL que encontrarás en el documento [ejemplo BD MySQL](florabotanica_mysql.html).


**9. Comprobar los datos**

```sql
mysql> SELECT * FROM plantas;
```



**10. Desconectarse de MySQL**

```sql
mysql> EXIT;
```



**11. Salir de la terminal del contenedor**

```console
# exit
```



<span class="mi_h3">4.2. Copiar la BD a otro servidor</span>

Para llevar la base de datos a otro servidor es necesario exportarla desde el servidor de origen e importarla en servidor de destino.



**1. Exportar la base de datos (dump) en el servidor de origen**

La siguiente instrucción generará un archivo llamado `florabotanica.sql` en el directorio actual de nuestro ordenador (anfitrión).

```console
$ docker exec -i -e MYSQL_PWD=hola01 mysql-srv mysqldump --no-tablespaces --routines -u root florabotanica > florabotanica.sql
```

Para comprobar que se ha creado el archivo:

```console
$ ls -l
```
> Si utilizas CMD o PowerShell en Windows usa el comando `dir`


**2. Copiar el archivo al servidor de destino**

Se asume que el servidor de destino está en un contenedor llamado `mysql-srv2`.

```console
$ docker cp florabotanica.sql mysql-srv2:/tmp/florabotanica.sql
```

Para verificar que el archivo se ha copiado correctamente:

```console
$ docker exec mysql-srv2 ls -l /tmp/florabotanica.sql
```


**3. Abrir una terminal dentro del segundo contenedor**

```console
$ docker exec -it mysql-srv2 bash
```


**4. Conectarse a MySQL**

Introduce la contraseña del usuario root cuando se solicite:

```console
# mysql -u root -p
```


**5. Comprobar si la base de datos existe**

```sql
mysql> SHOW DATABASES;
```

Si no existe, créala:

```sql
mysql> CREATE DATABASE florabotanica;
```


**6. Restaurar la copia de seguridad**

Selecciona la base de datos:

```sql
mysql> USE florabotanica;
```

Importa el archivo SQL:

```sql
mysql> SOURCE /tmp/florabotanica.sql;
```


**7. Comprobar los datos**

```sql
mysql> SELECT * FROM plantas;
```

**8. Desconectarse de MySQL**

```sql
mysql> EXIT;
```

**9. Salir de la terminal del contenedor**

```console
# exit
```



## 5. Contenedor de MongoDB

<span class="mi_h3">5.1. Crear contenedor y BD</span>


**1. Crear el contenedor**

```console
$ docker run -d --name mongo-srv -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=hola01 -p 27017:27017 mongo:6
```

**Explicación de las opciones utilizadas**

- **-d**: ejecuta el contenedor en segundo plano.
- **--name**: nombre del contenedor.
- **-e**: variables de entorno (usuario y contraseña root).
- **-p**: mapeo de puertos `host:contenedor`.

> **Nota:** En este ejemplo se utiliza la contraseña `hola01` porque es un entorno de pruebas. Utiliza contraseñas más robustas en entornos reales.


**2. Comprobar que el contenedor está funcionando**

```console
$ docker ps -a
```

Deberías ver un contenedor llamado `mongo-srv` en la lista que ha aparecido.

**3. Abrir una terminal dentro del contenedor**

```console
$ docker exec -it mongo-srv bash
```

> Si la imagen no dispone de `bash`, utiliza:
>
> ```console
> $ docker exec -it mongo-srv sh
> ```


**4. Conectarse a MongoDB**

Utiliza las credenciales definidas en el paso 1:

```console
# mongosh "mongodb://admin:hola01@127.0.0.1:27017/admin"
```


**5. Listar las bases de datos existentes**

```javascript
admin> show dbs
```

**6. Crear y seleccionar la base de datos**

Ten en cuenta que MongoDB crea la base de datos cuando se insertan datos por primera vez.

```javascript
admin> use florabotanica
```

**7. Crear una colección e insertar documentos**

```javascript
florabotanica> db.plantas.insertMany([
  { id_planta:1, nombre_comun: "Aloe Vera", nombre_cientifico: "Aloe barbadensis miller", stock: 7, precio: 2.5 },
  { id_planta:2, nombre_comun: "Lavanda", nombre_cientifico: "Lavandula angustifolia", stock: 3, precio: 1.8 }
])
```

**8. Comprobar los datos**

```javascript
florabotanica> db.plantas.find().pretty()
```

---

**Ejemplos de consultas útiles**

**Contar documentos**

```javascript
florabotanica> db.plantas.countDocuments()
```

**Filtrar por nombre_comun**

```javascript
florabotanica> db.plantas.find({ nombre_comun: "Lavanda" }).pretty()
```

**Actualizar un documento (por ejemplo, cambiar el stock de Lavanda)**

```javascript
florabotanica> db.plantas.updateOne(
        { nombre_comun: "Lavanda" },
        { $set: { stock: 10 } }
)
```

**Eliminar un documento (por ejemplo, Aloe Vera)**

```javascript
florabotanica> db.plantas.deleteOne({ nombre_comun: "Aloe Vera" })
```

---

**9. Desconectarse de MongoDB**

```javascript
florabotanica> exit
```


**10. Salir de la terminal del contenedor**

```console
# exit
```





<span class="mi_h3">5.2. Copiar la BD a otro contenedor</span>


**1. Exporta la base de datos (dump) en el contenedor origen**
Se asume usuario y contraseña utilizados en la creación del contenedor.

Este comando crea un dump de la DB `florabotanica` y lo escribe en un directorio temporal dentro del contenedor:

```console
$ docker exec mongo-srv sh -c 'mongodump --uri="mongodb://admin:hola01@127.0.0.1:27017/florabotanica?authSource=admin" --archive=/tmp/florabotanica.archive --gzip'
```

Este comando copia el fichero al host:

```console
$ docker cp mongo-srv:/tmp/florabotanica.archive ./florabotanica.archive
```

Para comprobar que se ha creado el archivo ejecuta el comando `ls -l` o `dir` si utilizas CMD o PowerShell en Windows.


**2. Copia el archivo al contenedor destino**
Se asume que el contenedor destino se llama `mongo-srv2`.

```console
$ docker cp florabotanica.archive mongo-srv2:/tmp/florabotanica.archive
```

Comprueba dentro del contenedor destino:

```console
$ docker exec mongo-srv2 ls -l /tmp/florabotanica.archive
```


**3. Abre shell dentro del contenedor destino**

```console
$ docker exec -it mongo-srv2 bash
```

**4. Restaura la copia en el contenedor destino**
Restaura la DB `florabotanica` usando `mongorestore` (usa las credenciales root del destino). Esto importará la base de datos desde el archivo archivado y comprimido:

```console
# mongorestore --uri="mongodb://admin:hola01@127.0.0.1:27017" --archive=/tmp/florabotanica.archive --gzip --nsFrom="florabotanica.*" --nsTo="florabotanica.*"
```

**5. Comprueba las bases de datos y los datos**
Conéctate con `mongosh` (desde dentro del contenedor) y verifica:

```console
# mongosh "mongodb://admin:hola01@127.0.0.1:27017/admin"
```

```javascript
admin> show dbs
```

```javascript
admin> use florabotanica
```

```javascript
florabotanica> db.plantas.find().pretty()
```


**6. Desconectarse de MongoDB**

```javascript
florabotanica> exit
``` 

**7. Salir de la terminal del contenedor**

```console
# exit
```



---
<span class="mi_h3">Autoría</span>

<span class="mi_autoria">
Obra realizada por Begoña Paterna Lluch. Publicada bajo licencia [Creative Commons Atribución/Reconocimiento-CompartirIgual 4.0 Internacional](https://creativecommons.org/licenses/by-sa/4.0/)
</span>
---