-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 17, 2024 at 07:08 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e_supper_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `code` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `code`, `name`) VALUES
(1, 'SNK', 'Snacks'),
(2, 'GRY', 'Groceries'),
(3, 'VEG', 'Vegetables'),
(4, 'FRT', 'Fruits'),
(5, 'MET', 'Meat'),
(6, 'BSEL', 'Best Selling'),
(7, 'ALL', 'All');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `imageUrl` varchar(1500) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `weight` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category_id`, `imageUrl`, `name`, `price`, `weight`) VALUES
(41, 5, 'https://t3.ftcdn.net/jpg/01/45/46/10/360_F_145461027_UESAGvh8W9V8tKkvCwxgrR9Ij1072QqN.jpg', 'Beef', 1250, '1kg'),
(42, 5, 'https://www.greenag.com.au/assets/full/GAC2002.jpg?20230516121631', 'Chicken', 1000, '1kg'),
(43, 5, 'https://www.markwellfoods.co.nz/wp-content/uploads/2022/03/raw-vannamei.jpg', 'Prawns', 1500, '1kg'),
(44, 5, 'https://www.thedailymeal.com/img/gallery/what-is-mutton-and-how-should-you-cook-it-upgrade/l-intro-1697055279.jpg', 'Mutton', 1700, '1kg'),
(45, 5, 'https://img.freepik.com/premium-photo/raw-bacon-strips-pork-meat-gray-background-top-view-copy-space_89816-38954.jpg', 'Bacon', 1600, '1kg'),
(46, 5, 'https://t4.ftcdn.net/jpg/03/59/86/55/360_F_359865519_H5OPBm9bqpu8UWvr2OGf6afr1O8TB0nJ.jpg', 'Pork', 1400, '1kg'),
(47, 5, 'https://img.freepik.com/free-photo/classic-boiled-meat-pork-sausages-chopping-board-with-pepper-basil-cherry-tomatoes-snack-kid-raw-barbecue-sausages-stone-board-black-surface-top-view-copy-space_1150-44647.jpg', 'Sausage', 1500, '1kg'),
(48, 5, 'https://png.pngtree.com/thumb_back/fh260/background/20210911/pngtree-catering-seafood-red-fish-image_862578.jpg', 'Fish', 500, '1kg'),
(49, 4, 'https://st2.depositphotos.com/4431055/11856/i/450/depositphotos_118569224-stock-photo-red-apple-isolated.jpg', 'Apple', 1500, '1kg'),
(50, 4, 'https://www.shutterstock.com/image-photo/orange-citrus-isolated-on-white-600nw-2393447879.jpg', 'Orange', 1000, '1kg'),
(51, 4, 'https://png.pngtree.com/thumb_back/fh260/background/20230512/pngtree-bunch-of-bananas-in-a-stack-image_2506501.jpg', 'Banana', 500, '1kg'),
(52, 4, 'https://images.pexels.com/photos/708777/pexels-photo-708777.jpeg', 'Grapes', 1000, '1kg'),
(53, 4, 'https://images.hindustantimes.com/img/2021/06/25/1600x900/9a156550-c367-11eb-9d53-2d5cae187b44_1624624374058.jpg', 'Mango', 500, '1kg'),
(54, 4, 'https://static.libertyprim.com/files/familles/ananas-large.jpg?1569271716', 'Pineapple', 500, '1kg'),
(55, 4, 'https://grocimart.com/files/images/guava-amrood_15999113130.jpg', 'Guava', 700, '1kg'),
(56, 4, 'https://static.toiimg.com/photo/63285044.cms', 'Wood apple', 500, '1kg'),
(57, 3, 'https://www.shutterstock.com/image-photo/closeup-beetroot-beet-root-cut-600nw-2274041511.jpg', 'Beetroot', 500, '1kg'),
(58, 3, 'https://grocimart.com/files/images/carrot-gajjar_15970578310.jpg', 'Carrot', 700, '1kg'),
(59, 3, 'https://c1.peakpx.com/wallpaper/483/186/444/onion-allium-cepa-red-onion-sliced-wallpaper-preview.jpg', 'Onion', 200, '1kg'),
(60, 3, 'https://images.immediate.co.uk/production/volatile/sites/30/2020/02/90199742-7a579fe-scaled.jpg?quality=90&resize=556,505', 'Spring Onion', 200, '1kg'),
(61, 3, 'https://extension.umn.edu/sites/extension.umn.edu/files/harvested-garlic.jpg', 'Garlic', 200, '1kg'),
(62, 3, 'https://www.melissas.com/cdn/shop/products/image-of-leeks-vegetables-14764479938604_400x400.jpg?v=1617048609', 'Leek', 300, '1kg'),
(63, 3, 'https://www.familygarden.in/image/cache/catalog/Vegetables/potato-01-1000x1000.png', 'Potato', 500, '1kg'),
(64, 3, 'https://grocimart.com/files/images/brocolli_15976698771.jpg', 'Broccoli', 600, '1kg'),
(65, 2, 'https://www.shutterstock.com/image-photo/top-view-red-chilly-powder-600nw-2113542206.jpg', 'Chili Powder', 250, '100g'),
(66, 2, 'https://www.ceylone.lk/wp-content/uploads/2021/11/imageTemplate_0001_mix-curry-powder.png', 'Curry Powder', 250, '100g'),
(67, 2, 'https://t3.ftcdn.net/jpg/03/08/52/26/360_F_308522640_B21OKnCQ7lOmQqrPvdYISnWZqRDmwBdy.jpg', 'Yellow Curry Powder', 250, '100g'),
(68, 2, 'https://ceyloncharm.shop/cdn/shop/products/black-pepper-powder-1000x1000.webp?v=1706179964&width=1000', 'Pepper Powder', 350, '100g'),
(69, 2, 'https://vege.lk/wp-content/uploads/2023/07/Chilli-pieces-powder.jpg', 'Chili Pieces', 250, '100g'),
(70, 2, 'https://thegutstuff.com/wp-content/uploads/2020/06/website-graphics-rectangle-10.png', 'White Sugar', 150, '100g'),
(71, 2, 'https://www.pngkey.com/png/detail/436-4364947_himalayan-crystal-white-salt-pure-himalayan-white-salt.png', 'Salt', 250, '100g'),
(72, 2, 'https://www.shutterstock.com/image-photo/raw-basmati-rice-on-black-600nw-2229779829.jpg', 'Basmati Rice', 450, '100g'),
(73, 1, 'https://www.cocoaloco.com/cdn/shop/products/Individual-bars-for-website-milk_1445x.png?v=1666097906', 'Milk Chocolate', 350, '100g'),
(74, 1, 'https://fantasiechocolate.com/wp-content/uploads/2020/10/french-Dark-55-website-two-use-600x600-1.jpg', 'Dark Chocolate', 250, '100g'),
(75, 1, 'https://digitalcontent.api.tesco.com/v2/media/ghs/84bda2b0-7815-4704-886f-d45eb315db85/74b1f7cf-af75-46f8-9a84-1a1812f71306_943108514.jpeg?h=960&w=960', 'Chocolate Biscuits', 350, '100g'),
(76, 1, 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/easy_choc_biscuits-59ca9be.jpg?quality=90&resize=440,400', 'Chocolate Cookies', 350, '100g'),
(77, 1, 'https://m.media-amazon.com/images/I/71k56xpypeL.jpg', 'NatureVit Peanuts', 250, '100g'),
(78, 1, 'https://frrunch.lk/wp-content/uploads/2023/06/Cassava-Chips-Hot-Spicy-100g.png', 'Rancrisp Cassava Chips', 280, '100g'),
(79, 1, 'https://m.media-amazon.com/images/I/71XT4Srz72L.jpg', 'NatureVit Potato Chips', 450, '100g'),
(80, 1, 'https://roycechocolate.com/cdn/shop/products/WebsiteTemplateproductpage-BarWhitecontent_5b606408-99a1-41f7-ac1d-8ee7f34f7530-Updated.jpg?v=1674198779&amp;width=1200', 'white chocolate', 450, '100g');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `name`, `password`, `user_type`) VALUES
(1, 'john@example.com', 'John Doe', '123', 'regular'),
(2, 'jane@example.com', 'Jane Smith', '456', 'admin'),
(3, 'bob@example.com', 'Bob Johnson', '123', 'regular');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
