-- phpMyAdmin SQL Dump
-- Database: mithrato1_mithradb
-- Target Table: inquiries
-- Mithra Tours & Travels V2 Schema

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+05:30";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Drop old tables if they exist
--
DROP TABLE IF EXISTS `feedbacks`;
DROP TABLE IF EXISTS `inquiries`;

-- --------------------------------------------------------

--
-- Table structure for table `inquiries`
--

CREATE TABLE `inquiries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `form_type` varchar(60) NOT NULL DEFAULT 'Website Enquiry',
  `name` varchar(150) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(150) DEFAULT NULL,
  `service` varchar(150) DEFAULT NULL,
  `package_name` varchar(150) DEFAULT NULL,
  `pickup` varchar(150) DEFAULT NULL,
  `drop_city` varchar(150) DEFAULT NULL,
  `car_type` varchar(100) DEFAULT NULL,
  `travel_date` varchar(50) DEFAULT NULL,
  `travel_time` varchar(50) DEFAULT NULL,
  `travelers_count` varchar(50) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'New',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
