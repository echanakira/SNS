drop table message;
drop table publisher;
drop table reader;
drop table category;
drop table subcategory;
drop table readercategory;


create table publisher(
                name varchar2(1024),
                email varchar(100),
                password varchar(50),
                primary key(name));
create table reader(

                    name varchar2(1024),
                    email varchar(100),
                    password varchar(50),
                    primary key(name));
                
create table category(
                    
                    name varchar(1024),
                    primary key(name));

create table subcategory(
                         name varchar(1024),
                         parent_cat_id varchar2(1024),
                         primary key(name),
                         foreign key(parent_cat_id) references category);

create table message(
                    mid varchar(1024),
                    content varchar2(1024),
                    time_entered timestamp(0),
                    start_time timestamp(0),
                    end_time timestamp(0),
                    longitude decimal,
                    latitude decimal,
                    extend1 number(10,0),         
                    publisher_id varchar2(1024),
                    primary key(publisher_id, time_entered), 
                    foreign key(publisher_id) references publisher);
					
--If some categories are not activated by the user, the archive table is used					
/*
create table archive(mid varchar(1024), 
                    content varchar2(1024),
                    time_entered timestamp(0),
                    start_time timestamp(0),
                    end_time timestamp(0),
                    longitude decimal,
                    latitude decimal,
                    extend1 number(10,0),
                    publisher_id number(10,0),
                    primary key(mid), 
                    foreign key(publisher_id) references publisher,
                    foreign key(cat_id) references category,
                    foreign key(sub_id) references subcategory);
*/
create table readercategory(
                    rid varchar(1024),
                    cat_id varchar(1024),
                    sub_id varchar(1024),
                    primary key(rid, cat_id,sub_id),
                    foreign key(rid) references reader,
                    foreign key(cat_id) references category,
                    foreign key(sub_id) references subcategory);
					
create table messagecategory(
                    mid varchar(1024),
                    cat_id varchar(1024),
                    sub_id varchar(1024),
                    primary key(mid, cat_id, sub_id),
                    foreign key(mid) references message,
                    foreign key(cat_id) references category,
                    foreign key(sub_id) references subcategory
                    );


insert into publisher values ('person1','person1@sns.com','person1');
insert into reader values ('person101','person101@sns.com','person101');
insert into category values('Category1');
insert into subcategory values('Subcategory1','Category1');
insert into message values('Message01','content content','1960-1-01 23:03:20','1960-01-01 23:03:20','1960-01-01 23:03:20',
39.302597,-76.600559,1,'person1');
insert into readercategory values ('person101','Category1','Subcategory1');
insert into messagecategory values('Message01','Category1','Subcategory1');