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
   	nombreProd varchar(64) not null,
	precio int,
	srcImgProd varchar(255),
	srcUrlProd varchar(255),
	idMed int not null,
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
	idHist int not null primary key auto_increment,
   	idMed int not null,
	idUser int not null,
	FOREIGN KEY (idMed)REFERENCES medicamento(idMed),
	FOREIGN KEY (idUser)REFERENCES users(idUser)
);