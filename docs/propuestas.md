# Propuestas de temáticas disponibles para tu aplicación



<span class="mi_h3">Revisiones</span>

| Revisión | Fecha      | Descripción                                                           |
|----------|------------|-----------------------------------------------------------------------|
| 1.0      | 24-07-2026 | Adaptación de los materiales a markdown                               |
| 1.1      | 22-09-2026 | Ampliación con entidades nuevas |



<span class="mi_h3">1. Fauna (Reino Animal)</span>

* **Entidad 1 (Animal):**
    * `id_animal (Int)` - Identificador único.
    * `nombre (String)` - Ej: "Oso Panda".
    * `origen (String)` - Ej: "Asia".
    * `esperanza_vida (Int)` - Media en años.
    * `peso_medio (Double)` - Peso medio en kilogramos.
* **Entidad 2 (Hábitat / Ecosistema):**
    * `id_habitat (Int)` - Identificador único.
    * `nombre (String)` - Ej: "Selva Amazónica".
    * `clima (String)` - Ej: "Tropical húmedo".
    * `altitud_media (Int)` - Altitud media en metros.
    * `temperatura_media (Double)` - Temperatura media anual en ºC.
* **Entidad 3 (Parque Natural / Reserva):**
    * `id_parque (Int)` - Identificador único.
    * `nombre (String)` - Ej: "Parque Nacional de Doñana".
    * `pais (String)` - Ej: "España".
    * `ano_fundacion (Int)` - Año de creación o declaración oficial.
    * `superficie (Double)` - Extensión en kilómetros cuadrados (km²).
* **Entidad 4 (Cuidador / Especialista):**
    * `id_cuidador (Int)` - Identificador único.
    * `nombre (String)` - Ej: "Félix Rodríguez".
    * `especialidad (String)` - Ej: "Aves rapaces".
    * `experiencia (Int)` - Años de experiencia laboral.
    * `salario (Double)` - Salario mensual aproximado en euros.


<span class="mi_h3">2. Astronomía (Cuerpos Celestes)</span>

* **Entidad 1 (Cuerpo Celeste):**
    * `id_cuerpo (Int)` - Identificador único.
    * `nombre (String)` - Ej: "Júpiter".
    * `tipo (String)` - Ej: "Planeta gaseoso", "Estrella".
    * `lunas (Int)` - Cantidad de satélites naturales.
    * `distancia_sol (Double)` - Distancia media en Unidades Astronómicas (UA).
* **Entidad 2 (Misión Espacial):**
    * `id_mision (Int)` - Identificador único.
    * `nombre (String)` - Ej: "Voyager 1".
    * `agencia (String)` - Ej: "NASA".
    * `ano_lanzamiento (Int)` - Año del despegue.
    * `presupuesto (Double)` - Presupuesto en millones de dólares.
* **Entidad 3 (Observatorio Astronómico):**
    * `id_observatorio (Int)` - Identificador único.
    * `nombre (String)` - Ej: "Observatorio del Teide".
    * `ubicacion (String)` - Ej: "Tenerife".
    * `altitud (Int)` - Altura sobre el nivel del mar en metros.
    * `diametro_telescopio (Double)` - Diámetro del espejo principal en metros.
* **Entidad 4 (Constelación):**
    * `id_constelacion (Int)` - Identificador único.
    * `nombre (String)` - Ej: "Orión".
    * `hemisferio (String)` - Ej: "Boreal".
    * `estrellas_visibles (Int)` - Número de estrellas visibles a simple vista.
    * `area_cielo (Double)` - Extensión ocupada en grados cuadrados.




<span class="mi_h3">3. Vehículos (Coches)</span>

* **Entidad 1 (Coche):**
    * `id_vehiculo (Int)` - Identificador único.
    * `modelo (String)` - Ej: "Civic".
    * `marca (String)` - Ej: "Honda".
    * `potencia (Int)` - Caballos de fuerza (CV).
    * `consumo (Double)` - Consumo medio en litros/100km.
