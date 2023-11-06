drop table  if exists Rooms cascade;

drop table if exists Users cascade;

drop table if exists Guests cascade;

drop table if exists Staffs cascade;

drop table if exists Requests cascade;

drop table if exists Histories cascade;

create table if not exists Rooms(
	id serial primary key, 
	number int not null,
	priceperday int not null,
	status integer not null
);

create table if not exists Users(
	id serial primary key,
	login varchar not null,
	password varchar not null,
	role integer not null
);

create table if not exists Guests(
	id serial primary key,
	id_login int,
--	foreign key (id_login) references Users(id),
	name varchar not null,
	age int not null,
	email varchar not null,
	address varchar not null
);

create table if not exists Staffs(
	id serial primary key,
	id_login int,
--	foreign key (id_login) references Users(id),
	name varchar not null,
	age int not null,
	email varchar not null,
	address varchar not null
);

create table if not exists Requests(
	id serial primary key,
	id_guest int not null,
	id_room int not null,
--	foreign key (id_guest) references Guests(id),
--	foreign key (id_room) references Rooms(id_room),
	price int,
	timeIn date not null,
	timeOut date not null,
	status int not null	
);

create table if not exists Histories(
	id serial primary key,
	id_request int not null,
	id_staff int not null,
--	foreign key (id_request) references Requests(id),
--	foreign key (id_staff) references Staffs(id),
	timeAdded date not null
);