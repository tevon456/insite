#! /usr/bin/env python3
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
