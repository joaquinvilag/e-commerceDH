-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-08-2020 a las 00:08:29
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `todopalcostado`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart`
--

CREATE TABLE `cart` (
  `idcart` int(11) NOT NULL,
  `FK_user_id` int(11) NOT NULL,
  `state` varchar(45) NOT NULL,
  `purchase_date` datetime NOT NULL,
  `total` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cart`
--

INSERT INTO `cart` (`idcart`, `FK_user_id`, `state`, `purchase_date`, `total`) VALUES
(1, 2, 'close', '0000-00-00 00:00:00', '605'),
(2, 2, 'close', '0000-00-00 00:00:00', '1016'),
(4, 2, 'close', '0000-00-00 00:00:00', '3993'),
(5, 2, 'open', '0000-00-00 00:00:00', '0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart_products`
--

CREATE TABLE `cart_products` (
  `idcart_products` int(11) NOT NULL,
  `FK_cart_id` int(11) NOT NULL,
  `FK_products_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cart_products`
--

INSERT INTO `cart_products` (`idcart_products`, `FK_cart_id`, `FK_products_id`, `quantity`, `price`) VALUES
(1, 1, 5, 1, '500'),
(10, 2, 7, 1, '840'),
(32, 4, 1, 4, '1800'),
(34, 4, 5, 3, '1500'),
(36, 5, 4, 2, '2200');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category`
--

CREATE TABLE `category` (
  `idcategory` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `category`
--

INSERT INTO `category` (`idcategory`, `name`) VALUES
(1, 'Frutos Secos'),
(2, 'Frutas Desecadas'),
(3, 'Hamburguesas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritos`
--

CREATE TABLE `favoritos` (
  `idfav` int(11) NOT NULL,
  `FK_iduser` int(11) NOT NULL,
  `FK_idproduct` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `favoritos`
--

INSERT INTO `favoritos` (`idfav`, `FK_iduser`, `FK_idproduct`) VALUES
(3, 2, 2),
(4, 2, 5),
(19, 2, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `images`
--

CREATE TABLE `images` (
  `idimages` int(11) NOT NULL,
  `FK_product_id` int(11) NOT NULL,
  `url` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `idproducts` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `EAN` int(11) DEFAULT NULL,
  `FK_category_id` int(11) DEFAULT NULL,
  `descr` text NOT NULL,
  `images` varchar(1000) NOT NULL,
  `price` decimal(30,0) DEFAULT 100,
  `detail` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`idproducts`, `name`, `EAN`, `FK_category_id`, `descr`, `images`, `price`, `detail`) VALUES
(1, 'Almendras ', NULL, 1, 'Almendras 100% Naturales y de la mejor calidad', 'almendras.jpg', '450', 'mas-vendido'),
(2, 'Avellanas Mendocinas', NULL, 1, 'Avellanas Mendocinas 100% naturales y la mas alta calidad', 'avellanas.jpg', '890', 'oferta'),
(3, 'Castañas de Caju', NULL, 1, 'Castañas de Caju 100% naturales y de la mas alta calidad', 'castañasdecaju.jpg', '750', 'oferta'),
(4, 'Ciruelas desecadas', NULL, 2, 'Ciruelas desecadas 100% naturales, y de alta calidad.', 'ciruelasdesecadas.jpg', '1100', 'mas-vendido'),
(5, 'Hamburguesas de garvanzo', NULL, 3, 'Hamburguesas 100% naturales, y de alta calidad.', 'Hamburguesasgarbanzos.jpeg', '500', 'mas-vendido'),
(6, 'Hamburguesas de lenteja', NULL, 3, 'Hamburguesas de lenteja 100% naturales, y de alta calidad.', 'hamburguesaslentejas.jpeg', '450', 'oferta'),
(7, 'Hamburguesas de soja', NULL, 3, 'Hamburguesas de lenteja 100% naturales, y de alta calidad.', 'hamburguesassoja.jpg', '840', 'oferta'),
(8, 'Nueces', NULL, 1, 'Nueces 100% naturales, y de alta calidad.', 'nueces.jpg', '600', 'oferta'),
(9, 'Pasas de uva', NULL, 2, 'Pasas de uva 100% naturales, y de alta calidad.', 'pasasdeuva.jpg', '900', 'oferta'),
(10, 'Tomates secos ', NULL, 2, 'Tomates secos 100% naturales, y de alta calidad.', 'tomatesecos.jpg', '400', 'oferta');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `iduser` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `address` varchar(45) DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `birth_date` date DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `avatar` varchar(45) DEFAULT NULL,
  `admin` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`iduser`, `name`, `last_name`, `address`, `phone`, `email`, `birth_date`, `password`, `avatar`, `admin`) VALUES
(1, 'Admin', 'Admin', NULL, NULL, 'admin@gmail.com', NULL, '$2b$10$R4FfVRYN.Ynop/se4REvdeZq7N47cHCJ9p1SsR.X64r7LWcIGK0U2', 'avataravatar1595971613259.jpg', 1),
(2, 'Client', 'Client', NULL, NULL, 'client@gmail.com', NULL, '$2b$10$kc2WaakUvn.YznrSa8CgneyibrqytLCZA5i2Z1zWGjn0iIfITPyHq', 'avataravatar1595971775991.jpg', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`idcart`),
  ADD KEY `FK_user_id` (`FK_user_id`);

--
-- Indices de la tabla `cart_products`
--
ALTER TABLE `cart_products`
  ADD PRIMARY KEY (`idcart_products`),
  ADD KEY `FK_cart_id` (`FK_cart_id`),
  ADD KEY `FK_products_id` (`FK_products_id`);

--
-- Indices de la tabla `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`idcategory`);

--
-- Indices de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD PRIMARY KEY (`idfav`),
  ADD KEY `FK_iduser` (`FK_iduser`),
  ADD KEY `FK_idproduct` (`FK_idproduct`);

--
-- Indices de la tabla `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`idimages`),
  ADD KEY `FK_product_id` (`FK_product_id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`idproducts`),
  ADD KEY `FK_category_id` (`FK_category_id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`iduser`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cart`
--
ALTER TABLE `cart`
  MODIFY `idcart` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `cart_products`
--
ALTER TABLE `cart_products`
  MODIFY `idcart_products` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `category`
--
ALTER TABLE `category`
  MODIFY `idcategory` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  MODIFY `idfav` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `images`
--
ALTER TABLE `images`
  MODIFY `idimages` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `idproducts` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `iduser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`FK_user_id`) REFERENCES `user` (`iduser`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `cart_products`
--
ALTER TABLE `cart_products`
  ADD CONSTRAINT `cart_products_ibfk_1` FOREIGN KEY (`FK_cart_id`) REFERENCES `cart` (`idcart`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_products_ibfk_2` FOREIGN KEY (`FK_products_id`) REFERENCES `products` (`idproducts`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD CONSTRAINT `favoritos_ibfk_1` FOREIGN KEY (`FK_iduser`) REFERENCES `user` (`iduser`),
  ADD CONSTRAINT `favoritos_ibfk_2` FOREIGN KEY (`FK_idproduct`) REFERENCES `products` (`idproducts`);

--
-- Filtros para la tabla `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`FK_product_id`) REFERENCES `products` (`idproducts`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`FK_category_id`) REFERENCES `category` (`idcategory`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
