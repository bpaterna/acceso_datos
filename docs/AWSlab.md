# Ubuntu Server en AWS Learner Lab

<span class="mi_h3">Revisiones</span>

|Revisión | Fecha| Descripción|
|---------|------|-------------|
|1.0 | 11-10-2025 | Adaptación de los materiales a markdown|


<span class="mi_h3">Acceso al laboratorio</span>

A continuación se describen los pasos para acceder al laboratorio de aprendizaje de AWS Academy.

1. Habrás recibido un correo electrónico de invitación, haz clic en el enlace y crea tu cuenta. Una vez completado el registro se abrirá el curso automaticamente. Haz clic en `Contenidos` y luego en el enlace `Lanzamiento del laboratorio` como se muestra en la siguiente imagen (la primera vez que entres deberás aceptar los términos de uso)

    ![Imagen 1](img/AWS/imagen_001.jpg)

    !!!Note ""
        Si te aparece el siguiente mensaje: *"This assignment is locked till you access it through your respective LMS once, please use your LMS to access/unlock this assignment"* vuelve a hacer clic en *Contenidos* y en el enlace *Lanzamiento del laboratorio*

    Para entrar al curso en el futuro hazlo desde: [https://www.awsacademy.com/vforcesite/LMS_Login](https://www.awsacademy.com/vforcesite/LMS_Login)

    ![Imagen 00](img/AWS/imagen_00r.jpg)

    Luego haz clic en el nombre del curso

    ![Imagen 000](img/AWS/imagen_000.jpg)
    Una vez dentro, haz clic en `Contenidos` y luego en el enlace `Lanzamiento del laboratorio` como hiciste la primera vez

    ![Imagen 1](img/AWS/imagen_001.jpg)

    
2. Cuando aparezca la pantalla con el laboratorio, haz clic en el botón `Start Lab` (verás que el círculo junto al enlace `AWS` cambia de color rojo a amarillo y permanece de ese color mientras arranca el laboratorio)

    ![Imagen 2](img/AWS/imagen_002.jpg)

3. Cuando el laboratorio haya arrancado, el círculo cambiará a color verde. Entonces haz clic en el enlace `AWS` para acceder a la `Página de inicio de la Consola` (puedes ver que la región es *North Virginia (us-east-1)* que es la región por defecto de los laboratorios de aprendizaje) y después haz clic en `EC2` para acceder a la consola de instancias EC2

    ![Imagen 4](img/AWS/imagen_004b.jpg)


<span class="mi_h3">Instalación del servidor</span>

A continuación se describen los pasos para crear un servidor Ubuntu en un laboratorio de aprendizaje de AWS Academy.

1. Haz clic en el botón `Lanzar la instancia`

    ![Imagen 6](img/AWS/imagen_006.jpg)

2. Escribe el nombre de la instancia y elige una `Amazon Machine Image (AMI)` en este caso Ubuntu (al seleccionar ubuntu nos aparece la Ubuntu Server 24.04 LTS que es apta para utilizar de forma gratuita)

    ![Imagen 7](img/AWS/imagen_007.jpg)

    Más abajo aparece el tipo de instancia

    ![Imagen 8](img/AWS/imagen_008.jpg)

3. Crea un par de claves

    ![Imagen 9](img/AWS/imagen_009.jpg)
    ![Imagen 10](img/AWS/imagen_010r.jpg)

    <span class="mis_avisos">**Muy importante:** Verás que el navegador descarga el fichero .pem de tu clave automáticamente. Guárdalo en lugar seguro porque te hará falta para conectar a tu servidor por SSH.</span>

4. Deja el resto de opciones como están y, en la parte derecha dentro del apartado `Resumen`, haz clic en el botón `Lanzar instancia`. Cuando la instancia termine de lanzarse aparecerá la siguiente imagen

    ![Imagen 12](img/AWS/imagen_012.jpg)


5. Asigna una IP pública fija a tu servidor. Para ello sigue estos pasos:

    - Haz clic en el enlace `Direcciones IP elásticas`
   
      ![Imagen 12](img/AWS/AWS_IP_1.jpg)

    - Haz clic en el botón `Asignar dirección IP elástica`
   
      ![Imagen 12](img/AWS/AWS_IP_2.jpg)

    - Deja las opciones por defecto y haz clic en el botón `Asignar` y verás la nueva IP
   
      ![Imagen 12](img/AWS/AWS_IP_3.jpg)
      ![Imagen 12](img/AWS/AWS_IP_4.jpg)

   - Selecciona la nueva IP, haz clic en el desplegable opciones y entra en `Dirección IP elástica asignada`

     ![Imagen 12](img/AWS/AWS_IP_5.jpg)

   - Indica la instancia a la que asignar la IP y haz clic en Àsociado` y la IP quedará asociada a tu instancia

     ![Imagen 12](img/AWS/AWS_IP_6.jpg)
     ![Imagen 12](img/AWS/AWS_IP_7.jpg)

   - Vuelve a la lista de instancias para comprobar que tu instancia ya tiene la IP

     ![Imagen 12](img/AWS/AWS_IP_8.jpg)

6. Puedes hacer clic en el botón `Conectarse a la instancia` para ver las instrucciones de conexión al servidor, por ejemplo en la pestaña `Cliente SSH` aparece lo siguiente

    ![Imagen 13](img/AWS/imagen_013.jpg)

7. Prueba la conexión. Para ello escribe en una ventana de comandos la instrucción siguiente

    ```bash
    ssh -i nombre_clave ubuntu@nombre_servidor
    ```
    Asegurate que el archivo .pem está en la carpeta desde la que lanzas el comando y sustituye `nombre_clave` por el de tu archivo .pem y `nombre_servidor`el nombre de tu servidor. Si la conexión se ha establecido correctamente verás la siguiente información

    ![Imagen 14](img/AWS/imagen_014.jpg)



<span class="mi_h3">Instalación de MySQL</span>

1. Actualiza la lista de paquetes del servidor
    ```bash
    sudo apt update
    ```

2. Instala el servidor MySQL y las dependencias necesarias
    ```bash
    sudo apt install mysql-server
    ```

3. Comprueba que el servicio de MySQL se esté ejecutando correctamente
    ```bash
    sudo systemctl status mysql
    ```
    ![Imagen 17](img/AWS/imagen_017.jpg)
    
    (Si no está activo, puedes iniciarlo con `sudo systemctl start mysql`)


<span class="mi_h3">Crea un usuario y una base de datos</span>

1. Entra al servidor MySQL (cuando te pida contraseña déjala en blanco y pulsa INTRO)
    ```bash
    sudo mysql -u root -p 
    ```

2. Crea el usuario con su contraseña. En el ejemplo el usuario es `bpl`, la contraseña es `holaHOLA01+` y el `%` indica que el usuario podrá conectarse desde cualquier sitio. Ejecuta los comandos siguientes cambiando el usuario y la contraseña de ejemplo por los tuyos
    ```sql
    CREATE USER 'bpl3'@'%' IDENTIFIED BY 'holaHOLA01+';
    GRANT ALL PRIVILEGES ON *.* TO 'bpl3'@'%';    
    FLUSH PRIVILEGES;
    SHOW GRANTS FOR 'bpl3'@'%';
    ```

3. Crea la base de datos (cambia el nombre de ejemplo por el tuyo)
    ```sql
    create database florabotanica;
    ```

4. Sal del servidor MySQL
    ```bash
    exit
    ```


<span class="mi_h3">Configura MySQL y el servidor para permtir conexiones externas</span>

1. Edita el fichero de configuración
`sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf`
    - Comenta `bind-address = 127.0.0.1`

    - Añade la línea `bind-address = 0.0.0.0`

    El fichero de configuración debe quedar como se muestra en la siguiente imagen

    ![Imagen 18](img/AWS/imagen_018.jpg)

2. Reinicia el servicio y comprueba que ha arrancado correctamente
    ```bash
    sudo systemctl restart mysql
    sudo systemctl status mysql
    ```

3. Añade una regla en el servidor para permitir el tráfico entrante del puerto 3306. Para ello sigue estos pasos

    Haz clic en la pestaña `Seguridad` y luego en el enlace de `Grupos de seguridad`

    ![Imagen 28](img/AWS/imagen_028.jpg)


    Entra en `Reglas de entrada`y haz clic en el botón `Editar reglas de entrada`
    ![Imagen 29](img/AWS/imagen_029.jpg)
    
    Haz clic en `Agregar regla`, configura el tipo, el puerto y la IP de origen `0.0.0.0/0` para permitir acceso desde cualquier lugar y por último haz clic en el botón `Guardar reglas`
    ![Imagen 30](img/AWS/imagen_030.jpg)

    En unos segundos aparecerá tu nueva regla en la lista
    ![Imagen 31](img/AWS/imagen_031.jpg)


4. Prueba a conectar a tu base de datos desde [DBeaver](dbeaver.html)


<!--
```bash
sudo ufw allow 3306
```
-->



<!--
### ss -tulnp | grep 3306

**antes de habilitar acceso externo**
```
tcp LISTEN 0 151 127.0.0.1:3306 0.0.0.0:*
tcp LISTEN 0 70 127.0.0.1:33060 0.0.0.0:*
```

**después de habilitar acceso externo**
```
tcp LISTEN 0 70 127.0.0.1:33060 0.0.0.0:*
tcp LISTEN 0 151 0.0.0.0:3306 0.0.0.0:*
```
-->




<!-- 

de la instalación de MySQL
3. Ejecuta el script de seguridad para establecer una contraseña de usuario root, eliminar usuarios anónimos y deshabilitar el inicio de sesión remoto del usuario root:
    ```bash
    sudo mysql_secure_installation
    ```
    ![Imagen 15](img/AWS/imagen_015.jpg)
    ![Imagen 16](img/AWS/imagen_016.jpg)

-->

