#!/usr/bin/env python3
"""Infoset ORM classes.

Manages connection pooling among other things.

"""

# Main python libraries
import sys
from pathlib import Path

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
    garnet.utils.general.run_script(script_name)


if __name__ == '__main__':
    main()
