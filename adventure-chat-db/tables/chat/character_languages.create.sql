CREATE TABLE `chat`.`character_languages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `character_id` INT NOT NULL,
  `language_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `character_languages_character_id_idx` (`character_id` ASC) VISIBLE,
  INDEX `character_languages_language_id_idx` (`language_id` ASC) VISIBLE,
  CONSTRAINT `character_languages_character_id`
    FOREIGN KEY (`character_id`)
    REFERENCES `chat`.`characters` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `character_languages_language_id`
    FOREIGN KEY (`language_id`)
    REFERENCES `chat`.`languages` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
