from flask import Flask, render_template, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:hyijkb@localhost/dashboard_db' 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Insight(db.Model):
    __tablename__ = 'insights'
    id = db.Column(db.Integer, primary_key=True)
    intensity = db.Column(db.Integer)
    likelihood = db.Column(db.Integer)
    relevance = db.Column(db.Integer)
    end_year = db.Column(db.Integer)
    start_year = db.Column(db.Integer)
    sector = db.Column(db.String)
    topic = db.Column(db.String)
    insight = db.Column(db.String)
    url = db.Column(db.String)
    region = db.Column(db.String)
    impact = db.Column(db.String)
    added = db.Column(db.String)
    published = db.Column(db.String)
    country = db.Column(db.String)
    pestle = db.Column(db.String)
    source = db.Column(db.String)
    title = db.Column(db.String)
    city = db.Column(db.String)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/filter_values')
def get_filter_values():
    filter_options = {}
    filter_columns = ['end_year', 'topic', 'sector', 'region', 'pestle', 'source', 'country', 'city']
    for column in filter_columns:
        unique_values = db.session.query(getattr(Insight, column)).distinct().all()
        # Filter out None values and convert to list (modified)
        filter_options[column] = [str(value[0]) for value in unique_values if value[0] is not None and str(value[0]).strip() != '']
    return jsonify(filter_options)

@app.route('/data')
def data():
    filters = {
        'end_year': request.args.get('end_year'),
        'topic': request.args.get('topic'),
        'sector': request.args.get('sector'),
        'region': request.args.get('region'),
        'pestle': request.args.get('pestle'),
        'source': request.args.get('source'),
        'country': request.args.get('country'),
        'city': request.args.get('city')
    }

    query = Insight.query
    for attr, value in filters.items():
        if value:
            # Handle end_year as integer
            if attr == 'end_year':
                value = int(value)
            # Case-insensitive filtering for strings
            elif isinstance(value, str):
                query = query.filter(db.func.lower(getattr(Insight, attr)) == value.lower())
            else:
                query = query.filter(getattr(Insight, attr) == value)
    try:        
        insights = query.all()
        insights_data = [insight.to_dict() for insight in insights]
        return jsonify(insights_data)
    except Exception as e:
        # Log the error for debugging
        app.logger.error(f"Error fetching data: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

if __name__ == '__main__':
    app.run(debug=True)
