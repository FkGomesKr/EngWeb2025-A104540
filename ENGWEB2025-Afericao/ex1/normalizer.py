import json
import ast

# Input and output paths
input_file = 'datasetAfericao.json'
output_file = 'datasetAfericao_fixed.json'

# Fields to convert to number
numeric_fields = ['rating', 'isbn', 'pages', 'numRatings', 'likedPercent', 'bbeScore', 'bbeVotes', 'price']

# Fields to convert from string to list
list_fields = ['genres', 'characters', 'awards', 'ratingsByStars', 'setting']

def to_number(value):
    if value == '' or value is None:
        return 0
    try:
        return float(value) if '.' in str(value) else int(value)
    except ValueError:
        return 0

def to_list(value):
    if isinstance(value, list):
        return value
    try:
        return ast.literal_eval(value)
    except (ValueError, SyntaxError):
        return []

# Load the JSON data
with open(input_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Process each book
for book in data:
    # Rename bookId to _id
    if 'bookId' in book:
        book['_id'] = book.pop('bookId')

    # Convert numeric fields
    for key in numeric_fields:
        book[key] = to_number(book.get(key, ''))

    # Convert list fields
    for key in list_fields:
        book[key] = to_list(book.get(key, []))

# Save the fixed data
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

print(f"✅ Data cleaned, transformed, and saved to {output_file}")
