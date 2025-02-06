from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allows frontend to communicate with backend

# SQLite database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///passwords.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Database Model
class Password(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    username = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)

# Create tables
with app.app_context():
    db.create_all()

# Hello World route
@app.route('/hello', methods=['GET'])
def hello_world():
    return "Hello, World!"

# Create (Add password)
@app.route('/passwords', methods=['POST'])
def add_password():
    data = request.json
    new_password = Password(title=data['title'], username=data['username'], password=data['password'])
    db.session.add(new_password)
    db.session.commit()
    return jsonify({'message': 'Password added successfully'}), 201

# Read (Get all passwords)
@app.route('/passwords', methods=['GET'])
def get_passwords():
    passwords = Password.query.all()
    return jsonify([{'id': p.id, 'title': p.title, 'username': p.username, 'password': p.password} for p in passwords])

# Update (Edit password)
@app.route('/passwords/<int:id>', methods=['PUT'])
def update_password(id):
    data = request.json
    password = Password.query.get(id)
    if not password:
        return jsonify({'error': 'Password not found'}), 404
    
    password.title = data['title']
    password.username = data['username']
    password.password = data['password']
    db.session.commit()
    return jsonify({'message': 'Password updated successfully'})

# Delete (Remove password)
@app.route('/passwords/<int:id>', methods=['DELETE'])
def delete_password(id):
    password = Password.query.get(id)
    if not password:
        return jsonify({'error': 'Password not found'}), 404

    db.session.delete(password)
    db.session.commit()
    return jsonify({'message': 'Password deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)
