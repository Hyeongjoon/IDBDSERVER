DROP DATABASE IF exists tracer;
CREATE DATABASE tracer DEFAULT CHARACTER SET utf8;

use tracer;

SET foreign_key_checks = 0;

	DROP TABLE IF exists user;
create table user
		(uid int unsigned NOT NULL AUTO_INCREMENT,
         email VARCHAR(30) NOT NULL,
         password VARCHAR (255) NOT NULL,
         phone_number VARCHAR (15) default NULL,
         phone_verify boolean default false NOT NULL,
         email_verify boolean default false NOT NULL,
         name VARCHAR(255) NOT NULL,
         profile VARCHAR(255) default NULL,
         birth_date date default NULL,
         primary key(uid),
         unique(email),
         unique(phone_number)
) Engine =InnoDB DEFAULT CHARSET = utf8;


	DROP TABLE IF exists gr;
create table gr(
	gid int unsigned NOT NULL  AUTO_INCREMENT,
    updated_time datetime default now() NOT NULL,
    member_number tinyint unsigned NOT NULL default 1 ,
    password VARCHAR(255) default NULL,
    primary key(gid)
    )Engine = InnoDB DEFAULT CHARSET = utf8;


	DROP TABLE IF exists belong_gr;
create table belong_gr
	(uid int unsigned NOT NULL,
	 gid  int unsigned NOT NULL,
     name VARCHAR(20) default NULL,
     favorite boolean default false,
     filter boolean default false,
     view_order tinyint NOT NULL,
     updated boolean NOT NULL default false,
     primary key(uid , gid),
     foreign key (uid) references user(uid) ON DELETE CASCADE ON UPDATE CASCADE,
     foreign key (gid) references gr(gid) ON DELETE CASCADE ON UPDATE CASCADE
) Engine = InnoDB DEFAULT CHARSET = utf8;


	DROP TABLE IF exists location;
