/*TABLA ROLES*/
INSERT INTO public.roles(id, nombre, estado, "createdAt", "updatedAt") VALUES (1, 'admin', 1, current_timestamp, current_timestamp);
INSERT INTO public.roles(id, nombre, estado, "createdAt", "updatedAt") VALUES (2, 'usuario', 1, current_timestamp, current_timestamp);
INSERT INTO public.roles(id, nombre, estado, "createdAt", "updatedAt") VALUES (3, 'director', 1, current_timestamp, current_timestamp);
INSERT INTO public.roles(id, nombre, estado, "createdAt", "updatedAt") VALUES (4, 'asistente', 1, current_timestamp, current_timestamp);
INSERT INTO public.roles(id, nombre, estado, "createdAt", "updatedAt") VALUES (5, 'curador', 1, current_timestamp, current_timestamp);

/*TABLA TIPOS*/
INSERT INTO public.tipos(id, nombre, estado, "createdAt", "updatedAt") VALUES (1, 'Pintura', 1, current_timestamp, current_timestamp);
INSERT INTO public.tipos(id, nombre, estado, "createdAt", "updatedAt") VALUES (2, 'Escultura', 1, current_timestamp, current_timestamp);
INSERT INTO public.tipos(id, nombre, estado, "createdAt", "updatedAt") VALUES (3, 'Retablo', 1, current_timestamp, current_timestamp);
INSERT INTO public.tipos(id, nombre, estado, "createdAt", "updatedAt") VALUES (4, 'Mobiliario', 1, current_timestamp, current_timestamp);
INSERT INTO public.tipos(id, nombre, estado, "createdAt", "updatedAt") VALUES (5, 'Decoración mural', 1, current_timestamp, current_timestamp);
INSERT INTO public.tipos(id, nombre, estado, "createdAt", "updatedAt") VALUES (6, 'Instrumento musical', 1, current_timestamp, current_timestamp);
INSERT INTO public.tipos(id, nombre, estado, "createdAt", "updatedAt") VALUES (7, 'Piedra tallada', 1, current_timestamp, current_timestamp);
INSERT INTO public.tipos(id, nombre, estado, "createdAt", "updatedAt") VALUES (8, 'Metalurgia', 1, current_timestamp, current_timestamp);
INSERT INTO public.tipos(id, nombre, estado, "createdAt", "updatedAt") VALUES (9, 'Objeto utilitario', 1, current_timestamp, current_timestamp);
INSERT INTO public.tipos(id, nombre, estado, "createdAt", "updatedAt") VALUES (10, 'Documento', 1, current_timestamp, current_timestamp);
INSERT INTO public.tipos(id, nombre, estado, "createdAt", "updatedAt") VALUES (11, 'Equipamiento industrial', 1, current_timestamp, current_timestamp);
INSERT INTO public.tipos(id, nombre, estado, "createdAt", "updatedAt") VALUES (12, 'Textil', 1, current_timestamp, current_timestamp);
INSERT INTO public.tipos(id, nombre, estado, "createdAt", "updatedAt") VALUES (13, 'Orfebrería', 1, current_timestamp, current_timestamp);
INSERT INTO public.tipos(id, nombre, estado, "createdAt", "updatedAt") VALUES (14, 'Cerámica', 1, current_timestamp, current_timestamp);
INSERT INTO public.tipos(id, nombre, estado, "createdAt", "updatedAt") VALUES (15, 'Cerrajería', 1, current_timestamp, current_timestamp);
INSERT INTO public.tipos(id, nombre, estado, "createdAt", "updatedAt") VALUES (16, 'Cristalería', 1, current_timestamp, current_timestamp);
INSERT INTO public.tipos(id, nombre, estado, "createdAt", "updatedAt") VALUES (17, 'Imaginería', 1, current_timestamp, current_timestamp);
INSERT INTO public.tipos(id, nombre, estado, "createdAt", "updatedAt") VALUES (18, 'Juguetería', 1, current_timestamp, current_timestamp);
INSERT INTO public.tipos(id, nombre, estado, "createdAt", "updatedAt") VALUES (19, 'Litrografía', 1, current_timestamp, current_timestamp);
INSERT INTO public.tipos(id, nombre, estado, "createdAt", "updatedAt") VALUES (20, 'Ornamento', 1, current_timestamp, current_timestamp);
INSERT INTO public.tipos(id, nombre, estado, "createdAt", "updatedAt") VALUES (21, 'Papel', 1, current_timestamp, current_timestamp);
INSERT INTO public.tipos(id, nombre, estado, "createdAt", "updatedAt") VALUES (22, 'Porcelana', 1, current_timestamp, current_timestamp);
INSERT INTO public.tipos(id, nombre, estado, "createdAt", "updatedAt") VALUES (23, 'No especificado', 1, current_timestamp, current_timestamp);

