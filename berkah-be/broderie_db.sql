-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 17, 2025 at 12:23 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 7.4.33

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
-- Table structure for table `carts`
--

CREATE TABLE IF NOT EXISTS `carts` (
  `id` varchar(191) NOT NULL,
  `user_id` varchar(191) NOT NULL,
  `product_id` varchar(191) NOT NULL,
  `qty` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `deletedAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `carts_user_id_fkey` (`user_id`),
  KEY `carts_product_id_fkey` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `id` varchar(191) NOT NULL,
  `name` varchar(150) NOT NULL,
  `price` double NOT NULL,
  `stock` int(11) NOT NULL,
  `description` text NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `deletedAt` datetime(3) DEFAULT NULL,
  `image` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `stock`, `description`, `createdAt`, `updatedAt`, `deletedAt`, `image`) VALUES
('019c5c4a-773f-4a6c-9d1b-ffe15308a1cb', 'Dompet Gemoy', 60000, 26, 'Dompet handmade berkualitas tinggi dengan ukuran 16 x 11 x 7 cm, varian Hitam. Dibuat dengan bahan pilihan dan ketelitian tinggi.', '2025-06-17 09:30:09.933', '2025-06-17 10:22:05.658', NULL, 'storage/images/image-1750155725655-437173864.png'),
('027ce2f0-4c4b-472d-949c-23e8707973d7', 'PO. Mini Slingbag', 70000, 32, 'Produk handmade berkualitas tinggi dengan ukuran 15 x 20 cm, varian Polkadot. Dibuat dengan ketelitian dan bahan premium.', '2025-06-17 09:30:10.207', '2025-06-17 09:56:59.770', NULL, 'storage/images/image-1750154219766-809474084.png'),
('048b4229-1e3d-4206-8fad-88ddb0a608db', 'Recycled Handbag', 270000, 30, 'Tas handmade eksklusif, varian Ecru. Desain unik dan fungsional.', '2025-06-17 09:30:09.984', '2025-06-17 10:19:11.639', NULL, 'storage/images/image-1750155551635-780646419.png'),
('05f9267a-0791-4199-9fb7-18f2d7105531', 'Clutch Mawar Cream', 315000, 31, 'Tas handmade eksklusif, varian Cream. Desain unik dan fungsional.', '2025-06-17 09:30:10.009', '2025-06-17 10:17:02.612', NULL, 'storage/images/image-1750155422608-160845335.png'),
('0839ba7a-4d8b-4360-90af-71f97f525bfd', 'Twin Pouch (Tali Panjang)', 110000, 6, 'Produk handmade berkualitas tinggi dengan ukuran 20 x 12,5 x 2,5 cm, varian Set B. Dibuat dengan ketelitian dan bahan premium.', '2025-06-17 09:30:10.226', '2025-06-17 09:46:36.773', NULL, 'storage/images/image-1750153596768-947650102.png'),
('0dd77e18-fc1b-40c9-b33b-aad6ef36c920', 'Mini Backpack', 190000, 22, 'Tas mini handmade eksklusif dengan ukuran 19 x 24 x 12 cm, varian Navy. Desain unik dan fungsional.', '2025-06-17 09:30:09.951', '2025-06-17 10:20:07.154', NULL, 'storage/images/image-1750155607150-388883209.png'),
('11ae6aa7-04a4-4a8a-a431-7496b085ded6', 'Tas Pesta Kotak', 290000, 9, 'Tas handmade eksklusif, varian Silver. Desain unik dan fungsional.', '2025-06-17 09:30:09.995', '2025-06-17 10:18:09.330', NULL, 'storage/images/image-1750155489326-442617253.png'),
('16f6a953-f8f9-4cb2-aefa-077e0d573d44', 'Totebag Well', 275000, 43, 'Produk handmade berkualitas tinggi dengan ukuran 35 x 30 x 14 cm, varian Biru. Dibuat dengan ketelitian dan bahan premium.', '2025-06-17 09:30:10.129', '2025-06-17 10:02:16.199', NULL, 'storage/images/image-1750154536194-143489282.png'),
('18afa340-3466-46ab-8bce-7f1f18646f1b', 'Twin Pouch (Tali Pendek)', 100000, 29, 'Produk handmade berkualitas tinggi dengan ukuran 20 x 12,5 x 2,5 cm, varian Set 1. Dibuat dengan ketelitian dan bahan premium.', '2025-06-17 09:50:56.561', '2025-06-17 09:50:56.561', NULL, 'storage/images/image-1750153856555-973596636.png'),
('1d69f4e8-f8a4-4476-b77c-570347b3be38', 'Tas Mawar Benang', 184500, 48, 'Tas handmade eksklusif dengan ukuran 30 x 20 x 10 cm, varian Benang Pink. Desain unik dan fungsional.', '2025-06-17 09:30:10.089', '2025-06-17 10:09:28.294', NULL, 'storage/images/image-1750154968290-997653765.png'),
('1e2a9216-2aaa-4ec8-9aa8-bd138ac7b237', 'Mini Handbag', 147000, 21, 'Tas mini handmade eksklusif dengan ukuran 23 x 18 x 8 cm, varian Motif Bunga. Desain unik dan fungsional.', '2025-06-17 09:30:09.935', '2025-06-17 10:21:35.366', NULL, 'storage/images/image-1750155695362-250547372.png'),
('239f5085-fc40-4c2c-b376-3dcbe9b12c4c', 'Tas Selempang 3 Kantong', 198000, 20, 'Tas handmade eksklusif dengan ukuran 26 x 18 x 10 cm samping motif ecoprint, varian Ecoprint. Desain unik dan fungsional.', '2025-06-17 09:30:10.174', '2025-06-17 09:58:25.724', NULL, 'storage/images/image-1750154305720-915301452.png'),
('29fac907-6e1f-4aa5-a9d2-c214e56172f0', 'TS. Aplikasi', 184500, 31, 'Produk handmade berkualitas tinggi dengan ukuran 30 x 20 x 10 cm, varian Aplikasi Bunga. Dibuat dengan ketelitian dan bahan premium.', '2025-06-17 09:30:10.103', '2025-06-17 10:08:15.077', NULL, 'storage/images/image-1750154895075-906577494.png'),
('319ce43a-5b9c-4c82-930a-19a068a2be44', 'PO. Recycled Handbag', 270000, 33, 'Tas handmade eksklusif, varian Denim. Desain unik dan fungsional.', '2025-06-17 09:30:09.989', '2025-06-17 10:18:51.678', NULL, 'storage/images/image-1750155531675-479881996.png'),
('369b7eff-68c3-4b06-b282-1321ac86ea84', 'Kaligrafi 30 x 30 cm', 250000, 23, 'Hiasan dinding kaligrafi dengan ukuran 30 x 30 cm, varian Emas. Mempercantik ruangan.', '2025-06-17 09:30:10.034', '2025-06-17 10:14:50.339', NULL, 'storage/images/image-1750155290335-239046999.png'),
('36cd127f-bfba-4650-855d-21781448f62c', 'Clutch Mini', 200000, 32, 'Tas mini handmade eksklusif, varian Hitam. Desain unik dan fungsional.', '2025-06-17 09:30:10.019', '2025-06-17 10:15:55.222', NULL, 'storage/images/image-1750155355218-552427058.png'),
('434d2315-be7a-427e-a073-19d985e9c1f6', 'Ransel Anti Maling', 278000, 5, 'Tas handmade eksklusif, varian Hitam. Desain unik dan fungsional.', '2025-06-17 09:30:09.968', '2025-06-17 10:19:44.348', NULL, 'storage/images/image-1750155584344-407349567.png'),
('4386d95e-4f66-4fe0-b046-7c03d00e1957', 'Pembatas Buku sulam benang', 45000, 46, 'Pembatas buku sulaman dengan ukuran 8,5 cm, varian Motif Buku. Untuk pecinta buku.', '2025-06-17 09:30:10.157', '2025-06-17 09:59:03.763', NULL, 'storage/images/image-1750154343760-483299696.png'),
('46c04b9c-379e-470c-8e0e-d2f251e9f409', 'PO. TS. Keranjang Bunga', 184500, 50, 'Produk handmade berkualitas tinggi dengan ukuran 30 x 20 x 10 cm, varian Keranjang Bunga. Dibuat dengan ketelitian dan bahan premium.', '2025-06-17 09:30:10.112', '2025-06-17 10:07:35.344', NULL, 'storage/images/image-1750154855340-290535874.png'),
('486ce69b-2f91-4f2f-a931-d3be1e3cb4a5', 'Tas Selempang Truntum', 200000, 47, 'Tas handmade eksklusif dengan ukuran 30 x 20 x 10 cm, varian Batik. Desain unik dan fungsional.', '2025-06-17 09:30:10.046', '2025-06-17 10:13:59.141', NULL, 'storage/images/image-1750155239134-475775325.png'),
('4ca5d4e3-d83f-401a-ba98-20f601f8fe88', 'Tas Selempang', 184500, 40, 'Tas handmade eksklusif dengan ukuran 30 x 20 x 10 cm, varian Polos. Desain unik dan fungsional.', '2025-06-17 09:30:10.062', '2025-06-17 10:12:58.247', NULL, 'storage/images/image-1750155178243-972319749.png'),
('54655b41-8d80-4dca-886c-8a851a5320f7', 'PO. Tas Selempang 3 Kantong', 198000, 36, 'Tas handmade eksklusif dengan ukuran 26 x 18 x 10 cm samping motif ecoprint, varian Ecoprint Bunga. Desain unik dan fungsional.', '2025-06-17 09:30:10.178', '2025-06-17 09:57:57.514', NULL, 'storage/images/image-1750154277504-138217472.png'),
('5a59f183-6b74-4ddc-9624-901eac53f8f9', 'Tempat pensil', 35000, 29, 'Tempat pensil handmade dengan ukuran 20 x 9,5 cm, varian Motif Buku. Praktis dan stylish.', '2025-06-17 09:37:00.558', '2025-06-17 09:37:00.558', NULL, 'storage/images/image-1750153020547-256009350.png'),
('663250ae-54b4-487c-9da7-3744ceda701e', 'Dompet Beranak (3 pcs)', 135000, 50, 'Dompet handmade berkualitas tinggi dengan ukuran 16 x 15 x 6 cm, varian Set Biru. Dibuat dengan bahan pilihan dan ketelitian tinggi.', '2025-06-17 09:30:10.255', '2025-06-17 09:38:42.014', NULL, 'storage/images/image-1750153122009-446041098.png'),
('6e4e9960-7830-426f-9d36-4a149cc791e4', 'PO. Tas Selempang Love Benang', 184500, 42, 'Tas handmade eksklusif dengan ukuran 30 x 20 x 10 cm, varian Benang Merah. Desain unik dan fungsional.', '2025-06-17 09:30:10.084', '2025-06-17 10:09:57.378', NULL, 'storage/images/image-1750154997374-806220472.png'),
('926375ea-a9f3-422c-aa36-36fb6b13b168', 'Gantungan Kunci', 37000, 5, 'Gantungan kunci unik, varian Karakter. Cocok untuk koleksi atau hadiah.', '2025-06-17 09:30:10.152', '2025-06-17 09:59:23.260', NULL, 'storage/images/image-1750154363257-362729407.png'),
('961804a1-43c2-4576-bb8a-2a42807e70f1', 'PO. Mini Handbag', 147000, 27, 'Tas mini handmade eksklusif dengan ukuran 23 x 18 x 8 cm, varian Motif Geometris. Desain unik dan fungsional.', '2025-06-17 09:30:09.940', '2025-06-17 10:21:07.622', NULL, 'storage/images/image-1750155667618-12132710.png'),
('9db348b4-882d-4bfa-8bac-28e35e6f29fe', 'Mini Slingbag', 70000, 1, 'Produk handmade berkualitas tinggi dengan ukuran 15 x 20 cm, varian Biru. Dibuat dengan ketelitian dan bahan premium.', '2025-06-17 09:30:10.183', '2025-06-17 09:57:23.738', NULL, 'storage/images/image-1750154243734-862250199.png'),
('a1a28eaa-ebbd-4bbe-bae8-4251100d061c', 'Tas Selempang Kawung', 200000, 5, 'Tas handmade eksklusif dengan ukuran 30 x 20 x 10 cm, varian Hitam. Desain unik dan fungsional.', '2025-06-17 09:30:10.049', '2025-06-17 10:13:31.025', NULL, 'storage/images/image-1750155211022-196157149.png'),
('abfcff76-43de-488f-a123-bd3bec8c724f', 'Clutch Mawar Silver', 315000, 48, 'Tas handmade eksklusif, varian Silver. Desain unik dan fungsional.', '2025-06-17 09:30:09.999', '2025-06-17 10:17:28.524', NULL, 'storage/images/image-1750155448520-972578408.png'),
('ae001227-1fa8-41b4-9472-3becdd86a40f', 'Totebag', 275000, 31, 'Produk handmade berkualitas tinggi dengan ukuran 35 x 30 x 14 cm, varian Hitam. Dibuat dengan ketelitian dan bahan premium.', '2025-06-17 09:30:10.134', '2025-06-17 10:01:46.811', NULL, 'storage/images/image-1750154506807-644304229.png'),
('b19f1825-3a15-4fa3-9d46-ab4cf9d77428', 'Hiasan Dinding 30 x 30 cm', 175000, 13, 'Produk handmade berkualitas tinggi dengan ukuran 30 x 30 cm, varian Kayu. Dibuat dengan ketelitian dan bahan premium.', '2025-06-17 09:30:10.042', '2025-06-17 10:14:29.881', NULL, 'storage/images/image-1750155269877-839246704.png'),
('b1c31438-86a9-446e-a8fa-b3758eb6f1ce', 'PO. Clutch Mawar Pink', 190000, 47, 'Tas handmade eksklusif, varian Pink. Desain unik dan fungsional.', '2025-06-17 09:30:10.013', '2025-06-17 10:16:19.684', NULL, 'storage/images/image-1750155379681-825847136.png'),
('b2519205-e9a1-455f-91db-949f89b8c49d', 'Totebag Daur', 295000, 24, 'Produk handmade berkualitas tinggi dengan ukuran 38 x 28 x 9 cm, varian Natural. Dibuat dengan ketelitian dan bahan premium.', '2025-06-17 09:30:10.115', '2025-06-17 10:06:55.768', NULL, 'storage/images/image-1750154815765-602235514.png'),
('b8277a86-59af-4bca-b07e-ef5752f487f2', 'Bros Sulam', 30000, 17, 'Bros sulaman tangan dengan ukuran diameter 3 cm, varian Mawar. Detail rumit dan elegan.', '2025-06-17 09:30:10.149', '2025-06-17 09:59:59.622', NULL, 'storage/images/image-1750154399618-155283690.png'),
('c571dc9a-e49b-47b1-8428-9a2a69cb757d', 'Tas Selempang Parang', 200000, 20, 'Tas handmade eksklusif dengan ukuran 30 x 20 x 10 cm, varian Batik Parang. Desain unik dan fungsional.', '2025-06-17 09:30:10.068', '2025-06-17 10:12:01.766', NULL, 'storage/images/image-1750155121762-654395111.png'),
('cfef4b1f-5441-44f8-9a99-cc42b6916b8f', 'PO. Totebag Keranjang bunga', 275000, 11, 'Produk handmade berkualitas tinggi dengan ukuran 35 x 30 x 14 cm, varian Bunga Warna-warni. Dibuat dengan ketelitian dan bahan premium.', '2025-06-17 09:30:10.138', '2025-06-17 10:01:04.349', NULL, 'storage/images/image-1750154464345-839747560.png'),
('db83b4c3-3ec2-4c4a-a884-e06d51659b2a', 'PO. Tas Selempang Love', 184500, 9, 'Tas handmade eksklusif dengan ukuran 30 x 20 x 10 cm, varian Motif Love. Desain unik dan fungsional.', '2025-06-17 09:30:10.076', '2025-06-17 10:11:23.294', NULL, 'storage/images/image-1750155083274-400736373.png'),
('dc1b1479-72cc-4ad5-82b3-b23207ec82e3', 'Totebag Eco', 287000, 43, 'Produk handmade berkualitas tinggi dengan ukuran 30 x 32 x 12 cm, varian Hijau. Dibuat dengan ketelitian dan bahan premium.', '2025-06-17 09:30:10.126', '2025-06-17 10:05:04.664', NULL, 'storage/images/image-1750154704660-383055792.png'),
('e7d9ab5d-254d-4e11-a779-863f2f18cfaf', 'Totebag Keranjang mawar', 275000, 28, 'Produk handmade berkualitas tinggi dengan ukuran 35 x 30 x 14 cm, varian Mawar Merah. Dibuat dengan ketelitian dan bahan premium.', '2025-06-17 09:30:10.119', '2025-06-17 10:06:29.308', NULL, 'storage/images/image-1750154789305-370718610.png'),
('e9cfa3dd-6028-41a2-be55-97ca0e282cb7', 'PO. Mini Backpack', 190000, 34, 'Tas mini handmade eksklusif dengan ukuran 19 x 24 x 12 cm, varian Hitam. Desain unik dan fungsional.', '2025-06-17 09:30:09.945', '2025-06-17 10:20:41.547', NULL, 'storage/images/image-1750155641543-924606431.png'),
('f1c5368b-44ec-4c47-a79b-e60431a8de35', 'PO. Clutch Keranjang Mawar', 190000, 32, 'Tas handmade eksklusif, varian Merah. Desain unik dan fungsional.', '2025-06-17 09:30:10.029', '2025-06-17 10:15:28.531', NULL, 'storage/images/image-1750155328528-727600016.png'),
('f96c969a-9cd1-4a50-bde9-ca849b7a5aaf', 'PO. Tas Selempang Pohon', 184500, 32, 'Tas handmade eksklusif dengan ukuran 30 x 20 x 10 cm, varian Motif Pohon. Desain unik dan fungsional.', '2025-06-17 09:30:10.095', '2025-06-17 10:09:02.198', NULL, 'storage/images/image-1750154942194-307434788.png'),
('fea51457-3a25-4f03-9a17-7c55f6771171', 'Handbag bunga liar', 295000, 28, 'Tas handmade eksklusif dengan ukuran 35 x 30 x 14 cm, varian Bunga Pastel. Desain unik dan fungsional.', '2025-06-17 09:30:10.144', '2025-06-17 10:00:25.018', NULL, 'storage/images/image-1750154425015-913766095.png');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE IF NOT EXISTS `transactions` (
  `id` varchar(191) NOT NULL,
  `user_id` varchar(191) NOT NULL,
  `total_price` int(11) NOT NULL,
  `status` enum('pending','success','failed') NOT NULL DEFAULT 'pending',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `code` varchar(191) NOT NULL,
  `payment_status` enum('pending','success') NOT NULL DEFAULT 'pending',
  `shipping_status` enum('pending','success') NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`id`),
  UNIQUE KEY `transactions_code_key` (`code`),
  KEY `transactions_user_id_fkey` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transaction_details`
--

CREATE TABLE IF NOT EXISTS `transaction_details` (
  `id` varchar(191) NOT NULL,
  `transaction_id` varchar(191) NOT NULL,
  `product_id` varchar(191) NOT NULL,
  `price` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `sub_total` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `transaction_details_transaction_id_fkey` (`transaction_id`),
  KEY `transaction_details_product_id_fkey` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(191) NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(191) NOT NULL,
  `photo` text DEFAULT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `deletedAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `photo`, `role`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('3bac99a6-d524-4c08-8301-04a8f9fc6e7c', 'Admin', 'admin@example.com', '$2b$10$r0hVmNcbr56nGWhyPH71EOG0CrS/ay.kv6WEAA7BSwfvJYUti5tJW', NULL, 'admin', '2025-06-17 09:30:09.915', '2025-06-17 09:30:09.915', NULL),
('53a3394b-b7b1-4f2e-b9d6-fe379e0d4afe', 'User', 'user@example.com', '$2b$10$r0hVmNcbr56nGWhyPH71EOG0CrS/ay.kv6WEAA7BSwfvJYUti5tJW', NULL, 'user', '2025-06-17 09:30:09.915', '2025-06-17 09:30:09.915', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE IF NOT EXISTS `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('07733c6a-4804-4268-87fa-8ea455b59d35', '3677751d013543e80a1f440949956e6bcb514d11266f129a39c1d6c7f0adb9bc', '2025-06-17 08:07:38.282', '20250615074546_add_other_status', NULL, NULL, '2025-06-17 08:07:38.275', 1),
('1fe9611b-bea7-4960-be23-c3d35d4b7c71', 'cdd30fe50eaf034264480df540afd78c89c3e423ae0bfa8a502606e67959adfc', '2025-06-17 08:07:38.245', '20250512071620_add_column_image_in_products', NULL, NULL, '2025-06-17 08:07:38.237', 1),
('2fff3041-e863-42e9-bc5e-0ee010125538', 'a7996ea692f47c605e66a2a88d8741faf69dd4f7920dccdc97d2907aadd67d78', '2025-06-17 08:07:38.274', '20250524131130_add_transaction_code', NULL, NULL, '2025-06-17 08:07:38.259', 1),
('ad2fb276-6bc4-4d98-8168-c33ac88997ef', '7f7953c99d8413a9ad7d883d9afe09da7c705282b6e41b3d388e5b8f3c46c0aa', '2025-06-17 08:07:38.258', '20250522130329_drop_table_password_reset_token', NULL, NULL, '2025-06-17 08:07:38.245', 1),
('e7c3034d-dca3-4464-9fc7-f66afdb1d526', '868a0be1b10371955bac3810a4359b8d9e69066436a2f2dc96c304d72caad501', '2025-06-17 08:07:38.236', '20250512065100_init_db', NULL, NULL, '2025-06-17 08:07:38.073', 1);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `carts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `transaction_details`
--
ALTER TABLE `transaction_details`
  ADD CONSTRAINT `transaction_details_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `transaction_details_transaction_id_fkey` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
