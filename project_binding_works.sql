-- phpMyAdmin SQL Dump
-- version 4.0.10.20
-- https://www.phpmyadmin.net
--
-- ホスト: factory-instance-1.cyss4kcjgyjd.ap-northeast-1.rds.amazonaws.com
-- 生成日時: 2020 年 6 月 05 日 15:05
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
-- テーブルのデータのダンプ `project_binding_works`
--

INSERT INTO `project_binding_works` (`id`, `project_id`, `bind_type`, `cross_front`, `cross_back`, `cross_color`, `wrap_front`, `wrap_back_text`, `stitching_paper`, `secret_stitch`, `secret_stitch_paper`, `radio_stitch`, `radio_cut`, `radio_cut_note`, `double_doors`, `gold_letter`, `created_at`, `updated_at`, `note`, `price`) VALUES
(2, 2, 10, 'asd', 'asdasd', 0, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-04-26 11:02:14', '2019-04-26 11:02:14', NULL, NULL),
(3, 15, 60, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-05-16 13:47:49', '2019-05-16 13:47:49', NULL, NULL),
(4, 16, 0, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-05-22 17:31:49', '2019-05-22 17:31:49', '', 10000),
(5, 1, 0, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-05-23 08:51:22', '2019-05-23 08:51:22', '', 0),
(6, 19, 0, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-05-24 10:53:31', '2019-05-24 10:53:31', '', 0),
(7, 20, 0, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-05-24 10:53:52', '2019-05-24 10:53:52', '', 0),
(8, 22, 0, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-05-24 10:54:47', '2019-05-24 10:54:47', '', 0),
(10, 23, 0, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-05-28 13:36:50', '2019-05-28 13:36:50', '', 0),
(11, 24, 0, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-05-28 13:37:11', '2019-05-28 13:37:11', '', 0),
(12, 27, 10, '', '', 0, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-05-28 17:32:28', '2019-05-28 17:32:28', '', 1000),
(14, 28, 0, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-05-30 09:35:25', '2019-05-30 09:35:25', '', 1000),
(15, 29, 60, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-05-30 20:42:15', '2019-05-30 20:42:15', '', 0),
(16, 33, 0, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-05-31 14:28:54', '2019-05-31 14:28:54', '', 1000),
(17, 32, 10, 'おもてええ', 'うらああ', 0, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-06-02 16:45:24', '2019-06-02 16:45:24', '', 500),
(18, 37, 10, 'これはテスト製本です', 'これはテスト製本です', 0, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-06-02 17:14:11', '2019-06-02 17:14:11', '', 1000),
(19, 44, 20, '', '', NULL, 'くるみテスト', 0, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-06-02 17:39:51', '2019-06-02 17:39:51', '', 1000),
(20, 46, 10, 'tesuto \n', 'tesuto', 0, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-06-02 17:50:04', '2019-06-02 17:50:04', '', 1000),
(21, 50, 10, '', '', 0, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-06-03 11:41:20', '2019-06-03 11:41:20', '', 1000),
(23, 134, 10, 'テスト', 'テスト', 0, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-06-07 11:41:58', '2019-06-07 11:41:58', '', 30000),
(50, 272, 0, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-06-10 13:54:44', '2019-06-10 13:54:44', '', 0),
(69, 514, 0, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-07-02 18:27:04', '2019-07-02 18:27:04', '', 0),
(73, 630, 40, '', '', NULL, '', NULL, '', 0, 0, NULL, NULL, '', NULL, NULL, '2019-07-03 18:14:47', '2019-07-03 18:14:47', '', 300),
(74, 629, 40, '', '', NULL, '', NULL, '', 0, 0, NULL, NULL, '', NULL, NULL, '2019-07-03 18:15:24', '2019-07-03 18:15:24', '', 200),
(75, 650, 40, '', '', NULL, '', NULL, '', 0, 10, NULL, NULL, '', NULL, NULL, '2019-07-03 18:16:18', '2019-07-03 18:16:18', '', 500),
(76, 656, 30, '', '', NULL, '', NULL, '1～20', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-07-03 18:44:05', '2019-07-03 18:44:05', '', 150),
(77, 657, 10, '', '', 0, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-07-03 18:45:25', '2019-07-03 18:45:25', '', 150),
(78, 658, 10, '', '', 0, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-07-03 18:46:02', '2019-07-03 18:46:02', '', 250),
(79, 659, 10, '', '', 0, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-07-03 18:46:57', '2019-07-03 18:46:57', '', 350),
(80, 660, 10, '', '', 0, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-07-03 18:47:43', '2019-07-03 18:47:43', '', 500),
(81, 769, 20, '', '', NULL, '', 10, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-07-12 18:17:01', '2019-07-12 18:17:01', '', 250),
(82, 829, 60, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-08-02 15:29:43', '2019-08-02 15:29:43', '', 1300),
(83, 830, 60, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-08-02 15:30:27', '2019-08-02 15:30:27', '', 2350),
(84, 831, 60, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-08-02 15:31:14', '2019-08-02 15:31:14', '', 2950),
(88, 833, 70, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-08-07 10:27:42', '2019-08-07 10:27:42', '', 0),
(114, 850, 20, '', '', NULL, '', 0, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-08-27 15:14:56', '2019-08-27 15:14:56', '', 250),
(115, 851, 20, '', '', NULL, '', 0, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-08-27 15:15:44', '2019-08-27 15:15:44', '', 350),
(116, 852, 20, '', '', NULL, '', 0, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-08-27 15:16:27', '2019-08-27 15:16:27', '', 450),
(117, 853, 20, '', '', NULL, '', 0, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-08-27 15:17:04', '2019-08-27 15:17:04', '', 600),
(118, 198, 20, '', '', NULL, '', 0, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-11-19 04:08:05', '2019-11-19 04:08:05', '', 250),
(119, 197, 40, '', '', NULL, '', NULL, '', 0, 0, NULL, NULL, '', NULL, NULL, '2019-11-19 04:08:27', '2019-11-19 04:08:27', '', 1300),
(120, 196, 40, '', '', NULL, '', NULL, '', 0, 0, NULL, NULL, '', NULL, NULL, '2019-11-19 04:08:45', '2019-11-19 04:08:45', '', 1000),
(121, 195, 40, '', '', NULL, '', NULL, '', 0, 0, NULL, NULL, '', NULL, NULL, '2019-11-19 04:09:13', '2019-11-19 04:09:13', '', 600),
(122, 194, 40, '', '', NULL, '', NULL, '', 0, 0, NULL, NULL, '', NULL, NULL, '2019-11-19 04:09:26', '2019-11-19 04:09:26', '', 250),
(123, 193, 60, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-11-19 04:09:43', '2019-11-19 04:09:43', '', 2200),
(124, 192, 60, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-11-19 04:10:05', '2019-11-19 04:10:05', '', 300),
(125, 191, 60, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-11-19 04:10:20', '2019-11-19 04:10:20', '', 500),
(126, 190, 60, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-11-19 04:10:34', '2019-11-19 04:10:34', '', 600),
(127, 189, 60, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-11-19 04:10:47', '2019-11-19 04:10:47', '', 35),
(128, 188, 60, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-11-19 04:11:01', '2019-11-19 04:11:01', '', 30),
(129, 187, 60, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-11-19 04:11:14', '2019-11-19 04:11:14', '', 20),
(130, 186, 60, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-11-19 04:11:25', '2019-11-19 04:11:25', '', 700),
(131, 185, 60, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-11-19 04:11:41', '2019-11-19 04:11:41', '', 500),
(132, 184, 60, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-11-19 04:11:59', '2019-11-19 04:11:59', '', 400),
(133, 183, 50, '', '', NULL, '', NULL, '', NULL, NULL, 0, 0, '', NULL, NULL, '2019-11-19 04:12:07', '2019-11-19 04:12:07', '', 50),
(134, 182, 30, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-11-19 04:12:16', '2019-11-19 04:12:16', '', 100),
(135, 177, 10, '', '', 0, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-11-19 04:12:47', '2019-11-19 04:12:47', '', 250),
(136, 288, 50, '', '', NULL, '', NULL, '', NULL, NULL, 0, 0, '', NULL, NULL, '2019-11-19 05:36:50', '2019-11-19 05:36:50', '', 50),
(137, 287, 30, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-11-19 05:36:57', '2019-11-19 05:36:57', '', 100),
(138, 286, 40, '', '', NULL, '', NULL, '', 0, 0, NULL, NULL, '', NULL, NULL, '2019-11-19 05:38:15', '2019-11-19 05:38:15', '', 1000),
(139, 285, 40, '', '', NULL, '', NULL, '', 0, 0, NULL, NULL, '', NULL, NULL, '2019-11-19 05:38:21', '2019-11-19 05:38:21', '', 1300),
(140, 284, 40, '', '', NULL, '', NULL, '', 0, 0, NULL, NULL, '', NULL, NULL, '2019-11-19 05:38:27', '2019-11-19 05:38:27', '', 600),
(141, 283, 40, '', '', NULL, '', NULL, '', 0, 0, NULL, NULL, '', NULL, NULL, '2019-11-19 05:38:33', '2019-11-19 05:38:33', '', 250),
(142, 282, 60, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-11-19 05:39:12', '2019-11-19 05:39:12', '', 20),
(143, 281, 60, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-11-19 05:39:33', '2019-11-19 05:39:33', '', 30),
(144, 280, 60, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-11-19 05:39:51', '2019-11-19 05:39:51', '', 35),
(145, 279, 60, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-11-19 05:40:10', '2019-11-19 05:40:10', '', 50),
(146, 278, 60, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-11-19 05:40:35', '2019-11-19 05:40:35', '', 400),
(147, 277, 60, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-11-19 05:41:03', '2019-11-19 05:41:03', '', 500),
(148, 276, 60, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-11-19 05:41:16', '2019-11-19 05:41:16', '', 700),
(149, 275, 60, '', '', NULL, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-11-19 05:41:30', '2019-11-19 05:41:30', '', 800),
(150, 271, 10, '', '', 0, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-11-19 05:42:14', '2019-11-19 05:42:14', '', 1000),
(151, 270, 10, '', '', 0, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-11-19 05:42:20', '2019-11-19 05:42:20', '', 500),
(152, 269, 10, '', '', 0, '', NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-11-19 05:42:39', '2019-11-19 05:42:39', '', 250),
(153, 268, 20, '', '', NULL, '', 0, '', NULL, NULL, NULL, NULL, '', NULL, NULL, '2019-11-19 05:42:45', '2019-11-19 05:42:45', '', 250);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
