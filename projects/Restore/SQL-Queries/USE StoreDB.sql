USE frostlabeldb
GO

SELECT *
FROM Products
WHERE Id = 1
GO

-- UPDATE
-- UPDATE Products
-- SET Price = 190
-- WHERE Id = 19
GO

SELECT Id, Price, Name AS 'Product Name'
FROM Products
WHERE Id BETWEEN 15 AND 19
GO

-- Delete
-- DELETE
-- FROM Products
-- WHERE Id BETWEEN 35 AND 44
-- GO

SELECT *
FROM BasketItems
GO

SELECT *
FROM Baskets
GO

SELECT Id, Name, Price
FROM Products
WHERE Price > 100
ORDER BY Name
GO

SELECT
  prod.Id AS 'Id',
  prod.Name AS 'Product Name',
  prod.Price,
  SUM(bas.Quantity) AS Quantity,
  SUM(prod.Price * bas.Quantity) AS Total
FROM Products AS prod
  INNER JOIN BasketItems AS bas
  ON prod.Id = bas.ProductId
GROUP BY
  prod.Id,
  prod.Name,
  prod.Price
GO

-- Total
SELECT
  COUNT(prod.Id) AS 'Total Items',
  SUM(prod.Price * bas.Quantity) AS Total
FROM Products AS prod
  INNER JOIN BasketItems AS bas
  ON prod.Id = bas.ProductId
GO


--Delete 
-- Delete 
-- FROM BasketItems
-- GO

--  DELETE
-- FROM Baskets
-- GO


USE frostlabeldb
GO


SELECT AddressId
FROM dbo.AspNetUsers
WHERE UserName = 'john.smith@restore.com'
GO

SELECT *
FROM Addresses
WHERE Id = 4 
GO

SELECT *
FROM AspNetUsers
WHERE AddressId BETWEEN 1 AND 4
GO


SELECT Id, UserName, AddressId
FROM AspNetUsers
WHERE AddressId = 1
GO

-- DELETE Addresses
-- WHERE Id = 4
-- GO



UPDATE Products
SET Price = 144.99
WHERE Id = 18
GO


SELECT Id, Name, Price, QuantityInStock
FROM Products
WHERE Type = 'boots'
ORDER BY Id, Price DESC
GO

USE frostlabeldb
GO

SELECT *
FROM Orders
GO

SELECT *
FROM OrderItems
GO





-- Server=TareqPC\\MSSQLSRV;

SELECT
  name
  AS Username,
  type_desc AS AccountType,
  is_disabled AS IsDisabled
FROM sys.server_principals
WHERE type IN
('S', 'U', 'G'); 
GO

SELECT SUSER_SNAME() AS CurrentUser
GO



USE frostlabeldb
GO


-- Set active user 
-- EXECUTE AS LOGIN = 'sa'
-- GO
-- ALTER LOGIN sa WITH PASSWORD = 'Pa$$w0rd@'
-- GO
-- ALTER LOGIN sa ENABLE
-- GO

SELECT
  SUSER_NAME() AS [Current Login],
  CURRENT_USER AS [Current DB User]
GO

--"MSSQLConnection": "Server=TareqPC\\MSSQLSRV; Database=frostlabeldb; User Id=sa;Password=Pa$$w0rd@; Trusted_Connection=True; TrustServerCertificate=True;"

