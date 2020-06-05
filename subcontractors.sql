-- phpMyAdmin SQL Dump
-- version 4.0.10.20
-- https://www.phpmyadmin.net
--
-- ホスト: factory-instance-1.cyss4kcjgyjd.ap-northeast-1.rds.amazonaws.com
-- 生成日時: 2020 年 6 月 05 日 15:08
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
-- テーブルのデータのダンプ `subcontractors`
--

INSERT INTO `subcontractors` (`id`, `name`, `kana`, `note`, `created_at`, `updated_at`, `free_word`) VALUES
(19, '有限会社インプット', 'ユウゲンガイシャインプット', '', '2019-05-24 17:13:02', '2019-05-24 17:13:02', '有限会社インプット ユウゲンガイシャインプット'),
(20, '株式会社誠文堂', 'カブシキガイシャセイブンドウ', '', '2019-05-27 15:02:59', '2019-05-27 15:02:59', '株式会社誠文堂 カブシキガイシャセイブンドウ'),
(21, '新日本印刷株式会社', 'シンニホンインサツカブシキガイシャ', '', '2019-05-27 15:05:57', '2019-05-27 15:05:57', '新日本印刷株式会社 シンニホンインサツカブシキガイシャ'),
(22, 'ＪＸオフィスサービス株式会社', 'ＪＸオフィスサービスカブシキガイシャ', '', '2019-05-27 15:08:05', '2019-05-27 15:08:05', 'ＪＸオフィスサービス株式会社 ＪＸオフィスサービスカブシキガイシャ'),
(23, '株式会社山櫻', 'カブシキガイシャヤマザクラ', '', '2019-05-27 15:10:40', '2019-05-27 15:10:40', '株式会社山櫻 カブシキガイシャヤマザクラ'),
(24, '東京リスマチック株式会社', 'トウキョウリスマチックカブシキガイシャ', '', '2019-05-27 15:12:54', '2019-05-27 15:12:54', '東京リスマチック株式会社 トウキョウリスマチックカブシキガイシャ'),
(25, '株式会社プリントバッグ', 'カブシキガイシャプリントバッグ', '', '2019-05-27 15:14:59', '2019-05-27 15:14:59', '株式会社プリントバッグ カブシキガイシャプリントバッグ'),
(26, '株式会社タキネット', 'カブシキガイシャタキネット', '', '2019-05-27 15:17:31', '2019-05-27 15:17:31', '株式会社タキネット カブシキガイシャタキネット'),
(27, 'ホリゾン・ジャパン', 'ホリゾン・ジャパン', '', '2019-05-27 15:19:16', '2019-10-03 07:15:14', 'ホリゾン・ジャパン ホリゾン・ジャパン'),
(28, '株式会社共同紙販ホールディングス', 'カブシキガイシャキョウドウカミハンホールディングス', '', '2019-05-27 15:20:59', '2019-05-27 15:20:59', '株式会社共同紙販ホールディングス カブシキガイシャキョウドウカミハンホールディングス'),
(29, '日本郵便', 'ニホンユウビン', '', '2019-05-27 15:22:47', '2019-05-27 15:22:47', '日本郵便 ニホンユウビン'),
(30, 'ピナクル株式会社', 'ピナクルカブシキガイシャ', '', '2019-05-27 15:24:29', '2019-05-27 15:24:29', 'ピナクル株式会社 ピナクルカブシキガイシャ'),
(31, '株式会社太陽徽章製作所', 'カブシキガイシャタイヨウキショウセイサクショ', '', '2019-05-27 15:26:05', '2019-05-27 15:26:05', '株式会社太陽徽章製作所 カブシキガイシャタイヨウキショウセイサクショ'),
(32, '株式会社新晃社', 'カブシキガイシャシンコウシャ', '', '2019-05-27 15:30:08', '2019-05-27 15:30:08', '株式会社新晃社 カブシキガイシャシンコウシャ'),
(33, '株式会社アイコー印刷', 'カブシキガイシャアイコーインサツ', '', '2019-05-27 15:31:24', '2019-05-27 15:31:24', '株式会社アイコー印刷 カブシキガイシャアイコーインサツ'),
(34, '株式会社スクラム', 'カブシキガイシャスクラム', '', '2019-05-27 15:33:45', '2019-05-27 15:33:45', '株式会社スクラム カブシキガイシャスクラム'),
(35, '片山パック', 'カタヤマパック', '', '2019-05-27 16:25:30', '2019-05-27 16:25:30', '片山パック カタヤマパック'),
(36, 'リコージャパン株式会社', 'リコージャパンカブシキガイシャ', '', '2019-05-27 16:26:55', '2019-05-27 16:26:55', 'リコージャパン株式会社 リコージャパンカブシキガイシャ'),
(37, '東京オフィスサービス株式会社', 'トウキョウオフィスサービスカブシキガイシャ', '', '2019-05-27 16:30:12', '2019-05-27 16:30:12', '東京オフィスサービス株式会社 トウキョウオフィスサービスカブシキガイシャ'),
(38, 'アスクル', 'アスクル', '', '2019-05-27 16:32:02', '2019-05-27 16:32:02', 'アスクル アスクル'),
(39, '四国紙商事株式会社', 'シコクカミショウジカブシキガイシャ', '', '2019-05-27 16:33:17', '2019-05-27 16:33:17', '四国紙商事株式会社 シコクカミショウジカブシキガイシャ'),
(40, '株式会社大塚商会', 'カブシキガイシャオオツカショウカイ', '', '2019-05-27 16:35:26', '2019-05-27 16:35:26', '株式会社大塚商会 カブシキガイシャオオツカショウカイ'),
(41, '東陽青写真工業株式会社', 'トウヨウアオジャシンコウギョウカブシキガイシャ', '', '2019-05-27 16:37:21', '2019-05-27 16:37:21', '東陽青写真工業株式会社 トウヨウアオジャシンコウギョウカブシキガイシャ'),
(42, '株式会社羽車', 'カブシキガイシャハグルマ', '', '2019-05-27 16:39:17', '2019-05-27 16:40:03', '株式会社羽車 カブシキガイシャハグルマ'),
(43, '夏目印刷', 'ナツメインサツ', '', '2019-05-27 16:41:49', '2019-05-27 16:41:49', '夏目印刷 ナツメインサツ'),
(44, '町田施工', 'マチダセコウ', '', '2019-05-27 16:43:11', '2019-05-27 16:43:11', '町田施工 マチダセコウ'),
(45, '株式会社旭堂', 'カブシキガイシャアサヒドウ', '', '2019-05-27 16:44:33', '2019-05-27 16:44:33', '株式会社旭堂 カブシキガイシャアサヒドウ'),
(46, '株式会社白橋', 'カブシキガイシャシラハシ', '', '2019-05-27 16:45:57', '2019-05-27 16:45:57', '株式会社白橋 カブシキガイシャシラハシ'),
(47, '株式会社高春堂', 'カブシキガイシャコウシュンドウ', '', '2019-05-27 16:47:23', '2019-05-27 16:47:23', '株式会社高春堂 カブシキガイシャコウシュンドウ'),
(48, 'ＴａｍＳＡ', 'ＴａｍＳＡ', '', '2019-05-27 16:49:27', '2019-05-27 16:49:27', 'ＴａｍＳＡ ＴａｍＳＡ'),
(49, 'ＳａｎＳａｎ株式会社', 'ＳａｎＳａｎカブシキガイシャ', '', '2019-05-27 16:50:52', '2019-05-27 16:50:52', 'ＳａｎＳａｎ株式会社 ＳａｎＳａｎカブシキガイシャ'),
(50, '株式会社金由', 'カブシキガイシャカネヨシ', '', '2019-05-27 16:52:47', '2019-05-27 16:52:47', '株式会社金由 カブシキガイシャカネヨシ'),
(51, '株式会社タクトマシンサービス', 'カブシキガイシャタクトマシンサービス', '', '2019-05-27 16:54:18', '2019-05-27 16:54:18', '株式会社タクトマシンサービス カブシキガイシャタクトマシンサービス'),
(52, '株式会社タナカ', 'カブシキガイシャタナカ', '', '2019-05-27 16:55:35', '2019-05-27 16:55:35', '株式会社タナカ カブシキガイシャタナカ'),
(53, 'メールカスタマーセンター株式会社', 'メールカスタマーセンターカブシキガイシャ', '', '2019-05-27 16:56:48', '2019-05-27 16:56:48', 'メールカスタマーセンター株式会社 メールカスタマーセンターカブシキガイシャ'),
(54, '株式会社ジャストコーポレーション', 'カブシキガイシャジャストコーポレーション', '', '2019-05-27 16:59:42', '2019-05-27 16:59:42', '株式会社ジャストコーポレーション カブシキガイシャジャストコーポレーション'),
(55, '株式会社太陽堂封筒', 'カブシキガイシャタイヨウドウフウトウ', '', '2019-05-27 17:02:58', '2019-05-27 17:02:58', '株式会社太陽堂封筒 カブシキガイシャタイヨウドウフウトウ'),
(56, '株式会社研美社', 'カブシキガイシャケンビシャ', '', '2019-05-27 17:04:44', '2019-05-27 17:04:44', '株式会社研美社 カブシキガイシャケンビシャ'),
(57, '株式会社ハイスペック', 'カブシキガイシャハイスペック', '', '2019-05-27 17:06:13', '2019-05-27 17:06:13', '株式会社ハイスペック カブシキガイシャハイスペック'),
(58, '東芝テック株式会社', 'トウシバテックカブシキガイシャ', '', '2019-05-27 17:07:28', '2019-05-27 17:07:28', '東芝テック株式会社 トウシバテックカブシキガイシャ'),
(59, 'ＤＮＰフォトイメージングジャバン', 'ＤＮＰフォトイメージングジャバン', '', '2019-05-27 17:08:30', '2019-05-27 17:08:30', 'ＤＮＰフォトイメージングジャバン ＤＮＰフォトイメージングジャバン'),
(60, 'ハンコヤドットコム', 'ハンコヤドットコム', '', '2019-05-27 17:10:02', '2019-05-27 17:10:02', 'ハンコヤドットコム ハンコヤドットコム'),
(61, '株式会社Fujitaka', 'カブシキガイシャＦｕｊｉｔａｋａ', '', '2019-05-27 17:11:14', '2019-05-27 17:11:14', '株式会社Fujitaka カブシキガイシャＦｕｊｉｔａｋａ'),
(62, 'ACCEA', 'アクセア', '', '2019-05-27 17:12:42', '2019-05-27 17:12:42', 'ACCEA アクセア'),
(63, '有限会社室町スピード印刷', 'ユウゲンガイシャムロマチスピードインサツ', '', '2019-05-27 17:13:56', '2019-05-27 17:13:56', '有限会社室町スピード印刷 ユウゲンガイシャムロマチスピードインサツ'),
(67, '株式会社ビデオエイペックス', NULL, NULL, '2019-06-07 16:45:03', '2019-06-07 16:45:03', '株式会社ビデオエイペックス '),
(68, 'アイシーエクスプレス株式会社', 'アイシーエクスプレスカブシキガイシャ', '', '2019-06-20 11:56:24', '2019-06-20 11:56:24', 'アイシーエクスプレス株式会社 アイシーエクスプレスカブシキガイシャ'),
(69, 'バッジ専門店', 'バッジセンモンテン', '', '2019-06-25 17:58:20', '2019-06-25 17:58:20', 'バッジ専門店 バッジセンモンテン'),
(70, '伊藤印刷', NULL, NULL, '2019-06-27 17:46:34', '2019-06-27 17:46:34', '伊藤印刷 '),
(71, 'ムサシ・イメージ情報株式会社', NULL, NULL, '2019-06-28 14:31:38', '2019-06-28 14:31:38', 'ムサシ・イメージ情報株式会社 '),
(73, '株式会社 日本工業社', NULL, NULL, '2019-07-08 16:36:06', '2019-07-08 16:36:06', '株式会社 日本工業社 '),
(74, '株式会社ティーエフサービス', NULL, NULL, '2019-07-19 10:59:54', '2019-07-19 10:59:54', '株式会社ティーエフサービス '),
(75, '八弘社', 'ハッコウシャ', '', '2019-07-19 11:19:30', '2019-07-19 11:19:30', '八弘社 ハッコウシャ'),
(76, '株式会社レンタルバスターズ', NULL, NULL, '2019-07-24 12:31:27', '2019-07-24 12:31:27', '株式会社レンタルバスターズ '),
(77, '富士ゼロックス株式会社', NULL, NULL, '2019-07-25 13:41:00', '2019-07-25 13:41:00', '富士ゼロックス株式会社 '),
(78, 'zuan 曽原義弘', 'ズアン　ソハラヨシヒロ', '', '2019-07-26 09:09:37', '2019-07-26 09:09:37', 'zuan 曽原義弘 ズアン　ソハラヨシヒロ'),
(79, '有限会社タカノプリテック', 'ユウゲンガイシャタカノプリテック', '', '2019-07-29 15:18:42', '2019-07-29 15:18:49', '有限会社タカノプリテック ユウゲンガイシャタカノプリテック'),
(80, '株式会社大成美術プリンティング', 'カブシキガイシャタイセイビジュツプリンティング', '', '2019-08-05 10:41:40', '2019-08-05 10:41:40', '株式会社大成美術プリンティング カブシキガイシャタイセイビジュツプリンティング'),
(81, '三幸ファシリティーズ株式会社', 'サンコウファシリティーズカブシキガイシャ', '', '2019-08-06 13:52:16', '2019-08-06 13:52:16', '三幸ファシリティーズ株式会社 サンコウファシリティーズカブシキガイシャ'),
(82, '株式会社ナイキ', 'カブシキガイシャナイキ', '', '2019-08-06 13:52:55', '2019-08-06 13:52:55', '株式会社ナイキ カブシキガイシャナイキ'),
(83, 'ヤマト運輸株式会社', 'ヤマトウンユカブシキガイシャ', '', '2019-08-07 16:19:39', '2019-08-07 16:19:39', 'ヤマト運輸株式会社 ヤマトウンユカブシキガイシャ'),
(84, '現金支払い済み', 'ゲンキンシハライズミ', '製造経費入力時、現金支払いを行った場合にこちらを使用して計上', '2019-08-08 09:59:48', '2019-08-08 09:59:48', '現金支払い済み ゲンキンシハライズミ'),
(85, 'キヤノンマーケティングジャパン株式会社', 'キャノン', '', '2019-08-08 11:18:46', '2019-08-08 11:18:46', 'キヤノンマーケティングジャパン株式会社 キャノン'),
(86, '日本工業備品株式会社', 'ニホンコウギョウビヒン', 'プラテンクリンSS ', '2019-08-13 16:20:56', '2019-08-13 16:20:56', '日本工業備品株式会社 ニホンコウギョウビヒン'),
(87, '共栄プラスチック株式会社', 'キョウエイプラスチック', '', '2019-08-14 15:43:09', '2019-08-14 15:43:51', '共栄プラスチック株式会社 キョウエイプラスチック'),
(88, '株式会社大真', 'カブシキガイシャタイシン', '', '2019-08-19 13:47:40', '2019-08-19 13:47:40', '株式会社大真 カブシキガイシャタイシン'),
(89, 'ダイヤオフィスシステム株式会社', NULL, NULL, '2019-08-27 14:50:59', '2019-08-27 14:50:59', 'ダイヤオフィスシステム株式会社 '),
(90, '株式会社アド・ダイセン', 'アドダイセン', '', '2019-08-29 09:07:11', '2019-08-29 09:07:11', '株式会社アド・ダイセン アドダイセン'),
(91, 'リース会社（請求書なし）', 'リースカイシャ', '興和不動産の封入封緘機管理業務委託契約にて使用', '2019-09-02 13:53:59', '2019-10-10 10:07:32', 'リース会社（請求書なし） リースカイシャ'),
(92, '株式会社ジェイ エスキューブ', 'カブシキガイシャジェイエスキューブ', '封入封緘機管理業務委託契約の保守料金年額', '2019-09-02 14:08:39', '2019-09-02 14:09:08', '株式会社ジェイ エスキューブ カブシキガイシャジェイエスキューブ'),
(93, '株式会社スマートショッピング', 'スマートショッピング', '', '2019-09-04 10:04:26', '2019-09-04 10:04:26', '株式会社スマートショッピング スマートショッピング'),
(94, 'デザイナー', 'デザイナー', '', '2019-09-06 20:12:19', '2019-09-06 20:12:19', 'デザイナー デザイナー'),
(95, '外注デザイナー（竹本琴）', '外注デザイナー（竹本琴）', '', '2019-09-11 08:08:37', '2019-09-11 08:11:15', '外注デザイナー（竹本琴） 外注デザイナー（竹本琴）'),
(96, 'テキスト入力代行', 'テキストニュウリョクダイコウ', '', '2019-09-11 11:59:00', '2019-09-11 11:59:00', 'テキスト入力代行 テキストニュウリョクダイコウ'),
(97, '九州航空株式会社', 'キュウシュウコウクウカブシキガイシャ', '', '2019-10-03 07:19:52', '2019-10-03 07:19:52', '九州航空株式会社 キュウシュウコウクウカブシキガイシャ'),
(98, '日本通運株式会社', 'ニホンツウウン', '', '2019-10-10 10:41:09', '2019-10-10 10:41:09', '日本通運株式会社 ニホンツウウン'),
(99, 'ミドリ安全株式会社', 'ミドリアンゼン', '', '2019-10-15 06:35:08', '2019-10-15 06:35:08', 'ミドリ安全株式会社 ミドリアンゼン'),
(100, '河北印刷株式会社', 'カワキタインサツカブシキガイシャ', '', '2019-12-04 04:23:14', '2019-12-04 04:23:14', '河北印刷株式会社 カワキタインサツカブシキガイシャ'),
(101, '山陽印刷株式会社', 'サンヨウインサツ', '', '2019-12-09 10:13:39', '2019-12-09 10:13:39', '山陽印刷株式会社 サンヨウインサツ'),
(102, '株式会社吉澤運輸商会', 'ヨシザワウンユショウカイ', '', '2019-12-10 08:10:10', '2019-12-10 08:11:51', '株式会社吉澤運輸商会 ヨシザワウンユショウカイ'),
(103, '株式会社ネオシンワ', NULL, NULL, '2019-12-11 10:23:25', '2019-12-11 10:23:25', '株式会社ネオシンワ '),
(104, '株式会社イメージワークス', 'イメージワークス', '', '2019-12-12 09:22:17', '2019-12-12 09:22:17', '株式会社イメージワークス イメージワークス'),
(105, 'プリントネット株式会社', 'プリントネットカブシキガイシャ', '', '2020-01-09 04:52:26', '2020-01-09 04:52:26', 'プリントネット株式会社 プリントネットカブシキガイシャ'),
(106, '株式会社ぴーぷる', 'カブシキガイシャピープル', '', '2020-01-20 23:27:07', '2020-01-20 23:27:07', '株式会社ぴーぷる カブシキガイシャピープル'),
(107, '株式会社倭（ヤマト）デザイン', NULL, NULL, '2020-01-21 08:55:30', '2020-01-21 08:55:30', '株式会社倭（ヤマト）デザイン '),
(108, '東映ラボ・テック株式会社 ', 'トウエイラボ・テック', '', '2020-01-22 05:20:39', '2020-01-22 05:20:39', '東映ラボ・テック株式会社  トウエイラボ・テック'),
(110, '株式会社グラフィック', 'カブシキガイシャグラフィック', '', '2020-02-14 00:18:35', '2020-02-14 00:18:35', '株式会社グラフィック カブシキガイシャグラフィック'),
(111, 'ARATA DESIGN WORKS', 'アラタデザインワークス', '', '2020-02-21 04:27:07', '2020-02-21 04:27:07', 'ARATA DESIGN WORKS アラタデザインワークス'),
(113, '日進堂印刷株式会社', 'ニッシンドウインサツ', '', '2020-03-09 05:35:42', '2020-03-09 05:35:42', '日進堂印刷株式会社 ニッシンドウインサツ'),
(114, '株式会社SSマーケット', 'エスエスマーケット', 'PCレンタル', '2020-03-16 09:44:52', '2020-03-16 09:44:52', '株式会社SSマーケット エスエスマーケット'),
(115, '株式会社ムトウユニパック', 'ムトウユニパック', '', '2020-04-15 07:28:48', '2020-04-15 07:28:48', '株式会社ムトウユニパック ムトウユニパック'),
(116, '株式会社スマートショッピング', 'スマートショッピング', '', '2020-05-08 11:31:36', '2020-05-08 11:32:37', '株式会社スマートショッピング スマートショッピング');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
