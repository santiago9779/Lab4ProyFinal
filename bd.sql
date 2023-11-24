-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb1
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb1
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS mydb1;
CREATE SCHEMA IF NOT EXISTS `mydb1` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `mydb1` ;

-- -----------------------------------------------------
-- Table `mydb1`.`menu`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb1`.`menu` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `descripcion` VARCHAR(50) NOT NULL,
  `precio` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb1`.`mesa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb1`.`mesa` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `capacidad` INT NULL DEFAULT NULL,
  `ocupada` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mydb1`.`personal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb1`.`personal` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(125) NOT NULL,
  `rol` VARCHAR(45) NULL DEFAULT NULL,
  `usuario` VARCHAR(150) NOT NULL,
  `password` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb1`.`orden`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb1`.`orden` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATE NOT NULL,
  `estado` VARCHAR(45) CHARACTER SET 'utf8mb3' NOT NULL,
  `id_mesa` INT ,
  `id_personal` INT ,
  `id_menu` INT ,
  `nombre` VARCHAR(50) NULL DEFAULT NULL,
  `descripcion` VARCHAR(50) NULL DEFAULT NULL,
  `precio` DECIMAL(10,2) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_orden_mesa` (`id_mesa` ASC) VISIBLE,
  INDEX `fk_orden_personal` (`id_personal` ASC) VISIBLE,
  INDEX `fk_orden_menu` (`id_menu` ASC) VISIBLE,
  CONSTRAINT `fk_orden_menu`
    FOREIGN KEY (`id_menu`)
    REFERENCES `mydb1`.`menu` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_orden_mesa`
    FOREIGN KEY (`id_mesa`)
    REFERENCES `mydb1`.`mesa` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_orden_personal`
    FOREIGN KEY (`id_personal`)
    REFERENCES `mydb1`.`personal` (`id`)
    ON DELETE SET NULL ON UPDATE SET NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;



insert into menu (nombre,descripcion,precio) 
values
("pizza","queso salsa",3000),
('sandwich','carne tomate',2500)
;

insert into mesa (capacidad,ocupada) 
values
(6,0),
(8,1)
;

insert into personal (nombre,rol,usuario,password) 
values
("pepe", 'jefe', 'pepe', 'Pepe1234')
;


DELIMITER //
CREATE TRIGGER update_orden
BEFORE INSERT ON orden
FOR EACH ROW
BEGIN
    DECLARE v_nombre VARCHAR(50);
    DECLARE v_descripcion VARCHAR(50);
    DECLARE v_precio DECIMAL(10,2);
    
    SELECT nombre, descripcion, precio INTO v_nombre, v_descripcion, v_precio
    FROM menu
    WHERE id = NEW.id_menu;
    
    SET NEW.nombre = v_nombre;
    SET NEW.descripcion = v_descripcion;
    SET NEW.precio = v_precio;
END//
DELIMITER ;



INSERT INTO orden (`fecha`, `estado`, `id_mesa`, `id_personal`, `id_menu`) VALUES (curdate(), 'pedida', '1', '1', '1');
INSERT INTO orden (`fecha`, `estado`, `id_mesa`, `id_personal`, `id_menu`) VALUES ("2024/12/12", 'pedida', '1', '1', '1');

