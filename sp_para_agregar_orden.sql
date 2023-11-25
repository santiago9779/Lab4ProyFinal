use mydb;

-- FUNCIONA...

DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_agregar_orden`(
in idmesa int,
in idpersonal int,
in idmenu int
)
BEGIN

    DECLARE v_nombre VARCHAR(50);
    DECLARE v_descripcion VARCHAR(50);
    DECLARE v_precio DECIMAL(10,2);

    SELECT nombre, descripcion, precio
    INTO v_nombre, v_descripcion, v_precio
    FROM menu
    WHERE id = idmenu;

    INSERT INTO orden (fecha, estado, nombre, descripcion, precio)
    VALUES (CURDATE(), 'PEDIDO', v_nombre, v_descripcion, v_precio);
END //
DELIMITER ;

/*
-- NO FUNCIONNAA...

drop procedure sp_agregar_orden;
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_agregar_orden`(
in idmesa int,
in idpersonal int,
in idmenu int
)
BEGIN
    -- Inserta un nuevo registro en la tabla orden
    INSERT INTO orden (fecha, estado, nombre, descripcion, precio)
    VALUES (
    CURDATE(),
    "PEDIDO",
    (select m.nombre from menu as m join ordenmenu as om on m.id = om.idmenu join orden as o on o.id = om.idorden where m.id = idmenu),
    (select m.descripcion from menu as m join ordenmenu as om on m.id = om.idmenu join orden as o on o.id = om.idorden where m.id = idmenu),
    (select m.precio from menu as m join ordenmenu as om on m.id = om.idmenu join orden as o on o.id = om.idorden where m.id = idmenu)
    )
    ;
END //
DELIMITER ;

"/