create table location
	(lid int unsigned NOT NULL AUTO_INCREMENT,
	 file_location VARCHAR(255) NOT NULL,
     latitude decimal(9,7) NOT NULL check(latitude >= -90.00 AND latitude <= 90.00 ),
     longtitude decimal(10,7) NOT NULL check (longtitude >= -180.00 AND longtitude <= 180.00),
     updated_time datetime default now() NOT NULL,
     writer int unsigned,
     belonged_gid int unsigned NOT NULL,
     latitude_mapping0 decimal(9,7) NOT NULL check(latitude_mapping0 >= -90.00 AND latitude_mapping0 <= 90.00 ),
     latitude_mapping1 decimal(9,7) NOT NULL check(latitude_mapping1 >= -90.00 AND latitude_mapping1 <= 90.00 ),
     latitude_mapping2 decimal(9,7) NOT NULL check(latitude_mapping2 >= -90.00 AND latitude_mapping2 <= 90.00 ),
     latitude_mapping3 decimal(9,7) NOT NULL check(latitude_mapping3 >= -90.00 AND latitude_mapping3 <= 90.00 ),
     latitude_mapping4 decimal(9,7) NOT NULL check(latitude_mapping4 >= -90.00 AND latitude_mapping4 <= 90.00 ),
     latitude_mapping5 decimal(9,7) NOT NULL check(latitude_mapping5 >= -90.00 AND latitude_mapping5 <= 90.00 ),
     latitude_mapping6 decimal(9,7) NOT NULL check(latitude_mapping6 >= -90.00 AND latitude_mapping6 <= 90.00 ),
     latitude_mapping7 decimal(9,7) NOT NULL check(latitude_mapping7 >= -90.00 AND latitude_mapping7 <= 90.00 ),
     latitude_mapping8 decimal(9,7) NOT NULL check(latitude_mapping8 >= -90.00 AND latitude_mapping8 <= 90.00 ),
     latitude_mapping9 decimal(9,7) NOT NULL check(latitude_mapping9 >= -90.00 AND latitude_mapping9 <= 90.00 ),
     latitude_mapping10 decimal(9,7) NOT NULL check(latitude_mapping10 >= -90.00 AND latitude_mapping10 <= 90.00 ),
     latitude_mapping11 decimal(9,7) NOT NULL check(latitude_mapping11 >= -90.00 AND latitude_mapping11 <= 90.00 ),
     latitude_mapping12 decimal(9,7) NOT NULL check(latitude_mapping12 >= -90.00 AND latitude_mapping12 <= 90.00 ),
     latitude_mapping13 decimal(9,7) NOT NULL check(latitude_mapping13 >= -90.00 AND latitude_mapping13 <= 90.00 ),
     latitude_mapping14 decimal(9,7) NOT NULL check(latitude_mapping14 >= -90.00 AND latitude_mapping14 <= 90.00 ),
     latitude_mapping15 decimal(9,7) NOT NULL check(latitude_mapping15 >= -90.00 AND latitude_mapping15 <= 90.00 ),
     latitude_mapping16 decimal(9,7) NOT NULL check(latitude_mapping16 >= -90.00 AND latitude_mapping16 <= 90.00 ),
     latitude_mapping17 decimal(9,7) NOT NULL check(latitude_mapping17 >= -90.00 AND latitude_mapping17 <= 90.00 ),
     latitude_mapping18 decimal(9,7) NOT NULL check(latitude_mapping18 >= -90.00 AND latitude_mapping18 <= 90.00 ),
     latitude_mapping19 decimal(9,7) NOT NULL check(latitude_mapping19 >= -90.00 AND latitude_mapping19 <= 90.00 ),
     latitude_mapping20 decimal(9,7) NOT NULL check(latitude_mapping20 >= -90.00 AND latitude_mapping20 <= 90.00 ),
     latitude_mapping21 decimal(9,7) NOT NULL check(latitude_mapping21 >= -90.00 AND latitude_mapping21 <= 90.00 ),
     longtitude_mapping0 decimal(10,7) NOT NULL check (longtitude_mapping0 >= -180.00 AND longtitude_mapping0 <= 180.00),
     longtitude_mapping1 decimal(10,7) NOT NULL check (longtitude_mapping1 >= -180.00 AND longtitude_mapping1 <= 180.00),
     longtitude_mapping2 decimal(10,7) NOT NULL check (longtitude_mapping2 >= -180.00 AND longtitude_mapping2 <= 180.00),
     longtitude_mapping3 decimal(10,7) NOT NULL check (longtitude_mapping3 >= -180.00 AND longtitude_mapping3 <= 180.00),
     longtitude_mapping4 decimal(10,7) NOT NULL check (longtitude_mapping4 >= -180.00 AND longtitude_mapping4 <= 180.00),
     longtitude_mapping5 decimal(10,7) NOT NULL check (longtitude_mapping5 >= -180.00 AND longtitude_mapping5 <= 180.00),
     longtitude_mapping6 decimal(10,7) NOT NULL check (longtitude_mapping6 >= -180.00 AND longtitude_mapping6 <= 180.00),
     longtitude_mapping7 decimal(10,7) NOT NULL check (longtitude_mapping7 >= -180.00 AND longtitude_mapping7 <= 180.00),
     longtitude_mapping8 decimal(10,7) NOT NULL check (longtitude_mapping8 >= -180.00 AND longtitude_mapping8 <= 180.00),
     longtitude_mapping9 decimal(10,7) NOT NULL check (longtitude_mapping9 >= -180.00 AND longtitude_mapping9 <= 180.00),
     longtitude_mapping10 decimal(10,7) NOT NULL check (longtitude_mapping10 >= -180.00 AND longtitude_mapping10 <= 180.00),
     longtitude_mapping11 decimal(10,7) NOT NULL check (longtitude_mapping11 >= -180.00 AND longtitude_mapping11 <= 180.00),
     longtitude_mapping12 decimal(10,7) NOT NULL check (longtitude_mapping12 >= -180.00 AND longtitude_mapping12 <= 180.00),
     longtitude_mapping13 decimal(10,7) NOT NULL check (longtitude_mapping13 >= -180.00 AND longtitude_mapping13 <= 180.00),
     longtitude_mapping14 decimal(10,7) NOT NULL check (longtitude_mapping14 >= -180.00 AND longtitude_mapping14 <= 180.00),
     longtitude_mapping15 decimal(10,7) NOT NULL check (longtitude_mapping15 >= -180.00 AND longtitude_mapping15 <= 180.00),
     longtitude_mapping16 decimal(10,7) NOT NULL check (longtitude_mapping16 >= -180.00 AND longtitude_mapping16 <= 180.00),
     longtitude_mapping17 decimal(10,7) NOT NULL check (longtitude_mapping17 >= -180.00 AND longtitude_mapping17 <= 180.00),
     longtitude_mapping18 decimal(10,7) NOT NULL check (longtitude_mapping18 >= -180.00 AND longtitude_mapping18 <= 180.00),
     longtitude_mapping19 decimal(10,7) NOT NULL check (longtitude_mapping19 >= -180.00 AND longtitude_mapping19 <= 180.00),
     longtitude_mapping20 decimal(10,7) NOT NULL check (longtitude_mapping20 >= -180.00 AND longtitude_mapping20 <= 180.00),
     longtitude_mapping21 decimal(10,7) NOT NULL check (longtitude_mapping21 >= -180.00 AND longtitude_mapping21 <= 180.00),
     vote_updated_time datetime default NULL,
     primary key(lid),
     foreign key(writer) references user(uid) ON DELETE SET NULL ON UPDATE CASCADE,
     foreign key(belonged_gid) references gr(gid) ON DELETE CASCADE ON UPDATE CASCADE
     ) Engine =InnoDB DEFAULT CHARSET = utf8;
     
     
	DROP TABLE IF exists like_location;
