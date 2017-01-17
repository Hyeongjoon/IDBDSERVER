DROP DATABASE  IF exists campoint;
CREATE DATABASE campoint DEFAULT CHARACTER SET utf8;

use campoint;

SET foreign_key_checks = 0;


	DROP TABLE IF exists user;
create table user
		(`uid` int unsigned NOT NULL AUTO_INCREMENT,
         `email` VARCHAR(30) NOT NULL,
         `pwd` VARCHAR (255) NOT NULL,
         `name` VARCHAR(30) NOT NULL,
         primary key(`uid`),
         unique(email)
) Engine =InnoDB DEFAULT CHARSET = utf8;

	DROP TABLE IF EXISTS schedule_table;
create table schedule_table
	(`uid` int unsigned NOT NULL,
	 `0` boolean NOT NULL default false,
     `1` boolean NOT NULL default false,
     `2` boolean NOT NULL default false,
     `3` boolean NOT NULL default false,
     `4` boolean NOT NULL default false,
     `5` boolean NOT NULL default false,
     `6` boolean NOT NULL default false,
     `7` boolean NOT NULL default false,
     `8` boolean NOT NULL default false,
     `9` boolean NOT NULL default false,
     `10` boolean NOT NULL default false,
     `11` boolean NOT NULL default false,
     `12` boolean NOT NULL default false,
     `13` boolean NOT NULL default false,
     `14` boolean NOT NULL default false,
     `15` boolean NOT NULL default false,
     `16` boolean NOT NULL default false,
     `17` boolean NOT NULL default false,
     `18` boolean NOT NULL default false,
     `19` boolean NOT NULL default false,
     `20` boolean NOT NULL default false,
     `21` boolean NOT NULL default false,
     `22` boolean NOT NULL default false,
     `23` boolean NOT NULL default false,
     `24` boolean NOT NULL default false,
     `25` boolean NOT NULL default false,
     `26` boolean NOT NULL default false,
     `27` boolean NOT NULL default false,
     `28` boolean NOT NULL default false,
     `29` boolean NOT NULL default false,
     `30` boolean NOT NULL default false,
     `31` boolean NOT NULL default false,
     `32` boolean NOT NULL default false,
     `33` boolean NOT NULL default false,
     `34` boolean NOT NULL default false,
     `35` boolean NOT NULL default false,
     `36` boolean NOT NULL default false,
     `37` boolean NOT NULL default false,
     `38` boolean NOT NULL default false,
     `39` boolean NOT NULL default false,
     `40` boolean NOT NULL default false,
     `41` boolean NOT NULL default false,
     `42` boolean NOT NULL default false,
     `43` boolean NOT NULL default false,
     `44` boolean NOT NULL default false,
     `45` boolean NOT NULL default false,
     `46` boolean NOT NULL default false,
     `47` boolean NOT NULL default false,
     `48` boolean NOT NULL default false,
     `49` boolean NOT NULL default false,
     `50` boolean NOT NULL default false,
     `51` boolean NOT NULL default false,
     `52` boolean NOT NULL default false,
     `53` boolean NOT NULL default false,
     `54` boolean NOT NULL default false,
     `55` boolean NOT NULL default false,
     `56` boolean NOT NULL default false,
     `57` boolean NOT NULL default false,
     `58` boolean NOT NULL default false,
     `59` boolean NOT NULL default false,
     `60` boolean NOT NULL default false,
     `61` boolean NOT NULL default false,
     `62` boolean NOT NULL default false,
     `63` boolean NOT NULL default false,
     `64` boolean NOT NULL default false,
     `65` boolean NOT NULL default false,
     `66` boolean NOT NULL default false,
     `67` boolean NOT NULL default false,
     `68` boolean NOT NULL default false,
     `69` boolean NOT NULL default false,
     `70` boolean NOT NULL default false,
     `71` boolean NOT NULL default false,
     `72` boolean NOT NULL default false,
     `73` boolean NOT NULL default false,
     `74` boolean NOT NULL default false,
     `75` boolean NOT NULL default false,
     `76` boolean NOT NULL default false,
     `77` boolean NOT NULL default false,
     `78` boolean NOT NULL default false,
     `79` boolean NOT NULL default false,
     `80` boolean NOT NULL default false,
     `81` boolean NOT NULL default false,
     `82` boolean NOT NULL default false,
     `83` boolean NOT NULL default false,
     `84` boolean NOT NULL default false,
     `85` boolean NOT NULL default false,
     `86` boolean NOT NULL default false,
     `87` boolean NOT NULL default false,
     `88` boolean NOT NULL default false,
     `89` boolean NOT NULL default false,
     `90` boolean NOT NULL default false,
     `91` boolean NOT NULL default false,
     `92` boolean NOT NULL default false,
     `93` boolean NOT NULL default false,
     `94` boolean NOT NULL default false,
     `95` boolean NOT NULL default false,
     `96` boolean NOT NULL default false,
     `97` boolean NOT NULL default false,
     `98` boolean NOT NULL default false,
     `99` boolean NOT NULL default false,
     `100` boolean NOT NULL default false,
     `101` boolean NOT NULL default false,
     `102` boolean NOT NULL default false,
     `103` boolean NOT NULL default false,
     `104` boolean NOT NULL default false,
     `105` boolean NOT NULL default false,
     `106` boolean NOT NULL default false,
     `107` boolean NOT NULL default false,
     `108` boolean NOT NULL default false,
     `109` boolean NOT NULL default false,
     primary key(uid),
     foreign key(uid) references user(uid) ON DELETE CASCADE ON update CASCADE
) Engine =InnoDB DEFAULT CHARSET = utf8;	
    
    
    DROP TABLE IF EXISTS gr;
