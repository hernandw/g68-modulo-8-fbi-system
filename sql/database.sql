create database fbi_system

create table users (
id serial primary key,
name varchar(50) not null,
email varchar(50) not null unique,
password varchar(60) not null,
createat timestamp with time zone default now()
);