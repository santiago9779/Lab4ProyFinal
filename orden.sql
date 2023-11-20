use restaurante;

insert into orden (fecha,cantidad,estado,id_mesa,id_personal,id_menu)
values
(curdate(),1,'pedido',1,1,1),
(curdate(),2,'pedido',3,2,3)
;