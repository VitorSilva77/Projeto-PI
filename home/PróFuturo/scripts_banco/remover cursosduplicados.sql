DELIMITER //

CREATE PROCEDURE RemoverNomesDuplicadosDimCurso()
BEGIN
    -- Deleta todos os registros duplicados na tabela Dim_Curso,
    -- mantendo o registro com o menor id_curso para cada título duplicado
    
    DELETE c1 FROM Dim_Curso c1
    INNER JOIN Dim_Curso c2 
        ON c1.titulo = c2.titulo AND c1.id_curso > c2.id_curso;
END //

DELIMITER ;

call RemoverNomesDuplicadosDimCurso()