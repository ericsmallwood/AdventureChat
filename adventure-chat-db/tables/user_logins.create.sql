    CREATE TABLE `auth`.`user_logins` (
  `userid` INT NOT NULL,
  `token` VARCHAR(45) NOT NULL,
  `hash` VARCHAR(100) NOT NULL,
  UNIQUE INDEX `userid_UNIQUE` (`userid` ASC));
