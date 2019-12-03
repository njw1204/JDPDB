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
-- Dumping data for table `animals_category`
--

LOCK TABLES `animals_category` WRITE;
/*!40000 ALTER TABLE `animals_category` DISABLE KEYS */;
INSERT INTO `animals_category` VALUES (4,'BIRD'),(1,'CAT'),(2,'DOG'),(3,'FISH');
/*!40000 ALTER TABLE `animals_category` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `animals_comment`
--

LOCK TABLES `animals_comment` WRITE;
/*!40000 ALTER TABLE `animals_comment` DISABLE KEYS */;
INSERT INTO `animals_comment` VALUES (1,1,1,'첫댓글','2019-11-23 13:19:50'),(5,2,2,'12345','2019-11-25 01:54:44'),(6,1,2,'테스트','2019-11-25 01:56:09'),(7,1,2,'댓글을 남기자','2019-11-25 02:01:37'),(9,1,4,'123','2019-11-27 17:16:01'),(10,1,3,'123','2019-11-27 17:16:03'),(11,3,5,'구도빈','2019-11-27 18:16:00'),(12,3,5,'잇 쿠드비↗~','2019-11-28 15:42:59'),(13,1,6,'노답;;','2019-11-30 22:10:28'),(16,1,4,'12345','2019-11-30 22:21:48'),(18,1,2,'asdf','2019-11-30 22:22:33'),(20,1,5,'쿠드비쿠드비\r\n드비쿠드비쿠\r\n비쿠드비쿠드','2019-11-30 22:23:08'),(22,1,3,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sollicitudin euismod bibendum. Vestibulum aliquet at velit sit amet condimentum. Donec a lectus vitae odio porttitor dignissim sit amet non enim. Donec facilisis tempor diam nec hendrerit. Nam sollicitudin ante felis, quis gravida diam venenatis eu. Proin vestibulum mauris magna, vel pellentesque ex interdum vitae. Praesent maximus eget nibh a tempor. Sed sagittis ac purus eget ornare. Aliquam tristique elementum justo non varius. Etiam','2019-12-01 10:27:22'),(23,1,3,'Duis luctus diam nec elit pharetra, et vestibulum lacus viverra. Sed convallis dolor vitae viverra tempus. Aliquam ultricies suscipit felis non pharetra. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam at convallis nisl, vitae accumsan leo. Donec purus ipsum, rhoncus at est in, mattis feugiat nisl. Aliquam eget dolor et nisi eleifend facilisis sit amet a ex. Ut eget tempus magna. Proin nec fringilla tortor, vitae volutpat orci. Vivamus ut sem at ma','2019-12-01 10:27:43'),(24,1,3,'ivamus placerat nibh tortor, ut sodales magna laoreet ut. Ut commodo euismod dolor sed eleifend. Pellentesque cursus tellus sit amet leo finibus, ullamcorper hendrerit ex gravida. Suspendisse sed molestie risus. Quisque at dignissim libero, faucibus tincidunt quam. In hac habitasse platea dictumst. Aliquam ut suscipit sapien. Morbi a ante id augue vulputate semper quis ut orci. Sed feugiat elit in enim rhoncus lacinia. Suspendisse interdum quis nunc vitae lobortis.','2019-12-01 10:27:53'),(26,1,1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sollicitudin euismod bibendum. Vestibulum aliquet at velit sit amet condimentum. Donec a lectus vitae odio porttitor dignissim sit amet non enim. Donec facilisis tempor diam nec hendrerit. Nam sollicitudin ante felis, quis gravida diam venenatis eu. Proin vestibulum mauris magna, vel pellentesque ex interdum vitae. Praesent maximus eget nibh a tempor. Sed sagittis ac purus eget ornare. Aliquam tristique elementum justo non varius. Etiam','2019-12-01 14:28:02'),(27,1,16,'댓글도\r\n달기','2019-12-01 19:35:49'),(28,3,19,'Ba ba ba ba, ba, ba ba, baa, ba ba Ba ba ba ba, ba, ba ba Yee Ba ba ba ba, ba, ba ba, baa, ba ba Ba ba ba ba, ba, ba ba Yee Ba ba ba ba, ba, ba ba, baa, ba ba Ba ba ba ba, ba, ba ba Yee Ba ba ba ba, ba, ba ba, baa, ba ba Ba ba ba ba, ba, ba ba Yee Ba ba ba ba, ba, ba ba, baa, ba ba Ba ba ba ba, ba, ba ba Yee Ba ba ba ba, ba, ba ba, baa, ba ba Ba ba ba ba, ba, ba ba Yee Ba ba ba ba, ba, ba ba, baa, ba ba Ba ba ba ba, ba, ba ba Yee Ba ba ba ba, ba, ba ba, baa, ba ba Ba ba ba ba, ba, ba ba Yee','2019-12-01 21:56:48'),(29,3,20,'회떠먹고 죽었나요? 이제 페이지 없어지나요? 지금까지 도네한거 아까워서 어떡해요ㅜㅜ 다 님 뱃속으로 들어갔네요','2019-12-03 15:05:58'),(30,3,20,'구독 취소합니다 실망이에요','2019-12-03 15:06:17'),(32,5,20,'불만이면 보1지 말던가','2019-12-03 15:07:32');
/*!40000 ALTER TABLE `animals_comment` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `animals_donate_money`
--

LOCK TABLES `animals_donate_money` WRITE;
/*!40000 ALTER TABLE `animals_donate_money` DISABLE KEYS */;
INSERT INTO `animals_donate_money` VALUES (2,3,1,50000,'첫 후원'),(3,3,1,430000,'ㅎㅎ'),(4,9,1,1,'gg'),(5,9,1,9,'9'),(9,3,1,11000,'skskskskak'),(10,3,1,1000000,'jdjdjdj'),(11,3,1,2000000,'sksjs'),(12,9,1,1,'1'),(14,9,1,10000,'1'),(15,9,1,95000,'1'),(16,9,2,1000,'1'),(17,4,1,9906,'1'),(18,4,1,1040,'1'),(19,4,1,1000000,'Test-skip rank'),(20,4,3,65656533,'Im rich'),(21,4,1,31325521,'Hey'),(22,4,1,292653000,'OVERFLOW!'),(23,4,1,200000000,'OVERFLOW!'),(24,4,1,200000000,'OVERFLOW!'),(25,4,1,200000000,'OVERFLOW!'),(26,4,1,200000000,'OVERFLOW!'),(27,4,1,200000000,'OVERFLOW!'),(28,4,1,200000000,'OVERFLOW!'),(29,4,1,200000000,'OVERFLOW!'),(30,4,1,200000000,'OVERFLOW!'),(32,1,3,500000,'ㅅㅅ'),(33,1,3,20000000,'ㅅㅅ2'),(34,1,7,999999999,'9999'),(35,1,9,1000,'1'),(36,4,7,100000,'Am I Rank 1?'),(37,4,9,1000,'ㅏ'),(38,10,1,10000,'2'),(39,10,6,1000,'7'),(40,10,1,490000,'Im rich'),(41,10,6,1000,'8'),(42,9,1,300000,'ㅎㅇ'),(43,5,1,64999,''),(44,5,1,64888,''),(45,5,1,10112,'ㅎㅇ'),(46,5,1,100000,''),(47,5,7,10000,''),(48,5,1,400000,'VIP'),(49,5,1,1001,''),(50,1,7,3456,'자러간다 ㅅㄱ'),(51,1,8,1000,''),(52,5,1,100000,''),(53,20,1,100000,'1234');
/*!40000 ALTER TABLE `animals_donate_money` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `animals_donate_product`
--

LOCK TABLES `animals_donate_product` WRITE;
/*!40000 ALTER TABLE `animals_donate_product` DISABLE KEYS */;
INSERT INTO `animals_donate_product` VALUES (1,3,1,1,3,'두번째 후원'),(2,3,1,1,1,'두번째 후원'),(4,3,1,2,2,'gg'),(5,3,1,2,2,'()'),(6,9,1,2,1,'2'),(7,9,1,2,24,'24*5000=120000'),(8,4,1,1,2000,'Test-skip rank'),(9,4,1,1,2,'Hey'),(10,4,1,2,1,'I love ball'),(11,9,1,1,100,'123'),(12,9,1,1,1000,'123'),(15,3,1,1,2000,'묻고 the blue 가'),(17,3,1,1,1101,'asdf'),(18,5,1,1,10,'안녕하세요'),(19,5,1,2,5,''),(20,5,1,2,65,''),(21,5,1,1,100,'100'),(22,5,1,3,3,'강이지 3개 후원'),(23,5,1,1,800,'ㅁㄴㅇㄻㄴㅇ'),(24,1,1,1,100,''),(25,20,1,1,1,'1'),(26,20,1,1,10,'1123'),(27,22,1,1,8000,''),(28,22,21,3,100,'');
/*!40000 ALTER TABLE `animals_donate_product` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `animals_file`
--

LOCK TABLES `animals_file` WRITE;
/*!40000 ALTER TABLE `animals_file` DISABLE KEYS */;
INSERT INTO `animals_file` VALUES (1,'https://gamasutra.com/db_area/images/news/320213/Super-Mario-64.jpg'),(2,'https://s26552.pcdn.co/wp-content/uploads/2019/10/dc_neighborhood_news-8.jpg'),(3,'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Flag_of_Togo.svg/1024px-Flag_of_Togo.svg.png'),(4,'https://www.youtube.com/embed/mE4hDSAbZLQ'),(5,'/media/090c0a60-7f21-1456-749b-3d4adeef90b1.png'),(6,'/media/f0ff7668-f895-2a46-7820-116d0b298cea.png'),(7,'/media/44de97fe-fa0f-589a-0cda-f2015578e75a.drawio'),(8,'/media/8e3c7e5f-cebe-b9a1-8782-734482ae402c.png'),(9,'/media/e7be3ec8-a1c6-572f-4865-54aceccde8ac.jpg'),(10,'/media/bc1662be-ba78-45e9-5241-df9647941723.jpeg'),(11,'/media/2ecda428-d9aa-8dab-9b5d-48e94c91f08d.jpg'),(12,'/media/8f8ea199-f1da-7c92-6ed7-3dd4bf9529ff.jpg'),(13,'/media/5faa35d3-6e23-cb7c-6538-0005ca05e622.png'),(14,'/media/5de969da-ce4f-df84-3993-35b1f19183a4.jpg'),(15,'/media/a3cdd0bc-e572-612f-f6b1-aa75426adca3.gif'),(16,'/media/626ebc19-bd89-1f85-0660-28e9babd9577.gif'),(17,'https://pds.joins.com/news/component/htmlphoto_mmdata/201501/25/htm_201501251081c010c011.jpg'),(18,'/media/cc14012d-62ca-dc7d-1b12-4b49de082c00.png'),(19,'/media/b5957039-618f-4ae3-13ab-7be2fe35118a.png'),(20,'/media/19741443-14c8-5b48-112b-75bd4668b336.jpg'),(21,'/media/d5bcdb5b-21c5-8679-d2b7-0989a7f9d89f.png'),(22,'/media/c4068982-3879-f69b-8fc2-e6f4eb304a82.png'),(23,'https://www.youtube.com/embed/Uk4ippZqTpk'),(24,'https://www.youtube.com/embed/Uk4ippZqTpk'),(25,'/media/21205c8a-fb9d-41ac-9f34-4579248b387d.jpg'),(27,'/media/21205c8a-fb9d-41ac-9f34-4579248b387d.jpg'),(29,'http://youtube.com/embed/FDRqVYomTW4'),(30,'/media/4c9cbe3b-60ae-c2c9-9fb5-dd243e47fd21.gif'),(31,'http://youtube.com/embed/FDRqVYomTW4'),(32,'/media/4c9cbe3b-60ae-c2c9-9fb5-dd243e47fd21.gif'),(33,'http://youtube.com/embed/EzD362Xu5o0'),(34,'/media/577948e3-d30f-7d6c-19b0-074bd59f09bc.jpg'),(35,'/media/4b1c1fa5-20fc-99d5-2897-41aab0c25df9.jpg'),(36,'/media/88fe481f-08fb-5636-2895-284ae2f1b8dc.jpg'),(37,'/media/71ec464d-ffb9-256b-28cf-5c34b3614a39.jpg'),(38,'/media/f24f0864-4a31-0559-6369-3996767f9a27.jpg'),(39,'/media/41f4cd96-31e8-a68f-4547-ee11691ed8b0.jpg'),(40,'http://youtube.com/embed/25XZdtpLW-M'),(41,'/media/8dbb8b5a-70bf-baf8-3fef-6db2a66fa250.jpg'),(42,'http://youtube.com/embed/NHDON5KEaoU'),(43,'/media/d2a0d0a3-e286-68bc-38e2-f042a4a94af5.jpg'),(44,'/media/a390f3c2-cf6c-4e56-337c-3eb7063eca35.jpg'),(45,'http://youtube.com/embed/POjnw0xEVas'),(46,'/media/3d474590-02bd-24a6-6de4-1ed45054ea77.jpg'),(47,'/media/c2ea882e-bdd4-9b81-5b2e-548305fe7489.jpg');
/*!40000 ALTER TABLE `animals_file` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `animals_page`
--

LOCK TABLES `animals_page` WRITE;
/*!40000 ALTER TABLE `animals_page` DISABLE KEYS */;
INSERT INTO `animals_page` VALUES (1,1,'batty','my cat',1,NULL),(2,2,'고냥이','하이하이',1,NULL),(3,5,'광어','맛있는 광어',3,17),(4,6,'멍멍이','멍멍',2,NULL),(5,7,'치킨','12345',1,NULL),(6,4,'해피','개 아니고 고양이인데 출생 설명서에 개라고 때버림',1,NULL),(7,3,'새대가리','참새짹짹비둘기구구',3,NULL),(8,8,'123','123',4,NULL),(9,9,'생선','생선',3,NULL),(10,11,'asdf','asdf',1,NULL),(11,12,'nnnnnnnnnnnnn','nnnnnnnnnnnnnnnnnn',1,NULL),(12,13,'asdfasdfadsfadsfdsf','dfssddsdsf',1,NULL),(13,14,'9','9',4,NULL),(16,15,'t1','t1',3,NULL),(17,16,'t2','t2',2,NULL),(18,17,'t3','t3',1,NULL),(19,19,'CDB','개샊;',2,43),(21,22,'asdf','sfdgh',1,NULL);
/*!40000 ALTER TABLE `animals_page` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `animals_page_donate_class`
--

LOCK TABLES `animals_page_donate_class` WRITE;
/*!40000 ALTER TABLE `animals_page_donate_class` DISABLE KEYS */;
INSERT INTO `animals_page_donate_class` VALUES (1,1,10000,'동메달','메일링 리스트 추가'),(3,1,1000000,'VIP','VIP 단톡방 초대'),(4,1,3000000,'SVIP','페이지 주인과의 사적 만남'),(7,21,10000000,'짱','없음'),(9,21,1000000,'1234','9090');
/*!40000 ALTER TABLE `animals_page_donate_class` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `animals_post`
--

LOCK TABLES `animals_post` WRITE;
/*!40000 ALTER TABLE `animals_post` DISABLE KEYS */;
INSERT INTO `animals_post` VALUES (1,1,'안녕','하이하이','2019-11-23 11:26:01',0),(2,1,'두번째','gogo','2019-11-23 11:29:30',1),(3,1,'포스트 테스트','Lorem','2019-11-27 14:13:30',3),(4,1,'4번째','4번째','2019-11-27 17:15:54',2),(5,1,'쿠드비','COULD BE','2019-11-27 17:52:43',0),(6,7,'My first post','잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ 잇 쿠드비↗~ ','2019-11-28 15:43:44',0),(8,3,'맛있는 회','회를 먹고 싶어','2019-12-01 00:13:58',0),(13,1,'고양이','고양이','2019-12-01 19:14:58',0),(16,1,'동영상과 사진을 한꺼번에','업로드하기','2019-12-01 19:35:17',0),(17,1,'동물','동물','2019-12-01 19:46:20',0),(18,1,'사진 많이 올리기','ㅎㅎ','2019-12-01 19:50:40',0),(19,7,'새대가리','새대가리는 멍청하다','2019-12-01 21:08:50',0),(20,3,'회뜨기','회뜨기 동영상','2019-12-03 01:32:30',0),(22,19,'Flex','\r\n학생들한테 Flex&Bison 과제를 내줬더니 Flex해버렷따','2019-12-03 15:24:33',0),(23,19,'mucheol','mucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheolmucheo','2019-12-03 15:24:43',0),(24,6,'ㅇㅇ','-회원가입 -> 메인 소개( 카테고리, 태그, 구독 리스트, popular list) -> 카테고리별 페이지 확인 -> 페이지 하나로 들어감 -> 페이지(기본정보 확인, 포스트 리스트, 포스트 설명{사진 넘겨보기, 동영상), 코멘트 달기&삭제, 테그 클릭으로 검색(이어서 좌측 네비 테그로 검색)) -> 다시 페이지에서 support Animal -> 필요한 물품을 후원할 수 있음 -> 포인트 보여주기(buy point) -> kakaopay가 된답니다 개쩔어 -> 다시 도오전 -> 사면서 변하는 것들 보여주기(물품 개수 줄어듬, 서포트 레벨 증가, 레벨에 따라 보이는게 달라짐) -> cash donation 보여주기(비스끄리무리하게) -> support log 볼수있다 -> 자신 페이지 만들기(중요 사진 올리기) -> post 쓰기(유튜브 링크 달기, 사진 여러개 올리기, 태그 달기) -> 후원관리페이지로 이동 -> 필요한 물품 추가 -> 후원 계급 설정 -> 끝','2019-12-03 18:55:31',0),(25,21,'asdf','fdagh','2019-12-03 19:02:01',2);
/*!40000 ALTER TABLE `animals_post` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `animals_post_files`
--

LOCK TABLES `animals_post_files` WRITE;
/*!40000 ALTER TABLE `animals_post_files` DISABLE KEYS */;
INSERT INTO `animals_post_files` VALUES (1,1,1),(6,1,6),(2,2,2),(3,2,3),(4,2,4),(7,13,23),(10,16,29),(11,16,30),(12,17,33),(13,18,34),(14,18,35),(15,18,36),(16,18,37),(17,18,38),(18,18,39),(19,19,40),(20,19,41),(21,20,42),(23,22,45),(24,22,46),(25,22,47);
/*!40000 ALTER TABLE `animals_post_files` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `animals_post_tags`
--

LOCK TABLES `animals_post_tags` WRITE;
/*!40000 ALTER TABLE `animals_post_tags` DISABLE KEYS */;
INSERT INTO `animals_post_tags` VALUES (1,1,1),(2,1,2),(3,5,1),(4,6,1),(8,13,9),(15,16,9),(13,16,17),(14,16,18),(16,17,10),(18,18,9),(17,18,18),(19,19,23),(20,20,24),(22,23,26),(23,25,9);
/*!40000 ALTER TABLE `animals_post_tags` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `animals_product`
--

LOCK TABLES `animals_product` WRITE;
/*!40000 ALTER TABLE `animals_product` DISABLE KEYS */;
INSERT INTO `animals_product` VALUES (1,'사료','밥먹자',1000,1),(2,'공','반려동물이 좋아하는 공',5000,2),(3,'강아지','멍멍',10000,NULL);
/*!40000 ALTER TABLE `animals_product` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `animals_required_products`
--

LOCK TABLES `animals_required_products` WRITE;
/*!40000 ALTER TABLE `animals_required_products` DISABLE KEYS */;
INSERT INTO `animals_required_products` VALUES (1,1,1,1989),(4,1,3,12645),(8,1,2,5123),(10,21,3,23);
/*!40000 ALTER TABLE `animals_required_products` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `animals_tag`
--

LOCK TABLES `animals_tag` WRITE;
/*!40000 ALTER TABLE `animals_tag` DISABLE KEYS */;
INSERT INTO `animals_tag` VALUES (25,'#Flex'),(23,'#새대가리'),(26,'mucheol'),(9,'고양이'),(2,'공지'),(14,'노래'),(10,'동물'),(17,'동영상'),(18,'사진'),(1,'잡담'),(24,'회');
/*!40000 ALTER TABLE `animals_tag` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `animals_user`
--

LOCK TABLES `animals_user` WRITE;
/*!40000 ALTER TABLE `animals_user` DISABLE KEYS */;
INSERT INTO `animals_user` VALUES (1,'njw1204','328014ee285696d8986067977c42fe6f70387f3e1b8fe3c7f1a2b4906839b4ba','njw1204@naver.com',1999000),(2,'나종우','328014ee285696d8986067977c42fe6f70387f3e1b8fe3c7f1a2b4906839b4ba','njw991204@gmail.com',10000),(3,'njw!204','ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb','a@a.a',1011111),(4,'재기','10007b2eb96f4c3823dd56e2995fca6610d54e080afc6df6b6f3b8a111788d9e','wuju@ojooo.com',55555),(5,'1','6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b','1@1',8059000),(6,'2','d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35','2@2',0),(7,'ㅁㄴㅇㄹ','8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4','hi@abc.com',0),(8,'123','a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3','123@123',0),(9,'@','5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9','0@0',8488999),(10,'수발','8ba1f4d9cceb2f9be47a66b41afe403ddafdeb7b4219f5c357f5c7cdc25f905f','subal@subal.com',498000),(11,'3','d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35','222@222',10000),(12,'t','e3b98a4da31a127d4bde6e43033f66ba274cab0eb7eb1c70ec41402bf6273dd8','t@t',0),(13,'k','8254c329a92850f6d539dd376f4816ee2764517da5e0235514af433164480d7a','k@k',0),(14,'9','19581e27de7ced00ff1ce50b2047e7a567c76b1cbaebabe5ef03f7c3017bb5b7','9@9',0),(15,'t1','628b49d96dcde97a430dd4f597705899e09a968f793491e4b704cae33a40dc02','t1@t1',0),(16,'t2','c44474038d459e40e4714afefa7bf8dae9f9834b22f5e8ec1dd434ecb62b512e','t2@t2',0),(17,'t3','cece8a9cecfb6c7e7ee4f3346d5e2544138bfb6e33bec6042a17333a4d3180b0','t3@t3',0),(18,'Heehee','78f0458675d7745478faee7d0a8fb82b8b79887d892b6b9ae50080bc4d16100a','sorry@thank.you',1000),(19,'구도빈','3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d','b@b.b',0),(20,'1234','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4','1234@1234',22456),(21,'nameanas','f0e4c2f76c58916ec258f246851bea091d14d4247a2fc3e18694461b1816e13b','kzrt1@v',0),(22,'asdfasdf','f0e4c2f76c58916ec258f246851bea091d14d4247a2fc3e18694461b1816e13b','a@v.a',991099999);
/*!40000 ALTER TABLE `animals_user` ENABLE KEYS */;
UNLOCK TABLES;

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

