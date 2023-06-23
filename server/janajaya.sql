-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.33 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for randcopf_janajaya
CREATE DATABASE IF NOT EXISTS `randcopf_janajaya` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `randcopf_janajaya`;


-- Dumping structure for table randcopf_janajaya.products
CREATE TABLE IF NOT EXISTS `products` (
  `ProductID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Description` text NOT NULL,
  `RetailPrice` float NOT NULL,
  `WholesalePrice` float NOT NULL,
  `Image` varchar(250) NOT NULL,
  `Quantity` int(5) NOT NULL,
  `Unit` varchar(10) NOT NULL DEFAULT 'Kg',
  PRIMARY KEY (`ProductID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

-- Dumping data for table randcopf_janajaya.products: ~2 rows (approximately)
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` (`ProductID`, `Name`, `Description`, `RetailPrice`, `WholesalePrice`, `Image`, `Quantity`, `Unit`) VALUES
	(17, 'Daal', 'dal or paruppu, are dried, split pulses that do not require soaking before cooking.', 350, 320, 'image1686536447646.png', 1, 'Kg'),
	(18, 'Chickpeace', 'The chickpea or chick pea is an annual legume of the family Fabaceae, subfamily Faboideae.', 400, 350, 'image1686536749639.png', 0, 'Kg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;


-- Dumping structure for table randcopf_janajaya.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `OrderID` int(11) NOT NULL AUTO_INCREMENT,
  `OrderDate` datetime NOT NULL,
  `TotalAmount` decimal(10,2) NOT NULL,
  `Status` varchar(50) NOT NULL,
  `UserName` varchar(50) NOT NULL,
  `ContactNo` varchar(15) NOT NULL,
  `ShippingAddress` varchar(255) NOT NULL,
  `Email` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`OrderID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

-- Dumping data for table randcopf_janajaya.orders: ~7 rows (approximately)
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` (`OrderID`, `OrderDate`, `TotalAmount`, `Status`, `UserName`, `ContactNo`, `ShippingAddress`, `Email`) VALUES
	(2, '2023-06-13 06:28:22', 400.00, 'delivered', 'W Suranga ishara', '+94713235898', '177/A waraketiyawatta,\nPathegama, Rammala, Warapitiya.', 'effectsdepot@gmail.com'),
	(3, '2023-06-13 06:37:44', 1192.50, 'pending', 'W Suranga ishara', '+94713235898', '177/A waraketiyawatta,\nPathegama, Rammala, Warapitiya.', 'effectsdepot@gmail.com'),
	(4, '2023-06-13 06:43:41', 1042.50, 'pending', 'W Suranga ishara', '+94713235898', '177/A waraketiyawatta,\nPathegama, Rammala, Warapitiya.', 'effectsdepot@gmail.com'),
	(5, '2023-06-13 06:47:11', 742.50, 'pending', 'W Suranga ishara', '+94713235898', '177/A waraketiyawatta,\nPathegama, Rammala, Warapitiya.', 'effectsdepot@gmail.com'),
	(6, '2023-06-13 06:49:38', 697.00, 'pending', 'W Suranga ishara', '+94713235898', '177/A waraketiyawatta,\nPathegama, Rammala, Warapitiya.', 'effectsdepot@gmail.com'),
	(10, '2023-06-13 07:32:06', 750.00, 'delivered', 'ishara', 'yaa', 'llll', 'admin@gmail.com'),
	(11, '2023-06-13 07:38:17', 347.50, 'delivered', 'ishara', '0713235898', 'ssssssssssssssssssssssssssss', 'admin@gmail.com');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;


-- Dumping structure for table randcopf_janajaya.orderitems
CREATE TABLE IF NOT EXISTS `orderitems` (
  `OrderItemID` int(11) NOT NULL AUTO_INCREMENT,
  `OrderID` int(11) DEFAULT NULL,
  `ProductID` int(11) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `Price` decimal(10,2) DEFAULT NULL,
  `Subtotal` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`OrderItemID`),
  KEY `ProductID` (`ProductID`),
  KEY `idx_OrderID` (`OrderID`),
  CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`OrderID`),
  CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ProductID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

-- Dumping data for table randcopf_janajaya.orderitems: ~11 rows (approximately)
/*!40000 ALTER TABLE `orderitems` DISABLE KEYS */;
INSERT INTO `orderitems` (`OrderItemID`, `OrderID`, `ProductID`, `Quantity`, `Price`, `Subtotal`) VALUES
	(1, 2, 16, 0, 400.00, 0.00),
	(2, 3, 16, 0, 400.00, 1200.00),
	(4, 4, 15, 0, 350.00, 700.00),
	(5, 4, 16, 0, 400.00, 800.00),
	(6, 5, 15, 0, 350.00, 350.00),
	(7, 5, 16, 0, 400.00, 800.00),
	(9, 6, 15, 0, 350.00, 700.00),
	(10, 10, 15, 1, 350.00, 350.00),
	(11, 10, 16, 1, 400.00, 400.00),
	(12, 11, 16, 2, 400.00, 795.00),
	(13, 11, 15, 1, 350.00, 350.00);
/*!40000 ALTER TABLE `orderitems` ENABLE KEYS */;


-- Dumping structure for table randcopf_janajaya.users
CREATE TABLE IF NOT EXISTS `users` (
  `UserID` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(50) NOT NULL DEFAULT '0',
  `Email` varchar(255) NOT NULL DEFAULT '0',
  `Password` varchar(255) NOT NULL DEFAULT '0',
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumping data for table randcopf_janajaya.users: ~4 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`UserID`, `Username`, `Email`, `Password`) VALUES
	(1, 'admin', 'admin@gmail.com', '$2a$10$eIzSWjbqh5CZTg6Cw4UlyOquNHZihesA.mM9kRn45jc8FWuN.eADi'),
	(2, 'admin1', 'admin1@gmail.com', '$2a$10$vqpCLipg5L4..Q1zRYPXceHLHLDOM5wWnmovxNxazY.q85RFOZhnO'),
	(3, 'admin3', 'admin2@gmail.com', '$2a$10$mTz4kf0lP9rabVLwPHwyYOQtxoDU44uxlnomIUtzZv8vBz9YJQ/fu'),
	(4, 'admin4', 'admin4@gmail.com', '$2a$10$ITDGWV3Ojet1BuhocdKqpO/Nqr80R3pnfHB8s0JqtjruDeucU5gd6');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
