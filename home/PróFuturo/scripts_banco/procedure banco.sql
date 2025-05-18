DELIMITER //

CREATE PROCEDURE Atualizar_DataWarehouse()
BEGIN
    -- Atualizar Dim_Curso
    INSERT INTO Dim_Curso (id_curso, titulo, carga_horaria, preco)
    SELECT id_curso, titulo, carga_horaria, preco FROM projetopi.Cursos
    ON DUPLICATE KEY UPDATE titulo=VALUES(titulo), carga_horaria=VALUES(carga_horaria), preco=VALUES(preco);

    -- Atualizar Dim_Aluno
    INSERT INTO Dim_Aluno (id_aluno, nome, email, tipo)
    SELECT id_usuario, nome, email, tipo FROM projetopi.Usuarios WHERE tipo = 'Aluno'
    ON DUPLICATE KEY UPDATE nome=VALUES(nome), email=VALUES(email), tipo=VALUES(tipo);

    -- Atualizar Dim_Instrutor
    INSERT INTO Dim_Instrutor (id_instrutor, nome, email)
    SELECT id_usuario, nome, email FROM projetopi.Usuarios WHERE tipo = 'Instrutor'
    ON DUPLICATE KEY UPDATE nome=VALUES(nome), email=VALUES(email);

    -- Atualizar Dim_Tempo
    INSERT INTO Dim_Tempo (data, ano, mes, dia)
    SELECT DISTINCT DATE(data_matricula), YEAR(data_matricula), MONTH(data_matricula), DAY(data_matricula)
    FROM projetopi.Matriculas
    ON DUPLICATE KEY UPDATE ano=VALUES(ano), mes=VALUES(mes), dia=VALUES(dia);

    -- Atualizar Dim_Pagamento
    INSERT INTO Dim_Pagamento (id_pagamento, metodo, status)
    SELECT id_pagamento, metodo_pagamento, status FROM projetopi.Pagamentos
    ON DUPLICATE KEY UPDATE metodo=VALUES(metodo), status=VALUES(status);

    -- Atualizar Fato_Matriculas
    INSERT INTO Fato_Matriculas (id_matricula, id_aluno, id_curso, id_instrutor, id_tempo, id_pagamento, valor, status)
    SELECT m.id_matricula, 
           m.id_usuario AS id_aluno, 
           c.id_curso, 
           c.id_instrutor, 
           t.id_tempo, 
           p.id_pagamento, 
           p.valor, 
           m.status
    FROM projetopi.Matriculas m
    JOIN projetopi.Cursos c ON m.id_curso = c.id_curso
    JOIN projetopi.Usuarios u ON m.id_usuario = u.id_usuario
    LEFT JOIN projetopi.Pagamentos p ON m.id_usuario = p.id_usuario AND m.id_curso = p.id_curso
    JOIN datawarehousepi.Dim_Tempo t ON DATE(m.data_matricula) = t.data
    ON DUPLICATE KEY UPDATE id_aluno=VALUES(id_aluno), id_curso=VALUES(id_curso), id_instrutor=VALUES(id_instrutor), id_tempo=VALUES(id_tempo), id_pagamento=VALUES(id_pagamento), valor=VALUES(valor), status=VALUES(status);
END //

DELIMITER ;
