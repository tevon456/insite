#!/usr/bin/env python3
"""Garnet Linux agent.

Description:

    Uses Python2 to be compatible with most Linux systems

    This script:
        1) Retrieves a variety of system information
        2) Posts the data using HTTP to a server listed
           in the configuration file

"""
# Standard libraries
import sys

# Garnet libraries
try:
    from garnet.agents import agent as Agent
except:
    print('You need to set your PYTHONPATH to include the Garnet library')
    sys.exit(2)
from garnet.utils import configuration
from garnet.utils import log
from garnet.agents.flask.remote_linux_passive import APP


class PollingAgent(object):
    """Garnet agent that gathers data.

    Args:
        None

    Returns:
        None

    Functions:
        __init__:
        populate:
        post:
    """

    def __init__(self):
        """Method initializing the class.

        Args:
            None

        Returns:
            None

        """
        # Initialize key variables
        self.agent_name = 'remote_linux_passive'

        # Get configuration
        self.config = configuration.ConfigAgent(self.agent_name)

    def name(self):
        """Return agent name.

        Args:
            None

        Returns:
            value: Name of agent

        """
        # Return
        value = self.agent_name
        return value

    def query(self):
        """Query all remote devices for data.

        Args:
            None

        Returns:
            None

        """
        # Initialize key variables
        if self.config.agent_port():
            data = self.config.agent_port()
            port = int(data)
        else:
            port = 5001

        # Do stuff
        log_message = (
            'Starting agent %s on localhost port %s.'
            '') % (self.agent_name, port)
        log.log2info(1088, log_message)
        APP.run(host='0.0.0.0', port=port)


def main():
    """Start the agent.

    Args:
        None

    Returns:
        None

    """
    # Get configuration
    cli = Agent.AgentCLI()
    poller = PollingAgent()

    # Do control
    cli.control(poller)


if __name__ == "__main__":
    main()
