USE StoreDB
GO


SELECT *
FROM Products
WHERE Id = 1
GO


-- UPDATE
UPDATE Products
SET Price = 190
WHERE Id = 19
GO
SELECT Id, Price, Name AS 'Product Name'
FROM Products
WHERE Id BETWEEN 15 AND 19
GO

-- Delete
DELETE
FROM Products
WHERE Id BETWEEN 35 AND 44
GO

SELECT *
FROM BasketItems
GO

SELECT *
FROM Baskets
GO

SELECT Id, Name, Price
FROM Products
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



-- Delete 
Delete 
FROM BasketItems
GO

DELETE
FROM Baskets
GO


USE StoreDB
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


DELETE Addresses
WHERE Id = 3
GO