create table gr(
	`gid` int unsigned NOT NULL AUTO_INCREMENT,
    `gr_code` varchar(5) NOT NULL,
    `member_num` tinyint unsigned NOT NULL,
    `update_time` datetime NOT NULL default now(),
    `master` int unsigned,
    primary key(`gid`),
    unique key(`gr_code`),
    foreign key(`master`) references user(uid) ON DELETE SET NULL ON update CASCADE
) Engine =InnoDB DEFAULT CHARSET = utf8;	
   
   DROP TABLE IF EXISTS belong_gr;
create table belong_gr(
	`uid` int unsigned NOT NULL,
    `gid` int unsigned NOT NULL,
    `name` VARCHAR(30) NOT NULL,
    `new_file_num` tinyint NOT NULL,
    `new_talk_num` tinyint NOT NULL,
    `s_input` boolean NOT NULL default false,
    primary key(`uid` , `gid`),
    foreign key(`uid`) references user(`uid`) ON DELETE CASCADE ON UPDATE CASCADE,
    foreign key(`gid`) references gr(`gid`) ON DELETE CASCADE ON UPDATE CASCADE
) Engine =InnoDB DEFAULT CHARSET = utf8;	


	DROP TABLE IF EXISTS gr_schedule;
create table gr_schedule(
	`gid` int unsigned NOT NULL,
    `start_date` datetime NOT NULL default now(),
    `inc_able` boolean NOT NULL default true,
    `max_num` tinyint NOT NULL,
     `0` boolean NOT NULL default false,
     `1` boolean NOT NULL default false,
     `2` boolean NOT NULL default false,
     `3` boolean NOT NULL default false,
     `4` boolean NOT NULL default false,
     `5` boolean NOT NULL default false,
     `6` boolean NOT NULL default false,
     `7` boolean NOT NULL default false,
     `8` boolean NOT NULL default false,
     `9` boolean NOT NULL default false,
     `10` boolean NOT NULL default false,
     `11` boolean NOT NULL default false,
     `12` boolean NOT NULL default false,
     `13` boolean NOT NULL default false,
     `14` boolean NOT NULL default false,
     `15` boolean NOT NULL default false,
     `16` boolean NOT NULL default false,
     `17` boolean NOT NULL default false,
     `18` boolean NOT NULL default false,
     `19` boolean NOT NULL default false,
     `20` boolean NOT NULL default false,
     `21` boolean NOT NULL default false,
     `22` boolean NOT NULL default false,
     `23` boolean NOT NULL default false,
     `24` boolean NOT NULL default false,
     `25` boolean NOT NULL default false,
     `26` boolean NOT NULL default false,
     `27` boolean NOT NULL default false,
     `28` boolean NOT NULL default false,
     `29` boolean NOT NULL default false,
     `30` boolean NOT NULL default false,
     `31` boolean NOT NULL default false,
     `32` boolean NOT NULL default false,
     `33` boolean NOT NULL default false,
     `34` boolean NOT NULL default false,
     `35` boolean NOT NULL default false,
     `36` boolean NOT NULL default false,
     `37` boolean NOT NULL default false,
     `38` boolean NOT NULL default false,
     `39` boolean NOT NULL default false,
     `40` boolean NOT NULL default false,
     `41` boolean NOT NULL default false,
     `42` boolean NOT NULL default false,
     `43` boolean NOT NULL default false,
     `44` boolean NOT NULL default false,
     `45` boolean NOT NULL default false,
     `46` boolean NOT NULL default false,
     `47` boolean NOT NULL default false,
     `48` boolean NOT NULL default false,
     `49` boolean NOT NULL default false,
     `50` boolean NOT NULL default false,
     `51` boolean NOT NULL default false,
     `52` boolean NOT NULL default false,
     `53` boolean NOT NULL default false,
     `54` boolean NOT NULL default false,
     `55` boolean NOT NULL default false,
     `56` boolean NOT NULL default false,
     `57` boolean NOT NULL default false,
     `58` boolean NOT NULL default false,
     `59` boolean NOT NULL default false,
     `60` boolean NOT NULL default false,
     `61` boolean NOT NULL default false,
     `62` boolean NOT NULL default false,
     `63` boolean NOT NULL default false,
     `64` boolean NOT NULL default false,
     `65` boolean NOT NULL default false,
     `66` boolean NOT NULL default false,
     `67` boolean NOT NULL default false,
     `68` boolean NOT NULL default false,
     `69` boolean NOT NULL default false,
     `70` boolean NOT NULL default false,
     `71` boolean NOT NULL default false,
     `72` boolean NOT NULL default false,
     `73` boolean NOT NULL default false,
     `74` boolean NOT NULL default false,
     `75` boolean NOT NULL default false,
     `76` boolean NOT NULL default false,
     `77` boolean NOT NULL default false,
     `78` boolean NOT NULL default false,
     `79` boolean NOT NULL default false,
     `80` boolean NOT NULL default false,
     `81` boolean NOT NULL default false,
     `82` boolean NOT NULL default false,
     `83` boolean NOT NULL default false,
     `84` boolean NOT NULL default false,
     `85` boolean NOT NULL default false,
     `86` boolean NOT NULL default false,
     `87` boolean NOT NULL default false,
     `88` boolean NOT NULL default false,
     `89` boolean NOT NULL default false,
     `90` boolean NOT NULL default false,
     `91` boolean NOT NULL default false,
     `92` boolean NOT NULL default false,
     `93` boolean NOT NULL default false,
     `94` boolean NOT NULL default false,
     `95` boolean NOT NULL default false,
     `96` boolean NOT NULL default false,
     `97` boolean NOT NULL default false,
     `98` boolean NOT NULL default false,
     `99` boolean NOT NULL default false,
     `100` boolean NOT NULL default false,
     `101` boolean NOT NULL default false,
     `102` boolean NOT NULL default false,
     `103` boolean NOT NULL default false,
     `104` boolean NOT NULL default false,
     `105` boolean NOT NULL default false,
     `106` boolean NOT NULL default false,
     `107` boolean NOT NULL default false,
     `108` boolean NOT NULL default false,
     `109` boolean NOT NULL default false,
     `110` boolean NOT NULL default false,
     `111` boolean NOT NULL default false,
     `112` boolean NOT NULL default false,
     `113` boolean NOT NULL default false,
     `114` boolean NOT NULL default false,
     `115` boolean NOT NULL default false,
     `116` boolean NOT NULL default false,
     `117` boolean NOT NULL default false,
     `118` boolean NOT NULL default false,
     `119` boolean NOT NULL default false,
     `120` boolean NOT NULL default false,
     `121` boolean NOT NULL default false,
     `122` boolean NOT NULL default false,
     `123` boolean NOT NULL default false,
     `124` boolean NOT NULL default false,
     `125` boolean NOT NULL default false,
     `126` boolean NOT NULL default false,
     `127` boolean NOT NULL default false,
     `128` boolean NOT NULL default false,
     `129` boolean NOT NULL default false,
     `130` boolean NOT NULL default false,
     `131` boolean NOT NULL default false,
     `132` boolean NOT NULL default false,
     `133` boolean NOT NULL default false,
     `134` boolean NOT NULL default false,
     `135` boolean NOT NULL default false,
     `136` boolean NOT NULL default false,
     `137` boolean NOT NULL default false,
     `138` boolean NOT NULL default false,
     `139` boolean NOT NULL default false,
     `140` boolean NOT NULL default false,
     `141` boolean NOT NULL default false,
     `142` boolean NOT NULL default false,
     `143` boolean NOT NULL default false,
     `144` boolean NOT NULL default false,
     `145` boolean NOT NULL default false,
     `146` boolean NOT NULL default false,
     `147` boolean NOT NULL default false,
     `148` boolean NOT NULL default false,
     `149` boolean NOT NULL default false,
     `150` boolean NOT NULL default false,
     `151` boolean NOT NULL default false,
     `152` boolean NOT NULL default false,
     `153` boolean NOT NULL default false,
     primary key(`gid`),
     foreign key(`gid`) references gr(`gid`) ON DELETE CASCADE ON UPDATE CASCADE
) Engine =InnoDB DEFAULT CHARSET = utf8;	

	DROP TABLE IF EXISTS file_table;
