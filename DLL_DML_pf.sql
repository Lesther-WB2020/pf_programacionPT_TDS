-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema supermarket2021
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `supermarket2021` ;

-- -----------------------------------------------------
-- Schema supermarket2021
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `supermarket2021` DEFAULT CHARACTER SET utf8 ;
USE `supermarket2021` ;

-- -----------------------------------------------------
-- Table `supermarket2021`.`securitycodes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `supermarket2021`.`securitycodes` ;

CREATE TABLE IF NOT EXISTS `supermarket2021`.`securitycodes` (
  `idCode` INT NOT NULL AUTO_INCREMENT,
  `securityCode` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCode`),
  UNIQUE INDEX `securityCode_UNIQUE` (`securityCode` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `supermarket2021`.`categorys`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `supermarket2021`.`categorys` ;

CREATE TABLE IF NOT EXISTS `supermarket2021`.`categorys` (
  `idCategory` INT NOT NULL AUTO_INCREMENT,
  `name_` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idCategory`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `supermarket2021`.`products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `supermarket2021`.`products` ;

CREATE TABLE IF NOT EXISTS `supermarket2021`.`products` (
  `idProduct` INT NOT NULL AUTO_INCREMENT,
  `name_` VARCHAR(255) NOT NULL,
  `description_` VARCHAR(255) NOT NULL,
  `stocks` INT NOT NULL,
  `idCategory` INT NOT NULL,
  PRIMARY KEY (`idProduct`),
  UNIQUE INDEX `name__UNIQUE` (`name_` ASC) VISIBLE,
  INDEX `fk_products_categorys_idx` (`idCategory` ASC) VISIBLE,
  CONSTRAINT `fk_products_categorys`
    FOREIGN KEY (`idCategory`)
    REFERENCES `supermarket2021`.`categorys` (`idCategory`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `supermarket2021`.`workers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `supermarket2021`.`workers` ;

CREATE TABLE IF NOT EXISTS `supermarket2021`.`workers` (
  `idWorker` INT NOT NULL AUTO_INCREMENT,
  `user_` VARCHAR(25) NOT NULL,
  `pass` VARCHAR(255) NOT NULL,
  `dateRegister` DATETIME NOT NULL,
  `name_` VARCHAR(50) NOT NULL,
  `firstSurname` VARCHAR(50) NOT NULL,
  `secondSurname` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idWorker`),
  UNIQUE INDEX `user__UNIQUE` (`user_` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `supermarket2021`.`providers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `supermarket2021`.`providers` ;

CREATE TABLE IF NOT EXISTS `supermarket2021`.`providers` (
  `idProvider` INT NOT NULL AUTO_INCREMENT,
  `name_` VARCHAR(255) NOT NULL,
  `direction` VARCHAR(255) NOT NULL,
  `contactNumber` VARCHAR(25) NOT NULL,
  `mail` VARCHAR(50) NOT NULL,
  `webSite` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idProvider`),
  UNIQUE INDEX `name__UNIQUE` (`name_` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `supermarket2021`.`products_has_providers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `supermarket2021`.`products_has_providers` ;

CREATE TABLE IF NOT EXISTS `supermarket2021`.`products_has_providers` (
  `products_idProduct` INT NOT NULL,
  `providers_idProvider` INT NOT NULL,
  PRIMARY KEY (`products_idProduct`, `providers_idProvider`),
  INDEX `fk_products_has_providers_providers1_idx` (`providers_idProvider` ASC) VISIBLE,
  INDEX `fk_products_has_providers_products1_idx` (`products_idProduct` ASC) VISIBLE,
  CONSTRAINT `fk_products_has_providers_products1`
    FOREIGN KEY (`products_idProduct`)
    REFERENCES `supermarket2021`.`products` (`idProduct`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_has_providers_providers1`
    FOREIGN KEY (`providers_idProvider`)
    REFERENCES `supermarket2021`.`providers` (`idProvider`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `supermarket2021`.`orders`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `supermarket2021`.`orders` ;

CREATE TABLE IF NOT EXISTS `supermarket2021`.`orders` (
  `idOrder` INT NOT NULL AUTO_INCREMENT,
  `idProduct` INT NOT NULL,
  `idProvider` INT NOT NULL,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`idOrder`),
  UNIQUE INDEX `idProvider_UNIQUE` (`idProvider` ASC) VISIBLE,
  INDEX `fk_orders_products1_idx` (`idProduct` ASC) VISIBLE,
  CONSTRAINT `fk_orders_products1`
    FOREIGN KEY (`idProduct`)
    REFERENCES `supermarket2021`.`products` (`idProduct`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

 
  -- -----------------------------------------------------
-- INSERTS FOR TESTS -> `supermarket2021`.`securitycodes`
-- -----------------------------------------------------
INSERT INTO `supermarket2021`.`securitycodes`(securityCode) VALUES('admin2021');

  -- -----------------------------------------------------
-- INSERTS FOR TESTS -> `supermarket2021`.`categorys`
-- -------------------------------------------------------
INSERT INTO `supermarket2021`.`categorys`(name_) VALUES
('DESPENSA'),('FRUTAS Y VERDURAS'),('BEBIDAS'),
('COMIDA PREPARADA'),('LIMPIEZA'),('CARNES'),
('HIGIENE PERSONAL'),('MASCOTAS'),('LICORES');

  -- -----------------------------------------------------
-- INSERTS FOR TESTS -> `supermarket2021`.`products`
-- -------------------------------------------------------
INSERT INTO `supermarket2021`.`products`(name_, description_, stocks, idCategory) 
VALUES
('ATÚN','Atún en lata con verduras y condimentos',35,1),
('MANZANAS','Manzana roja, peso 252 gramos',40,2),
('COCACOLA','Lata de cocacola, 355 mililitros',60,3),
('SOPA INSTANTÁNEA','Sopa instantánea en vaso de pollo',25,4),
('RINSO','Bolsa grande de RINSO familiar',32,5),
('LONGANIZA','Bandeja de longaniza, 5 unidades',14,6),
('PASTA DENTAL','Pasta extra grande/familiar 150 ml',19,7),
('SPRAY ANTIPULGAS','Spary antipulgas para perros y gatos',14,8),
('JACK DANIELS','Jack Daniels, botella 750 ml 40% alcohol',20,9);

  -- -----------------------------------------------------
-- INSERTS FOR TESTS -> `supermarket2021`.`providers`
-- -------------------------------------------------------
INSERT INTO `supermarket2021`.`providers`(name_,direction,contactNumber,mail,webSite) VALUES
('Ocean Naturals S.A.','Direccion de Ocean Naturals','8246582465','ocean@naturals.com','wwww.oceannaturals.com'),
('La Sirena S.A.','Direccion de La Sirena','46824682','contacto@lasirena.com','wwww.lasirena.com'),
('Chicken Sea S.A.','Direccion de Chicken Sea','64649198','chickens@sea.com','wwww.chickenSea.com');

INSERT INTO `supermarket2021`.`providers`(name_,direction,contactNumber,mail,webSite) VALUES
('Las Manzanas S.A.','Direccion de Las Manzanas S.A.','4682465','las@manzanas.com','wwww.manzanassa.com'),
('Frutas Corp.','Direccion de Frutas Corp','4682465','frutas@corp.com','wwww.frutascorp.com'),
('Finca Las Manzanas','Direccion de Finca Las Manzanas','284658','finca@lasmanzanas.com','wwww.finzalasmanzanas.com');

INSERT INTO `supermarket2021`.`providers`(name_,direction,contactNumber,mail,webSite) VALUES
('CocaCola S.A.','Direccion de CocaCola S.A.','28468249','contacto@cocacola.com','wwww.cocacola.com'),
('Embotelladora Guatemala','Direccion de Embotelladora Gt','468972498','contacto@embot.com','wwww.embot.com'),
('Distribuidora La Bendición','Direccion de Dis. La Bendicion','38794685','contacto@dislaben.com','wwww.distlabendicion.com');

INSERT INTO `supermarket2021`.`providers`(name_,direction,contactNumber,mail,webSite) VALUES
('LackyMen S.A.','Direccion de LackyMen S.A.','7982186','contacto@lackymen.com','wwww.lackymen.com'),
('Maruchan S.A.','Direccion de Maruchan S.A.','468972498','contacto@maruchan.com','wwww.maruchan.com'),
('Soup Easy S.A.','Direccion de Soup Easy S.A.','38794685','contacto@easy.com','wwww.soupeasy.com');

INSERT INTO `supermarket2021`.`providers`(name_,direction,contactNumber,mail,webSite) VALUES
('XEDEX S.A.','Direccion de Xedex S.A.','7982186','contacto@xedex.com','wwww.xedex.com'),
('Drive S.A.','Direccion de Drive S.A.','468972498','contacto@drivesa.com','wwww.drivesa.com'),
('Omo S.A.','Direccion de Omo S.A.','38794685','contacto@omosa.com','wwww.omosa.com');

INSERT INTO `supermarket2021`.`providers`(name_,direction,contactNumber,mail,webSite) VALUES
('Fud S.A.','Direccion de Fud S.A.','7982186','contacto@fud.com','wwww.fud.com'),
('Toledo S.A.','Direccion de Toledo S.A.','468972498','contacto@toledo.com','wwww.toledo.com'),
('Premier S.A.','Direccion de Premier S.A.','38794685','contacto@premier.com','wwww.premier.com');

INSERT INTO `supermarket2021`.`providers`(name_,direction,contactNumber,mail,webSite) VALUES
('Colgate Guatemala S.A.','Direccion de Colgate Guatemala S.A.','7982186','contacto@colgate.com.gt','wwww.colgate.com'),
('Dentalados S.A.','Direccion de Dentalados S.A.','468972498','contacto@dentalados.com','wwww.dentalados.com'),
('Muela Feliz S.A.','Direccion de Muela Feliz S.A.','38794685','contacto@muelafeliz.com','wwww.muelafeliz.com');

INSERT INTO `supermarket2021`.`providers`(name_,direction,contactNumber,mail,webSite) VALUES
('Frontline S.A.','Direccion de Frontline S.A.','4682344','contacto@frontline.com','wwww.frontline.com'),
('CachoHappy S.A.','Direccion de CachoHappy S.A.','2846568','contacto@cachohappy.com','wwww.cachohappy.com'),
('Shooter S.A.','Direccion de Shooter S.A.','4683882','contacto@shooter.com','wwww.shooter.com');

INSERT INTO `supermarket2021`.`providers`(name_,direction,contactNumber,mail,webSite) VALUES
('JackDaniels Tenesse','Direccion de JackDaniels S.A.','468246','contacto@jackdaniels.com','wwww.jackdaniels.com'),
('Licoreria El Durmiente','Direccion de licoreria El Durmiente','468248','contacto@eldurmiente.com','wwww.eldurmiente.com'),
('Wiskey Premium S.A.','Direccion de Wiskey Premium S.A.','4683882','contacto@wpremium.com','wwww.wpremium.com');











