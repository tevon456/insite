from flask import Flask

# Initializes the Flask Object
APP = Flask(__name__)

from garnet.routes import routes
