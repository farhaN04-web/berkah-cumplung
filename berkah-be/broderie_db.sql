-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 27 Sep 2025 pada 04.52
-- Versi server: 8.0.30
-- Versi PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `broderie_db`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `carts`
--

CREATE TABLE `carts` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `qty` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `deletedAt` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `product_id`, `qty`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('954b0bec-149d-4c88-9d29-d46ee51dfe82', '53a3394b-b7b1-4f2e-b9d6-fe379e0d4afe', '03ddbeb6-5379-4be4-ae78-53d3dd32debb', 1, '2025-09-27 04:49:50.543', '2025-09-27 04:49:50.543', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `category`
--

CREATE TABLE `category` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
('352ee61b-3c10-4174-8de3-be2febd31514', 'Clutch & Handbag'),
('3af21147-6886-48a0-a6d6-197b949b1f9e', 'Tas Selempang'),
('48918e9d-5eb1-4a63-a5f3-dd923420fed6', 'Backpack & Ransel'),
('6c4d4954-2dd3-4c4a-abcd-04e83f28dc9c', 'Totebag'),
('a413dfb5-2b46-429e-a445-a81604b5274d', 'Dompet & Pouch'),
('c73cffa2-e9dc-44ac-9ccf-fb9fdf2047da', 'Aksesoris & Lainnya');

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
--

CREATE TABLE `products` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `stock` int NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `deletedAt` datetime(3) DEFAULT NULL,
  `category_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `stock`, `description`, `image`, `createdAt`, `updatedAt`, `deletedAt`, `category_id`) VALUES
('0015a5e6-9e3e-4f4d-9431-d5e6e9fa3c63', 'Tas Selempang 3 Kantong Blue', 200000, 23, 'Size 26 x 18 x 10 cm', 'storage/images/image33.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:47:30.957', NULL, '3af21147-6886-48a0-a6d6-197b949b1f9e'),
('03ddbeb6-5379-4be4-ae78-53d3dd32debb', 'Recycled Handbag Bunga Campuran', 300000, 25, 'Size 38 x 28 x 9 cm', 'storage/images/image30.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '352ee61b-3c10-4174-8de3-be2febd31514'),
('0e445568-381e-4cb2-9dcd-798d6c9110a5', 'Clutch Cream Rose', 320000, 25, '19x17x10 cm', 'storage/images/image3.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '352ee61b-3c10-4174-8de3-be2febd31514'),
('115ea7d9-be4a-4443-98dc-b3b908cbf9d6', 'Bross sulam ', 35000, 25, 'Diameter 3 cm', 'storage/images/image59.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, 'c73cffa2-e9dc-44ac-9ccf-fb9fdf2047da'),
('14813ec8-536a-46b9-9119-c6829f056212', 'Tas Selempang 3 Kantong Pink', 200000, 25, 'Size 26 x 18 x 10 cm', 'storage/images/image36.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '3af21147-6886-48a0-a6d6-197b949b1f9e'),
('18948ab0-befd-43b5-a085-05a00d1097d9', 'Kaligrafi Allah', 255000, 25, 'Size 30 x 30 cm', 'storage/images/image57.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, 'c73cffa2-e9dc-44ac-9ccf-fb9fdf2047da'),
('2062fd97-dc34-463d-9789-bcdc1fc361ee', 'Mini Slingbag Sakura', 75000, 25, 'Size 15 x 20 cm', 'storage/images/image47.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, 'a413dfb5-2b46-429e-a445-a81604b5274d'),
('22052e29-9f54-40ae-a2da-a62bcb4c2dca', 'Domper Beranak Dark Purple', 140000, 25, 'Size 16 x 15 x 6 cm', 'storage/images/image53.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, 'a413dfb5-2b46-429e-a445-a81604b5274d'),
('26536b71-cb2a-417e-861f-1422da281006', 'Twin Puch Blue Tali Panjang', 115000, 25, 'Size 20 x 12,5 x 2,5 cm', 'storage/images/image50.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, 'a413dfb5-2b46-429e-a445-a81604b5274d'),
('2691c4b5-5abc-4906-90be-fe1946af9e83', 'Pembatas Buku Sulam Benang', 50000, 25, 'Size 8,5 cm', 'storage/images/image62.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, 'c73cffa2-e9dc-44ac-9ccf-fb9fdf2047da'),
('297c5625-91df-4541-89b5-97ce24c510aa', 'Mini Handback Sepeda', 150000, 25, 'Size 23 x18 x 8 cm', 'storage/images/image23.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '48918e9d-5eb1-4a63-a5f3-dd923420fed6'),
('2b40ec4c-d380-4ace-93a6-3f32cf3a7fce', 'Tas Selempang Pohon Benang', 185000, 25, 'Size 30 x 20 x 10 cm', 'storage/images/image19.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '3af21147-6886-48a0-a6d6-197b949b1f9e'),
('2c21d4de-2db5-4e6e-91ab-9f8279861986', 'Tas Selempang parang hitam', 200000, 25, 'Size 30 x 20 x 10 cm', 'storage/images/image10.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '3af21147-6886-48a0-a6d6-197b949b1f9e'),
('2e9d5af7-8ca2-478e-9063-11360b60de5b', 'Tas Selempang Kawung Red Black', 200000, 25, 'Size 30 x 20 x 10 cm', 'storage/images/image8.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '3af21147-6886-48a0-a6d6-197b949b1f9e'),
('303e916b-7ff5-4c4e-bd34-55f6038ad813', 'Twin Pouch Buket Blue', 110000, 25, 'Size 20 x 12,5 x 2,5 cm', 'storage/images/image49.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, 'a413dfb5-2b46-429e-a445-a81604b5274d'),
('3276270d-c0e0-4157-976a-b50dbce2184d', 'Gantungan kunci lonjong', 40000, 25, 'Size 8,5 cm', 'storage/images/image61.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, 'c73cffa2-e9dc-44ac-9ccf-fb9fdf2047da'),
('3a654ae5-487b-4bcc-bc10-f1e5f37d7e73', 'Tas Animasi Red', 185000, 25, 'Size 30 x 20 x 10 cm', 'storage/images/image15.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '3af21147-6886-48a0-a6d6-197b949b1f9e'),
('4b17437f-2ae0-4c56-932f-2c495ae6d8d1', 'Dompet Gemoy Bunga Matahari', 65000, 25, 'Size 16 x 11 x 17 cm', 'storage/images/image64.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, 'a413dfb5-2b46-429e-a445-a81604b5274d'),
('4cfcb75a-0779-412a-95e1-c0a3f2eb09c5', 'Tempat Pensil Brown', 40000, 25, 'Size 20 x 9,5 cm', 'storage/images/image55.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, 'c73cffa2-e9dc-44ac-9ccf-fb9fdf2047da'),
('4f906d62-3a66-45ef-acd4-af9a83d0ea58', 'Mini Backpack Rose Pink', 190000, 25, 'Size19 x 24 x 12 cm', 'storage/images/image25.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '48918e9d-5eb1-4a63-a5f3-dd923420fed6'),
('5098000e-d86e-4639-a866-52e9cf00fd67', 'Clutch Bag Pink Rose', 195000, 25, '16x19x4 cm', 'storage/images/image1.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '352ee61b-3c10-4174-8de3-be2febd31514'),
('528fcb3b-caf0-48b4-a568-dc8cbaba732b', 'Tas Selempang Mawar Benang', 185000, 25, 'Size 30 x 20 x 10 cm', 'storage/images/image18.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '3af21147-6886-48a0-a6d6-197b949b1f9e'),
('559dca0c-229f-4a68-ba78-85dc459ccc64', 'Totebag Animasi Ranting', 280000, 25, 'Size 35 x 30 x 14 cm', 'storage/images/image39.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '6c4d4954-2dd3-4c4a-abcd-04e83f28dc9c'),
('566e4d30-84b7-424f-bfae-8e1e18535110', 'Domper Beranak Brown', 140000, 25, 'Size 16 x 15 x 6 cm', 'storage/images/image52.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, 'a413dfb5-2b46-429e-a445-a81604b5274d'),
('586f219e-e1b4-43dc-b872-589075e6492b', 'Tas Animasi Blue', 185000, 25, 'Size 30 x 20 x 10 cm', 'storage/images/image14.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '3af21147-6886-48a0-a6d6-197b949b1f9e'),
('60d0348e-59cd-44bd-9992-08f67bb52944', 'Dompet Gemoy Pink Flower', 65000, 25, 'Size 16 x 11 x 17 cm', 'storage/images/image66.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, 'a413dfb5-2b46-429e-a445-a81604b5274d'),
('6944cfa7-f2ac-4a3c-820b-faa3ee0b484f', 'Tempat Pensil Blue', 40000, 25, 'Size 20 x 9,5 cm', 'storage/images/image54.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, 'c73cffa2-e9dc-44ac-9ccf-fb9fdf2047da'),
('6a810431-e29b-4eab-9807-16cecd60e25a', 'Tas selempang Truntun Coklat', 200000, 25, 'Size 30 x 20 x 10 cm', 'storage/images/image13.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '3af21147-6886-48a0-a6d6-197b949b1f9e'),
('6b86ee14-5cc2-48a1-9ce7-8b5da0ed3543', 'Ransel Bunga Anti Maling', 280000, 25, '22x35x14 cm', 'storage/images/image27.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '48918e9d-5eb1-4a63-a5f3-dd923420fed6'),
('746ad03d-521a-46e5-a587-88051fd658d5', 'Ransel Animasi Anti Maling', 280000, 25, '22x35x14 cm', 'storage/images/image26.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '48918e9d-5eb1-4a63-a5f3-dd923420fed6'),
('75c504d6-1016-492c-a67b-a9691d48e13f', 'Dompet Gemoy Blue Flower', 65000, 25, 'Size 16 x 11 x 17 cm', 'storage/images/image63.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, 'a413dfb5-2b46-429e-a445-a81604b5274d'),
('765876e5-1347-4f14-bca5-13270b63d6cf', 'Tas Selempang Love Benang', 185000, 25, 'Size 30 x 20 x 10 cm', 'storage/images/image17.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '3af21147-6886-48a0-a6d6-197b949b1f9e'),
('76c22a58-07df-4cd5-8194-630ebdab6fb1', 'Hiasan Dinding', 180000, 25, 'Size 30 x 30 cm', 'storage/images/image56.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, 'c73cffa2-e9dc-44ac-9ccf-fb9fdf2047da'),
('802999e4-be94-47a4-97ea-ad9226f55db6', 'Tas Selempang Love', 185000, 25, 'Size 30 x 20 x 10 cm', 'storage/images/image9.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '3af21147-6886-48a0-a6d6-197b949b1f9e'),
('81e43212-2751-43b6-b837-5156ec74eddb', 'Recycled Handbag', 300000, 25, 'Size 38 x 28 x 9 cm', 'storage/images/image16.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '3af21147-6886-48a0-a6d6-197b949b1f9e'),
('8782f737-410e-4d8e-85fb-1099d0d899b2', 'Totebag Keranjang Sakura', 280000, 25, 'Size 35 x 30 x 14 cm', 'storage/images/image42.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '6c4d4954-2dd3-4c4a-abcd-04e83f28dc9c'),
('8aefaf19-3ed8-4e1b-b276-8ed6c73bb063', 'Clutch bag rose', 290000, 25, '22x12x5 cm', 'storage/images/image6.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '352ee61b-3c10-4174-8de3-be2febd31514'),
('9947c867-9e57-46c7-afd9-d48c66754afb', 'Handbag Bunga Liar Green', 295000, 25, 'Size 35 x 30 x 14 cm', 'storage/images/image31.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '352ee61b-3c10-4174-8de3-be2febd31514'),
('9e6a6303-e48d-4c19-b5d7-b2fb39048dd5', 'Mini Backpack Bunga', 190000, 25, 'Size19 x 24 x 12 cm', 'storage/images/image20.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '48918e9d-5eb1-4a63-a5f3-dd923420fed6'),
('a27d4f4d-3a55-4a0b-a05e-2cfacb51fe55', 'Clutch bag silver rose', 320000, 25, '19x17x10 cm', 'storage/images/image4.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '352ee61b-3c10-4174-8de3-be2febd31514'),
('a5a4d0a8-663c-4445-a147-adcc9e187ede', 'Tas Selempang 3 Kantong Black', 200000, 25, 'Size 26 x 18 x 10 cm', 'storage/images/image34.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '3af21147-6886-48a0-a6d6-197b949b1f9e'),
('b2365cfd-3d14-4bc2-9910-26c3e70280bd', 'Mini Slingbag Keranjang Bunga', 75000, 25, 'Size 15 x 20 cm', 'storage/images/image45.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, 'a413dfb5-2b46-429e-a445-a81604b5274d'),
('b339305c-20d4-409f-a2aa-e31fa1715995', 'Totebag Keranjang Mawar', 280000, 25, 'Size 35 x 30 x 14 cm', 'storage/images/image41.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '6c4d4954-2dd3-4c4a-abcd-04e83f28dc9c'),
('b9cee993-d2bd-4fe5-ab1e-5587c6978fa2', 'Kaligrafi Muhammad', 255000, 25, 'Size 30 x 30 cm', 'storage/images/image58.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, 'c73cffa2-e9dc-44ac-9ccf-fb9fdf2047da'),
('bcea084e-6d80-4189-a677-65daa2e0caec', 'Dompet Beranak Blue', 140000, 25, 'Size 16 x 15 x 6 cm', 'storage/images/image51.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, 'a413dfb5-2b46-429e-a445-a81604b5274d'),
('bfde587e-cada-4eab-9b64-0772c0e93a86', 'Mini Slingbag Brown', 75000, 25, 'Size 15 x 20 cm', 'storage/images/image44.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, 'a413dfb5-2b46-429e-a445-a81604b5274d'),
('bff45a4c-6f5e-4779-8c9c-8698238531da', 'Mini Backpack Sepeda', 190000, 25, 'Size19 x 24 x 12 cm', 'storage/images/image22.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '48918e9d-5eb1-4a63-a5f3-dd923420fed6'),
('c257b81d-fdef-4d38-a751-0a6b70b08f30', 'Mini Slingbag Pink', 75000, 25, 'Size 15 x 20 cm', 'storage/images/image46.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, 'a413dfb5-2b46-429e-a445-a81604b5274d'),
('c88ccc50-dd71-41f3-a151-5001fb97f5a4', 'Totebag Animasi Bunga', 280000, 25, 'Size 35 x 30 x 14 cm', 'storage/images/image38.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '6c4d4954-2dd3-4c4a-abcd-04e83f28dc9c'),
('cb1df992-c264-4205-9103-a8ca69a01834', 'Tas Selempang Kawung Green Black', 200000, 25, 'Size 30 x 20 x 10 cm', 'storage/images/image7.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '3af21147-6886-48a0-a6d6-197b949b1f9e'),
('cd9d351b-a984-4213-95a6-1a29038cf348', 'Tas Selempang 3 Kantong Red', 200000, 25, 'Size 26 x 18 x 10 cm', 'storage/images/image37.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '3af21147-6886-48a0-a6d6-197b949b1f9e'),
('cf3ec1aa-0f0f-42d7-a521-b7ae2aabdc77', 'Ransel Sakura Anti Maling', 280000, 25, '22x35x14 cm', 'storage/images/image28.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '48918e9d-5eb1-4a63-a5f3-dd923420fed6'),
('d0859889-f243-4ef2-b3a3-e97b7499d84b', 'Tas Selempang Sakura Pink', 185000, 25, 'Size 30 x 20 x 10 cm', 'storage/images/image12.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '3af21147-6886-48a0-a6d6-197b949b1f9e'),
('d713f662-8a15-4239-92f9-93aece11c3d0', 'Mini Slingbag Bunga Matahari', 75000, 25, 'Size 15 x 20 cm', 'storage/images/image43.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, 'a413dfb5-2b46-429e-a445-a81604b5274d'),
('dae9ed9c-1de0-43e0-bfb1-927adf2c9f20', 'Tas Selempang 3 Kantong Brown', 200000, 25, 'Size 26 x 18 x 10 cm', 'storage/images/image35.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '3af21147-6886-48a0-a6d6-197b949b1f9e'),
('e16ebef7-7565-4fa1-a404-ea786e0365b7', 'Dompet Gemoy Bunga Matahari', 65000, 25, 'Size 16 x 11 x 17 cm', 'storage/images/image65.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, 'a413dfb5-2b46-429e-a445-a81604b5274d'),
('e1bf0b55-9e26-46b4-a245-c75324aa0f7e', 'Mini Backpack Ranting', 190000, 25, 'Size19 x 24 x 12 cm', 'storage/images/image21.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '48918e9d-5eb1-4a63-a5f3-dd923420fed6'),
('eb2dc356-020e-4f44-8d7f-62d2698b8053', 'Twin Pouch Sakura', 115000, 25, 'Size 20 x 12,5 x 2,5 cm', 'storage/images/image48.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, 'a413dfb5-2b46-429e-a445-a81604b5274d'),
('ef87442e-009a-44da-8e9d-7ca1ff16c5a7', 'Mini Handback Bunga', 150000, 25, 'Size 23 x 18 x 8 cm', 'storage/images/image24.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '48918e9d-5eb1-4a63-a5f3-dd923420fed6'),
('f1fc0601-957f-4e05-8325-b08e5147d076', 'Gantungan kunci bulat', 45000, 25, 'Size 8,5 cm', 'storage/images/image60.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, 'c73cffa2-e9dc-44ac-9ccf-fb9fdf2047da'),
('f31bb960-3f3d-41a2-bf44-4f3b0aca7f16', 'Totebag Buket Bunga', 290000, 25, 'Size 30 x 32 x 12 cm', 'storage/images/image40.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '6c4d4954-2dd3-4c4a-abcd-04e83f28dc9c'),
('f41eca91-fb10-43ee-8d59-d41150525dea', 'Clutch Keranjang mawar', 195000, 25, '16x19x4 cm', 'storage/images/image2.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '352ee61b-3c10-4174-8de3-be2febd31514'),
('faca68fd-14aa-43ba-935f-37d77ee560d2', 'Handbag Bunga Liar Brown', 295000, 25, 'Size 35 x 30 x 14 cm', 'storage/images/image32.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '352ee61b-3c10-4174-8de3-be2febd31514'),
('fb4eb9bd-a6ef-4137-929c-72f597c6254f', 'Tas Selempang Sakura Purple', 185000, 25, 'Size 30 x 20 x 10 cm', 'storage/images/image11.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '3af21147-6886-48a0-a6d6-197b949b1f9e'),
('fcec3c30-1037-4047-9a08-46e46b154ad5', 'Clutch bag red rose', 200000, 25, '18x10x5 cm', 'storage/images/image5.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '352ee61b-3c10-4174-8de3-be2febd31514'),
('fef6a715-648d-4404-952b-bb8893968e4c', 'Recycled Handbag Bunga batik', 265000, 25, 'Size 38 x 28 x 9 cm', 'storage/images/image29.jpeg', '2025-09-27 04:39:09.783', '2025-09-27 04:39:09.783', NULL, '352ee61b-3c10-4174-8de3-be2febd31514');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transactions`
--

CREATE TABLE `transactions` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_price` int NOT NULL,
  `status` enum('pending','success','failed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `shipping_status` enum('pending','success','failed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `shipping_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `transactions`
--

INSERT INTO `transactions` (`id`, `code`, `user_id`, `total_price`, `status`, `shipping_status`, `shipping_number`, `createdAt`, `updatedAt`) VALUES
('914f9c48-7780-43f5-aeb6-b4996d0dc4b3', 'ORD-8B0', '53a3394b-b7b1-4f2e-b9d6-fe379e0d4afe', 400000, 'pending', 'pending', NULL, '2025-09-27 04:47:30.943', '2025-09-27 04:47:30.943');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaction_details`
--

CREATE TABLE `transaction_details` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `transaction_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int NOT NULL,
  `qty` int NOT NULL,
  `sub_total` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `transaction_details`
--

INSERT INTO `transaction_details` (`id`, `transaction_id`, `product_id`, `price`, `qty`, `sub_total`, `createdAt`, `updatedAt`) VALUES
('11f0b4c1-069b-418c-9d7f-3700ddbfcc45', '914f9c48-7780-43f5-aeb6-b4996d0dc4b3', '0015a5e6-9e3e-4f4d-9431-d5e6e9fa3c63', 200000, 2, 400000, '2025-09-27 04:47:30.943', '2025-09-27 04:47:30.943');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `photo` text COLLATE utf8mb4_unicode_ci,
  `role` enum('user','admin') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `deletedAt` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `photo`, `role`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('3bac99a6-d524-4c08-8301-04a8f9fc6e7c', 'Admin', 'admin@example.com', '$2b$10$ZJOEp518r9Og3fk8zFI1KOsuqsUTcEFgGUdtec/1S0ni7kbLZ.SfO', NULL, 'admin', '2025-06-17 09:30:09.915', '2025-06-17 09:30:09.915', NULL),
('53a3394b-b7b1-4f2e-b9d6-fe379e0d4afe', 'User', 'user@example.com', '$2b$10$5yCZ7u5A3pyiASN8.qoH..nWxXDeJWJn4F.K4tg73AKKK58atQAAm', NULL, 'user', '2025-06-17 09:30:09.915', '2025-06-17 09:30:09.915', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('2bbc8f9a-ad8c-4d0c-9964-855d3d574b76', '65e1ea0e1b3cd90e0244a557850031b9f1d56a33a397bb28c017e852c018ce80', '2025-09-27 04:39:04.581', '20250626091609_add_category_table', NULL, NULL, '2025-09-27 04:39:04.487', 1),
('9466ef9d-f71b-4557-a663-a91aad0d3477', '05b18dabd1b4e2dc4ce415037f8b84929e7a0a20941009f81429d340fad0df55', '2025-09-27 04:39:04.485', '20250619105450_new_db', NULL, NULL, '2025-09-27 04:39:04.174', 1);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carts_user_id_fkey` (`user_id`),
  ADD KEY `carts_product_id_fkey` (`product_id`);

--
-- Indeks untuk tabel `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_category_id_fkey` (`category_id`);

--
-- Indeks untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `transactions_code_key` (`code`),
  ADD KEY `transactions_user_id_fkey` (`user_id`);

--
-- Indeks untuk tabel `transaction_details`
--
ALTER TABLE `transaction_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transaction_details_transaction_id_fkey` (`transaction_id`),
  ADD KEY `transaction_details_product_id_fkey` (`product_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_key` (`email`);

--
-- Indeks untuk tabel `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `carts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `transaction_details`
--
ALTER TABLE `transaction_details`
  ADD CONSTRAINT `transaction_details_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `transaction_details_transaction_id_fkey` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
