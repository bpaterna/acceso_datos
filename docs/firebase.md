# Firebase

## 4.1 - Introducción:

**Firebase** es un servicio de backend, es decir, del lado del servidor, que ofrece la posibilidad de guardar los datos de aplicaciones web y de dispositivos móviles, con la particularidad de que en tiempo real se pueden actualizar los datos modificados desde uno de los clientes conectados a todos los demás que estén conectados.

Ofrece una serie de servicios, entre los cuales podemos destacar:

* **Firebase Auth - Autenticación de usuarios**: permite gestionar la validación de usuarios cómodamente. Incluye la autenticación a través de Facebook, GitHub, Twitter y Google, y también la validación utilizando cuenta de correo, guardando la contraseña en Firebase, lo que nos libera de tener que guardarlas en nuestro dispositivo.
* **Realtime Database - Base de Datos en Tiempo Real**: permite guardar unos datos en la nube, que estarán sincronizados en todas las aplicaciones (clientes) conectados. No es realmente una Base de Datos, sino solo un documento JSON.
* **Cloud Firestore**: es una evolución de la anterior que sí permite guardar colecciones de documentos JSON, por lo tanto, ya se puede considerar una Base de Datos.
* **Firebase Storage**: permite guardar archivos para nuestras aplicaciones, como pueden ser audios, vídeos, imágenes, ...

En este tema nos fijaremos sobre todo en el segundo y tercer servicio, los de Bases de Datos. Debemos recordar que la **Realtime Database** no es una Base de Datos completa. Solo es un documento JSON que podremos guardar, eso sí, tan largo como queramos. Se trata, por tanto, de una Base de Datos NoSQL, o mejor dicho, una mini Base de Datos NoSQL. Sin embargo, permite sincronizar los datos en tiempo real en todos los dispositivos conectados.

En cambio, el **Cloud Firestore** sí es una Base de Datos completa.


## 4.2 - Creación de una aplicación

La Base de Datos, que hemos acordado que pueden ser un documento único JSON en el caso de Realtime Database, y todo un conjunto en el caso de Cloud Firestore, está asociada a una aplicación. Crearemos desde el entorno de Firebase una nueva aplicación, cuya referencia utilizaremos en la aplicación web o aplicación móvil. Así, podemos crear varias aplicaciones Firebase, y en cada una guardaremos una Base de Datos. Necesitaremos autenticar nuestro acceso con una cuenta de Google.

El proceso de creación lo haremos desde el entorno de Firebase: [www.firebase.com](http://www.firebase.com).

El siguiente video muestra el proceso de creación de una aplicación:

<iframe src="https://slides.com/aliciasalvador/deck/embed" width="576" height="420" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

---

**Reglas de seguridad**

Inicialmente elegiremos la opción _**modo de prueba**_, en la cual todo el mundo puede acceder a los datos. Evidentemente, no se pueden dejar estas reglas de forma definitiva, pero para empezar a probar, está bien. De hecho, en la última versión, lo dejará en modo de prueba durante un mes. De todas formas, si quisiéramos extenderlo, iríamos a la configuración de las **rules**.


![Imagen 1](img/firebase/T7_2_1_1.png)
 
<span class="mi_h3">Utilización desde IntelliJ</span>

Veremos el acceso desde IntelliJ, que es el entorno que utilizamos en este módulo.

Para desarrollar una aplicación en IntelliJ con Kotlin que acceda a Firebase, una forma bastante fácil es utilizar **Maven** para gestionar las dependencias necesarias. Los pasos y las dependencias que se deben añadir al **pom.xml**:


a) **Repositorio Maven de Google**:

Algunas dependencias de Firebase pueden no estar disponibles en el repositorio Maven Central. Asegúrate de añadir el repositorio de Google.

    <repositories>
        <repository>
            <id>google</id>
            <url>https://maven.google.com/</url>
        </repository>
    </repositories>

b) **Añadir Firebase Admin SDK**. El Admin SDK es la biblioteca principal que permite interactuar con los servicios de Firebase, como Realtime Database, Cloud Firestore, Authentication, entre otros.

    <dependency>
            <groupId>com.google.firebase</groupId>
            <artifactId>firebase-admin</artifactId>
            <version>9.1.1</version>
    </dependency>

c) **Servicios Adicionales**

Si necesitas interactuar con servicios específicos, como Firestore o Realtime Database, aquí tienes las dependencias correspondientes:

**Cloud Firestore**

    <dependency>
        <groupId>com.google.cloud</groupId>
        <artifactId>google-cloud-firestore</artifactId>
        <version>3.15.0</version>
    </dependency>

    <dependency>
        <groupId>com.google.auth</groupId>
        <artifactId>google-auth-library-oauth2-http</artifactId>
        <version>1.27.0</version> 
    </dependency>

**Realtime Database**

La funcionalidad de Realtime Database está incluida en el Admin SDK, por lo que no necesitas añadir dependencias adicionales. Simplemente utiliza las clases proporcionadas por firebase-admin.

!!!note "Nota"
Haz clic en **Reload Maven** Project para asegurarte de que todas las dependencias se descargan correctamente.

## 4.3 - Realtime Database (RD)

Aunque la finalidad es utilizarla desde nuestro entorno de programación, siempre nos será útil "tocar" los datos directamente desde un entorno propio.

El siguiente vídeo corresponde a una versión anterior de Firebase, pero es igualmente válido.

<iframe src="https://slides.com/aliciasalvador/t7_firebase_inserirdades/embed" width="576" height="420" title="Copia de T7_Firebase_InserirDades" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

El entorno que nos ofrece **Firebase** será suficiente. Podremos visualizar los datos que hemos introducido en todas nuestras aplicaciones, y también editarlos: introducir, modificar y eliminar.

