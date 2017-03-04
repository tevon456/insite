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
import colorama

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
        self.config = configuration.Config()

        #Initialize terminal colors
        colorama.init()


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

        # Parse serve parameters
        serve = subparsers.add_parser(
            'serve', help='Starts local garnet server')

        # Parse logs parameters
        logs = subparsers.add_parser(
            'logs', help='View latest garnet log file')

        # Parse test parameters
        test = subparsers.add_parser(
            'test', help='Tests connection to infoset-ng')

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
        elif args.action == 'serve':
            self._serve_cli()
            sys.exit(0)
        elif args.action == 'logs':
            self._logs_cli()
            sys.exit(0)
        elif args.action == 'test':
            self._test_cli()
            sys.exit(0)
        else:
            self._logo()
            parser.print_help()
            sys.exit(0)
        sys.exit(2)

    def _logo(self):
        colorama.init()
        print(colorama.Fore.WHITE + colorama.Style.BRIGHT)
        print("                                _   ")
        print("                               | |  ")
        print("     __ _  __ _ _ __ _ __   ___| |_ ")
        print("    / _` |/ _` | '__| '_ \ / _ \ __|")
        print("   | (_| | (_| | |  | | | |  __/ |_ ")
        print("    \__, |\__,_|_|  |_| |_|\___|\__|")
        print("     __/ |                          ")
        print("    |___/                           ")
        print("")
        print("   v1.0.0")
        print(colorama.Style.RESET_ALL + "")

    def _build_cli(self):
        os.system("python3 ./bin/setup.py")

    def _serve_cli(self):
        os.system("python3 ./bin/server.py")

    def _logs_cli(self):
        log_file = self.config.log_file()
        os.system("tail -f " + log_file)

    def _test_cli(self):
        print("Test")
