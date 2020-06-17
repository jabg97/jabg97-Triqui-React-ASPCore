CREATE DATABASE TriquiAPI
GO
USE TriquiAPI
GO 

CREATE TABLE Tipos_identificacion
(
     ID int primary key identity,
     Codigo nvarchar(2),
     Nombre nvarchar(50)
)
GO
CREATE TABLE Usuarios
(
     ID int primary key identity,
     Nombre nvarchar(50),
     Apellido nvarchar(50),
     Email nvarchar(100),
     Contrasena nvarchar(255),
     Tipo_identificacionID int FOREIGN KEY REFERENCES Tipos_identificacion(ID),
     Numero_identificacion int,
     Cant_ganados int,
     Cant_perdidos int
)
GO
INSERT INTO Tipos_identificacion VALUES ('CC', 'Cedula Ciudadania')
INSERT INTO Tipos_identificacion VALUES ('TI', 'Tarjeta Identidad')
INSERT INTO Tipos_identificacion VALUES ('RC', 'Registro Civil')
INSERT INTO Usuarios VALUES ('Jaiver', 'Balanta', 'balantajaiver@gmail.com', '123456789', 1, 123456789, 0, 0)
GO
/*
Install-Package Microsoft.EntityFrameworkCore
Install-Package Microsoft.EntityFrameworkCore.SqlServer
Install-Package Microsoft.EntityFrameworkCore.Design
Install-Package Microsoft.EntityFrameworkCore.Tools
Scaffold-DbContext "Server=(localdb)\MSSQLLocalDB;Database=TriquiAPI;Integrated Security=True" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models
*/