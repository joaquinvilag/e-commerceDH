-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-07-2020 a las 08:49:24
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
(1, 'Sauce - Chili', 2147483647, 2, 'Implant of single ventricular (extracorporeal) external heart assist system', 'http://dummyimage.com/250x250.jpg/5fa2dd/ffffff', '100', 'oferta'),
(2, 'Huck White Towels', 2147483647, 2, 'Delayed opening of other enterostomy', 'http://dummyimage.com/250x250.jpg/cc0000/ffffff', '100', 'oferta'),
(3, 'Cake - Mini Cheesecake', 2147483647, 1, 'Other biopsy of ovary', 'http://dummyimage.com/250x250.jpg/cc0000/ffffff', '100', 'oferta'),
(4, 'Oil - Truffle, White', 2147483647, 1, 'Electroencephalogram', 'http://dummyimage.com/250x250.jpg/5fa2dd/ffffff', '100', 'oferta'),
(5, 'Cheese Cheddar Processed', 2147483647, 3, 'Combined alcohol and drug detoxification', 'http://dummyimage.com/250x250.jpg/dddddd/000000', '100', 'oferta'),
(6, 'Bread - Hot Dog Buns', 2147483647, 2, 'Insertion of bone growth stimulator, radius and ulna', 'http://dummyimage.com/250x250.jpg/5fa2dd/ffffff', '100', 'oferta'),
(7, 'Fish - Bones', 2147483647, 2, 'Lysis of cortical adhesions', 'http://dummyimage.com/250x250.jpg/dddddd/000000', '100', 'oferta'),
(8, 'Oil - Coconut', 2147483647, 3, 'Other diagnostic procedures on heart and pericardium', 'http://dummyimage.com/250x250.jpg/ff4444/ffffff', '100', 'oferta'),
(9, 'Halibut - Steaks', 2147483647, 2, 'Intracranial ventricular shunt or anastomosis', 'http://dummyimage.com/250x250.jpg/ff4444/ffffff', '100', 'oferta'),
(10, 'Wine - Barossa Valley Estate', 2147483647, 1, 'Injection of locally-acting therapeutic substance into trachea', 'http://dummyimage.com/250x250.jpg/dddddd/000000', '100', 'oferta');

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
(1, 'Tori', 'Greger', '978 Buell Way', 332, 'tgreger0@miitbeian.gov.cn', '0000-00-00', '3gonG0shi', 'https://robohash.org/perferendislaudantiumest', 0),
(2, 'Edin', 'Coleson', '4 Oneill Pass', NULL, 'ecoleson1@wiley.com', '0000-00-00', 'zBLk2IO3', 'https://robohash.org/velitetalias.png?size=50', 0),
(3, 'Steffen', 'Fearenside', '81290 Declaration Center', NULL, 'sfearenside2@alibaba.com', '0000-00-00', 'BoA7EHc9fsbE', 'https://robohash.org/nonrerumsimilique.png?si', 0),
(4, 'Gerri', 'Canada', '8937 Portage Road', 673, 'gcanada3@tinypic.com', '0000-00-00', 'OtSuVTLbRz', 'https://robohash.org/estautautem.bmp?size=50x', 0),
(5, 'Janeta', 'McGuffie', '6 Roxbury Place', NULL, 'jmcguffie4@vimeo.com', '0000-00-00', 'EWRYxvyKjKR', 'https://robohash.org/laudantiumvelitquo.jpg?s', 0),
(6, 'edgar', 'vargas', NULL, NULL, 'edgar@gmail.com', NULL, '$2b$10$47Nl2HFxX89MXTQw.dGpwu1334A5YNMBu89Dkx0n5n7DHTUC/cWQK', 'avataravatar1594007554873.jpg', 1),
(7, 'gustavo', 'petrov', NULL, NULL, 'guri@gmail.com', NULL, '$2b$10$4lYRWMl8hkFomoib3blQlODnFcfnq7T/amupt3X2G0Vn53q4bC2WS', 'avataravatar1594007952617.jpeg', 1);

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
  MODIFY `idcart` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cart_products`
--
ALTER TABLE `cart_products`
  MODIFY `idcart_products` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `category`
--
ALTER TABLE `category`
  MODIFY `idcategory` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `images`
--
ALTER TABLE `images`
  MODIFY `idimages` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `idproducts` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `iduser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
