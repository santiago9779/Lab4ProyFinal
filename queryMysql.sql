DROP DATABASE IF EXISTS RESTAURANTE;

-- Crea la base de datos
CREATE DATABASE restaurante;

-- Usa la base de datos
USE restaurante;

-- Crea la tabla `Mesa`
CREATE TABLE mesa (
  id INT NOT NULL AUTO_INCREMENT,
  numero INT NOT NULL,
  capacidad INT NOT NULL,
  PRIMARY KEY (id)
);

-- Crea la tabla `Carta`
CREATE TABLE carta (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  descripcion VARCHAR(255) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  categoria VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

-- Crea la tabla `Orden`
CREATE TABLE orden (
  id INT NOT NULL AUTO_INCREMENT,
  mesa INT NOT NULL,
  fecha_hora DATETIME NOT NULL,
  PRIMARY KEY (id)
);

-- Crea la tabla `Orden_Detalle`
CREATE TABLE orden_detalle (
  orden INT NOT NULL,
  carta INT NOT NULL,
  cantidad INT NOT NULL,
  PRIMARY KEY (orden, carta)
);

-- Agrega las relaciones entre las tablas

-- Agrega la relación `Orden-Mesa`
ALTER TABLE orden
ADD FOREIGN KEY (mesa) REFERENCES mesa (id);

-- Agrega la relación `Orden_Detalle-Carta`
ALTER TABLE orden_detalle
ADD FOREIGN KEY (carta) REFERENCES carta (id);

-- Agrega la relación `Orden_Detalle-Orden`
ALTER TABLE orden_detalle
ADD FOREIGN KEY (orden) REFERENCES orden (id);