create table like_location(
	lid int unsigned NOT NULL,
    uid int unsigned,
    aid int unsigned,
    foreign key (lid) references location(lid) ON DELETE CASCADE ON UPDATE CASCADE,
    foreign key (aid) references alram(aid) ON DELETE SET NULL ON UPDATE CASCADE,
    foreign key (uid) references user(uid) ON DELETE SET NULL ON UPDATE CASCADE
) Engine =InnoDB DEFAULT CHARSET = utf8;


	DROP TABLE IF exists dislike_location;
create table dislike_location(
	lid int unsigned NOT NULL,
    uid int unsigned,
    aid int unsigned,
    foreign key (lid) references location(lid) ON DELETE CASCADE ON UPDATE CASCADE,
    foreign key (aid) references alram(aid) ON DELETE SET NULL ON UPDATE CASCADE,
    foreign key (uid) references user(uid) ON DELETE SET NULL ON UPDATE CASCADE
) Engine =InnoDB DEFAULT CHARSET = utf8;


	DROP TABLE IF exists reply;
create table reply(
	rid int unsigned NOT NULL AUTO_INCREMENT,
    aid int unsigned NOT NULL,
    belong_lid int unsigned NOT NULL,
    contents varchar(255) NOT NULL,
    writed_time datetime default now() NOT NULL,
    writer int unsigned,
    primary key (rid),
    foreign key (aid) references alram(aid) ON DELETE SET NULL ON UPDATE CASCADE,
    foreign key (belong_lid) references location(lid) ON DELETE CASCADE ON UPDATE CASCADE,
    foreign key (writer) references user(uid) ON DELETE SET NULL ON UPDATE CASCADE
) Engine =InnoDB DEFAULT CHARSET = utf8;


	DROP TABLE IF exists re_reply;
