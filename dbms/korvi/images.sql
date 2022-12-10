-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2022 at 06:57 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `korvi`
--

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `img_path` varchar(45) NOT NULL,
  `uploaded` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `user_id`, `img_path`, `uploaded`) VALUES
(56, 1, '/src/uploads/1669259882.jpg', '2022-11-24'),
(57, 1, '/src/uploads/1669259890.jpg', '2022-11-24'),
(58, 1, '/src/uploads/1669259897.jpg', '2022-11-24'),
(59, 1, '/src/uploads/1669259911.jpg', '2022-11-24'),
(60, 1, '/src/uploads/1669259924.jpg', '2022-11-24'),
(61, 1, '/src/uploads/1669259935.jpg', '2022-11-24'),
(62, 1, '/src/uploads/1669259946.jpg', '2022-11-24'),
(63, 1, '/src/uploads/1669259961.jpg', '2022-11-24'),
(64, 1, '/src/uploads/1669259984.jpg', '2022-11-24'),
(65, 12, '/src/uploads/1669260050.jpg', '2022-11-24'),
(66, 12, '/src/uploads/1669260059.jpg', '2022-11-24'),
(67, 12, '/src/uploads/1669260070.png', '2022-11-24'),
(69, 12, '/src/uploads/1669260087.jpg', '2022-11-24'),
(70, 12, '/src/uploads/1669260094.jpg', '2022-11-24'),
(71, 12, '/src/uploads/1669260102.jpg', '2022-11-24'),
(72, 12, '/src/uploads/1669260112.jpeg', '2022-11-24'),
(74, 12, '/src/uploads/1669260129.jpg', '2022-11-24'),
(79, 12, '/src/uploads/1670142049.jpg', '2022-12-04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