* **Entidad 2 (Circuito de Carreras):**
    * `id_circuito (Int)` - Identificador único.
    * `nombre (String)` - Ej: "Spa-Francorchamps".
    * `pais (String)` - Ej: "Bélgica".
    * `curvas (Int)` - Número total de curvas.
    * `longitud (Double)` - Longitud total del trazado en kilómetros.
* **Entidad 3 (Mecánico / Técnico):**
    * `id_mecanico (Int)` - Identificador único.
    * `nombre (String)` - Ej: "Carlos Sainz".
    * `especialidad (String)` - Ej: "Sistemas de frenado".
    * `experiencia (Int)` - Años de experiencia en taller.
    * `tarifa_hora (Double)` - Tarifa de mano de obra en euros/hora.
* **Entidad 4 (Pieza / Repuesto):**
    * `id_pieza (Int)` - Identificador único.
    * `nombre (String)` - Ej: "Bomba de agua".
    * `fabricante (String)` - Ej: "Bosch".
    * `stock (Int)` - Unidades disponibles en almacén.
    * `precio (Double)` - Precio de venta en euros.

<span class="mi_h3">4. Cine (Películas)</span>

* **Entidad 1 (Película):**
    * `id_pelicula (Int)` - Identificador único.
    * `titulo (String)` - Ej: "Interstellar".
    * `director (String)` - Ej: "Christopher Nolan".
    * `duracion (Int)` - Duración en minutos.
    * `puntuacion (Double)` - Nota media de usuarios (0.0 a 10.0).
* **Entidad 2 (Sala de Cine):**
    * `id_cine (Int)` - Identificador único.
    * `nombre (String)` - Ej: "Kinépolis".
    * `ciudad (String)` - Ej: "Valencia".
    * `butacas (Int)` - Aforo total de espectadores.
    * `precio_entrada (Double)` - Precio general de la entrada en euros.
* **Entidad 3 (Actor / Actriz):**
    * `id_actor (Int)` - Identificador único.
    * `nombre (String)` - Ej: "Leonardo DiCaprio".
    * `nacionalidad (String)` - Ej: "Estadounidense".
    * `premios_ganados (Int)` - Número de galardones importantes recibidos.
    * `cache (Double)` - Caché medio por película en millones de euros.
* **Entidad 4 (Festival de Cine):**
    * `id_festival (Int)` - Identificador único.
    * `nombre (String)` - Ej: "Festival de San Sebastián".
    * `sede (String)` - Ej: "San Sebastián".
    * `edicion_actual (Int)` - Número de la última edición celebrada.
    * `dotacion_premio (Double)` - Premio al ganador en miles de euros.

<span class="mi_h3">5. Química (Tabla Periódica)</span>

* **Entidad 1 (Elemento):**
    * `id_elemento (Int)` - Número atómico.
    * `nombre (String)` - Ej: "Oxígeno".
    * `simbolo (String)` - Ej: "O".
    * `periodo (Int)` - Fila de la tabla periódica (1 a 7).
    * `masa_atomica (Double)` - Masa atómica en unidades de masa atómica (u).
* **Entidad 2 (Compuesto Químico):**
    * `id_compuesto (Int)` - Identificador único.
    * `nombre (String)` - Ej: "Ácido sulfúrico".
    * `formula (String)` - Ej: "H2SO4".
    * `ano_sintesis (Int)` - Año en el que se sintetizó o documentó.
    * `densidad (Double)` - Densidad en g/cm³.
* **Entidad 3 (Científico / Investigador):**
    * `id_cientifico (Int)` - Identificador único.
    * `nombre (String)` - Ej: "Marie Curie".
    * `pais_origen (String)` - Ej: "Polonia".
    * `ano_nacimiento (Int)` - Año de nacimiento.
    * `indice_impacto (Double)` - Índice de citas o publicaciones científicas.
* **Entidad 4 (Material de Laboratorio):**
    * `id_material (Int)` - Identificador único.
    * `nombre (String)` - Ej: "Matraz aforado".
    * `material (String)` - Ej: "Vidrio borosilicato".
    * `unidades_stock (Int)` - Cantidad de piezas disponibles.
    * `capacidad_ml (Double)` - Capacidad volumétrica en mililitros.


