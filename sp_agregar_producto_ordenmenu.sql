CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_agregar_producto_orden-menu`(
in id int,
in idorden int,
in cantidad int,
in precio decimal(11,2)
)
BEGIN
# Inserta un nuevo registro en la tabla orden-menu
INSERT INTO ordenmenu( idorden,idmenu, cantidad, precio) VALUE( idorden, idmenu, cantidad, precio);
# Consulta que devuelve el detalle de la factura, es decir todos los items cargados hasta el momento
SELECT om.idorden, om.idmenu, om.cantidad AS Cantidad, concat(menu.nombre, "", menu.descripcion) AS Detalle,
round(om.precio*om.cantidad, 2) AS Importe
FROM menu
INNER JOIN ordenmenu om ON menu.id=om.idmenu
INNER JOIN orden o ON om.idorden=o.id
WHERE om.idorden=orden.id;
END