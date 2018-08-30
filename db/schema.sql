
use `docker_mysql`;

CREATE TABLE `docker_mysql`.`user` (
  `name` VARCHAR(50) NOT NULL,
  `age` INT NOT NULL,
  PRIMARY KEY (`name`));

INSERT INTO `docker_mysql`.`user` (`name`, `age`) VALUES ('zhangsan', '10');



