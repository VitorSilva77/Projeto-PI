CREATE DATABASE datawarehousepi;
USE datawarehousepi;

-- Tabela Dim_Curso
CREATE TABLE Dim_Curso (
    id_curso INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    carga_horaria INT NOT NULL,
    preco DECIMAL(10,2) NOT NULL
);

-- Tabela Dim_Aluno
CREATE TABLE Dim_Aluno (
    id_aluno INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    tipo ENUM('Aluno', 'Instrutor', 'Administrador') NOT NULL
);

-- Tabela Dim_Instrutor
CREATE TABLE Dim_Instrutor (
    id_instrutor INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

-- Tabela Dim_Tempo
CREATE TABLE Dim_Tempo (
    id_tempo INT AUTO_INCREMENT PRIMARY KEY,
    data DATE NOT NULL,
    ano INT NOT NULL,
    mes INT NOT NULL,
    dia INT NOT NULL
);

-- Tabela Dim_Pagamento
CREATE TABLE Dim_Pagamento (
    id_pagamento INT AUTO_INCREMENT PRIMARY KEY,
    metodo ENUM('Cartão de Crédito', 'Boleto', 'Pix', 'PayPal') NOT NULL,
    status ENUM('Aprovado', 'Pendente', 'Recusado') NOT NULL
);

-- Tabela Fato_Matriculas
CREATE TABLE Fato_Matriculas (
    id_matricula INT AUTO_INCREMENT PRIMARY KEY,
    id_aluno INT,
    id_curso INT,
    id_instrutor INT,
    id_tempo INT,
    id_pagamento INT,
    valor DECIMAL(10,2) NOT NULL,
    status ENUM('Ativo', 'Concluído', 'Cancelado') NOT NULL,
    FOREIGN KEY (id_aluno) REFERENCES Dim_Aluno(id_aluno),
    FOREIGN KEY (id_curso) REFERENCES Dim_Curso(id_curso),
    FOREIGN KEY (id_instrutor) REFERENCES Dim_Instrutor(id_instrutor),
    FOREIGN KEY (id_tempo) REFERENCES Dim_Tempo(id_tempo),
    FOREIGN KEY (id_pagamento) REFERENCES Dim_Pagamento(id_pagamento)
);
