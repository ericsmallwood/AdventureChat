CREATE TABLE `chat`.`campaign_characters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `campaign_id` int NOT NULL,
  `character_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `campaign_characters_character_id_idx` (`character_id`),
  KEY `campaign_characters_campaign_id_idx` (`campaign_id`),
  CONSTRAINT `campaign_characters_campaign_id` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`id`) ON DELETE CASCADE,
  CONSTRAINT `campaign_characters_character_id` FOREIGN KEY (`character_id`) REFERENCES `characters` (`id`) ON DELETE CASCADE
)