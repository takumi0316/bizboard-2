-- phpMyAdmin SQL Dump
-- version 4.0.10.20
-- https://www.phpmyadmin.net
--
-- ホスト: factory-instance-1.cyss4kcjgyjd.ap-northeast-1.rds.amazonaws.com
-- 生成日時: 2020 年 6 月 05 日 15:06
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
-- テーブルのデータのダンプ `project_prints`
--

INSERT INTO `project_prints` (`id`, `project_id`, `draft_data`, `url`, `work_process`, `work_type`, `work_note`, `work_time`, `work_price`, `print_work`, `color`, `print_size`, `print_size_note`, `surface`, `open_type`, `created_at`, `updated_at`, `price`) VALUES
(3, 7, 0, '', 10, 0, '入稿紙原稿から表紙作成', 45, 0, 10, 0, 30, NULL, 20, 0, '2019-05-01 08:14:32', '2019-05-01 08:14:32', NULL),
(5, 9, 0, '', 0, NULL, '', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, '2019-05-06 08:57:55', '2019-05-06 08:57:55', NULL),
(6, 10, 0, '', 0, NULL, '', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, '2019-05-08 10:51:19', '2019-05-08 10:51:19', NULL),
(7, 12, 0, '', 0, NULL, '', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, '2019-05-08 14:45:11', '2019-05-08 14:45:11', NULL),
(17, 11, 0, 'ああああああああああああああああああああああああああああ', 0, NULL, '', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, '2019-05-10 14:23:46', '2019-05-10 14:23:46', NULL),
(19, 14, 0, '', 0, NULL, '', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, '2019-05-14 13:43:20', '2019-05-14 13:43:20', NULL),
(21, 16, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-05-22 17:31:49', '2019-05-22 17:31:49', 1000),
(22, 1, 0, '', 10, 10, '', NULL, 0, 10, 10, 10, '', 10, NULL, '2019-05-23 08:51:22', '2019-05-23 08:51:22', 0),
(23, 19, 0, '', 10, 0, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-05-24 10:53:31', '2019-05-24 10:53:31', 0),
(27, 23, 0, '', 10, 0, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-05-28 13:36:50', '2019-05-28 13:36:50', 0),
(28, 24, 0, '', 10, 0, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-05-28 13:37:11', '2019-05-28 13:37:11', 0),
(30, 25, 0, '', 10, 0, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-05-28 15:29:59', '2019-05-28 15:29:59', 1000),
(37, 27, 0, '', 10, 0, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-05-28 17:30:55', '2019-05-28 17:30:55', 1000),
(40, 28, 0, '', 10, 0, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-05-30 09:35:25', '2019-05-30 09:35:25', 1000),
(41, 29, 0, '\\\\192.168.1.199\\Public\\02_大崎センター\\★案件データ保管【更新対応】3\\【請負】当年含む2年保管\\2019年\\EN-20190118Z001 観音製本用出力', 10, 0, '東陽青写真工業外注\n表紙・背表紙作成', 1, 0, 10, 0, 10, '', 20, 0, '2019-05-30 20:42:15', '2019-05-30 20:42:15', 0),
(42, 30, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-05-31 14:23:10', '2019-05-31 14:23:10', 0),
(43, 31, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-05-31 14:23:11', '2019-05-31 14:23:11', 0),
(44, 34, 0, '', 10, 0, 'ddddd', NULL, 0, 10, 10, 20, '', 0, NULL, '2019-06-01 18:43:34', '2019-06-01 18:43:34', 0),
(45, 32, 0, 'abc', 10, 0, 'a', 1, 0, 10, 0, 0, '', 20, 0, '2019-06-02 16:45:24', '2019-06-02 16:45:24', 1000),
(48, 42, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-06-02 17:37:26', '2019-06-02 17:37:26', 1000),
(50, 44, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-06-02 17:39:51', '2019-06-02 17:39:51', 1000),
(51, 47, 0, '', 10, 0, '', NULL, 1000, 10, 0, 0, '', 20, 0, '2019-06-03 09:00:56', '2019-06-03 09:00:56', 0),
(52, 48, 0, '', 10, 0, '', NULL, 1000, 10, 0, 0, '', 20, 0, '2019-06-03 09:01:40', '2019-06-03 09:01:40', 1000),
(53, 49, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-06-03 11:32:34', '2019-06-03 11:32:34', 0),
(56, 50, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-06-03 11:41:20', '2019-06-03 11:41:20', 1000),
(57, 52, 0, '', 10, 0, 'あいうえお', NULL, 1000, 10, 0, 0, '', 20, 0, '2019-06-03 12:07:25', '2019-06-03 12:07:25', 0),
(58, 53, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-06-03 12:53:13', '2019-06-03 12:53:13', 1000),
(59, 15, 0, '', 0, NULL, '', NULL, 0, 10, 0, 10, '', 20, 0, '2019-06-03 14:23:23', '2019-06-03 14:23:23', 0),
(60, 43, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-06-03 14:32:39', '2019-06-03 14:32:39', 1000),
(61, 41, 0, '', 10, 0, 'dddddd', 4, 0, 10, 0, 0, '', 20, 0, '2019-06-03 15:24:23', '2019-06-03 15:24:23', 100000),
(77, 126, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-06-06 21:14:55', '2019-06-06 21:14:55', 0),
(80, 128, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-06-07 09:30:41', '2019-06-07 09:30:41', 0),
(82, 134, 0, '', 10, 0, '書類作成', 2, 4000, 10, 0, 0, '', 20, 0, '2019-06-07 11:41:58', '2019-06-07 11:41:58', 50000),
(118, 243, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-06-10 13:24:55', '2019-06-10 13:24:55', 1800),
(119, 357, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-06-10 15:26:25', '2019-06-10 15:26:25', 95),
(120, 358, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-06-10 15:27:28', '2019-06-10 15:27:28', 75),
(121, 359, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-06-10 15:27:53', '2019-06-10 15:27:53', 85),
(122, 360, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-06-10 15:28:19', '2019-06-10 15:28:19', 75),
(123, 361, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-06-10 15:29:08', '2019-06-10 15:29:08', 8000),
(124, 362, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-06-10 15:29:29', '2019-06-10 15:29:29', 4000),
(125, 363, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-06-10 15:29:48', '2019-06-10 15:29:48', 2000),
(126, 364, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-06-10 15:30:08', '2019-06-10 15:30:08', 1750),
(127, 365, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-06-10 15:30:32', '2019-06-10 15:30:32', 3500),
(129, 366, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-06-10 15:33:59', '2019-06-10 15:33:59', 65),
(130, 367, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-06-10 15:34:43', '2019-06-10 15:34:43', 55),
(131, 368, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-06-10 15:35:12', '2019-06-10 15:35:12', 40),
(132, 457, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-06-12 09:44:07', '2019-06-12 09:44:07', 2000),
(142, 516, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-06-19 16:48:52', '2019-06-19 16:48:52', 0),
(143, 480, 0, '', 10, 10, '昨年データから文言修正', 1, 0, 10, 20, 30, '4700×800', 20, 0, '2019-06-21 11:17:24', '2019-06-21 11:17:24', 4000),
(144, 478, 0, '', 0, NULL, '', NULL, 0, 10, 20, 20, '', 20, 0, '2019-06-21 11:18:40', '2019-06-21 11:18:40', 10),
(145, 477, 0, '', 0, NULL, '', NULL, 0, 10, 20, 10, '', 20, 0, '2019-06-21 11:19:06', '2019-06-21 11:19:06', 30),
(146, 476, 0, '', 0, NULL, '', NULL, 0, 10, 20, 20, '', 0, 0, '2019-06-21 11:20:02', '2019-06-21 11:20:02', 20),
(147, 473, 10, '', 10, 0, '自治体名記名', 0, 0, 10, 0, 20, '', 0, 0, '2019-06-21 11:26:24', '2019-06-21 11:26:24', 600),
(149, 590, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-07-02 14:40:01', '2019-07-02 14:40:01', 0),
(152, 616, 0, '', 0, NULL, '', NULL, 0, 10, 10, 30, '証明写真等の指定サイズ～L判まで（画像編集等は「デジタル作業」として別途費用）', 20, 0, '2019-07-03 16:21:21', '2019-07-03 16:21:21', 40),
(153, 628, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-07-03 16:24:14', '2019-07-03 16:24:14', 64),
(156, 637, 0, '', 0, NULL, '', NULL, 0, 10, 20, 0, '', 20, 0, '2019-07-03 17:55:52', '2019-07-03 17:55:52', 400),
(157, 638, 0, '', 0, NULL, '', NULL, 0, 10, 20, 0, '', 20, 0, '2019-07-03 17:56:24', '2019-07-03 17:56:24', 200),
(158, 639, 0, '', 0, NULL, '', NULL, 0, 10, 10, 0, '', 20, 0, '2019-07-03 17:57:33', '2019-07-03 17:57:33', 1500),
(159, 640, 0, '', 0, NULL, '', NULL, 0, 10, 10, 0, '', 20, 0, '2019-07-03 17:58:04', '2019-07-03 17:58:04', 1000),
(160, 641, 0, '', 0, NULL, '', NULL, 0, 10, 10, 0, '', 20, 0, '2019-07-03 17:59:18', '2019-07-03 17:59:18', 2200),
(161, 642, 0, '', 0, NULL, '', NULL, 0, 10, 10, 0, '', 20, 0, '2019-07-03 18:00:02', '2019-07-03 18:00:02', 1350),
(163, 727, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-07-05 12:10:25', '2019-07-05 12:10:25', 0),
(164, 728, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-07-05 12:11:42', '2019-07-05 12:11:42', 0),
(165, 731, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-07-05 12:16:18', '2019-07-05 12:16:18', 0),
(167, 742, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-07-08 13:11:20', '2019-07-08 13:11:20', 300),
(168, 743, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-07-08 13:11:45', '2019-07-08 13:11:45', 690),
(169, 772, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-07-16 18:50:05', '2019-07-16 18:50:05', 0),
(170, 636, 0, '', 0, NULL, '', NULL, 0, 10, 10, 0, '', 20, 0, '2019-07-22 10:32:14', '2019-07-22 10:32:14', 40),
(171, 510, 0, '', 0, NULL, '', NULL, 0, 10, 20, 0, '', 20, 0, '2019-07-22 10:32:49', '2019-07-22 10:32:49', 8),
(173, 789, 0, '', 0, NULL, '', NULL, 0, 10, 10, 10, '', 20, 0, '2019-07-23 08:45:26', '2019-07-23 08:45:26', 50),
(174, 791, 0, '', 0, NULL, '', NULL, 0, 10, 10, 10, '', 20, 0, '2019-07-23 14:14:33', '2019-07-23 14:14:33', 100),
(217, 843, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-08-21 09:58:04', '2019-08-21 09:58:04', 0),
(218, 844, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-08-21 09:58:37', '2019-08-21 09:58:37', 0),
(219, 861, 10, '', 10, 10, '編集データ（AI）を元に氏名・日付の修正', 0, 0, 10, 20, 10, '', 20, 0, '2019-09-12 09:32:25', '2019-09-12 09:32:25', 2500),
(222, 98, 0, '', 0, NULL, '', NULL, 0, 10, 20, 0, '', 20, 0, '2019-11-19 04:40:46', '2019-11-19 04:40:46', 450),
(223, 97, 0, '', 0, NULL, '', NULL, 0, 10, 20, 0, '', 20, 0, '2019-11-19 04:40:53', '2019-11-19 04:40:53', 160),
(224, 96, 0, '', 0, NULL, '', NULL, 0, 10, 20, 0, '', 20, 0, '2019-11-19 04:41:00', '2019-11-19 04:41:00', 30),
(225, 95, 0, '', 0, NULL, '', NULL, 0, 10, 20, 0, '', 20, 0, '2019-11-19 04:41:20', '2019-11-19 04:41:20', 40),
(226, 94, 0, '', 0, NULL, '', NULL, 0, 10, 20, 0, '', 20, 0, '2019-11-19 04:41:27', '2019-11-19 04:41:27', 20),
(227, 89, 0, '', 0, NULL, '', NULL, 0, 10, 20, 0, '', 20, 0, '2019-11-19 04:42:34', '2019-11-19 04:42:34', 460),
(228, 88, 0, '', 0, NULL, '', NULL, 0, 10, 20, 0, '', 20, 0, '2019-11-19 04:42:43', '2019-11-19 04:42:43', 230),
(229, 87, 0, '', 0, NULL, '', NULL, 0, 10, 20, 0, '', 20, 0, '2019-11-19 04:42:49', '2019-11-19 04:42:49', 90),
(230, 86, 0, '', 0, NULL, '', NULL, 0, 10, 20, 0, '', 20, 0, '2019-11-19 04:42:56', '2019-11-19 04:42:56', 5),
(231, 85, 0, '', 0, NULL, '', NULL, 0, 10, 20, 0, '', 20, 0, '2019-11-19 04:43:19', '2019-11-19 04:43:19', 6),
(232, 84, 0, '', 0, NULL, '', NULL, 0, 10, 10, 0, '', 20, 0, '2019-11-19 04:43:25', '2019-11-19 04:43:25', 50),
(233, 83, 0, '', 0, NULL, '', NULL, 0, 10, 10, 0, '', 20, 0, '2019-11-19 04:43:31', '2019-11-19 04:43:31', 5500),
(234, 82, 0, '', 0, NULL, '', NULL, 0, 10, 10, 0, '', 20, 0, '2019-11-19 04:43:37', '2019-11-19 04:43:37', 1800),
(235, 81, 0, '', 0, NULL, '', NULL, 0, 10, 10, 0, '', 20, 0, '2019-11-19 04:43:44', '2019-11-19 04:43:44', 1500),
(236, 80, 0, '', 0, NULL, '', NULL, 0, 10, 10, 0, '', 20, 0, '2019-11-19 04:44:06', '2019-11-19 04:44:06', 40),
(237, 904, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-11-19 05:27:37', '2019-11-19 05:27:37', 0),
(238, 238, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-11-19 05:50:04', '2019-11-19 05:50:04', 7),
(239, 237, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-11-19 05:50:10', '2019-11-19 05:50:10', 8),
(240, 236, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-11-19 05:50:52', '2019-11-19 05:50:52', 5),
(241, 235, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-11-19 05:50:58', '2019-11-19 05:50:58', 6),
(246, 230, 0, '', 0, NULL, '', NULL, 0, 10, 20, 0, '', 20, 0, '2019-11-19 05:51:43', '2019-11-19 05:51:43', 30),
(247, 228, 0, '', 0, NULL, '', NULL, 0, 10, 20, 10, '', 20, 0, '2019-11-19 05:51:56', '2019-11-19 05:51:56', 40),
(249, 229, 0, '', 0, NULL, '', NULL, 0, 10, 20, 0, '', 20, 0, '2019-11-19 05:52:58', '2019-11-19 05:52:58', 20),
(250, 907, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-11-19 05:53:09', '2019-11-19 05:53:09', 20),
(254, 214, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-11-19 05:55:57', '2019-11-19 05:55:57', 60),
(255, 213, 0, '', 0, NULL, '', NULL, 0, 10, 10, 0, '', 20, 0, '2019-11-19 05:56:03', '2019-11-19 05:56:03', 3500),
(256, 212, 0, '', 0, NULL, '', NULL, 0, 10, 10, 0, '', 20, 0, '2019-11-19 05:56:10', '2019-11-19 05:56:10', 1750),
(257, 211, 0, '', 0, NULL, '', NULL, 0, 10, 10, 30, 'A2', 0, 0, '2019-11-19 05:57:37', '2019-11-19 05:57:37', 2000),
(258, 210, 0, '', 0, NULL, '', NULL, 0, 10, 10, 30, 'A1', 20, 0, '2019-11-19 05:57:43', '2019-11-19 05:57:43', 4000),
(260, 909, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-11-19 06:00:35', '2019-11-19 06:00:35', 70),
(261, 910, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-11-19 06:01:24', '2019-11-19 06:01:24', 70),
(262, 911, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-11-19 06:02:12', '2019-11-19 06:02:12', 70),
(263, 912, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-11-19 06:03:01', '2019-11-19 06:03:01', 70),
(264, 913, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-11-19 06:03:39', '2019-11-19 06:03:39', 70),
(265, 914, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-11-19 06:04:18', '2019-11-19 06:04:18', 70),
(266, 208, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2019-11-19 06:04:45', '2019-11-19 06:04:45', 70),
(267, 209, 0, '', 0, NULL, '', NULL, 0, 10, 10, 30, 'A0', 20, 0, '2019-11-19 06:05:11', '2019-11-19 06:05:11', 8000),
(268, 207, 0, '', 0, NULL, '', NULL, 0, 10, 10, 30, 'B2', 20, 0, '2019-11-19 06:05:29', '2019-11-19 06:05:29', 2300),
(269, 206, 0, '', 0, NULL, '', NULL, 0, 10, 10, 30, 'A2', 20, 0, '2019-11-19 06:05:36', '2019-11-19 06:05:36', 1700),
(270, 205, 0, '', 0, NULL, '', NULL, 0, 10, 10, 30, 'A1', 20, 0, '2019-11-19 06:05:42', '2019-11-19 06:05:42', 2900),
(274, 944, 0, '', 10, 0, '', NULL, 0, 10, 10, 10, '', 20, 0, '2020-02-05 05:04:40', '2020-02-05 05:04:40', 2000),
(275, 943, 0, '', 10, 0, '', NULL, 0, 10, 20, 10, '', 20, 0, '2020-02-05 05:04:49', '2020-02-05 05:04:49', 1500),
(276, 945, 10, '', 0, NULL, '', NULL, 0, 0, NULL, NULL, '', NULL, 0, '2020-02-05 07:51:17', '2020-02-05 07:51:17', 1145),
(277, 971, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2020-03-25 01:51:15', '2020-03-25 01:51:15', 0),
(278, 992, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2020-05-20 07:09:22', '2020-05-20 07:09:22', 60),
(279, 768, 0, '', 0, NULL, '', NULL, 0, 10, 0, 0, '', 20, 0, '2020-05-26 01:20:07', '2020-05-26 01:20:07', 2900),
(280, 204, 0, '', 0, NULL, '', NULL, 0, 10, 10, 30, 'A0', 20, 0, '2020-05-26 01:30:29', '2020-05-26 01:30:29', 5600),
(281, 233, 0, '', 0, NULL, '', NULL, 0, 10, 20, 30, 'A2', 20, 0, '2020-05-26 02:12:05', '2020-05-26 02:12:05', 100),
(282, 232, 0, '', 0, NULL, '', NULL, 0, 10, 20, 30, 'A1', 20, 0, '2020-05-26 02:12:33', '2020-05-26 02:12:33', 250),
(283, 231, 0, '', 0, NULL, '', NULL, 0, 10, 20, 30, 'A0', 20, 0, '2020-05-26 02:12:52', '2020-05-26 02:12:52', 480),
(284, 234, 0, '', 0, NULL, '', NULL, 0, 10, 20, 0, '', 20, 0, '2020-05-26 02:13:04', '2020-05-26 02:13:04', 70),
(285, 226, 0, '', 0, NULL, '', NULL, 0, 10, 20, 30, 'A2', 20, 0, '2020-05-26 02:13:22', '2020-05-26 02:13:22', 180),
(286, 224, 0, '', 0, NULL, '', NULL, 0, 10, 20, 30, 'A1', 20, 0, '2020-05-26 02:13:39', '2020-05-26 02:13:39', 470),
(287, 227, 0, '', 0, NULL, '', NULL, 0, 10, 20, 30, 'A2', 20, 0, '2020-05-26 02:13:59', '2020-05-26 02:13:59', 260),
(288, 225, 0, '', 0, NULL, '', NULL, 0, 10, 20, 30, 'A1', 20, 0, '2020-05-26 02:14:16', '2020-05-26 02:14:16', 570);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
