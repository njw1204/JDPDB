-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: mysql.njw.kr    Database: animals
-- ------------------------------------------------------
-- Server version	5.7.28-0ubuntu0.18.04.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `animals_category`
--

DROP TABLE IF EXISTS `animals_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animals_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UC_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `animals_comment`
--

DROP TABLE IF EXISTS `animals_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animals_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `content` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_animals_comment_post_id_animals_post_id` (`post_id`),
  KEY `FK_animals_comment_user_id_animals_user_id` (`user_id`),
  CONSTRAINT `FK_animals_comment_post_id_animals_post_id` FOREIGN KEY (`post_id`) REFERENCES `animals_post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_animals_comment_user_id_animals_user_id` FOREIGN KEY (`user_id`) REFERENCES `animals_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `animals_donate_money`
--

DROP TABLE IF EXISTS `animals_donate_money`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animals_donate_money` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from_user_id` int(11) NOT NULL,
  `to_page_id` int(11) NOT NULL,
  `cost` bigint(20) unsigned NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_animals_donate_money_from_user_id_animals_user_id` (`from_user_id`),
  KEY `FK_animals_donate_money_to_page_id_animals_page_id` (`to_page_id`),
  CONSTRAINT `FK_animals_donate_money_from_user_id_animals_user_id` FOREIGN KEY (`from_user_id`) REFERENCES `animals_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_animals_donate_money_to_page_id_animals_page_id` FOREIGN KEY (`to_page_id`) REFERENCES `animals_page` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `animals_donate_product`
--

DROP TABLE IF EXISTS `animals_donate_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animals_donate_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from_user_id` int(11) NOT NULL,
  `to_page_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_count` bigint(20) unsigned NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_animals_donate_product_from_user_id_animals_user_id` (`from_user_id`),
  KEY `FK_animals_donate_product_product_id_animals_product_id` (`product_id`),
  KEY `FK_animals_donate_product_to_page_id_animals_page_id` (`to_page_id`),
  CONSTRAINT `FK_animals_donate_product_from_user_id_animals_user_id` FOREIGN KEY (`from_user_id`) REFERENCES `animals_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_animals_donate_product_product_id_animals_product_id` FOREIGN KEY (`product_id`) REFERENCES `animals_product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_animals_donate_product_to_page_id_animals_page_id` FOREIGN KEY (`to_page_id`) REFERENCES `animals_page` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `animals_file`
--

DROP TABLE IF EXISTS `animals_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animals_file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `animals_page`
--

DROP TABLE IF EXISTS `animals_page`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animals_page` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creator_id` int(11) NOT NULL,
  `animal_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` int(11) NOT NULL,
  `profile_picture` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `creator_id_UNIQUE` (`creator_id`),
  KEY `FK_animals_page_category_animals_category_id` (`category`),
  KEY `FK_animals_page_profile_picture_animals_file_id` (`profile_picture`),
  CONSTRAINT `FK_animals_page_category_animals_category_id` FOREIGN KEY (`category`) REFERENCES `animals_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_animals_page_creator_id_animals_user_id` FOREIGN KEY (`creator_id`) REFERENCES `animals_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_animals_page_profile_picture_animals_file_id` FOREIGN KEY (`profile_picture`) REFERENCES `animals_file` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `animals_page_donate_class`
--

DROP TABLE IF EXISTS `animals_page_donate_class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animals_page_donate_class` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `page_id` int(11) NOT NULL,
  `cost` bigint(20) unsigned NOT NULL,
  `class_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reward_description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `page_id_cost_UNIQUE` (`page_id`,`cost`),
  KEY `class_page_id_idx` (`page_id`),
  CONSTRAINT `class_page_id` FOREIGN KEY (`page_id`) REFERENCES `animals_page` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `animals_post`
--

DROP TABLE IF EXISTS `animals_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animals_post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `page_id` int(11) NOT NULL,
  `title` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `min_class_level` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_animals_post_page_id_animals_page_id` (`page_id`),
  CONSTRAINT `FK_animals_post_page_id_animals_page_id` FOREIGN KEY (`page_id`) REFERENCES `animals_page` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `animals_post_files`
--

DROP TABLE IF EXISTS `animals_post_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animals_post_files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) NOT NULL,
  `file_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `post_id_file_id_UNIQUE` (`post_id`,`file_id`),
  KEY `FK_animals_post_files_file_id_animals_file_id` (`file_id`),
  CONSTRAINT `FK_animals_post_files_file_id_animals_file_id` FOREIGN KEY (`file_id`) REFERENCES `animals_file` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_animals_post_files_post_id_animals_post_id` FOREIGN KEY (`post_id`) REFERENCES `animals_post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `animals_post_tags`
--

DROP TABLE IF EXISTS `animals_post_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animals_post_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `post_id_tag_id_UNIQUE` (`post_id`,`tag_id`),
  KEY `FK_animals_post_tags_tag_id_animals_tag_id` (`tag_id`),
  CONSTRAINT `FK_animals_post_tags_post_id_animals_post_id` FOREIGN KEY (`post_id`) REFERENCES `animals_post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_animals_post_tags_tag_id_animals_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `animals_tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `animals_product`
--

DROP TABLE IF EXISTS `animals_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animals_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `cost` bigint(20) unsigned NOT NULL,
  `picture_file_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_animals_product_pictures_file_id_animals_file_id_idx` (`picture_file_id`),
  CONSTRAINT `FK_product_picture` FOREIGN KEY (`picture_file_id`) REFERENCES `animals_file` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `animals_required_products`
--

DROP TABLE IF EXISTS `animals_required_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animals_required_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `page_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_count` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `page_id_product_id_UNIQUE` (`page_id`,`product_id`),
  KEY `FK_animals_required_products_product_id_animals_product_id` (`product_id`),
  CONSTRAINT `FK_animals_required_products_page_id_animals_page_id` FOREIGN KEY (`page_id`) REFERENCES `animals_page` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_animals_required_products_product_id_animals_product_id` FOREIGN KEY (`product_id`) REFERENCES `animals_product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `animals_tag`
--

DROP TABLE IF EXISTS `animals_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animals_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `animals_user`
--

DROP TABLE IF EXISTS `animals_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animals_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `point` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UC_nickname` (`nickname`),
  UNIQUE KEY `UC_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `animals_user_to_page_info`
--

DROP TABLE IF EXISTS `animals_user_to_page_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animals_user_to_page_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `page_id` int(11) NOT NULL,
  `total_donate` bigint(20) unsigned NOT NULL,
  `subscribe` tinyint(1) unsigned NOT NULL,
  `class_level` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id_page_id_UNIQUE` (`user_id`,`page_id`),
  KEY `FK_animals_user_to_page_info_page_id_animals_page_id` (`page_id`),
  CONSTRAINT `FK_animals_user_to_page_info_page_id_animals_page_id` FOREIGN KEY (`page_id`) REFERENCES `animals_page` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_animals_user_to_page_info_user_id_animals_user_id` FOREIGN KEY (`user_id`) REFERENCES `animals_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=261 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-03 19:06:39
