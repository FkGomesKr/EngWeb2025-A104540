import json

with open('dataset_reparacoes.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

organized_json = {
    "reparacoes": [],
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
    organized_json["reparacoes"].append({
        "data": repair['data'],
        "nif": repair['nif'],
        "nome": repair['nome'],
        "marca": repair['viatura']['marca'],
        "modelo": repair['viatura']['modelo'],
        "nr_intervencoes": repair['nr_intervencoes']
    })
    
    marca_modelo = f"{repair['viatura']['marca']} {repair['viatura']['modelo']}"
    if marca_modelo not in organized_json["carros"]:
        organized_json["carros"][marca_modelo] = 1
    else:
        organized_json["carros"][marca_modelo] += 1
    
    for intervention in repair['intervencoes']:
        add_intervention(intervention)

organized_json["carros"] = [{"marca_modelo": k, "nr_carros": v} for k, v in organized_json["carros"].items()]
organized_json["intervencoes"] = [{"codigo": k, **v} for k, v in organized_json["intervencoes"].items()]

organized_json["carros"].sort(key=lambda x: x['marca_modelo'])
organized_json["intervencoes"].sort(key=lambda x: x['codigo'])

# Write the new JSON structure to serverDB.json
with open('serverDB.json', 'w', encoding='utf-8') as file:
    json.dump(organized_json, file, indent=4, ensure_ascii=False)

print("serverDB.json has been created/updated successfully.")