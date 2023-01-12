INSERT INTO Users
VALUES
	(1, 'John', 'Doe', '+01 (541) 754-3010', 'john.doe@gallery.com', 'john', 'pbkdf2:sha256:150000$KKgd0xN5$d778b27800d8b89e001843285475a0da3f6f6c664ec8e8a9590ed1c49603b194', '/images/default_profile.png'),
	(2, 'Jane', 'Smith', '+34 678 387 155', 'jane.smith@gallery.com', 'jane', 'pbkdf2:sha256:150000$v4wgnaXC$b87f5daf437119c21ec712462f4b193b6fada27f485e36502c5cf4553a01f640', '/images/default_profile.png');
-- Password = username


INSERT INTO Photos
VALUES
	(1, 'Conan gray', 'Kid krow', 'Portada del disco Kid Krow, del cantante Conan Gray', '2012-05-12 18:25:43', '/images/Conan.png', 'Public', 1),
	(2, 'Libros de Brandom Sanderson', 'Viaje antes que destino', 'Portada de los tres primero libros de la saga "Archivos de las tormentas", de Brandom Sanderson', '2020-01-12 13:37:01', '/images/stormlight.jpg', 'Public', 2),
	(3, 'Wandavision', '"¿Qué es la pena si no el amor perseverante?"', 'Fotografía de la serie Wandavision, donde aparecen Billy, Tommy y Quicksilver', '2019-08-24 21:20:21', '/images/wv.jpg', 'Public', 1),
	(4, 'Spiderman: into the spiderverse', 'La última película que vi en el cine', 'Dibujo de la película Spiderman: into the Spiderverse, donde el Spiderman de Miles Morales cae del cielo', '2016-04-02 09:16:58', '/images/spiderman.jpg', 'Public', 2),
	(5, 'Maastricht', 'De viaje en Holanda', 'Fotografía de un puente de la ciudad de Maastricht al anochecer', '2016-04-02 09:16:58', '/images/maastricht.jpg', 'Public', 2);


-- Add some more data for your other tables...
INSERT INTO ratings
VALUES
	('2012-05-12 18:25:43', 1, 1, 1),
	('2012-05-12 18:25:43', 5, 2, 1);
	
INSERT INTO words
VALUES
	('puta', 1),
	('gilipollas', 2),
	('pollas', 3),
	('cabrón', 4),
	('coño', 5),
	('cojones', 6),
	('cabrona', 7),
	('puto', 8),
	('mamón', 9),
	('cojón', 10);
	
INSERT INTO words
VALUES
	('mierda', 11),
	('polla', 12),
	('putos', 13),
	('putas', 14),
	('cipote', 15),
	('truño', 16),
	('truños', 17),
	('mierdas', 18),
	('coños', 19);

	

INSERT INTO comments
VALUES
	(1, '2012-05-12 18:25:43', 'Muy buena fotografía', 1, 1),
	(2, '2012-05-12 18:25:43', 'Me encanta', 2, 1);
	
INSERT INTO categories
VALUES
	('arte'), ('geografía');
	
	
INSERT INTO photocategories
VALUES (1, 1, 'arte'), (2,2,'arte');

SELECT name from photocategories WHERE photoId=19;




SELECT * from photos where photoId IN (SELECT photoId FROM photocategories WHERE NAME='arte');