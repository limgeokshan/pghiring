-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 20, 2020 at 01:28 PM
-- Server version: 8.0.18
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pghiring`
--
CREATE DATABASE IF NOT EXISTS `pghiring`;
USE `pghiring`;

-- --------------------------------------------------------

--
-- Table structure for table `registrations`
--

DROP TABLE IF EXISTS `registrations`;
CREATE TABLE IF NOT EXISTS `registrations` (
  `sid` int(11) NOT NULL,
  `tid` int(11) NOT NULL,
  PRIMARY KEY (`tid`,`sid`) USING BTREE,
  KEY `Student_FK` (`sid`)
) ENGINE=InnoDB;


--
-- Dumping data for table `registrations`
--

INSERT INTO `registrations` (`sid`, `tid`) VALUES
(1, 1),
(3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
CREATE TABLE IF NOT EXISTS `students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `suspended` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=17;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `email`, `suspended`, `created_at`) VALUES
(1, 'studentjon@gmail.com', 0, '2020-02-20 11:13:32'),
(3, 'studenthon@gmail.com', 0, '2020-02-20 11:14:02'),
(4, 'commonstudent1@gmail.com', 0, '2020-02-20 11:14:42'),
(5, 'commonstudent2@gmail.com', 0, '2020-02-20 11:15:12'),
(6, 'student_only_under_teacher_ken@gmail.com', 0, '2020-02-20 11:15:12'),
(9, 'studentmary@gmail.com', 0, '2020-02-20 11:15:31'),
(11, 'studentmiche@gmail.com', 0, '2020-02-20 11:16:03'),
(12, 'studentagnes@gmail.com', 0, '2020-02-20 11:16:03'),
(15, 'studentbob@gmail.com', 0, '2020-02-20 11:16:15');

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

DROP TABLE IF EXISTS `teachers`;
CREATE TABLE IF NOT EXISTS `teachers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `email`, `created_at`) VALUES
(1, 'teacherken@gmail.com', '2020-02-20 11:17:42'),
(2, 'teacherjoe@gmail.com', '2020-02-20 11:17:42');


-- Constraints for table `registrations`
--
ALTER TABLE `registrations`
  ADD CONSTRAINT `Student_FK` FOREIGN KEY (`sid`) REFERENCES `students` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `Teacher_FK` FOREIGN KEY (`tid`) REFERENCES `teachers` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
