-- MySQL dump 10.16  Distrib 10.1.26-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: prt_db
-- ------------------------------------------------------
-- Server version	10.1.26-MariaDB-0+deb9u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `achievements`
--

DROP TABLE IF EXISTS `achievements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `achievements` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `achievement_text` varchar(256) NOT NULL,
  `achievement_constraint` int(11) NOT NULL,
  `achievement_type` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `achievements`
--

LOCK TABLES `achievements` WRITE;
/*!40000 ALTER TABLE `achievements` DISABLE KEYS */;
/*!40000 ALTER TABLE `achievements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_pics`
--

DROP TABLE IF EXISTS `comment_pics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment_pics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pic_link` varchar(256) NOT NULL,
  `id_comment` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comment_pic_id_comment` (`id_comment`),
  CONSTRAINT `fk_comment_pic_id_comment` FOREIGN KEY (`id_comment`) REFERENCES `comments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_pics`
--

LOCK TABLES `comment_pics` WRITE;
/*!40000 ALTER TABLE `comment_pics` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment_pics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_votes`
--

DROP TABLE IF EXISTS `comment_votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment_votes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vote_type` tinyint(1) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_comment` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comment_votes_id_user` (`id_user`),
  KEY `fk_comment_votes_id_comment` (`id_comment`),
  CONSTRAINT `fk_comment_votes_id_comment` FOREIGN KEY (`id_comment`) REFERENCES `comments` (`id`),
  CONSTRAINT `fk_comment_votes_id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_votes`
--

LOCK TABLES `comment_votes` WRITE;
/*!40000 ALTER TABLE `comment_votes` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment_votes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_text` varchar(256) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_report` int(11) NOT NULL,
  `comment_date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comment_id_user` (`id_user`),
  KEY `fk_comment_id_report` (`id_report`),
  CONSTRAINT `fk_comment_id_report` FOREIGN KEY (`id_report`) REFERENCES `reports` (`id`),
  CONSTRAINT `fk_comment_id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `locations` (
  `lat_coord` decimal(9,6) NOT NULL,
  `long_coord` decimal(9,6) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report_pics`
--

DROP TABLE IF EXISTS `report_pics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `report_pics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pic_link` varchar(256) NOT NULL,
  `id_report` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_report_pic_id_report` (`id_report`),
  CONSTRAINT `fk_report_pic_id_report` FOREIGN KEY (`id_report`) REFERENCES `reports` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_pics`
--

LOCK TABLES `report_pics` WRITE;
/*!40000 ALTER TABLE `report_pics` DISABLE KEYS */;
/*!40000 ALTER TABLE `report_pics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report_votes`
--

DROP TABLE IF EXISTS `report_votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `report_votes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vote_type` tinyint(1) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_report` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_report_votes_id_user` (`id_user`),
  KEY `fk_report_votes_id_report` (`id_report`),
  CONSTRAINT `fk_report_votes_id_report` FOREIGN KEY (`id_report`) REFERENCES `reports` (`id`),
  CONSTRAINT `fk_report_votes_id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_votes`
--

LOCK TABLES `report_votes` WRITE;
/*!40000 ALTER TABLE `report_votes` DISABLE KEYS */;
/*!40000 ALTER TABLE `report_votes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `id_user` int(11) NOT NULL,
  `id_location` int(11) NOT NULL,
  `report_type` int(11) NOT NULL,
  `report_date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_user` (`id_user`),
  KEY `fk_id_location` (`id_location`),
  CONSTRAINT `fk_id_location` FOREIGN KEY (`id_location`) REFERENCES `locations` (`id`),
  CONSTRAINT `fk_id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_achievements`
--

DROP TABLE IF EXISTS `user_achievements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_achievements` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_achievement` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_achiv_id_user` (`id_user`),
  KEY `user_achiv_id_achiv` (`id_achievement`),
  CONSTRAINT `user_achiv_id_achiv` FOREIGN KEY (`id_achievement`) REFERENCES `achievements` (`id`),
  CONSTRAINT `user_achiv_id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_achievements`
--

LOCK TABLES `user_achievements` WRITE;
/*!40000 ALTER TABLE `user_achievements` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_achievements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `surname` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` char(32) NOT NULL,
  `avatar_link` varchar(256) DEFAULT NULL,
  `join_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-09  7:28:12
