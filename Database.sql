drop table message;
drop table publisher;
drop table reader;
drop table category;
drop table subcategory;
drop table readercategory;


create table publisher(
                id number(10,0),
                name varchar2(1024),
                email varchar(100),
                password varchar(50),
                primary key(id));
create table reader(
                    rid number(10,0),
                    name varchar2(1024),
                    email varchar(100),
                    password varchar(50),
                    primary key(rid));
                
create table category(
                    cid number(10,0),
                    name varchar2(1024),
                    primary key(cid));

create table subcategory(sid number(10,0),
                         name varchar2(1024),
                         parent_cat_id number(10,0),
                         primary key(sid),
                         foreign key(parent_cat_id) references category);

create table message(mid number(10,0),
                    content varchar2(1024),
                    time_entered number(10,0),
                    start_time number(10,0),
                    end_time number(10,0),
                    longitude decimal,
                    latitude decimal,
                    extend1 number(10,0),
                    cat_id number(10,0),
                    publisher_id number(10,0),
                    sub_id number(10,0),
                    primary key(mid), 
                    foreign key(publisher_id) references publisher,
                    foreign key(cat_id) references category,
                    foreign key(sub_id) references subcategory);
					
--If some categories are not activated by the user, the archive table is used					
/*
create table archive(mid number(10,0), 
                    content varchar2(1024),
                    time_entered number(10,0),
                    start_time number(10,0),
                    end_time number(10,0),
                    longitude decimal,
                    latitude decimal,
                    extend1 number(10,0),
                    cat_id number(10,0),
                    publisher_id number(10,0),
                    sub_id number(10,0),
                    primary key(mid), 
                    foreign key(publisher_id) references publisher,
                    foreign key(cat_id) references category,
                    foreign key(sub_id) references subcategory);
*/
create table readercategory(
                    rid number(10,0),
                    cid number(10,0),
                    sid number(10,0),
                    primary key(rid,cid,sid),
                    foreign key(rid) references reader,
                    foreign key(cid) references category,
                    foreign key(sid) references subcategory);
					
create table MessageCategory(
                    mid number(10,0),
                    cat_id number(10,0),
                    sub_cat number(10,0),
                    primary key(mid, cat_id, sub_cat),
                    foreign key(mid) references message,
                    foreign key(cat_id) references category
                    foreign key(sub_cat) references subcategory
                    );


insert into publisher values (1,'person1','person1@sns.com','person1');
insert into reader values (101,'person101','person101@sns.com','person101');
insert into category values(1,'Category1');
insert into subcategory values(1,'Subcategory1',1);
insert into message values(1,'content content',400,500,600,39.302597,-76.600559,1,1,1,1);
