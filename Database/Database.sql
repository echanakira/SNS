drop table message;
drop table publisher;
drop table reader;
drop table category;
--drop table subcategory;
drop table readercategory;
drop table messagecategory;

create table publisher(
                name varchar2(1024),
                email varchar(100),
                password varchar(50),
                primary key(name));
create table reader(

                    name varchar2(1024),
                    email varchar(100),
                    password varchar(50),
                    longitude decimal,
                    latitude decimal,
                    primary key(name));
                
/*create table readmessage(
                    reader_id varchar2(1024),
                    msg_id varchar(1024),
                    primary key(reader_id, msg_id),
                    foreign key(reader_id) references reader,
                    foreign key(msg_id) references message);*/
                    
create table category(
                    
                    name varchar(1024),
                    primary key(name));

/*create table subcategory(
                         name varchar(1024),
                         parent_cat_id varchar(1024),
                         primary key(name),
                         foreign key(parent_cat_id) references category);
*/
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
                    pic blob,
                    video blob,
                    primary key(mid), 
                    foreign key(publisher_id) references publisher);
					
--If some categories are not activated by the user, the archive table is used					

create table archive(mid varchar(1024), 
                    content varchar2(1024),
                    time_entered timestamp(0),
                    start_time timestamp(0),
                    end_time timestamp(0),
                    longitude decimal,
                    latitude decimal,
                    extend1 number(10,0),
                    publisher_id varchar2(1024),
                    pic blob,
                    video blob,
                    primary key(mid), 
                    foreign key(publisher_id) references publisher);
                    --foreign key(cat_id) references category);
                   -- foreign key(sub_id) references subcategory);

create table readercategory(
                    rid varchar(1024),
                    cat_id varchar(1024),
                    --sub_id varchar(1024),
                    primary key(rid, cat_id),--,sub_id),
                    foreign key(rid) references reader,
                    foreign key(cat_id) references category);
                    --foreign key(sub_id) references subcategory);
					
create table messagecategory(
                    mid varchar(1024),
                    cat_id varchar(1024),
                    --sub_id varchar(1024),
                    primary key(mid, cat_id),-- sub_id),
                    foreign key(mid) references message,
                    foreign key(cat_id) references category
                    --foreign key(sub_id) references subcategory
                    );
                    
                    
                    
/*Story 1. College park*/
/*Note: The order is Latitude/Longitude*/
/*UMD is the most important University in the world*/
/*Publisher: name: UMD
             email: umd@umd.edu
             password: umd*/
            
/*Message: mid: "UMD is the most important University in the world"
           content: "This is the message of the title"
           time entered:2018-12-12 10:10:10
           start time:2018-12-12 10:10:11
           end time: 2018-12-12 10:11:10
           38.987620, -76.940164
           longitude: -76.940164
           latitude: 38.987620
           extend1: 1
        `  publisher_id: UMD
           pic: "We put it manually in the database"
           video: EMPTY_BLOB()*/
           
insert into publisher values ('UMD','umd@umd.edu','UMDpassword');
insert into category values('University');
--insert into subcategory values('Subcategory1','Category1');
insert into message values('UMD is the most important University in the world','why? We will see the reasons',
                           '2018-12-12 10:10:10','18-12-12 10:10:11','2018-12-12 10:11:10',
                           -76.940164,38.987620,1,'UMD', EMPTY_BLOB(), EMPTY_BLOB());
insert into messagecategory values('UMD is the most important University in the world','University');--,'Subcategory1');


/*College park 2 - University*/
insert into publisher values ('UMD','umd@umd.edu','UMDpassword');
insert into category values('University');
--insert into subcategory values('Subcategory1','Category1');
insert into message values('There are a lot of buildings in UMD','why? Because there are a lot of people',
                           '2018-12-12 10:10:10','18-12-12 10:10:11','2018-12-12 10:11:10',
                           -76.941343,38.981480,1,'UMD', EMPTY_BLOB(), EMPTY_BLOB());
insert into messagecategory values('There are a lot of buildings in UMD','University');--,'Subcategory1');
/*38.981480, -76.941343*/

/*College park 3 */
insert into publisher values ('CollegePark','CP@CP.com','CPpassword');
insert into category values('Animal');
--insert into subcategory values('Subcategory1','Category1');
insert into message values('Squirells will conquer College Park','why? Because there are a lot of squirrels',
                           '2018-12-12 10:10:10','18-12-12 10:10:11','2018-12-12 10:11:10',
                           -76.931281,38.973418,1,'UMD', EMPTY_BLOB(), EMPTY_BLOB());
insert into messagecategory values('Squirells will conquer College Park','Animal');--,'Subcategory1');
/*38.973418, -76.931281*/

