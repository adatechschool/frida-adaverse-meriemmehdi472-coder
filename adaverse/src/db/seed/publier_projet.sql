UPDATE prj_etudiant
SET date_pub = CURRENT_DATE
WHERE id = $1