create table file_table(
	`fid` int unsigned auto_INCREMENT NOT NULL,
    `gid` int unsigned,
    `uid` int unsigned,
    `location` VARCHAR(255) NOT NULL,
    `upload_time` datetime default now(),
    `image` boolean NOT NULL,
    primary key(`fid`),
    foreign key(`gid`) references gr(`gid`) ON DELETE CASCADE ON UPDATE CASCADE,
    foreign key(`uid`) references user(`uid`) ON DELETE SET NULL ON UPDATE CASCADE
) Engine =InnoDB DEFAULT CHARSET = utf8;	


	DROP EVENT IF exists delete_gr_schedule;
DELIMITER |
create event delete_gr_schedule
	ON SCHEDULE
		EVERY 1 DAY
        STARTS '2016-12-30 23:59:59'
	DO
	 BEGIN
		delete from delete_gr_schedule WHERE delete_gr_schedule.start_date < date_sub(now() , interval 1 week); /**1주일 지나면 스케쥴 지워지게 하는거 **/
     END |
    DELIMITER ;

     DROP TRIGGER IF EXISTS plus_gr_number;													/** belong_gr에 추가되면 gr member_num 자동으로 추가되는 트리거  **/
DELIMITER |
create trigger plus_gr_number after INSERT ON belong_gr
	for each row
    BEGIN
		UPDATE gr SET gr.member_num = gr.member_num + 1 WHERE gr.gid = new.gid;
	END|
    DELIMITER ;

	DROP TRIGGER IF EXISTS minus_gr_number;													/** belong_gr에 삭제되면  gr member_num 자동으로 추가되는 트리거  **/
DELIMITER |
create trigger minus_gr_number after DELETE ON belong_gr
	for each row
    BEGIN
		UPDATE gr SET gr.member_num = gr.member_num - 1 WHERE gr.gid = old.gid;
	END|
    DELIMITER ;
    
    
	DROP TRIGGER IF EXISTS plus_new_file_num;										/** file_table에 파일 추가되면 new_file_num이랑 업데이트시간 자동으로 추가되는 트리거  **/
DELIMITER |
create trigger plus_new_file_num after INSERT ON file_table
	for each row
    BEGIN
		UPDATE belong_gr SET belong_gr.new_file_num = belong_gr.new_file_num + 1 WHERE belong_gr.gid = new.gid;
        UPDATE gr SET gr.update_time = now() WHERE gr.gid = new.gid;
	END|
    DELIMITER ;

SET foreign_key_checks = 1;