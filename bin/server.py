#! /usr/bin/env python3
import os
import sys

# Try to create a working PYTHONPATH
script_directory = os.path.dirname(os.path.realpath(__file__))
root_directory = os.path.abspath(os.path.join(script_directory, os.pardir))
if script_directory.endswith('/garnet/bin') is True:
    sys.path.append(root_directory)
else:
    print(
        'This script is not installed in the "garnet/bin" directory. '
        'Please fix.')
    sys.exit(2)

"""Garnet Flask server."""
from garnet.utils import configuration
from www import APP

def main():
    """Get Flask server running.

    Args:
        None

    Returns:
        None

    """
    # Start
    config = configuration.Config()
    bind_port = config.bind_port()
    listen_address = config.listen_address()
    APP.run(debug=True, host=listen_address, threaded=True, port=bind_port)

if __name__ == '__main__':
    main()