/*TABLA MATERIALES*/
INSERT INTO public.materiales(id, nombre, estado, "createdAt", "updatedAt")VALUES (1, 'Metal', 1, current_timestamp, current_timestamp);
INSERT INTO public.materiales(id, nombre, estado, "createdAt", "updatedAt")VALUES (2, 'Hueso', 1, current_timestamp, current_timestamp);
INSERT INTO public.materiales(id, nombre, estado, "createdAt", "updatedAt")VALUES (3, 'Madera', 1, current_timestamp, current_timestamp);
INSERT INTO public.materiales(id, nombre, estado, "createdAt", "updatedAt")VALUES (4, 'Tela', 1, current_timestamp, current_timestamp);
INSERT INTO public.materiales(id, nombre, estado, "createdAt", "updatedAt")VALUES (5, 'Piedra', 1, current_timestamp, current_timestamp);
INSERT INTO public.materiales(id, nombre, estado, "createdAt", "updatedAt")VALUES (6, 'Cerámica', 1, current_timestamp, current_timestamp);
INSERT INTO public.materiales(id, nombre, estado, "createdAt", "updatedAt")VALUES (7, 'Papel', 1, current_timestamp, current_timestamp);
INSERT INTO public.materiales(id, nombre, estado, "createdAt", "updatedAt")VALUES (8, 'Vidrio', 1, current_timestamp, current_timestamp);
INSERT INTO public.materiales(id, nombre, estado, "createdAt", "updatedAt")VALUES (9, 'Marfil', 1, current_timestamp, current_timestamp);
INSERT INTO public.materiales(id, nombre, estado, "createdAt", "updatedAt")VALUES (10, 'Cuero', 1, current_timestamp, current_timestamp);

/*TABLA TECNICAS*/
INSERT INTO public.tecnicas (id, nombre, estado, "createdAt", "updatedAt") VALUES (1, 'Óleo sobre lienzo', 1, current_timestamp, current_timestamp);
INSERT INTO public.tecnicas (id, nombre, estado, "createdAt", "updatedAt") VALUES (2, 'Óleo sobre madera', 1, current_timestamp, current_timestamp);
INSERT INTO public.tecnicas (id, nombre, estado, "createdAt", "updatedAt") VALUES (3, 'Óleo sobre mármol', 1, current_timestamp, current_timestamp);
INSERT INTO public.tecnicas (id, nombre, estado, "createdAt", "updatedAt") VALUES (4, 'Óleo sobre tela', 1, current_timestamp, current_timestamp);

/*TABLA ESTADO_INTEGRIDADES*/
INSERT INTO public.estado_integridades (id, nombre, estado, "createdAt", "updatedAt") VALUES (1, 'Completo', 1, current_timestamp, current_timestamp);
INSERT INTO public.estado_integridades (id, nombre, estado, "createdAt", "updatedAt") VALUES (2, 'Incompleto', 1, current_timestamp, current_timestamp);
INSERT INTO public.estado_integridades (id, nombre, estado, "createdAt", "updatedAt") VALUES (3, 'Fragmento', 1, current_timestamp, current_timestamp);
INSERT INTO public.estado_integridades (id, nombre, estado, "createdAt", "updatedAt") VALUES (4, 'No especificado', 1, current_timestamp, current_timestamp);

