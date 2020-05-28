drop database if exists medic;
create database medic;
use medic;
drop table if exists user;
create table users (
	idUser int not null primary key auto_increment,
    username varchar(32) not null,
    email varchar(32) not null,
    pass varchar(32) not null,
    created_on datetime not null default current_timestamp
);