create table re_reply(
	rrid int unsigned NOT NULL AUTO_INCREMENT,
    aid int unsigned NOT NULL,
    belong_rid int unsigned NOT NULL,
    contents varchar(255) NOT NULL,
    writed_time datetime default now() NOT NULL,
    writer int unsigned,
    primary key (rrid),
    foreign key (aid) references alram(aid) ON DELETE CASCADE ON UPDATE CASCADE,
    foreign key(belong_rid) references reply(rid) ON DELETE CASCADE ON UPDATE CASCADE,
    foreign key(writer) references user(uid) ON DELETE SET NULL ON UPDATE CASCADE
    ) Engine =InnoDB DEFAULT CHARSET = utf8;
    
    DROP TABLE IF exists like_reply;
create table like_reply(
	belong_rid int unsigned NOT NULL,
    belong_uid int unsigned,
    aid int unsigned,
    foreign key (aid) references alram(aid) ON DELETE SET NULL ON UPDATE CASCADE,
    foreign key(belong_rid) references reply(rid) ON DELETE CASCADE ON UPDATE CASCADE,
    foreign key(belong_uid) references user(uid) ON DELETE SET NULL ON UPDATE CASCADE
) Engine = InnoDB DEFAULT CHARSET = utf8;

	DROP TABLE IF exists like_re_reply;
create table like_re_reply(
	belong_rrid int unsigned NOT NULL,
    belong_uid int unsigned,
    aid int unsigned,
    foreign key (aid) references alram(aid) ON DELETE SET NULL ON UPDATE CASCADE,
    foreign key(belong_rrid) references re_reply(rrid) ON DELETE CASCADE ON UPDATE CASCADE,
    foreign key(belong_uid) references user(uid) ON DELETE SET NULL ON UPDATE CASCADE
) Engine = InnoDB DEFAULT CHARSET = utf8;
    
    DROP TABLE IF exists alram;
create table alram(
	aid int unsigned NOT NULL AUTO_INCREMENT,
    target_uid int unsigned NOT NULL,
    target_gid int unsigned NOT NULL,
    target_lid int unsigned NOT NULL,
    unconfirmed boolean default true NOT NULL,
    updated_time datetime default now() NOT NULL, 
    kind tinyint unsigned NOT NULL check (kind = 0 or kind = 1 or kind=2 or kind=3 or kind=4 or kind=5 or kind = 6), /**체크 무시한데 -_- 0 = 새사진 , 1 = 새 좋아요 , 2= 새 싫어요 , 3= 새 댓글 4 = 새 대댓글 5 = 댓글 좋아요 6 = 대 댓글 좋아요**/
    primary key (aid),
    foreign key(target_uid) references user(uid) ON DELETE CASCADE ON UPDATE CASCADE,
    foreign key(target_gid) references gr(gid) ON DELETE CASCADE ON UPDATE CASCADE,
    foreign key(target_lid) references location(lid) ON DELETE CASCADE ON UPDATE CASCADE
) Engine =InnoDB DEFAULT CHARSET = utf8;

DROP TABLE IF exists code_table;
create table code_table(
	code CHAR(5) NOT NULL,
	gid int unsigned NOT NULL,
    primary key(code),
    unique key(gid),
    foreign key(gid) references gr(gid) ON DELETE CASCADE ON UPDATE CASCADE
) Engine =InnoDB DEFAULT CHARSET = utf8;  /**사실 이거 그룹에 걍 넣어 놓는게 좋은데 몰것다 일단 이렇게 해놓음 **/

DROP TABLE IF exists file_table;
create table file_table (
	fid int unsigned NOT NULL AUTO_INCREMENT,
	gid int unsigned ,
    uid int unsigned ,
    location VARCHAR(255) NOT NULL,
    upload_time datetime default now(),
    image boolean NOT NULL,  /** true면 이미지 아니면 걍 파일 **/
    primary key(fid),
    foreign key(gid) references gr(gid) ON DELETE SET NULL ON UPDATE CASCADE, /**그룹 지워졌을때 어캐 보일지 확인해볼것 **/
    foreign key(uid) references user(uid) ON DELETE SET NULL ON UPDATE CASCADE
) Engine =InnoDB DEFAULT CHARSET = utf8;

 SET foreign_key_checks = 1;