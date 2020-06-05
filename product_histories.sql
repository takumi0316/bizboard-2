-- phpMyAdmin SQL Dump
-- version 4.0.10.20
-- https://www.phpmyadmin.net
--
-- ホスト: factory-instance-1.cyss4kcjgyjd.ap-northeast-1.rds.amazonaws.com
-- 生成日時: 2020 年 6 月 05 日 15:04
-- サーバのバージョン: 5.6.10
-- PHP のバージョン: 5.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- データベース: `factory`
--

--
-- テーブルのデータのダンプ `product_histories`
--

INSERT INTO `product_histories` (`id`, `product_id`, `date`, `status`, `quantity`, `created_at`, `updated_at`) VALUES
(1, 1, '2020-05-25', 0, 15000, '2020-05-25 09:40:00', '2020-05-25 09:40:00'),
(2, 2, '2020-05-29', 0, 10000, '2020-05-29 06:43:05', '2020-05-29 06:43:05'),
(3, 2, '2020-05-29', 10, 10, '2020-05-29 06:43:23', '2020-05-29 06:43:23'),
(4, 2, '2020-05-29', 10, 10, '2020-05-29 06:47:02', '2020-05-29 06:47:02'),
(5, 2, '2020-05-29', 10, 10, '2020-05-29 07:00:13', '2020-05-29 07:00:13'),
(6, 2, '2020-05-29', 10, 10, '2020-05-29 07:02:06', '2020-05-29 07:02:06'),
(7, 3, '2020-05-29', 0, 5000, '2020-05-29 07:39:40', '2020-05-29 07:39:40'),
(8, 4, '2020-05-29', 0, 6000, '2020-05-29 07:40:09', '2020-05-29 07:40:09'),
(9, 3, '2020-05-29', 10, 6000, '2020-05-29 07:40:40', '2020-05-29 07:40:40'),
(10, 3, '2020-05-29', 20, 6000, '2020-05-29 07:41:07', '2020-05-29 07:41:07');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