<span class="mi_h3">6. Videojuegos</span>

* **Entidad 1 (Videojuego):**
    * `id_videojuego (Int)` - Identificador único.
    * `titulo (String)` - Ej: "The Witcher 3".
    * `estudio (String)` - Ej: "CD Projekt Red".
    * `lanzamiento (Int)` - Año de publicación oficial.
    * `precio (Double)` - Precio de venta recomendado en euros.
* **Entidad 2 (Consola / Plataforma):**
    * `id_consola (Int)` - Identificador único.
    * `nombre (String)` - Ej: "PlayStation 5".
    * `fabricante (String)` - Ej: "Sony".
    * `generacion (Int)` - Número de generación de consolas (ej: 9).
    * `ventas_millones (Double)` - Ventas mundiales acumuladas en millones de unidades.
* **Entidad 3 (Jugador Profesional / Pro Player):**
    * `id_jugador (Int)` - Identificador único.
    * `alias (String)` - Ej: "Faker".
    * `pais (String)` - Ej: "Corea del Sur".
    * `torneos_ganados (Int)` - Número de campeonatos oficiales conquistados.
    * `ganancias_totales (Double)` - Premios acumulados en miles de euros.
* **Entidad 4 (Periférico / Accesorio):**
    * `id_periferico (Int)` - Identificador único.
    * `modelo (String)` - Ej: "DeathAdder V3".
    * `marca (String)` - Ej: "Razer".
    * `dpi_maximo (Int)` - Sensibilidad máxima del sensor (DPI).
    * `peso_gramos (Double)` - Peso neto en gramos.

<span class="mi_h3">7. Geografía (Países)</span>

* **Entidad 1 (País):**
    * `id_pais (Int)` - Código numérico internacional.
    * `nombre (String)` - Ej: "Canadá".
    * `continente (String)` - Ej: "América del Norte".
    * `poblacion (Int)` - Población aproximada (en millones de habitantes).
    * `superficie (Double)` - Extensión territorial (en millones de km²).
* **Entidad 2 (Ciudad Capital):**
    * `id_ciudad (Int)` - Identificador único.
    * `nombre (String)` - Ej: "Tokio".
    * `pais (String)` - Ej: "Japón".
    * `habitantes (Int)` - Población censada en miles de personas.
    * `altitud (Double)` - Altitud sobre el nivel del mar en metros.
* **Entidad 3 (Río Principal):**
    * `id_rio (Int)` - Identificador único.
    * `nombre (String)` - Ej: "Danubio".
    * `desembocadura (String)` - Ej: "Mar Negro".
    * `paises_cuenca (Int)` - Número de países que atraviesa.
    * `longitud (Double)` - Longitud total del curso en kilómetros.
* **Entidad 4 (Montaña / Pico):**
    * `id_montana (Int)` - Identificador único.
    * `nombre (String)` - Ej: "Everest".
    * `cordillera (String)` - Ej: "Himalaya".
    * `ano_primer_ascenso (Int)` - Año de la primera ascensión documentada.
    * `altura (Double)` - Altitud oficial en metros.


<span class="mi_h3">8. Nutrición (Alimentos)</span>

* **Entidad 1 (Alimento):**
    * `id_alimento (Int)` - Código de barras interno.
    * `nombre (String)` - Ej: "Manzana".
    * `grupo (String)` - Ej: "Frutas", "Lácteos".
    * `calorias (Int)` - Kilocalorías (kcal) por cada 100 gramos.
    * `proteinas (Double)` - Gramos de proteínas por cada 100 gramos.
* **Entidad 2 (Receta Saludable):**
    * `id_receta (Int)` - Identificador único.
    * `nombre (String)` - Ej: "Ensalada de quinoa".
    * `dificultad (String)` - Ej: "Fácil".
    * `tiempo_preparacion (Int)` - Tiempo estimado en minutos.
    * `coste_medio (Double)` - Coste estimado de ingredientes en euros.