--
-- Dumping data for table `animals_user_to_page_info`
--

LOCK TABLES `animals_user_to_page_info` WRITE;
/*!40000 ALTER TABLE `animals_user_to_page_info` DISABLE KEYS */;
INSERT INTO `animals_user_to_page_info` VALUES (1,1,1,2100000,0,2),(13,1,2,0,0,0),(14,1,3,20500000,1,0),(24,2,1,0,1,0),(27,2,4,0,1,0),(28,2,3,0,1,0),(29,1,4,0,0,0),(35,3,1,6612000,1,3),(40,1,7,1000003455,1,0),(48,9,1,1630011,0,2),(63,9,2,1000,0,0),(65,4,1,1926996467,1,3),(72,4,3,65656533,0,0),(87,1,9,1000,0,0),(88,4,7,100000,1,0),(89,4,9,1000,0,0),(90,10,6,2000,1,0),(91,10,1,500000,0,1),(157,6,7,0,1,0),(164,1,12,0,0,0),(177,3,3,0,1,0),(178,5,1,2031000,1,2),(186,5,7,10000,0,0),(245,1,8,1000,1,0),(250,19,3,0,1,0),(253,20,1,111000,0,1),(256,22,1,8000000,1,3),(260,22,21,1000000,0,1);
/*!40000 ALTER TABLE `animals_user_to_page_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-03 19:06:28
