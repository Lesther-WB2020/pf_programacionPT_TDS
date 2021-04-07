-- XITUMUL MANUEL, LESTHER CARLOS HORALDO
-- 20000742
-- TÉCNICO EN DESARROLLO DE SOFTWARE
-- PROYECTO FINAL -> PROGRAMACIÓN AVANZADA

-- -----------------------------------------------------
-- Schema stocktaking
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `stocktaking` ;

-- -----------------------------------------------------
-- Schema stocktaking
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `stocktaking` DEFAULT CHARACTER SET utf8 ;
USE `stocktaking` ;

-- -----------------------------------------------------
-- Table `stocktaking`.`categorys`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stocktaking`.`categorys` ;

CREATE TABLE IF NOT EXISTS `stocktaking`.`categorys` (
  `idCategory` INT NOT NULL AUTO_INCREMENT,
  `name_` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idCategory`),
  UNIQUE INDEX `name_UNIQUE` (`name_` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stocktaking`.`products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stocktaking`.`products` ;

CREATE TABLE IF NOT EXISTS `stocktaking`.`products` (
  `idProduct` INT NOT NULL AUTO_INCREMENT,
  `name_` VARCHAR(255) NOT NULL,
  `description_` VARCHAR(255) NOT NULL,
  `stocks` INT NOT NULL,
  `idCategory` INT NOT NULL,
  PRIMARY KEY (`idProduct`),
  INDEX `fk_product_category1_idx` (`idCategory` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE2` (`name_` ASC) VISIBLE,
  CONSTRAINT `fk_product_category1`
    FOREIGN KEY (`idCategory`)
    REFERENCES `stocktaking`.`categorys` (`idCategory`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stocktaking`.`providers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stocktaking`.`providers` ;

CREATE TABLE IF NOT EXISTS `stocktaking`.`providers` (
  `idProvider` INT NOT NULL AUTO_INCREMENT,
  `name_` VARCHAR(255) NOT NULL,
  `direction` VARCHAR(255) NOT NULL,
  `contactNumber` VARCHAR(25) NOT NULL,
  `mail` VARCHAR(50) NOT NULL,
  `webSite` VARCHAR(50) NOT NULL,
  `idProduct` INT NOT NULL,
  PRIMARY KEY (`idProvider`),
  UNIQUE INDEX `name_UNIQUE3` (`name_` ASC) VISIBLE,
  INDEX `fk_prividers_products1_idx` (`idProduct` ASC) VISIBLE,
  CONSTRAINT `fk_prividers_products1`
    FOREIGN KEY (`idProduct`)
    REFERENCES `stocktaking`.`products` (`idProduct`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stocktaking`.`workers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stocktaking`.`workers` ;

CREATE TABLE IF NOT EXISTS `stocktaking`.`workers` (
  `idWorker` INT NOT NULL AUTO_INCREMENT,
  `user_` VARCHAR(25) NOT NULL,
  `pass` VARCHAR(255) NOT NULL,
  `dateRegister` DATETIME NOT NULL,
  `name_` VARCHAR(50) NOT NULL,
  `firstSurname` VARCHAR(50) NOT NULL,
  `secondSurname` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idWorker`),
  UNIQUE INDEX `user_UNIQUE` (`user_` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stocktaking`.`orders`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stocktaking`.`orders` ;

CREATE TABLE `stocktaking`.`orders` (
  `idOrder` INT NOT NULL AUTO_INCREMENT,
  `idProduct` INT NOT NULL,
  `idProvider` INT NOT NULL,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`idOrder`),
  INDEX `idProduct_idx` (`idProduct` ASC) VISIBLE,
  INDEX `idProvider_idx` (`idProvider` ASC) VISIBLE,
  CONSTRAINT `idProduct`
    FOREIGN KEY (`idProduct`)
    REFERENCES `stocktaking`.`products` (`idProduct`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idProvider`
    FOREIGN KEY (`idProvider`)
    REFERENCES `stocktaking`.`providers` (`idProvider`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- -----------------------------------------------------
-- Table `stocktaking`.`securitycodes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stocktaking`.`securitycodes` ;

CREATE TABLE `stocktaking`.`securitycodes` (
  `idCode` INT NOT NULL AUTO_INCREMENT,
  `securityCode` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCode`),
  UNIQUE INDEX `securityCode_UNIQUE` (`securityCode` ASC) VISIBLE);
  
  -- -----------------------------------------------------
-- INSERTS FOR TESTS -> `stocktaking`.`securitycodes`
-- -----------------------------------------------------
INSERT INTO `stocktaking`.`securitycodes`(securityCode) VALUES('admin2021');

  -- -----------------------------------------------------
-- INSERTS FOR TESTS -> `stocktaking`.`categorys`
-- -------------------------------------------------------
INSERT INTO `stocktaking`.`categorys`(name_) VALUES
('DESPENSA'),('FRUTAS Y VERDURAS'),('BEBIDAS'),
('COMIDA PREPARADA'),('LIMPIEZA'),('CARNES'),
('HIGIENE PERSONAL'),('MASCOTAS'),('LICORES');

  -- -----------------------------------------------------
-- INSERTS FOR TESTS -> `stocktaking`.`products`
-- -------------------------------------------------------
INSERT INTO `stocktaking`.`products`(name_, description_, stocks, idCategory) 
VALUES
('ATÚN','Atún en lata con verduras y condimentos',35,1),
('MANZANAS','Manzana roja, peso 252 gramos',40,2),
('COCACOLA','Lata de cocacola, 355 mililitros',60,3),
('SOPA INSTANTANEA','Sopa instantánea en vaso de pollo',25,4),
('RINZO','Bolsa grande de rinzo familiar',32,5),
('LONGANIZA','Bandeja de longaniza, 5 unidades',14,6),
('PASTA COLGATE','Pasta extra grande/familiar Colgate',19,7),
('SPRAY ANTIPULGAS','Spary antipulgas para perros y gatos',14,8),
('JACK DANIELS','Jack Daniels, botella 750 ml 40% alcohol',20,9);

  -- -----------------------------------------------------
-- INSERTS FOR TESTS -> `stocktaking`.`providers`
-- -------------------------------------------------------
INSERT INTO `stocktaking`.`providers`(name_,direction,contactNumber,mail,webSite,idProduct) VALUES
('Ocean Naturals S.A.','Direccion de Ocean Naturals','8246582465','ocean@naturals.com','wwww.oceannaturals.com',1),
('La Sirena S.A.','Direccion de La Sirena','46824682','contacto@lasirena.com','wwww.lasirena.com',1),
('Chicken Sea S.A.','Direccion de Chicken Sea','64649198','chickens@sea.com','wwww.chickenSea.com',1);


