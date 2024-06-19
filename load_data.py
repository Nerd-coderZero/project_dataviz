import json
from app import db, Insight, app
from datetime import datetime

def load_data():
    try:
        with open('jsondata.json', 'r', encoding='utf-8') as file:
            data = json.load(file)
            print("JSON data loaded successfully!")
            return data
    except FileNotFoundError:
        print("Error: JSON file 'jsondata.json' not found!")
        exit(1)
    except Exception as e:
        print("Error reading JSON data:", e)
        exit(1)

def parse_int(value):
    try:
        return int(value)
    except (ValueError, TypeError):
        return None

def parse_date(date_str):
    if date_str:
        try:
            return datetime.strptime(date_str, "%B, %d %Y %H:%M:%S")
        except ValueError:
            print(f"Warning: Invalid date format: {date_str}")
    return None

if __name__ == '__main__':
    data = load_data()

    with app.app_context():
        db.drop_all()
        db.create_all()
        print("Database checked or created if needed")

        if data is None:
            print("Error: No data to insert")
            exit(1)
        else:
            for item in data:
                try:
                    added_date = parse_date(item.get('added'))
                    published_date = parse_date(item.get('published'))

                    insight_data = {
                        'intensity': parse_int(item.get('intensity')),
                        'likelihood': parse_int(item.get('likelihood')),
                        'relevance': parse_int(item.get('relevance')),
                        'end_year': parse_int(item.get('end_year', '')),
                        'start_year': parse_int(item.get('start_year', '')),
                        'country': item.get('country', '') or None,
                        'topic': item.get('topic', '') or None,
                        'region': item.get('region', '') or None,
                        'pestle': item.get('pestle', '') or None,
                        'sector': item.get('sector', '') or None,
                        'source': item.get('source', '') or None,
                        'impact': item.get('impact', '') or None,
                        'insight': item.get('insight', '') or None,
                        'title': item.get('title', '') or None,
                        'added': added_date,
                        'published': published_date,
                        'url': item.get('url', '') or None
                    }

                    insight = Insight(**{k: v for k, v in insight_data.items() if hasattr(Insight, k)})
                    db.session.add(insight)
                except Exception as e:
                    print(f"Error inserting data for item {item}: {e}")

        db.session.commit()
        print("Data inserted successfully!")