* **Entidad 3 (Suplemento Nutricional):**
    * `id_suplemento (Int)` - Identificador único.
    * `nombre (String)` - Ej: "Proteína Whey".
    * `marca (String)` - Ej: "Optimum Nutrition".
    * `dosis_envase (Int)` - Número total de tomas por bote.
    * `precio (Double)` - Precio de venta en euros.
* **Entidad 4 (Dietista / Nutricionista):**
    * `id_dietista (Int)` - Identificador único.
    * `nombre (String)` - Ej: "Lucía Martínez".
    * `ciudad (String)` - Ej: "Valencia".
    * `numero_colegiado (Int)` - Código de colegiación profesional.
    * `tarifa_consulta (Double)` - Precio de la sesión en euros.

<span class="mi_h3">9. Historia (Monumentos Históricos)</span>

* **Entidad 1 (Monumento):**
    * `id_monumento (Int)` - Identificador único.
    * `nombre (String)` - Ej: "Torre Eiffel".
    * `ciudad (String)` - Ej: "París".
    * `construccion (Int)` - Año de finalización de la construcción.
    * `altura (Double)` - Altura máxima en metros.
* **Entidad 2 (Personaje Histórico):**
    * `id_personaje (Int)` - Identificador único.
    * `nombre (String)` - Ej: "Julio César".
    * `civilizacion (String)` - Ej: "Roma Antigua".
    * `ano_nacimiento (Int)` - Año de nacimiento.
    * `relevancia (Double)` - Puntuación de impacto histórico (1.0 a 10.0).
* **Entidad 3 (Batalla Histórica):**
    * `id_batalla (Int)` - Identificador único.
    * `nombre (String)` - Ej: "Batalla de Waterloo".
    * `pais_actual (String)` - Ej: "Bélgica".
    * `ano (Int)` - Año en el que sucedió el enfrentamiento.
    * `duracion_dias (Double)` - Duración de la batalla en días.
* **Entidad 4 (Museo Arqueológico):**
    * `id_museo (Int)` - Identificador único.
    * `nombre (String)` - Ej: "Museo Británico".
    * `ciudad (String)` - Ej: "Londres".
    * `piezas_totales (Int)` - Número de piezas catalogadas en miles.
    * `precio_entrada (Double)` - Precio del ticket de entrada en euros.

<span class="mi_h3">10. Música (Instrumentos Musicales)</span>

* **Entidad 1 (Instrumento Musical):**
    * `id_instrumento (Int)` - Identificador único.
    * `nombre (String)` - Ej: "Violín".
    * `familia (String)` - Ej: "Cuerda", "Viento".
    * `invencion (Int)` - Año aproximado de origen histórico.
    * `peso (Double)` - Peso estimado del instrumento en kilogramos.
* **Entidad 2 (Compositor Clásico):**
    * `id_compositor (Int)` - Identificador único.
    * `nombre (String)` - Ej: "Beethoven".
    * `epoca (String)` - Ej: "Clasicismo / Romanticismo".
    * `ano_nacimiento (Int)` - Año de nacimiento.
    * `obras_catalogadas (Double)` - Índice de catálogo oficial (ej: número de opus).
* **Entidad 3 (Banda / Grupo Musical):**
    * `id_banda (Int)` - Identificador único.
    * `nombre (String)` - Ej: "Queen".
    * `genero (String)` - Ej: "Rock".
    * `ano_fundacion (Int)` - Año de creación del grupo.
    * `ventas_millones (Double)` - Discos vendidos en millones de copias.
* **Entidad 4 (Festival de Música):**
    * `id_festival (Int)` - Identificador único.
    * `nombre (String)` - Ej: "Glastonbury".
    * `ciudad (String)` - Ej: "Pilton".
    * `asistentes_miles (Int)` - Aforo máximo en miles de personas.
    * `precio_abono (Double)` - Coste del abono general en euros.




---
<span class="mi_h3">Autoría</span>

<span class="mi_autoria">
Obra realizada por Begoña Paterna Lluch. Publicada bajo licencia [Creative Commons Atribución/Reconocimiento-CompartirIgual 4.0 Internacional](https://creativecommons.org/licenses/by-sa/4.0/)
</span>
---
