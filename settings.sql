-- phpMyAdmin SQL Dump
-- version 4.0.10.20
-- https://www.phpmyadmin.net
--
-- ホスト: factory-instance-1.cyss4kcjgyjd.ap-northeast-1.rds.amazonaws.com
-- 生成日時: 2020 年 6 月 05 日 15:07
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
-- テーブルのデータのダンプ `settings`
--

INSERT INTO `settings` (`id`, `var`, `value`, `thing_id`, `thing_type`, `created_at`, `updated_at`) VALUES
(1, 'logo', '--- "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBSZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--0f78556a7644789bc1386b1fd2c0144d4aa05c1f/blob"\n', NULL, NULL, '2019-02-15 14:57:02', '2019-09-13 01:51:33'),
(2, 'ogimage', '--- "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBSdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--97b3c0eb82e69cd5cc69bfbc3548801fe8fcbc38/blob"\n', NULL, NULL, '2019-02-15 14:57:02', '2019-09-13 01:51:33'),
(3, 'webclip', '--- "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBTQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--0a1a3af0c4b3505c8778394705d94d7f2ebcefa2/blob"\n', NULL, NULL, '2019-02-15 14:57:02', '2019-09-13 01:51:33'),
(4, 'favicon', '--- \n...\n', NULL, NULL, '2019-05-21 15:14:07', '2019-05-21 15:14:45'),
(5, 'allow_inactive_user', '--- false\n...\n', NULL, NULL, '2019-08-08 12:17:51', '2019-08-08 12:18:12'),
(6, 'information_new_hours', '--- 24\n...\n', NULL, NULL, '2019-08-08 12:17:51', '2019-08-08 12:17:51'),
(7, 'consumption_tax', '--- ''1.08''\n', NULL, NULL, '2019-08-08 12:17:51', '2019-08-08 12:17:51');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
