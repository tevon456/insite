#!/usr/bin/env python3
"""Garnet Agent class.

Description:

    This script:
        1) Processes a variety of information from agents
        2) Posts the data using HTTP to a server listed
           in the configuration file

"""
# Standard libraries
import textwrap
import os
import sys
import json
import time
from collections import defaultdict
from multiprocessing import Pool
from random import random
import argparse
from copy import deepcopy

# pip3 libraries
import requests

# Garnet libraries
from garnet.utils.daemon import Daemon
from garnet.utils import daemon
from garnet.utils import log
from garnet.utils import general
from garnet.utils import configuration
from garnet.metadata import language

class CLI(object):
    """Class that manages the agent CLI.

    Args:
        None

    Returns:
        None

    """

    def __init__(self):
        """Method initializing the class.

        Args:
            None

        Returns:
            None

        """
        # Initialize key variables
        self.parser = None

    def process(self, usage=None, additional_help=None):
        """Return all the CLI options.

        Args:
            None

        Returns:
            args: Namespace() containing all of our CLI arguments as objects
                - filename: Path to the configuration file

        """
        # Header for the help menu of the application
        parser = argparse.ArgumentParser(
            prog='garnet-cli',
            description=additional_help,
            usage=usage,
            formatter_class=argparse.RawTextHelpFormatter)

        parser._optionals.title = "Options"
        parser._positionals.title = "Subcommands"

        # Subparser for subcommands
        subparsers = parser.add_subparsers(dest='action')

        # Parse build parameters
        build = subparsers.add_parser(
            'build', help='Build and installs garnet dependencies')
        build.add_argument(
            '--post', action='store_true', help='Post test data.')
        build.add_argument(
            '--get', action='store_true', help='Get test data.')

        # Parse serve parameters
        serve = subparsers.add_parser(
            'serve', help='Starts local garnet server')
        serve.add_argument('--post', action='store_true', help='Post test data.')
        serve.add_argument('--get', action='store_true', help='Get test data.')

        # Parse logs parameters
        logs = subparsers.add_parser(
            'logs', help='View latest garnet log file')
        logs.add_argument('--post', action='store_true', help='Post test data.')
        logs.add_argument('--get', action='store_true', help='Get test data.')

        # Parse test parameters
        test = subparsers.add_parser(
            'test', help='Tests connection to infoset-ng')
        test.add_argument('--post', action='store_true', help='Post test data.')
        test.add_argument('--get', action='store_true', help='Get test data.')

        # CLI argument for stopping
        parser.add_argument(
            '--force',
            default=False,
            action='store_true',
            help=textwrap.fill(
                'Stops or restarts the agent daemon ungracefully when '
                'used with --stop or --restart.', width=80)
        )

        # Get the parser value
        self.parser = parser

    def control(self):
        """Start the agent.

        Args:
            poller: PollingAgent object

        Returns:
            None

        """
        usage = '''garnet-cli <subcommand> [options]'''
        description = ''' Visualizing system metrics with infoset-ng as a datastore '''
        # Get the CLI arguments
        self.process(usage=usage, additional_help=description)
        parser = self.parser
        args = parser.parse_args()

        # Process each option
        if args.action == 'build':
            self._build_cli()
            sys.exit(0)
            if args.post is True:
                api_test.infoset_post()
                sys.exit(0)
            if args.get is True:
                api_test.infoset_get()
                sys.exit(0)
        elif args.action == 'serve':
            self._serve_cli()
            if args.post is True:
                api_test.mdl_post()
                sys.exit(0)
            if args.get is True:
                api_test.mdl_get()
                sys.exit(0)
        elif args.action == 'logs':
            if args.post is True:
                api_test.mdl_post()
                sys.exit(0)
            if args.get is True:
                api_test.mdl_get()
                sys.exit(0)
        elif args.action == 'test':
            if args.post is True:
                api_test.mdl_post()
                sys.exit(0)
            if args.get is True:
                api_test.mdl_get()
                sys.exit(0)
        else:
            parser.print_help()
            sys.exit(0)
        sys.exit(2)

    def _build_cli(self):
        os.system("python3 ./bin/setup.py")

    def _serve_cli(self):
        os.system("python3 ./bin/server.py")

    def _logs_cli(self):
        print("Logs")

    def _test_cli(self):
        print("Test")
