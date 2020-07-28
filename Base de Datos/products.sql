-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-07-2020 a las 00:35:56
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

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`idproducts`),
  ADD KEY `FK_category_id` (`FK_category_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `idproducts` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`FK_category_id`) REFERENCES `category` (`idcategory`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