/*TABLA ESTADO_PIEZAS*/
INSERT INTO public.estado_piezas (id, nombre, estado, "createdAt", "updatedAt") VALUES (1, 'Bueno', 1, current_timestamp, current_timestamp);
INSERT INTO public.estado_piezas (id, nombre, estado, "createdAt", "updatedAt") VALUES (2, 'Regular', 1, current_timestamp, current_timestamp);
INSERT INTO public.estado_piezas (id, nombre, estado, "createdAt", "updatedAt") VALUES (3, 'Malo', 1, current_timestamp, current_timestamp);
INSERT INTO public.estado_piezas (id, nombre, estado, "createdAt", "updatedAt") VALUES (4, 'No especificado', 1, current_timestamp, current_timestamp);

/*TABLA OPCION_DETERIOROS*/
INSERT INTO public.opcion_deterioros (id, nombre, estado, "createdAt", "updatedAt") VALUES (1, 'abolsados', 1, current_timestamp, current_timestamp);
INSERT INTO public.opcion_deterioros (id, nombre, estado, "createdAt", "updatedAt") VALUES (2, 'craquelados', 1, current_timestamp, current_timestamp);
INSERT INTO public.opcion_deterioros (id, nombre, estado, "createdAt", "updatedAt") VALUES (3, 'deformaciones', 1, current_timestamp, current_timestamp);
INSERT INTO public.opcion_deterioros (id, nombre, estado, "createdAt", "updatedAt") VALUES (4, 'descosidos', 1, current_timestamp, current_timestamp);
INSERT INTO public.opcion_deterioros (id, nombre, estado, "createdAt", "updatedAt") VALUES (5, 'desfases', 1, current_timestamp, current_timestamp);
INSERT INTO public.opcion_deterioros (id, nombre, estado, "createdAt", "updatedAt") VALUES (6, 'desgastes', 1, current_timestamp, current_timestamp);
INSERT INTO public.opcion_deterioros (id, nombre, estado, "createdAt", "updatedAt") VALUES (7, 'destensados', 1, current_timestamp, current_timestamp);
INSERT INTO public.opcion_deterioros (id, nombre, estado, "createdAt", "updatedAt") VALUES (8, 'dobleces', 1, current_timestamp, current_timestamp);
INSERT INTO public.opcion_deterioros (id, nombre, estado, "createdAt", "updatedAt") VALUES (9, 'exfoliaciones', 1, current_timestamp, current_timestamp);
INSERT INTO public.opcion_deterioros (id, nombre, estado, "createdAt", "updatedAt") VALUES (10, 'falta de adhesión', 11, current_timestamp, current_timestamp);
INSERT INTO public.opcion_deterioros (id, nombre, estado, "createdAt", "updatedAt") VALUES (11, 'faltantes soporte', 1, current_timestamp, current_timestamp);
INSERT INTO public.opcion_deterioros (id, nombre, estado, "createdAt", "updatedAt") VALUES (12, 'fracturas', 1, current_timestamp, current_timestamp);
INSERT INTO public.opcion_deterioros (id, nombre, estado, "createdAt", "updatedAt") VALUES (13, 'golpes', 1, current_timestamp, current_timestamp);
INSERT INTO public.opcion_deterioros (id, nombre, estado, "createdAt", "updatedAt") VALUES (14, 'grietas', 1, current_timestamp, current_timestamp);
INSERT INTO public.opcion_deterioros (id, nombre, estado, "createdAt", "updatedAt") VALUES (15, 'insectos', 1, current_timestamp, current_timestamp);
INSERT INTO public.opcion_deterioros (id, nombre, estado, "createdAt", "updatedAt") VALUES (16, 'lagunas', 1, current_timestamp, current_timestamp);
INSERT INTO public.opcion_deterioros (id, nombre, estado, "createdAt", "updatedAt") VALUES (17, 'manchas', 1, current_timestamp, current_timestamp);
INSERT INTO public.opcion_deterioros (id, nombre, estado, "createdAt", "updatedAt") VALUES (18, 'marcas', 1, current_timestamp, current_timestamp);
INSERT INTO public.opcion_deterioros (id, nombre, estado, "createdAt", "updatedAt") VALUES (19, 'microorganismos', 1, current_timestamp, current_timestamp);
INSERT INTO public.opcion_deterioros (id, nombre, estado, "createdAt", "updatedAt") VALUES (20, 'oxidación', 1, current_timestamp, current_timestamp);
INSERT INTO public.opcion_deterioros (id, nombre, estado, "createdAt", "updatedAt") VALUES (21, 'pasmados', 1, current_timestamp, current_timestamp);
INSERT INTO public.opcion_deterioros (id, nombre, estado, "createdAt", "updatedAt") VALUES (22, 'quemaduras', 1, current_timestamp, current_timestamp);
INSERT INTO public.opcion_deterioros (id, nombre, estado, "createdAt", "updatedAt") VALUES (23, 'rasgaduras', 1, current_timestamp, current_timestamp);
INSERT INTO public.opcion_deterioros (id, nombre, estado, "createdAt", "updatedAt") VALUES (24, 'rayaduras', 1, current_timestamp, current_timestamp);
INSERT INTO public.opcion_deterioros (id, nombre, estado, "createdAt", "updatedAt") VALUES (25, 'roturas', 1, current_timestamp, current_timestamp);
INSERT INTO public.opcion_deterioros (id, nombre, estado, "createdAt", "updatedAt") VALUES (26, 'sales', 1, current_timestamp, current_timestamp);
INSERT INTO public.opcion_deterioros (id, nombre, estado, "createdAt", "updatedAt") VALUES (27, 'sobrepintura', 1, current_timestamp, current_timestamp);
INSERT INTO public.opcion_deterioros (id, nombre, estado, "createdAt", "updatedAt") VALUES (28, 'Otros', 1, current_timestamp, current_timestamp);

