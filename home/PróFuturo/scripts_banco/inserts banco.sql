INSERT INTO Usuarios (nome, email, senha, tipo) VALUES
('Alexandre Custódio', 'alexandre.custodio@email.com', 'ale@instrutor', 'Instrutor'),
('Maria Souza', 'maria@email.com', 'senha123', 'Aluno'),
('Administrador', 'adm@email.com', 'admin@123', 'Administrador'),
('Ana Oliveira', 'ana@email.com', 'senha123', 'Aluno');

-- Inserção de dados na tabela Cursos
INSERT INTO Cursos (titulo, descricao, preco, carga_horaria, id_instrutor) VALUES
('Auxiliar Administrativo', 'Curso prático que prepara para rotinas de escritório, com foco em organização, atendimento e suporte administrativo.', 550.00, 160, 1),
('Secretariado Básico', 'Curso introdutório que ensina técnicas de organização, atendimento, redação e apoio à rotina administrativa de escritórios.', 480.00, 1200, 1),
('Vendas no Varejo', 'Técnicas para gerenciar projetos ágeis.', 600.00, 80, 1),
('Aprenda a ser Youtuber', 'Técnicas para gerenciar projetos ágeis.', 750.00, 80, 1);


-- Inserção de dados na tabela Matrículas
INSERT INTO Matriculas (id_usuario, id_curso, status) VALUES
(2, 1, 'Ativo'),
(4, 2, 'Concluído');

-- Inserção de dados na tabela Pagamentos
INSERT INTO Pagamentos (id_usuario, id_curso, valor, metodo_pagamento, status) VALUES
(2, 1, 199.90, 'Cartão de Crédito', 'Aprovado'),
(4, 2, 149.90, 'Pix', 'Aprovado');
