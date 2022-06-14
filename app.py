# 0. ejecutamos pip install flask flask-sqlalchemy flask-migrate flask-cors
# 1. Crear modelos
# 2. importamos las librerias de flask
# 8. comando para iniciar mi app flask: flask db init
# 9. comando para migrar mis modelos:   flask db migrate
# 10. comando para crear nuestros modelos como tablas : flask db upgrade
# 11. comando para iniciar la app flask: flask run

#from crypt import methods
from flask import Flask, redirect, request, jsonify, render_template, url_for
from flask_migrate import Migrate
from models import db, Usuario, Comuna, Region
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
    return render_template('index.html', status=200)

@app.route('/carrito')
def carrito():
    return render_template('carrito.html')

@app.route('/login', methods=['POST'])
def login():
    user = request.form['email']
    password = request.form['password']
    user = Usuario.query.filter_by(correo=user).first()
    if user is not None and user.password == password:
        return render_template('index.html', 
        status=202, username=user.primer_nombre, userid = user.id_usuario)
    else:
        return render_template('registrado.html', status=400)

@app.route('/registrar', methods=['POST'])
def registro():
    data = request.values
    user = Usuario()

    user.primer_nombre = data.get('nombre')
    user.apellido_paterno = data.get('apellido')
    rut_con_dv = data.get('rut')
    #Trata el rut para quitar el dv
    rut = rut_con_dv.split('-')[0]
    user.rut = rut.replace('.', '')
    user.dv = rut_con_dv.split('-')[1]
    
    #sigue
    user.correo = data.get('email')
    user.direccion = data.get('direccion')
    comuna = data.get('Nombre_comuna')
    region = data.get('Nombre_region')

    #tratamiento comuna
    comuna_id = Comuna.query.filter_by(nombre=comuna).first()
    if comuna_id is None:
        comuna_sql = Comuna()
        comuna_sql.nombre = comuna
        region_id = Region.query.filter_by(nombre=region).first()
        if region_id is None:
            region_sql = Region()
            region_sql.nombre = region
            region_sql.save()
            region_id = region_sql.id_region
        else:
            region_id = region_id.id_region
        comuna_sql.region_id = region_id
        comuna_sql.save()
        comuna_id = comuna_sql.id_comuna
    else:
        comuna_id = comuna_id.id_comuna
    user.comuna_id = comuna_id
    
    #sigue
    user.fono = data.get('fono')
    user.password = data.get('password')
    user.estado = True

    #Maneja sucripcion
    if data.get('suscripcion') == 'on':
        user.suscrito = True
    else:
        user.suscrito = False

    user.tipo = 'Cliente'

    if (Usuario.query.filter_by(rut=user.rut).first() is None
        and Usuario.query.filter_by(correo=user.correo).first() is None):
        user.save()
        return render_template('registrado.html', status=201)
    return render_template('registrado.html', status=501)

@app.route('/logout')
def logout():
    return render_template('index.html', status=200)

@app.route('/administrador')
def admin():
    return render_template('administrador.html')

@app.route('/usuario')
def usuario():
    return render_template('usuario.html')

@app.route('/registrar', methods=['GET'])
def reg():
    return redirect(url_for('index'))

@app.route('/perfil/<id>')
def perfil(id):
    user = Usuario.query.get(id)
    tipo = user.tipo
    if tipo == 'Cliente':
        return render_template('usuario.html', user=user)
    elif tipo == 'Admin':
        return render_template('administrador.html', user=user)
    


#METODOS DEL PROFESOR


# Ruta para consultar todos los Usuarios
@app.route('/usuarios', methods=['GET'])
def getUsuarios():
    user = Usuario.query.all()
    user = list(map(lambda x: x.serialize(), user))
    return jsonify(user),200


# Borrar usuario
@app.route('/usuarios/<id>', methods=['DELETE'])
def deleteUsuario(id):
    user = Usuario.query.get(id)
    Usuario.delete(user)
    return jsonify(user.serialize()),200


# Modificar Usuario
@app.route('/usuarios/<id>', methods=['PUT'])
def updateUsuario(id):
    user = Usuario.query.get(id)

    user.primer_nombre = request.json.get('primer_nombre')
    user.segundo_nombre = request.json.get('segundo_nombre')
    user.apellido_paterno = request.json.get('apellido_paterno')
    user.apellido_materno = request.json.get('apellido_materno')
    user.direccion = request.json.get('direccion')

    Usuario.save(user)

    return jsonify(user.serialize()),200


# 4. Configurar los puertos nuestra app 
if __name__ == '__main__':
    app.run(port=5000, debug=True)