/*College park 4*/
insert into publisher values ('CollegePark','CP@CP.com','CPpassword');
insert into category values('Animal');
--insert into subcategory values('Subcategory1','Category1');
insert into message values('Deer will conquer College Park','why? Because there are a lot of deer',
                           '2018-12-12 10:10:10','18-12-12 10:10:11','2018-12-12 10:11:10',
                           -76.900973,38.980061,1,'UMD', EMPTY_BLOB(), EMPTY_BLOB());
insert into messagecategory values('Deer will conquer College Park','Animal');--,'Subcategory1');
/*38.980061, -76.900973*/

/*College park 5*/
insert into publisher values ('SportsCP','Sports@CP.com','sportsCPpassword');
insert into category values('Sports');
--insert into subcategory values('Subcategory1','Category1');
insert into message values('Terps Vs. UCLA','This will be a great match',
                           '2018-12-12 10:10:10','18-12-12 10:10:11','2018-12-12 10:11:10',
                           -76.900973,38.980061,1,'UMD', EMPTY_BLOB(), EMPTY_BLOB());
insert into messagecategory values('Terps Vs. UCLA','Sports');--,'Subcategory1');
/*38.989924, -76.947034*/


/*Baltimore*/
           
insert into publisher values ('BaltimoreNews','news@baltimore.com','news');
insert into category values('Restaurant');
--insert into subcategory values('Subcategory1','Category1');
insert into message values('New Italian Restaurant in Baltimore','Are there good pizzas there?',
                           '2018-12-12 10:10:10','2018-12-12 10:10:11','2018-12-12 10:11:10',
                           -76.613145,39.286270,1,'BaltimoreNews', EMPTY_BLOB(), EMPTY_BLOB());
/*39.286270, -76.613145*/
insert into messagecategory values('New Italian Restaurant in Baltimore','Restaurant');

/*Baltimore North - Another Restaurant*/
           
insert into publisher values ('BaltimoreNews','news@baltimore.com','news');
insert into category values('Restaurant');
--insert into subcategory values('Subcategory1','Category1');
insert into message values('New Greek Restaurant in Baltimore','Healthy?',
                           '2018-12-12 10:10:10','2018-12-12 10:10:11','2018-12-12 10:11:10',
                           -76.613934,39.317165,1,'BaltimoreNews', EMPTY_BLOB(), EMPTY_BLOB());
/*39.317165, -76.613934*/

insert into messagecategory values('New Greek Restaurant in Baltimore','Restaurant');

/*Michigan*/
insert into publisher values ('MichiganNews','news@michigan.com','news');
insert into category values('Sports');
--insert into subcategory values('Subcategory1','Category1');
insert into message values('Michigan football team wins the match','The other team had only four active players',
                           '2018-12-12 10:10:10','2018-12-12 10:10:11','2018-12-12 10:11:10',
                           -83.7385908,42.277341,1,'MichiganNews', EMPTY_BLOB(), EMPTY_BLOB());
/*42.277341, -83.7385908*/

insert into messagecategory values('Michigan football team wins the match','Sports');

/*Michigan - another one*/
insert into publisher values ('MichiganNews','news@michigan.com','news');
insert into category values('Life');
--insert into subcategory values('Subcategory1','Category1');
insert into message values('Summer in Michigan','Good video',
                           '2018-12-12 10:10:10','2018-12-12 10:10:11','2018-12-12 10:11:10',
                           -83.705206,42.290058,1,'MichiganNews', EMPTY_BLOB(), EMPTY_BLOB());
/*42.290058, -83.705206*/

insert into messagecategory values('Summer in Michigan','Sports');


/*READERS*/
--Eliah in Baltimore 39.298298, -76.581414
insert into reader values ('Eliah','eliah@sns.com','eliah',-76.581414,39.298298);
insert into readercategory values ('Eliah','Restaurants');

--Erin in Michigan 42.271175, -83.747344
insert into reader values ('Erin','erin@sns.com','erin',-83.747344,42.271175);
insert into readercategory values ('Erin','Life');

--Clemente in College Park 38.978209, -76.926932
insert into reader values ('Clemente','clemente@sns.com','clemente',-76.926932,38.978209);
insert into readercategory values ('Clemente','University');



/*Template*/
insert into publisher values ('person1','person1@sns.com','person1');

insert into category values('Category1');
insert into subcategory values('Subcategory1','Category1');
insert into message values('Message01','content content','1960-1-01 23:03:20','1960-01-01 23:03:20','1960-01-01 23:03:20',
39.302597,-76.600559,1,'person1', EMPTY_BLOB(), EMPTY_BLOB());

insert into messagecategory values('Message01','Category1');--,'Subcategory1');

insert into reader values ('person101','person101@sns.com','person101');
insert into readercategory values ('person101','Category1','Subcategory1');