Recordemos que podremos utilizar 2 versiones:

* **Base de Datos en Tiempo Real**
* **Cloud Firestore**

Comencemos por **Base de Datos en Tiempo Real**.



## 4.3.1 RD: Utilización desde el entorno de Firebase

Haremos especial mención al hecho de que lo que guardamos es un documento **JSON**. Incluso podremos descargarlo (exportar) o subirlo como un documento (importar). Eso sí, la operación de importación destruye los datos anteriores, lo que demuestra que solo podemos guardar un documento **JSON**.

Este es el contenido del archivo **Empleats.json** que se introduce en el vídeo. Está formateado para una fácil lectura, pero en realidad no importaría que estuviera todo seguido.

Lo tenéis disponible en el aula virtual para que lo importéis.

```json
{
    "empresa": {
        "empleat": [
            {
                "num": 1,
                "nom": "Andreu",
                "departament": 10,
                "edat": 32,
                "sou": 1000
            },
            {
                "num": 2,
                "nom": "Bernat",
                "departament": 20,
                "edat": 28,
                "sou": 1200
            },
            {
                "num": 3,
                "nom": "Clàudia",
                "departament": 10,
                "edat": 26,
                "sou": 1100
            },
            {
                "num": 4,
                "nom": "Damià",
                "departament": 10,
                "edat": 40,
                "sou": 1500
            }
        ]
    }
}
```

Ya habéis visto que al importar **Empleats.json** se han perdido los otros datos. Volved a poner la pareja clave-valor **a1** (por ejemplo, con el valor **Hola**) ya que, por ser muy sencilla la estructura, la utilizaremos en algunos ejemplos. Así nos queda la estructura para los posteriores ejemplos:

![](T7_2_2_1.png)



## 4.3.2 RD: Utilización desde IntelliJ

Para los ejemplos y ejercicios de esta parte, crearemos un proyecto llamado **Tema8**, con los paquetes **ejemplos_realtimedatabase**, **ejemplos_cloudfirestore**, **ejemplos_cloudstorage** y **ejercicios**.

### 4.3.2.1 RD-IntelliJ: Conexión desde Kotlin

**Configuración**

Lo primero que debemos hacer es preparar nuestro proyecto para que pueda acceder a la aplicación que hemos creado en Firebase. En el entorno de IntelliJ, debemos descargar un archivo JSON donde estará la clave para acceder a nuestra aplicación. Debemos ir a la configuración del proyecto y dentro de la configuración, ir a la pestaña **Cuentas de servicio** (**Service Accounts**). Allí veremos unos ejemplos de utilización (a nosotros nos interesa **Java**), y al final un botón para **Generar una nueva clave privada**:

![](T7_RD_con.png)

Se descargará un archivo **json** que **tendremos que guardar** en la raíz del proyecto. Luego, como decía el ejemplo, colocamos lo siguiente para un acceso correcto:

```kotlin
val serviceAccount = FileInputStream("access-a-dades-d119e-firebase-adminsdk-ehn3k-14a46f56f4.json")

val options = FirebaseOptions.builder()
    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
    .setDatabaseUrl("https://access-a-dades-d119e-default-rtdb.firebaseio.com/").build()

FirebaseApp.initializeApp(options)
```

!!!warning "Aviso"
**No os olvidéis de sustituir el nombre del archivo json**. También debéis tener en cuenta que **la URL de la base de datos será diferente para cada uno de nosotros**.

Lo tenemos escrito en **Java**, y por tanto tendremos que hacer la transformación a **Kotlin**. Y quedará así (lo he particularizado a mi proyecto, pero recordad que tenéis que cambiar el nombre del archivo json y la URL por los vuestros):

```kotlin
val serviceAccount = FileInputStream("access-a-dades-d119e-firebase-adminsdk-ehn3k-14a46f56f4.json")

val options = FirebaseOptions.builder()
    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
    .setDatabaseUrl("https://access-a-dades-d119e-default-rtdb.firebaseio.com/").build()

FirebaseApp.initializeApp(options)
```

**Referencia a la Base de Datos y a los datos concretos a los que queremos acceder**

Deberemos crear un objeto **FirebaseDatabase**, que será una referencia a toda la Base de Datos:

```kotlin
val database = FirebaseDatabase.getInstance()
```

A partir de ella podríamos hacer referencia a una pareja clave-valor que esté en la raíz, como cuando habíamos creado **a1** (pero recordad que ahora no existe):

```kotlin
val refA1 = database.getReference("a1")
```

También podríamos hacer referencia a una pareja clave-valor que no esté en la raíz de la Base de Datos. Simplemente pondríamos la ruta desde la raíz. Por ejemplo, para acceder al nombre del primer empleado de la empresa que tenemos guardado, lo haríamos así:

```kotlin
val empleat1 = database.getReference("empresa/empleat/0/nom")
```

En los casos anteriores hemos optado por obtener parejas clave-valor, ya sea en la raíz o más dentro de la estructura JSON. Pero en definitiva, es una pareja clave-valor.

También podemos optar por obtener la estructura JSON y trabajar con ella, como hicimos en el Tema 3, cuando trabajamos con la estructura JSON:

```kotlin
val empresa = database.getReference("empresa")
```

De esta manera, al obtener toda la estructura, tendremos dos maneras de trabajar posteriormente para acceder más abajo en la estructura:

* Pasarlo a objetos y arrays de JSON, y trabajar como hicimos en el Tema 3. Muy cómodo, sobre todo cuando se trata de operaciones de lectura.
* Trabajar directamente con métodos de Firebase que nos permiten acceder bien a todos los hijos de una estructura, bien a un hijo en concreto.

Lo mostraremos en los ejemplos posteriores.








