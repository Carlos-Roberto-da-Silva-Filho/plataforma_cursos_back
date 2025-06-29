-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: db_cursos
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `cursos`
--

DROP TABLE IF EXISTS `cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cursos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` text NOT NULL,
  `capa` varchar(255) DEFAULT NULL,
  `inicio` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cursos`
--

LOCK TABLES `cursos` WRITE;
/*!40000 ALTER TABLE `cursos` DISABLE KEYS */;
INSERT INTO `cursos` VALUES (1,'Introdução ao Node.js','Aprenda os fundamentos de desenvolvimento backend com Node.js.','node_js.jpeg','2025-07-01'),(2,'Banco de Dados com Sequelize','Domine ORMs e modelagem de dados com Sequelize e MySQL.','sequelize.png','2025-08-15'),(3,'API RESTful com Express','Construa APIs modernas utilizando Java.','express.jpeg','2025-09-01'),(4,'Programação Java','Implemente autenticação segura em aplicações Node.js com JSON Web Tokens.','java.png','2025-09-15'),(5,'Integração com Frontend','Aprenda a conectar frontend e backend utilizando fetch e Axios.','my_sql.png','2025-10-01'),(6,'Testes Automatizados com Jest','Garanta a qualidade do seu código backend com testes unitários e de integração.','jest.jpeg','2025-10-20'),(7,'Deploy de Aplicações Node.js','Descubra como publicar seus projetos na web usando plataformas como Heroku e Render.','node_js.jpeg','2025-11-05');
/*!40000 ALTER TABLE `cursos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inscricoes`
--

DROP TABLE IF EXISTS `inscricoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inscricoes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `data_cancelamento` datetime DEFAULT NULL,
  `data_inscricao` datetime NOT NULL,
  `usuario_id` int NOT NULL,
  `curso_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `inscricoes_usuario_id_curso_id` (`usuario_id`,`curso_id`),
  KEY `curso_id` (`curso_id`),
  CONSTRAINT `inscricoes_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `inscricoes_ibfk_2` FOREIGN KEY (`curso_id`) REFERENCES `cursos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inscricoes`
--

LOCK TABLES `inscricoes` WRITE;
/*!40000 ALTER TABLE `inscricoes` DISABLE KEYS */;
INSERT INTO `inscricoes` VALUES (1,'2025-06-29 15:23:25','2025-06-29 15:23:09',1,1),(2,NULL,'2025-06-29 15:23:11',1,3),(3,NULL,'2025-06-29 15:23:13',1,4),(4,NULL,'2025-06-29 15:23:16',1,6),(5,NULL,'2025-06-29 15:23:49',2,4),(6,NULL,'2025-06-29 15:23:50',2,3),(7,'2025-06-29 15:23:56','2025-06-29 15:23:51',2,2),(8,NULL,'2025-06-29 15:24:03',2,6),(9,'2025-06-29 15:25:22','2025-06-29 15:24:51',3,3),(10,'2025-06-29 15:24:58','2025-06-29 15:24:52',3,7),(11,NULL,'2025-06-29 15:24:53',3,6),(12,NULL,'2025-06-29 15:25:03',3,2),(13,NULL,'2025-06-29 15:25:10',3,4),(14,NULL,'2025-06-29 15:25:10',3,5);
/*!40000 ALTER TABLE `inscricoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `nascimento` date NOT NULL,
  `criado_em` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Carlos','carlos@gmail.com','$2b$10$adSGmonu4goCnz3F1m5Hc.sksEkEG1s6InJOYJr1fcRP5qhybJbdG','1985-10-18','2025-06-29 15:20:16'),(2,'Roberto','roberto@gmail.com','$2b$10$hppt1LalYMPTkVuFmVkwH.hOPAO5Oq6zHOBXCprh5bcUCQHVoElwu','1980-10-10','2025-06-29 15:20:58'),(3,'Alberto','alberto@gmail.com','$2b$10$vlTsz/4DybduJt40mFCsWu78ry16v.uHvaau5g7bnh5T/Cvx2DcRu','1995-12-12','2025-06-29 15:21:55');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-29 12:26:57
