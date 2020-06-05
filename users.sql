-- phpMyAdmin SQL Dump
-- version 4.0.10.20
-- https://www.phpmyadmin.net
--
-- ホスト: factory-instance-1.cyss4kcjgyjd.ap-northeast-1.rds.amazonaws.com
-- 生成日時: 2020 年 6 月 04 日 13:48
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

-- --------------------------------------------------------

--
-- テーブルの構造 `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `division_id` bigint(20) DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'ユーザー名',
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'email',
  `comment` text COLLATE utf8mb4_unicode_ci COMMENT 'コメント',
  `status` tinyint(4) DEFAULT '0' COMMENT '承認設定',
  `user_type` tinyint(4) DEFAULT '0' COMMENT 'ユーザー区分',
  `password_digest` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '暗号化済パスワード',
  `provider` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '登録元SNS',
  `uid` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '登録元SNSユーザーID',
  `sign_in_count` int(11) DEFAULT '0' COMMENT 'ログイン回数',
  `current_sign_in_at` datetime DEFAULT NULL COMMENT 'ログイン日時',
  `last_sign_in_at` datetime DEFAULT NULL COMMENT '最終ログイン日時',
  `current_sign_in_ip` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'ログイン元IP',
  `last_sign_in_ip` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '最終ログイン元IP',
  `remember_created_at` datetime DEFAULT NULL COMMENT '継続ログイン情報作成日時',
  `confirmation_token` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '認証トークン',
  `confirmed_at` datetime DEFAULT NULL COMMENT '承認日時',
  `confirmation_sent_at` datetime DEFAULT NULL COMMENT '認証トークン作成日時',
  `unconfirmed_email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '承認待時メール送信先',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `lastaccesstask` datetime DEFAULT '2019-09-12 18:42:55',
  PRIMARY KEY (`id`),
  KEY `index_users_on_division_id` (`division_id`),
  KEY `index_users_on_email` (`email`),
  KEY `index_users_on_password_digest` (`password_digest`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=55 ;

--
-- テーブルのデータのダンプ `users`
--

INSERT INTO `users` (`id`, `division_id`, `name`, `email`, `comment`, `status`, `user_type`, `password_digest`, `provider`, `uid`, `sign_in_count`, `current_sign_in_at`, `last_sign_in_at`, `current_sign_in_ip`, `last_sign_in_ip`, `remember_created_at`, `confirmation_token`, `confirmed_at`, `confirmation_sent_at`, `unconfirmed_email`, `created_at`, `updated_at`, `lastaccesstask`) VALUES
(1, 4, '西澤建造', 'ruby.on.nishizawa@gmail.com', NULL, 10, 30, '$2a$10$Ma0Sz7cRgYQomoOerELmke62mCpBDGAqLonBbhFF9viwEj.Ppq5Aa', NULL, NULL, 34, '2020-03-27 10:06:31', '2020-02-12 08:31:57', '202.215.27.149', '202.215.27.149', NULL, 'NoSsKXphPP3UhxK_yUsS', '2019-02-14 16:52:08', '2019-02-14 16:51:47', NULL, '2019-02-14 16:51:47', '2020-03-27 10:06:31', '2019-09-12 18:42:55'),
(2, 4, '米田昌悟', 'shogo@jiinet.co.jp', NULL, 10, 30, '$2a$10$Iz.0j7McZO/ZluPm817kpuFYy46Ebrd.YPv8tuu6cQV3A9pgk5MKu', NULL, NULL, 289, '2020-06-01 02:04:35', '2020-05-26 09:28:44', '202.187.74.78', '113.210.88.152', NULL, 'k4kBUVFgPtQ57UszwSXQ', '2019-02-15 15:13:43', '2019-02-15 15:13:20', NULL, '2019-02-15 15:13:20', '2020-06-01 02:04:35', '2019-10-28 02:22:18'),
(5, 1, '大島勇人 ', 'y.oshima@jiinet.co.jp', NULL, 10, 30, '$2a$10$shw2NqGA9Akbkvjp.IxnYubHI6jZoyGwii397Dg2rPIpvQwDuO4FK', NULL, NULL, 114, '2020-06-03 06:38:57', '2020-06-03 01:21:40', '133.106.138.37', '202.215.27.149', NULL, 'u7jxG2JE9WWy5WwRAhPa', '2019-04-25 13:39:12', '2019-04-25 13:38:24', NULL, '2019-04-25 13:38:24', '2020-06-03 06:38:57', '2020-04-20 13:36:40'),
(6, 4, '戸谷未乃莉', 'm.toya@jiinet.co.jp', NULL, 10, 30, '$2a$10$55/8J5TwFtRvBIBy7iz7LuZJOC6Jg10fsaokabwoTPeNs2eXqb5uW', NULL, NULL, 53, '2020-01-22 08:20:50', '2019-12-23 04:54:12', '202.215.27.149', '202.215.27.149', NULL, 'dpz-G79_yWZKu8JHELWx', '2019-04-26 15:55:38', '2019-04-26 15:54:52', NULL, '2019-04-26 15:54:52', '2020-01-22 08:20:50', '2019-10-09 04:24:51'),
(7, 7, '深澤　玄', 'g.fukasawa@jiinet.co.jp', NULL, 10, 30, '$2a$10$8hBwcuJN/sSoUW8wUqdu7uc862D6x2u87JH6i3PDCtk2YGeDGK/lS', NULL, NULL, 111, '2020-05-31 23:27:51', '2020-05-25 01:16:39', '180.15.84.253', '180.15.84.253', NULL, '4oVsYpseXPPSg5ChjDWz', '2019-04-26 18:26:00', '2019-04-26 17:12:57', NULL, '2019-04-26 17:12:57', '2020-05-31 23:27:51', '2020-05-26 04:42:44'),
(8, 3, '岡田 匠', 't.okada@jiinet.co.jp', NULL, 10, 30, '$2a$10$SYq7/4AbDVrNtHOUCfFcDerwXAMVVlsckI5QPC4rhCNGO/iEu/nki', NULL, NULL, 124, '2020-06-03 02:22:22', '2020-06-01 06:31:26', '202.215.27.149', '60.124.19.119', NULL, 'DzxLsU3i6BdZce8S1fc4', '2019-05-21 15:40:43', '2019-05-21 15:40:06', NULL, '2019-05-21 15:40:06', '2020-06-03 02:22:22', '2020-05-29 07:03:19'),
(9, 9, '田中隆志', 'takasi@jiinet.co.jp', NULL, 0, 30, '$2a$10$s8427EsHIb1.5jS0Cf5n0.aoXcrKQdfLvqvbz83.1bBudxwLad0ti', NULL, NULL, 30, '2019-10-10 00:23:43', '2019-10-07 00:18:37', '202.215.27.149', '202.215.27.149', NULL, 'UizWSoC_UjydydaAzYGV', '2019-06-03 17:25:06', '2019-06-03 17:24:08', NULL, '2019-06-03 17:24:08', '2020-04-03 06:26:12', '2019-10-03 04:12:00'),
(10, 1, '佐藤裕世 ', 'h.satou@jiinet.co.jp', NULL, 0, 30, '$2a$10$olO.xXtkK/vAgHG0iWUTZOkkGQ6Aj8Qy6W82j307cTXKl9G4RtD4C', NULL, NULL, 34, '2019-11-18 02:16:11', '2019-11-15 02:19:05', '202.215.27.149', '202.215.27.149', NULL, '3a53UmYLoxy-e8JQkZrU', '2019-06-03 17:33:27', '2019-06-03 17:31:27', NULL, '2019-06-03 17:31:27', '2020-04-03 06:28:09', '2019-09-12 18:42:55'),
(11, 9, '中原　陵', 'r.nakahara@jiinet.co.jp', NULL, 10, 30, '$2a$10$Bebx5omb379wXVNuAeXwxed/bm.8pC0UR90cFu8m8Nl6eeL4zHslW', NULL, NULL, 101, '2020-06-03 05:50:08', '2020-06-02 02:35:49', '49.97.99.180', '202.215.27.149', NULL, 'BqqsxpN5sy8MeyaJkVWc', '2019-06-03 17:32:33', '2019-06-03 17:31:42', NULL, '2019-06-03 17:31:42', '2020-06-03 05:50:08', '2020-06-02 07:37:44'),
(12, 3, 'miyawaki', 'miyawaki@jiinet.co.jp', NULL, 10, 30, '$2a$10$h.YxWF8HoC5UJSMrVFibhOh8kfGpWno683oESXw4uWYKi0rkxVwnW', NULL, NULL, 102, '2020-05-31 03:21:12', '2020-05-30 02:48:44', '106.72.178.224', '106.72.178.224', NULL, '6jUNinV14d7C-yrUXBbc', '2019-06-04 08:50:34', '2019-06-03 17:59:10', NULL, '2019-06-03 17:59:10', '2020-05-31 03:21:12', '2020-05-28 04:28:59'),
(13, 1, 'ishige', 'y.ishige@jiinet.co.jp', NULL, 10, 30, '$2a$10$.WfUATsVNz.OSQKfZN9hguc7ubUAPUlDJcMYwludpDx3FYqNw5pdu', NULL, NULL, 15, '2020-06-01 06:35:10', '2020-05-29 02:20:26', '202.215.27.149', '202.215.27.149', NULL, 'GwyxJ5oxgJsQwjMk_67P', '2019-06-04 09:09:50', '2019-06-04 09:08:51', NULL, '2019-06-04 09:08:51', '2020-06-01 06:35:10', '2019-09-12 18:42:55'),
(14, 6, 'gejo', 't.gejo@jiinet.co.jp', NULL, 0, 0, '$2a$10$mZ/wg/gm9ElTyHa0OSl.POL5sTRwtLXTuhKdEBIbwSQcUqAiFGGvG', NULL, NULL, 6, '2019-11-28 02:16:28', '2019-06-20 14:53:32', '202.215.27.149', '157.14.161.97', NULL, 'G3xx2QyH_Q5sxhDsxPyj', '2019-06-04 11:15:41', '2019-06-04 11:14:55', NULL, '2019-06-04 11:14:55', '2020-04-03 06:28:22', '2019-09-12 18:42:55'),
(16, 7, '市川広和', 'ichi.hiro.kawa.kazu@gmail.com', NULL, 0, 0, '$2a$10$852PP/xXvMuZwUr8xIDxteYt/FfZDkRsFp3dQ9wL4SPuEdXLR7JFK', NULL, NULL, 47, '2019-12-08 23:31:08', '2019-12-01 23:35:27', '118.1.255.234', '118.1.255.234', NULL, 'JJbyyDvqhExxZPBuxu2T', '2019-06-04 11:43:15', '2019-06-04 11:42:40', NULL, '2019-06-04 11:42:40', '2020-03-26 02:20:48', '2019-09-12 18:42:55'),
(17, 8, '篠原 清隆', 'k.shinohara@jiinet.co.jp', NULL, 0, 10, '$2a$10$r.NLRalaOYpiC1h4G.8JxefHvOgS0fcBIChcxl5b8R7mD/u1T7VqC', NULL, NULL, 78, '2020-03-27 23:57:44', '2020-03-24 06:43:57', '125.198.114.0', '220.147.207.109', NULL, 'FJP_ymP6iHDgMB27Whjv', '2019-06-04 11:55:27', '2019-06-04 11:54:21', NULL, '2019-06-04 11:54:21', '2020-04-03 06:27:56', '2019-09-12 18:42:55'),
(18, 1, '米田安司', 'yasuji@jiinet.co.jp', NULL, 0, 30, '$2a$10$J6eXTurdhhc/0jqSOy1BCuj9C0XNdImQYMA4anI4oUVlRgshzy3ra', NULL, NULL, 1, '2019-06-04 12:39:59', '2019-06-04 12:39:59', '202.215.27.149', '202.215.27.149', NULL, '5EMVrgwF39fm2Zsv6wuV', '2019-06-04 12:39:59', '2019-06-04 12:39:11', NULL, '2019-06-04 12:39:11', '2020-04-03 06:28:42', '2019-09-12 18:42:55'),
(19, 10, '李雪梅', 'lixuemei@jiinet.co.jp', NULL, 10, 30, '$2a$10$nKi2jXQzzNpFVFlyW9CINuKuIKrrTyiJSM0ygllnqY8z7jq9cOBt2', NULL, NULL, 143, '2020-06-01 04:01:36', '2020-05-26 05:35:17', '202.215.27.149', '202.215.27.149', NULL, 'BtRgR1y29brjjS2F-M58', '2019-06-04 13:48:01', '2019-06-04 13:38:00', NULL, '2019-06-04 13:38:00', '2020-06-01 04:01:36', '2020-03-12 23:41:07'),
(20, 10, '大橋奏子', 'k.ohashi@jiinet.co.jp', NULL, 10, 30, '$2a$10$uRDjRBq/gI7Js0euh6ewTO09mDXtjqSl1ZLokFY5th9Ml26IxCtoq', NULL, NULL, 153, '2020-06-04 02:24:41', '2020-06-03 09:20:23', '157.14.198.218', '106.132.87.140', NULL, 'rCmd-sXVBTyc3oGxJtTK', '2019-06-04 14:36:44', '2019-06-04 14:35:59', NULL, '2019-06-04 14:35:59', '2020-06-04 02:24:41', '2020-06-04 03:16:46'),
(21, 6, '彦坂', 't.hikosaka@jiinet.co.jp', NULL, 0, 30, '$2a$10$JLF/AMa9jqMAIXvG/dkY8OZJWqkgAnwu7JpnD70/0cqz.78ZMXDp.', NULL, NULL, 16, '2019-08-30 13:55:47', '2019-08-14 16:32:03', '157.14.161.97', '157.14.161.97', NULL, 'xtq1rfGtfcxzYj_Mttpg', '2019-06-04 14:39:53', '2019-06-04 14:39:12', NULL, '2019-06-04 14:39:12', '2020-04-03 06:28:31', '2019-09-12 18:42:55'),
(22, 3, '野田', 'noda@jiinet.co.jp', NULL, 10, 0, '$2a$10$UxpeyBeCFCwlH0HveaER6Oxw.3J8N0WKMFFKnBKY4Tddk4Nev7qpO', NULL, NULL, 74, '2020-06-01 01:19:01', '2020-05-28 04:15:07', '202.215.27.149', '202.215.27.149', NULL, 'vChmGayxzBUWc8yucSWg', '2019-06-04 14:59:44', '2019-06-04 14:57:03', NULL, '2019-06-04 14:57:03', '2020-06-01 01:19:01', '2020-06-03 00:00:13'),
(23, 8, '坂口', 'sakaguti@jiinet.co.jp', NULL, 0, 0, '$2a$10$mL0yb6Hr1zMnLzzEt25uheJJzNWVO5MJsJBEhR6smG5YVhcwNkLFS', NULL, NULL, 46, '2020-03-16 01:20:07', '2020-03-09 01:26:07', '220.147.207.109', '220.147.207.109', NULL, 'qHhK-q3pALGhbfyWNEmP', '2019-06-04 15:24:03', '2019-06-04 15:21:28', NULL, '2019-06-04 15:21:28', '2020-04-03 06:29:06', '2019-09-12 18:42:55'),
(24, 5, '萩原浩', 'tawagoto1971@gmail.com', NULL, 10, 0, '$2a$10$bp3wHSsI2uWd19NX59AOR.0w9muu/yQL430UPR.OCVbzGTOjVXXD6', NULL, NULL, 62, '2020-06-01 00:00:18', '2020-05-27 00:00:51', '157.14.198.218', '157.14.198.218', NULL, 'icvBBgMoaL3_A9LkHG_z', '2019-06-04 17:26:59', '2019-06-04 17:26:19', NULL, '2019-06-04 17:26:19', '2020-06-01 00:00:18', '2020-05-14 04:26:18'),
(25, 7, '関口　雅人', 'sekiguti@jiinet.co.jp', NULL, 10, 10, '$2a$10$/9cfxgFIkCymUU9dcfIk6eg2Aq1NAJsK/hBR9ht.IHe757K3hrFHy', NULL, NULL, 49, '2020-03-29 23:31:50', '2020-03-23 00:00:33', '153.203.81.101', '153.203.81.101', NULL, 'cH1ub-X9dArcDDjtx1Rx', '2019-06-05 10:18:26', '2019-06-05 10:17:49', NULL, '2019-06-05 10:17:49', '2020-03-29 23:31:50', '2019-09-12 18:42:55'),
(26, 8, '岩崎', 'a.iwasaki@jiinet.co.jp', NULL, 0, 0, '$2a$10$6fPraOy9Da2eGPnkMPBcXuIETHGAxAMl6zrBODTtGH5ukiKRkmVDe', NULL, NULL, 29, '2019-11-12 06:14:39', '2019-11-05 00:24:28', '220.219.211.83', '220.219.211.83', NULL, '2kWtFLc8xFsFz27y9QTU', '2019-06-05 15:31:47', '2019-06-05 12:35:08', NULL, '2019-06-05 12:35:08', '2020-04-03 06:27:43', '2019-09-12 18:42:55'),
(27, 6, '雄大', 'y.tanaka@jiinet.co.jp', NULL, 10, 10, '$2a$10$B7rsbhkh7muLtczsk/F9j.2RIA4uLeYtyRyDYMStOEl73y.wByNVi', NULL, NULL, 80, '2020-06-01 01:55:59', '2020-05-25 07:16:44', '122.135.131.15', '157.14.202.234', NULL, 'dj9iAC8VJtysuxUYfMpn', '2019-06-06 10:28:11', '2019-06-06 10:26:58', NULL, '2019-06-06 10:26:58', '2020-06-01 01:55:59', '2019-09-12 18:42:55'),
(28, 7, '関谷耕一', 'sekiya@jiinet.co.jp', NULL, 0, 0, '$2a$10$C6CqNQHc2wTz5Hw9ZOuwL.81D0hSTYJ5BoaIJMGDxXMhlprO105U2', NULL, NULL, 20, '2019-09-17 01:02:01', '2019-09-09 12:31:46', '122.16.96.161', '122.16.96.161', NULL, 'fwJY4MxPj1qrsEqAMuJv', '2019-06-06 15:25:58', '2019-06-06 15:24:46', NULL, '2019-06-06 15:24:46', '2020-03-26 02:21:27', '2019-09-12 18:42:55'),
(29, 3, '工藤幸恵', 'y.kudo@jiinet.co.jp', NULL, 10, 10, '$2a$10$3xLzQyoYe2IgRoLPxlr1B.PzEP3Tzloy08kD/iQUG49OdNvhLxExu', NULL, NULL, 71, '2020-06-02 06:31:42', '2020-05-31 23:58:35', '202.215.27.149', '202.215.27.149', NULL, 'xRpyYim9qzPazBsBFYxf', '2019-06-07 12:58:00', '2019-06-07 12:57:18', NULL, '2019-06-07 12:57:18', '2020-06-02 06:31:42', '2020-06-03 06:22:13'),
(32, 5, '李瑛', 'lying9626@gmail.com', NULL, 10, 0, '$2a$10$KG1wB5P83jC1TAYQgQk/7ulJOLYgawQ8pj2RUDHapPIbYG7kxW.De', NULL, NULL, 66, '2020-02-17 01:33:54', '2020-02-13 00:49:44', '157.14.198.218', '157.14.198.218', NULL, '_GzzHPRUG_9iGGyUQFsA', '2019-06-11 11:08:29', '2019-06-11 11:07:53', NULL, '2019-06-11 11:07:53', '2020-02-17 01:33:54', '2020-02-17 06:36:44'),
(33, 5, '大西', 'yingbai119@gmail.com', NULL, 0, 0, '$2a$10$aqEkurJUYRQuUaxCxjADbuW74gNP0DdANiQx9x7Izlnl6KBokWvrO', NULL, NULL, 63, '2020-03-04 07:12:54', '2020-03-04 01:04:23', '157.14.198.218', '157.14.198.218', NULL, 'dKGQiNJnk34sm_YkMP-_', '2019-06-14 12:58:05', '2019-06-14 12:55:51', NULL, '2019-06-14 12:55:51', '2020-04-03 06:27:19', '2019-09-12 18:42:55'),
(34, 5, 'ウガジン', 'ugajin@jiinet.co.jp', NULL, 10, 0, '$2a$10$5b2yIrKcPMGDaGyYEaP.jeTiitkEKvZU/iZceXGVwz803cG5rD8qy', NULL, NULL, 78, '2020-06-01 23:55:00', '2020-05-28 03:58:10', '157.14.198.218', '157.14.198.218', NULL, 'i99My6Fws4xEZxttTzYF', '2019-06-14 13:26:07', '2019-06-14 13:22:51', NULL, '2019-06-14 13:22:51', '2020-06-01 23:55:00', '2019-09-12 18:42:55'),
(35, 8, '五十嵐', 'igarasi@jiinet.co.jp', NULL, 0, 0, '$2a$10$FRArUtJaerymps0vNhXj8OVlhsH7qBGjA9IR7m9XNFGNZqJ9T1Vzq', NULL, NULL, 22, '2020-01-27 02:20:37', '2019-12-27 00:45:00', '220.147.207.109', '220.219.191.154', NULL, 'sBP3SxLaho3pge91iZzT', '2019-07-03 09:47:00', '2019-07-03 09:45:27', NULL, '2019-07-03 09:45:27', '2020-04-03 06:27:07', '2019-09-12 18:42:55'),
(36, 8, '高畠千帆', 'c.takabatake17@gmail.com', NULL, 0, 0, '$2a$10$aYvLd4ZIG0U5RviBBU9zY.X.KYgxWX6p26h9JqgXwDVngERj3H7hC', NULL, NULL, 5, '2019-07-05 09:16:19', '2019-07-04 14:26:39', '219.116.18.162', '219.116.18.162', NULL, 'd6zfrhZGfxqEaj2-hctx', '2019-07-03 13:59:46', '2019-07-03 13:58:27', NULL, '2019-07-03 13:58:27', '2020-04-03 06:26:56', '2019-09-12 18:42:55'),
(37, 8, '沢村', 'y.sawamura@jiinet.co.jp', NULL, 0, 0, '$2a$10$NLWYL5tk7MsLbevPs591BO/Ji.X/2n.2G7YizvKcXxNX.vmvyEm5W', NULL, NULL, 1, '2019-07-05 17:52:48', '2019-07-05 17:52:48', '219.116.18.162', '219.116.18.162', NULL, '56MndpBJMMqMkXwsFgU6', '2019-07-05 17:52:42', '2019-07-05 17:47:05', NULL, '2019-07-05 17:47:05', '2020-04-03 06:26:45', '2019-09-12 18:42:55'),
(38, 5, '高橋利之', 'toshiyukit544@gmail.com', NULL, 10, 0, '$2a$10$gk9Fv5Dm0eoX4N/h5o4DF.6MFeNxnT58ymOl5p1DJcb80HIK9byz2', NULL, NULL, 49, '2020-05-11 00:52:24', '2020-04-28 01:00:34', '202.215.27.149', '202.215.27.149', NULL, 'FAETxjzyEtoC4DiBcYiK', '2019-08-19 09:21:01', '2019-07-10 10:49:46', NULL, '2019-07-10 10:49:46', '2020-05-28 02:45:49', '2019-09-12 18:42:55'),
(39, 1, '鎌田', 'm.kamada@jiinet.co.jp', NULL, 0, 30, '$2a$10$PHEjkTQXH0Aeh3K0EW8B..sm5nOgGPzElxp8PUKUnn1w/n3AkavKK', NULL, NULL, 6, '2019-09-04 12:58:31', '2019-09-02 09:01:45', '202.215.27.149', '202.215.27.149', NULL, 'DmAz98E8hxDW-12Ee321', '2019-08-13 10:53:53', '2019-08-13 10:52:55', NULL, '2019-08-13 10:52:55', '2020-04-03 06:26:30', '2019-09-12 18:42:55'),
(40, 7, '関谷耕一', 'koiti.sekiya@gmail.com', NULL, 0, 0, '$2a$10$tnUQwvQzTcg3QDHKvegLmeLM0th84lRhQT8UZgshvx7BWPaNR9z0e', NULL, NULL, 22, '2020-02-03 02:23:50', '2020-01-27 01:08:20', '153.203.81.101', '153.203.81.101', NULL, 'xTRWzMYzksJWRtkv93Rs', '2019-09-24 00:55:03', '2019-09-24 00:39:44', NULL, '2019-09-24 00:39:44', '2020-03-26 02:21:04', '2019-09-12 18:42:55'),
(42, 5, '劉', 'liuxiaoqin2014@gmail.com', NULL, 0, 0, '$2a$10$EdFlAjg..uXrD6Auy8PluuyE65.zcNrahFuk6PxGdJucHVb1cm.b2', NULL, NULL, 6, '2019-10-24 05:14:06', '2019-10-21 04:27:59', '115.179.81.149', '115.179.81.149', NULL, 'Aq1pyGJQUs6S71Cxj7hz', '2019-10-10 05:50:47', '2019-10-10 05:49:41', NULL, '2019-10-10 05:49:41', '2020-04-21 06:48:09', '2019-09-12 18:42:55'),
(43, 5, '徐　瑞', 'jozui1122@gmail.com', NULL, 0, 0, '$2a$10$fv10.vAEHM0EKjEb1TS/FuGWNB2NR5MSrjy2MR6knIryVhjBcTzUy', NULL, NULL, 1, '2019-10-11 01:08:59', '2019-10-11 01:08:59', '115.179.81.149', '115.179.81.149', NULL, 'SLkBstuzB4ignG9n4_88', '2019-10-11 01:08:59', '2019-10-11 01:07:28', NULL, '2019-10-11 01:07:28', '2020-04-03 06:30:51', '2019-09-12 18:42:55'),
(44, 5, 'ゴ', 'wuyankayano777@gmail.com', NULL, 10, 0, '$2a$10$LFerFKoEaZycxDOUOxWD6.Bo87CS9aYLtVDH.fbF98QA0mIfsyWmO', NULL, NULL, 1, '2019-10-16 01:29:01', '2019-10-16 01:29:01', '115.179.81.149', '115.179.81.149', NULL, 'ptThFnCLKTT1GR9vbzxC', '2019-10-16 01:29:01', '2019-10-16 01:27:42', NULL, '2019-10-16 01:27:42', '2019-10-16 01:30:44', '2019-09-12 18:42:55'),
(45, 1, '鶴海　智之', 'tsurumi@jiinet.co.jp', NULL, 10, 30, '$2a$10$pqrtDEY.xggpI.b/HUTEpOuzk7nwki7ct1Mdyl.11V6k7oXaBA9MW', NULL, NULL, 11, '2020-04-12 12:27:33', '2020-03-22 22:57:13', '111.102.206.241', '111.102.206.241', NULL, 'au_ir2nxtcXmuf6Te2qh', '2019-11-15 04:50:28', '2019-10-21 08:14:28', NULL, '2019-10-21 08:14:28', '2020-04-12 12:27:33', '2019-09-12 18:42:55'),
(46, 3, '西島美佳', 'm.nishijima@jiinet.co.jp', NULL, 10, 40, '$2a$10$AvCxx2AEyZOZ3.wWGvshretA2pe73ydXRiNt9AK7oVjSwXN3sRHPm', NULL, NULL, 100, '2020-06-02 02:10:50', '2020-06-02 00:07:31', '112.138.205.130', '112.138.205.130', NULL, '45ijBvit4ypfeUnjVw9w', '2019-10-23 02:35:53', '2019-10-23 02:35:07', NULL, '2019-10-23 02:35:07', '2020-06-02 02:10:50', '2020-06-04 04:38:31'),
(51, NULL, 'daitetu', 'ke_kimura@osaka-seitetu.co.jp', NULL, 0, 0, '$2a$10$XbsHZlUjJGlR4dG621vPE.hcT.DKGccTyQ34hBQn95fc0pGH9R7hm', NULL, NULL, 6, '2020-03-03 01:44:59', '2020-02-14 01:57:17', '211.8.147.164', '211.8.147.164', NULL, '-qMxZ2Cbw4KKxsrq4Gs6', '2020-02-03 02:37:27', '2020-02-03 02:33:03', NULL, '2020-02-03 02:33:03', '2020-03-03 01:44:59', '2019-09-12 18:42:55'),
(52, 7, '上野', 'uetomo200@gmail.com', NULL, 10, 0, '$2a$10$UMeSql9Lsm.ovJhDJGU0/uIXyxFRcqd6/GhAjSMDrEABXqsCHUmhC', NULL, NULL, 27, '2020-05-31 23:31:05', '2020-05-25 01:56:16', '180.15.84.253', '180.15.84.253', NULL, 'CxvuNpa3zuMfyxJ3ynz7', '2020-02-05 04:58:41', '2020-02-05 04:57:55', NULL, '2020-02-05 04:57:55', '2020-05-31 23:31:05', '2019-09-12 18:42:55'),
(53, 7, '瀬川　嘉朗', 'segawa.fw1@gmail.com', NULL, 0, 0, '$2a$10$ejZKC/NhhN0yZ8t8jdTsle2kFu5GmCqdOK8U4kpip0znXaiRAQNLK', NULL, NULL, 2, '2020-03-04 02:44:02', '2020-02-26 01:25:08', '153.203.81.101', '202.215.27.149', NULL, 'v4nvaEQAdGxdSFH8z9ss', '2020-02-26 01:25:08', '2020-02-26 01:24:08', NULL, '2020-02-26 01:24:08', '2020-03-09 00:50:08', '2019-09-12 18:42:55'),
(54, 7, '戸川久江', 'huchuanhisae@gmail.com', NULL, 10, 0, '$2a$10$iz5TpZLmHkCtpetUsZ6vh.x1JqGruwfgMSbiiAfoomrjX5VL4/lei', NULL, NULL, 11, '2020-05-31 23:26:29', '2020-05-24 23:56:52', '180.15.84.253', '180.15.84.253', NULL, 'oGBcskYYSQ-JQrZqmSjs', '2020-04-24 06:32:04', '2020-04-24 06:31:22', NULL, '2020-04-24 06:31:22', '2020-05-31 23:26:29', '2019-09-12 18:42:55');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
