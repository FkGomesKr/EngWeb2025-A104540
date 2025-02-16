import json

with open('dataset_reparacoes.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

organized_json = {
    "reparacoes": data['reparacoes'],
    "carros": {},
    "intervencoes": {}
}

def add_intervention(intervention):
    code = intervention['codigo']
    if code not in organized_json["intervencoes"]:
        organized_json["intervencoes"][code] = {
            "nome": intervention['nome'],
            "descricao": intervention['descricao']
        }

for repair in data['reparacoes']:
    marca = repair['viatura']['marca']
    modelo = repair['viatura']['modelo']

    if (marca, modelo) not in organized_json["carros"]:
        organized_json["carros"][(marca, modelo)] = 1
    else:
        organized_json["carros"][(marca, modelo)] += 1
    
    for intervention in repair['intervencoes']:
        add_intervention(intervention)

organized_json["carros"] = [
    {"marca": marca, "modelo": modelo, "nr_carros": count}
    for (marca, modelo), count in organized_json["carros"].items()
]

organized_json["intervencoes"] = [
    {"codigo": k, **v} for k, v in organized_json["intervencoes"].items()
]

organized_json["carros"].sort(key=lambda x: (x['marca'], x['modelo']))

organized_json["intervencoes"].sort(key=lambda x: x['codigo'])

# Write the new JSON structure to serverDB.json
with open('serverDB.json', 'w', encoding='utf-8') as file:
    json.dump(organized_json, file, indent=4, ensure_ascii=False)

print("serverDB.json has been created/updated successfully.")