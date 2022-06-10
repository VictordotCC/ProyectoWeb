# 0. ejecutamos pip install flask flask-sqlalchemy flask-migrate flask-cors
# 1. Crear modelos
# 2. importamos las librerias de flask
# 8. comando para iniciar mi app flask: flask db init
# 9. comando para migrar mis modelos:   flask db migrate
# 10. comando para crear nuestros modelos como tablas : flask db upgrade
# 11. comando para iniciar la app flask: flask run

#from crypt import methods
from flask import Flask, request, jsonify, render_template
from flask_migrate import Migrate
from models import db, Usuario
from flask_cors import CORS, cross_origin

# 3. instanciamos la app
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.url_map.strict_slashes = False
app.config['DEBUG'] = True
app.config['ENV'] = 'development'
app.config['SQLALCHEMY_TRACK_MODIFICATION'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'

db.init_app(app)

Migrate(app, db)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/carrito')
def carrito():
    return render_template('carrito.html')



# 4. Configurar los puertos nuestra app 
if __name__ == '__main__':
    app.run(port=5000, debug=True)