#!/usr/bin/env python3
"""Infoset ORM classes.

Manages connection pooling among other things.

"""

# Main python libraries
import sys
from pathlib import Path
import os

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

# Infoset libraries
try:
    from garnet.utils import log
except:
    print('You need to set your PYTHONPATH to include the garnet library')
    sys.exit(2)
import garnet.utils


def main():
    """Process agent data.

    Args:
        None

    Returns:
        None

    """
    # Install required PIP packages
    print('Installing required pip3 packages')
    pip3 = garnet.utils.general.search_file('pip3')
    if pip3 is None:
        log_message = ('Cannot find python "pip3". Please install.')
        log.log2die(1052, log_message)

    utils_directory = garnet.utils.__path__[0]
    requirements_file = ('%s/requirements.txt') % (
        Path(utils_directory).parents[1])
    script_name = (
        'pip3 install --user --upgrade --requirement %s'
        '') % (requirements_file)
    os.system(script_name)
    # garnet.utils.general.run_script(script_name)
    
    print('Installing required node modules')
    npm = garnet.utils.general.search_file('npm')
    if npm is None:
        log_message = ('Cannot find "npm". Please install.')
        log.log2die(1052, log_message)

    npm_script_name = 'npm install'
    os.system(npm_script_name)
    # garnet.utils.general.run_script(npm_script_name)
if __name__ == '__main__':
    main()
