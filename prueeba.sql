create database restaurante;
use restaurante;

-- crear tabla menu
create table menu (
id_menu int auto_increment not null,
nombre varchar(255) not null,
descripcion varchar(400) not null,
categoria varchar(255) not null,
precio decimal(7,2) not null,
primary key (id_menu)
);


-- tabla personal
create table personal (
id_personal int auto_increment not null,
nombre varchar(255) not null,
apellido varchar(255) not null,
usuario varchar(255) not null,
contraseña varchar(255) not null,
primary key (id_personal)
);

-- tabla mesa
CREATE TABLE mesa (
  id_mesa INT NOT NULL AUTO_INCREMENT,
  numero int not null,
  capacidad INT(2) NOT NULL,
  PRIMARY KEY (id_mesa)
);

-- tabla orden
CREATE TABLE orden (
  id_orden INT NOT NULL AUTO_INCREMENT,
  fecha DATE NOT NULL,
  cantidad INT NOT NULL,
  estado VARCHAR(255) NOT NULL,
  PRIMARY KEY (id_orden)
);

-- crear relaciones
-- orden-mesa
ALTER TABLE orden
add column id_mesa INT NOT NULL ;

ALTER TABLE orden
ADD CONSTRAINT fk_orden_mesa
FOREIGN KEY (id_mesa)
REFERENCES mesa (id_mesa);

-- orden-personal
ALTER TABLE orden
add column id_personal INT NOT NULL ;

ALTER TABLE orden
ADD CONSTRAINT fk_orden_personal
FOREIGN KEY (id_personal)
REFERENCES personal (id_personal);

-- orden-menu
ALTER TABLE orden
add column id_menu INT NOT NULL ;

ALTER TABLE orden
ADD CONSTRAINT fk_orden_menu
FOREIGN KEY (id_menu)
REFERENCES menu (id_menu);
