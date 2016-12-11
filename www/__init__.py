#! /usr/bin/env python3
"""Garnet Python 3 snmp inventory system.

This package reports and tabulates the status of network connected devices
using snmp queries.

Example:
    TODO add example of using infoset here

"""
# PIP3 imports
from flask import Flask, url_for

# Initializes the Flask Object
APP = Flask(__name__)

# Function to easily find your assests
APP.jinja_env.globals['static'] = (
    lambda filename: url_for('static', filename=filename)
)

# This has to be imported last or else the Flask server fails
from www import views
