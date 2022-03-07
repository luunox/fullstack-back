-- create database clientes_knox

use clientes_knox

create table clientes_knox.users(
  id int not null AUTO_INCREMENT,
  nombres varchar(16) not null,
  apellidos varchar(16) not null,
  nacimiento date not null default(CURRENT_DATE),
  ultima_edicion datetime(6) default current_timestamp(6) on update current_timestamp(6),
  primary key (id)
)

-- alter table users
--   add primary key (id)

-- alter table users
--   modify id int(11) not null AUTO_INCREMENT, AUTO_INCREMENT = 1
