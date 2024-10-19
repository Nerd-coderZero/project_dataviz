from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy import func

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

@app.route('/filter_values')
def get_filter_values():
    filter_options = {}
    filter_columns = ['end_year', 'topic', 'sector', 'region', 'pestle', 'source', 'country', 'city']
    for column in filter_columns:
        unique_values = db.session.query(getattr(Insight, column)).distinct().all()
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
            values = value.split(',')
            if attr == 'end_year':
                query = query.filter(getattr(Insight, attr).in_([int(v) for v in values if v.isdigit()]))
            else:
                query = query.filter(getattr(Insight, attr).in_(values))
    
    try:
        insights = query.all()
        insights_data = [insight.to_dict() for insight in insights]
        return jsonify(insights_data)
    except Exception as e:
        app.logger.error(f"Error fetching data: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

@app.route('/summary')
def summary():
    try:
        total_insights = Insight.query.count()
        avg_intensity = db.session.query(func.avg(Insight.intensity)).scalar()
        avg_likelihood = db.session.query(func.avg(Insight.likelihood)).scalar()
        avg_relevance = db.session.query(func.avg(Insight.relevance)).scalar()
        top_sectors = db.session.query(Insight.sector, func.count(Insight.id).label('count')) \
            .group_by(Insight.sector) \
            .order_by(func.count(Insight.id).desc()) \
            .limit(5) \
            .all()
        top_sectors = [{'sector': sector, 'count': count} for sector, count in top_sectors]

        return jsonify({
            'total_insights': total_insights,
            'avg_intensity': round(avg_intensity, 2) if avg_intensity else None,
            'avg_likelihood': round(avg_likelihood, 2) if avg_likelihood else None,
            'avg_relevance': round(avg_relevance, 2) if avg_relevance else None,
            'top_sectors': top_sectors
        })
    except Exception as e:
        app.logger.error(f"Error fetching summary data: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

if __name__ == '__main__':
    app.run(debug=True)