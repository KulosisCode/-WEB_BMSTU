--Rooms
create table if not exists Rooms(
	id serial primary key, 
	number int not null,
	priceperday int not null,
	status integer not null
);

insert into Rooms(number, priceperday,status) values 
				(102, 1000,0), 
				(203, 2000,0),
				(305, 500,1),
				(360, 2500,2),
				(115, 2000,1);

--delete from Rooms where number = 203;
--update Rooms set number = 201, priceperday = 3000, status = 'None' where id_room = 1;
--
--update Rooms
--set status =  
--CASE  
--	when status = 'Free' then 'Busy' 
--	when status = 'Busy' then 'Free'
--	else 'Free' 
--END --where id_room = 2;
--
--delete from Rooms where id_room = 3;
--
--update Rooms 
--set number = 203,
--	status = 'Free'
--where id_room  = 2;


--User
create table if not exists Users(
	id serial primary key,
	login varchar not null,
	password varchar not null,
	role integer not null
);

insert into Users(login, password, role) values
	('guest', 'guest',   2),
	('kulosis', 'pass01',   2),
	('John', 'passabc',   2),
	('staff',   'staff',   1),
	('staff01',   'hotelabc',   1),
	('staff02',   'stafftion',   1),
	('admin',   'admin', 0);


--Guest
create table if not exists Guests(
	id serial primary key,
	id_login int,
--	foreign key (id_login) references Users(id),
	name varchar not null,
	age int not null,
	email varchar not null,
	address varchar not null
);
insert into Guests(id_login, name, age, email, address) values
	(1, 'Alex', 20, 'alex@mail.com', 'Moscow'),
	(2, 'Huntress', 23, 'huntress@mail.com','NewYork'),
	(3, 'Clock', 25, 'clock@mail.com','HaNoi');


--copy Guests
--from 'D:\PROGRAM\HK5\DB\LAB1\csv\oguest.csv'
--delimiter ',' csv;

--Staffs

create table if not exists Staffs(
	id serial primary key,
	id_login int,
--	foreign key (id_login) references Users(id),
	name varchar not null,
	age int not null,
	email varchar not null,
	address varchar not null
);

insert into Staffs(id_login, name, age, email, address) values
	(4, 'Staff_01', 20, 'hotel@mail.com', 'London'),
	(5, 'Staff_02', 23, 'booking@mail.com','LA'),
	(6, 'Staff_03', 25, 'hotelnow@mail.com', 'Moscow');


--Request

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
insert into Requests(id_guest, id_room, price, timeIn, timeOut, status) values
	(1, 1, 1000,'2023-01-01', '2023-01-02', 1),
	(2, 3, 1000,'2023-03-03', '2023-03-05', 0),
	(3, 2, 10000,'2023-05-03', '2023-05-08', 2),
	(1, 5, 4000,'2023-05-03', '2023-05-05', 1),
	(3, 4, 10000,'2023-06-03', '2023-06-07', 0);



--History

create table if not exists Histories(
	id serial primary key,
	id_request int not null,
	id_staff int not null,
--	foreign key (id_request) references Requests(id),
--	foreign key (id_staff) references Staffs(id),
	timeAdded date not null
);
insert into Histories(id_request, id_staff, timeAdded) values
	(1, 2, '2023-01-01'),
	(4, 1, '2023-05-03');


--CREATE ROLE guest LOGIN PASSWORD 'postgres';
--GRANT SELECT ON TABLE "Rooms" TO guest;
--
--CREATE ROLE staff LOGIN PASSWORD 'postgres';
--GRANT SELECT ON TABLE "Rooms", "Requests", "Histories" TO staff;
--
--CREATE ROLE admin LOGIN PASSWORD 'postgres';
--GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin;