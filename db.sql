drop database if exists medic;
create database medic;
use medic;
drop table if exists users;
create table users (
	idUser int not null primary key auto_increment,
    username varchar(32) not null,
    email varchar(32) not null,
    pass varchar(32) not null,
    created_on datetime not null default current_timestamp
);

drop table if exists medicamento;
create table medicamento (
	idMed int not null primary key auto_increment,
    nombreMed varchar(32) not null
);

drop table if exists producto;
create table producto(
	idProd int not null primary key auto_increment,
   	nombreProd varchar(255) not null,
	precio varchar(16),
	srcImgProd varchar(300),
	srcUrlProd varchar(300),
	idMed int not null,
	tienda varchar(64),
	FOREIGN KEY (idMed)REFERENCES medicamento(idMed)
);


drop table if exists likes;
create table likes(
	idLike int not null primary key auto_increment,
   	idProd int not null,
	idUser int not null,
	FOREIGN KEY (idProd)REFERENCES producto(idProd),
	FOREIGN KEY (idUser)REFERENCES users(idUser)
);


drop table if exists historial;
create table historial(
    nombreMed varchar(128) not null,
   	idMed int not null,
	idUser int not null,
    lastSearch datetime not null default current_timestamp,
    primary key (idMed, idUser),
    FOREIGN KEY (idMed)REFERENCES medicamento(idMed),
	FOREIGN KEY (idUser)REFERENCES users(idUser)
);

insert into users (username, email, pass) values('joshuarocko', 'joshua.chirino@gmail.com', md5('12345'));