/*TABLA PAISES*/
INSERT INTO public.paises VALUES(1, 'AF', 'Afganistán' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(2, 'AX', 'Islas Gland' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(3, 'AL', 'Albania' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(4, 'DE', 'Alemania' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(5, 'AD', 'Andorra' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(6, 'AO', 'Angola' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(7, 'AI', 'Anguilla' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(8, 'AQ', 'Antártida' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(9, 'AG', 'Antigua y Barbuda' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(10, 'AN', 'Antillas Holandesas' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(11, 'SA', 'Arabia Saudí' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(12, 'DZ', 'Argelia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(13, 'AR', 'Argentina' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(14, 'AM', 'Armenia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(15, 'AW', 'Aruba' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(16, 'AU', 'Australia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(17, 'AT', 'Austria' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(18, 'AZ', 'Azerbaiyán' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(19, 'BS', 'Bahamas' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(20, 'BH', 'Bahréin' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(21, 'BD', 'Bangladesh' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(22, 'BB', 'Barbados' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(23, 'BY', 'Bielorrusia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(24, 'BE', 'Bélgica' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(25, 'BZ', 'Belice' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(26, 'BJ', 'Benin' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(27, 'BM', 'Bermudas' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(28, 'BT', 'Bhután' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(29, 'BO', 'Bolivia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(30, 'BA', 'Bosnia y Herzegovina' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(31, 'BW', 'Botsuana' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(32, 'BV', 'Isla Bouvet' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(33, 'BR', 'Brasil' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(34, 'BN', 'Brunéi' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(35, 'BG', 'Bulgaria' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(36, 'BF', 'Burkina Faso' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(37, 'BI', 'Burundi' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(38, 'CV', 'Cabo Verde' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(39, 'KY', 'Islas Caimán' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(40, 'KH', 'Camboya' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(41, 'CM', 'Camerún' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(42, 'CA', 'Canadá' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(43, 'CF', 'República Centroafricana' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(44, 'TD', 'Chad' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(45, 'CZ', 'República Checa' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(46, 'CL', 'Chile' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(47, 'CN', 'China' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(48, 'CY', 'Chipre' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(49, 'CX', 'Isla de Navidad' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(50, 'VA', 'Ciudad del Vaticano' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(51, 'CC', 'Islas Cocos' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(52, 'CO', 'Colombia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(53, 'KM', 'Comoras' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(54, 'CD', 'República Democrática del Congo' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(55, 'CG', 'Congo' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(56, 'CK', 'Islas Cook' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(57, 'KP', 'Corea del Norte' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(58, 'KR', 'Corea del Sur' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(59, 'CI', 'Costa de Marfil' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(60, 'CR', 'Costa Rica' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(61, 'HR', 'Croacia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(62, 'CU', 'Cuba' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(63, 'DK', 'Dinamarca' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(64, 'DM', 'Dominica' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(65, 'DO', 'República Dominicana' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(66, 'EC', 'Ecuador' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(67, 'EG', 'Egipto' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(68, 'SV', 'El Salvador' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(69, 'AE', 'Emiratos Árabes Unidos' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(70, 'ER', 'Eritrea' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(71, 'SK', 'Eslovaquia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(72, 'SI', 'Eslovenia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(73, 'ES', 'España' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(74, 'UM', 'Islas ultramarinas de Estados Unidos' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(75, 'US', 'Estados Unidos' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(76, 'EE', 'Estonia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(77, 'ET', 'Etiopía' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(78, 'FO', 'Islas Feroe' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(79, 'PH', 'Filipinas' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(80, 'FI', 'Finlandia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(81, 'FJ', 'Fiyi' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(82, 'FR', 'Francia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(83, 'GA', 'Gabón' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(84, 'GM', 'Gambia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(85, 'GE', 'Georgia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(86, 'GS', 'Islas Georgias del Sur y Sandwich del Sur' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(87, 'GH', 'Ghana' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(88, 'GI', 'Gibraltar' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(89, 'GD', 'Granada' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(90, 'GR', 'Grecia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(91, 'GL', 'Groenlandia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(92, 'GP', 'Guadalupe' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(93, 'GU', 'Guam' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(94, 'GT', 'Guatemala' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(95, 'GF', 'Guayana Francesa' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(96, 'GN', 'Guinea' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(97, 'GQ', 'Guinea Ecuatorial' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(98, 'GW', 'Guinea-Bissau' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(99, 'GY', 'Guyana' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(100, 'HT', 'Haití' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(101, 'HM', 'Islas Heard y McDonald' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(102, 'HN', 'Honduras' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(103, 'HK', 'Hong Kong' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(104, 'HU', 'Hungría' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(105, 'IN', 'India' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(106, 'ID', 'Indonesia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(107, 'IR', 'Irán' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(108, 'IQ', 'Iraq' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(109, 'IE', 'Irlanda' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(110, 'IS', 'Islandia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(111, 'IL', 'Israel' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(112, 'IT', 'Italia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(113, 'JM', 'Jamaica' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(114, 'JP', 'Japón' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(115, 'JO', 'Jordania' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(116, 'KZ', 'Kazajstán' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(117, 'KE', 'Kenia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(118, 'KG', 'Kirguistán' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(119, 'KI', 'Kiribati' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(120, 'KW', 'Kuwait' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(121, 'LA', 'Laos' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(122, 'LS', 'Lesotho' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(123, 'LV', 'Letonia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(124, 'LB', 'Líbano' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(125, 'LR', 'Liberia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(126, 'LY', 'Libia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(127, 'LI', 'Liechtenstein' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(128, 'LT', 'Lituania' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(129, 'LU', 'Luxemburgo' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(130, 'MO', 'Macao' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(131, 'MK', 'ARY Macedonia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(132, 'MG', 'Madagascar' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(133, 'MY', 'Malasia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(134, 'MW', 'Malawi' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(135, 'MV', 'Maldivas' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(136, 'ML', 'Malí' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(137, 'MT', 'Malta' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(138, 'FK', 'Islas Malvinas' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(139, 'MP', 'Islas Marianas del Norte' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(140, 'MA', 'Marruecos' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(141, 'MH', 'Islas Marshall' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(142, 'MQ', 'Martinica' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(143, 'MU', 'Mauricio' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(144, 'MR', 'Mauritania' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(145, 'YT', 'Mayotte' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(146, 'MX', 'México' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(147, 'FM', 'Micronesia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(148, 'MD', 'Moldavia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(149, 'MC', 'Mónaco' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(150, 'MN', 'Mongolia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(151, 'MS', 'Montserrat' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(152, 'MZ', 'Mozambique' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(153, 'MM', 'Myanmar' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(154, 'NA', 'Namibia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(155, 'NR', 'Nauru' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(156, 'NP', 'Nepal' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(157, 'NI', 'Nicaragua' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(158, 'NE', 'Níger' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(159, 'NG', 'Nigeria' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(160, 'NU', 'Niue' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(161, 'NF', 'Isla Norfolk' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(162, 'NO', 'Noruega' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(163, 'NC', 'Nueva Caledonia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(164, 'NZ', 'Nueva Zelanda' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(165, 'OM', 'Omán' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(166, 'NL', 'Países Bajos' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(167, 'PK', 'Pakistán' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(168, 'PW', 'Palau' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(169, 'PS', 'Palestina' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(170, 'PA', 'Panamá' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(171, 'PG', 'Papúa Nueva Guinea' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(172, 'PY', 'Paraguay' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(173, 'PE', 'Perú' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(174, 'PN', 'Islas Pitcairn' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(175, 'PF', 'Polinesia Francesa' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(176, 'PL', 'Polonia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(177, 'PT', 'Portugal' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(178, 'PR', 'Puerto Rico' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(179, 'QA', 'Qatar' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(180, 'GB', 'Reino Unido' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(181, 'RE', 'Reunión' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(182, 'RW', 'Ruanda' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(183, 'RO', 'Rumania' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(184, 'RU', 'Rusia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(185, 'EH', 'Sahara Occidental' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(186, 'SB', 'Islas Salomón' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(187, 'WS', 'Samoa' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(188, 'AS', 'Samoa Americana' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(189, 'KN', 'San Cristóbal y Nevis' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(190, 'SM', 'San Marino' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(191, 'PM', 'San Pedro y Miquelón' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(192, 'VC', 'San Vicente y las Granadinas' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(193, 'SH', 'Santa Helena' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(194, 'LC', 'Santa Lucía' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(195, 'ST', 'Santo Tomé y Príncipe' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(196, 'SN', 'Senegal' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(197, 'CS', 'Serbia y Montenegro' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(198, 'SC', 'Seychelles' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(199, 'SL', 'Sierra Leona' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(200, 'SG', 'Singapur' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(201, 'SY', 'Siria' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(202, 'SO', 'Somalia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(203, 'LK', 'Sri Lanka' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(204, 'SZ', 'Suazilandia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(205, 'ZA', 'Sudáfrica' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(206, 'SD', 'Sudán' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(207, 'SE', 'Suecia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(208, 'CH', 'Suiza' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(209, 'SR', 'Surinam' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(210, 'SJ', 'Svalbard y Jan Mayen' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(211, 'TH', 'Tailandia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(212, 'TW', 'Taiwán' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(213, 'TZ', 'Tanzania' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(214, 'TJ', 'Tayikistán' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(215, 'IO', 'Territorio Británico del Océano Índico' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(216, 'TF', 'Territorios Australes Franceses' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(217, 'TL', 'Timor Oriental' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(218, 'TG', 'Togo' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(219, 'TK', 'Tokelau' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(220, 'TO', 'Tonga' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(221, 'TT', 'Trinidad y Tobago' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(222, 'TN', 'Túnez' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(223, 'TC', 'Islas Turcas y Caicos' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(224, 'TM', 'Turkmenistán' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(225, 'TR', 'Turquía' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(226, 'TV', 'Tuvalu' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(227, 'UA', 'Ucrania' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(228, 'UG', 'Uganda' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(229, 'UY', 'Uruguay' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(230, 'UZ', 'Uzbekistán' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(231, 'VU', 'Vanuatu' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(232, 'VE', 'Venezuela' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(233, 'VN', 'Vietnam' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(234, 'VG', 'Islas Vírgenes Británicas' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(235, 'VI', 'Islas Vírgenes de los Estados Unidos' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(236, 'WF', 'Wallis y Futuna' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(237, 'YE', 'Yemen' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(238, 'DJ', 'Yibuti' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(239, 'ZM', 'Zambia' , 1, current_timestamp, current_timestamp);
INSERT INTO public.paises VALUES(240, 'ZW', 'Zimbabue' , 1, current_timestamp, current_timestamp);

/*TABLA MESES*/
INSERT INTO public.meses (id, nombre, "createdAt", "updatedAt") VALUES
(1, 'Enero', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Febrero', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Marzo', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Abril', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'Mayo', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'Junio', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'Julio', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'Agosto', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 'Septiembre', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10, 'Octubre', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(11, 'Noviembre', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(12, 'Diciembre', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

/*TABLA PUNTUACIONES*/
INSERT INTO public.puntuaciones (id, nombre, "createdAt", "updatedAt") VALUES
(1, 'Uno', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Dos', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Tres', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Cuatro', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'Cinco', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);