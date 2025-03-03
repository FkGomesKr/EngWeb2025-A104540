import csv
import json

csv_file_path = "alunos.csv"
json_file_path = "alunos.json"

with open(csv_file_path, mode="r", encoding="utf-8") as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=";")
    
    alunos = []
    for row in csv_reader:
        if len(row) == 3:
            aluno = {
                "id": row[0],
                "name": row[1],
                "gitlink": row[2]
            }
            alunos.append(aluno)

with open(json_file_path, mode="w", encoding="utf-8") as json_file:
    json.dump({"alunos": alunos}, json_file, indent=4, ensure_ascii=False)

print(f"JSON file saved as: {json_file_path}")
