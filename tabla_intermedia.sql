use mydb;

-- elimia relacion entre orden y mesa
ALTER TABLE `mydb`.`orden` 
DROP FOREIGN KEY `fk_orden_mesas`;
ALTER TABLE `mydb`.`orden` 
DROP COLUMN `id_mesa`,
DROP INDEX `fk_orden_mesas_idx` ;
;

-- elimina relacion entre mesa y orden
ALTER TABLE `mydb`.`mesas` 
DROP FOREIGN KEY `fk_mesas_orden`;
ALTER TABLE `mydb`.`mesas` 
DROP COLUMN `id_orden`,
DROP INDEX `fk_mesas_idorden_idx` ;
;

-- Crear la tabla intermedia orden_mesas
CREATE TABLE IF NOT EXISTS `mydb`.`orden_mesas` (
  `id_orden` INT NOT NULL,
  `id_mesas` INT NOT NULL,
  PRIMARY KEY (`id_orden`, `id_mesas`)
) ENGINE = InnoDB;

-- Establecer la relación con la tabla orden
ALTER TABLE `mydb`.`orden_mesas`
ADD CONSTRAINT `fk_orden_mesas`
FOREIGN KEY (`id_orden`)
REFERENCES `mydb`.`orden` (`id`)
ON DELETE CASCADE
ON UPDATE CASCADE;

-- Establecer la relación con la tabla mesas
ALTER TABLE `mydb`.`orden_mesas`
ADD CONSTRAINT `fk_mesas_orden_mesas`
FOREIGN KEY (`id_mesas`)
REFERENCES `mydb`.`mesas` (`id`)
ON DELETE CASCADE
ON UPDATE CASCADE;

