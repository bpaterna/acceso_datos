# Base de datos de ejemplo


<span class="mi_h3">Revisiones</span>

| Revisión | Fecha      | Descripción                             |
|----------|------------|-----------------------------------------|
| 1.0      | 12-11-2026 | Adaptación de los materiales a markdown |


A continuación tienes los scripts para replicar la BD de ejemplo MySQL que se está utilizando en estos apuntes:

## 1. Tabla plantas

```sql
DROP TABLE IF EXISTS plantas;

CREATE TABLE plantas (
  id_planta int NOT NULL AUTO_INCREMENT,
  nombre_comun VARCHAR(255) NOT NULL,
  nombre_cientifico VARCHAR(255) NOT NULL,
  stock INTEGER, 
  precio DOUBLE,
  PRIMARY KEY (id_planta )
) ENGINE=InnoDB;


INSERT INTO plantas (id_planta, nombre_comun, nombre_cientifico, stock, precio) VALUES (1, "Aloe Arborescens", "Aloe barbadensis miller", 20, 5.8);
INSERT INTO plantas (id_planta, nombre_comun, nombre_cientifico, stock, precio) VALUES (2, "Helecho de Boston", "Nephrolepis exaltata", 16, 8.6);
INSERT INTO plantas (id_planta, nombre_comun, nombre_cientifico, stock, precio) VALUES (3, "Bambú de la suerte", "Dracaena sanderiana", 8, 15.6);
INSERT INTO plantas (id_planta, nombre_comun, nombre_cientifico, stock, precio) VALUES (4, "Girasol", "Helianthus annuus", 17, 4.6);
INSERT INTO plantas (id_planta, nombre_comun, nombre_cientifico, stock, precio) VALUES (5, "Palmera", "Arecaceae", 0, 50.5);
```


## 2. Tabla jardines

```sql
DROP TABLE IF EXISTS jardines;

CREATE TABLE jardines (
  id_jardin int NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  ciudad VARCHAR(100) NOT NULL,
  PRIMARY KEY (id_jardin )
) ENGINE=InnoDB;


INSERT INTO jardines (id_jardin, nombre, ciudad) VALUES (1, "Apolo", "Castellón");
INSERT INTO jardines (id_jardin, nombre, ciudad) VALUES (2, "Atenea", "Valencia");
INSERT INTO jardines (id_jardin, nombre, ciudad) VALUES (3, "Iris", "Alicante");
```


## 3. Tabla jardines_plantas 

```sql
DROP TABLE IF EXISTS jardines_plantas;

CREATE TABLE jardines_plantas (
  id_jardin int NOT NULL,
  id_planta int NOT NULL,
  cantidad int,
  PRIMARY KEY (id_jardin,id_planta)
) ENGINE=InnoDB;

INSERT INTO jardines_plantas (id_jardin, id_planta, cantidad) VALUES (1, 1, 3);
INSERT INTO jardines_plantas (id_jardin, id_planta, cantidad) VALUES (1, 2, 5);
INSERT INTO jardines_plantas (id_jardin, id_planta, cantidad) VALUES (1, 3, 7);
INSERT INTO jardines_plantas (id_jardin, id_planta, cantidad) VALUES (2, 1, 4);
INSERT INTO jardines_plantas (id_jardin, id_planta, cantidad) VALUES (2, 2, 3);
INSERT INTO jardines_plantas (id_jardin, id_planta, cantidad) VALUES (3, 3, 6);
INSERT INTO jardines_plantas (id_jardin, id_planta, cantidad) VALUES (3, 4, 2);
```
