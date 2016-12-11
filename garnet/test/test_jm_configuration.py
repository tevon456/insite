#!/usr/bin/env python3
"""Test the configuration module."""

import os
import os.path
import unittest
import shutil
import random
import string
import tempfile
import yaml
from garnet.utils import configuration as test_class


class TestConfig(unittest.TestCase):
    """Checks all functions and methods."""

    # ---------------------------------------------------------------------- #
    # General object setup
    # ---------------------------------------------------------------------- #

    # Required
    maxDiff = None

    random_string = ''.join([random.choice(
        string.ascii_letters + string.digits) for n in range(9)])

    @classmethod
    def setUpClass(cls):
        # Create logfile
        cls.log_file = tempfile.NamedTemporaryFile(delete=False).name

        # Create temporary configuration directory
        cls.test_config_dir = tempfile.mkdtemp()
        cls.test_cache_dir = tempfile.mkdtemp()

        # Convert the configuration YAML to Python dict
        configuration = (
            """
            common:
                log_file: %s
                language: en
                server: True

            server:
                data_directory: %s/6maYNHCVZyQ9yJFm/data
                ingest_cache_directory: %s/p9ZuZrRzWAd8GeSc
                agent_subprocesses: 20
            """) % (cls.log_file, cls.test_cache_dir, cls.test_cache_dir)
        cls.configuration_dict = yaml.load(configuration)

        # Create the configuration file on disk
        test_config_file = ('%s/config.yaml') % (cls.test_config_dir)
        with open(test_config_file, 'w') as f_handle:
            f_handle.write(configuration)

        # Instantiate object to test
        os.environ['GARNET_CONFIGDIR'] = cls.test_config_dir
        cls.testobj = test_class.Config()

    @classmethod
    def tearDownClass(cls):
        # Cleanup temporary files when done
        shutil.rmtree(cls.test_config_dir)
        shutil.rmtree(cls.test_cache_dir)
        os.remove(cls.log_file)

    def test_server(self):
        """Testing function server."""
        # Check known good value
        result = self.testobj.server()
        expected = self.configuration_dict['main']['server']
        self.assertEqual(result, expected)

    def test_language(self):
        """Testing function language."""
        # Check known good value
        result = self.testobj.language()
        expected = self.configuration_dict['main']['language']
        self.assertEqual(result, expected)

    def test_data_directory(self):
        """Testing function data_directory."""
        # Fails because directory doesn't exist
        with self.assertRaises(SystemExit):
            self.testobj.data_directory()

        # Doesn't fail because directory now exists
        os.makedirs(self.configuration_dict['server']['data_directory'])
        result = self.testobj.data_directory()
        expected = self.configuration_dict['server']['data_directory']
        self.assertEqual(result, expected)

    def test_topology_directory(self):
        """Testing function topology_directory."""
        # Verify that directory exists
        result = self.testobj.topology_directory()
        self.assertEqual(os.path.exists(result), True)
        self.assertEqual(os.path.isdir(result), True)

        # Doesn't fail because directory now exists
        result = self.testobj.topology_directory()
        expected = ('%s/topology') % (
            self.configuration_dict['server']['data_directory'])
        self.assertEqual(result, expected)

    def test_topology_device_file(self):
        """Testing function topology_device_file."""
        # Recreate the path to the device file
        result = self.testobj.topology_device_file(self.random_string)
        expected = ('%s/%s.yaml') % (
            self.testobj.topology_directory(), self.random_string)
        self.assertEqual(result, expected)

    def test_ingest_cache_directory(self):
        """Testing function ingest_cache_directory."""
        # Fails because directory doesn't exist
        with self.assertRaises(SystemExit):
            self.testobj.ingest_cache_directory()

        # Doesn't fail because directory now exists
        os.makedirs(self.configuration_dict[
            'server']['ingest_cache_directory'])
        result = self.testobj.ingest_cache_directory()
        expected = self.configuration_dict[
            'server']['ingest_cache_directory']
        self.assertEqual(result, expected)

    def test_ingest_failures_directory(self):
        """Testing function ingest_failures_directory."""
        # Verify that directory exists
        result = self.testobj. ingest_failures_directory()
        self.assertEqual(os.path.exists(result), True)
        self.assertEqual(os.path.isdir(result), True)

        # Doesn't fail because directory now exists
        result = self.testobj. ingest_failures_directory()
        expected = ('%s/failures') % (
            self.configuration_dict['server']['ingest_cache_directory'])
        self.assertEqual(result, expected)

    def test_agent_subprocesses(self):
        """Testing function agent_subprocesses."""
        # Initializing key variables
        result = self.testobj.agent_subprocesses()
        expected = self.configuration_dict['server']['agent_subprocesses']
        self.assertEqual(result, expected)

    def test_log_file(self):
        """Testing function log_file."""
        # Initializing key variables
        result = self.testobj.log_file()
        expected = self.configuration_dict['main']['log_file']
        self.assertEqual(result, expected)


class TestConfigAgent(unittest.TestCase):
    """Checks configuration information."""

    # ---------------------------------------------------------------------- #
    # General object setup
    # ---------------------------------------------------------------------- #

    # Required
    maxDiff = None

    @classmethod
    def setUpClass(cls):
        # Define agent name
        cls.agent_name = ''.join([random.choice(
            string.ascii_letters + string.digits) for n in range(9)])

        # Create logfile
        cls.log_file = tempfile.NamedTemporaryFile(delete=False).name

        # Create temporary configuration directory
        cls.test_config_dir = tempfile.mkdtemp()
        cls.test_cache_dir = tempfile.mkdtemp()

        # Convert the configuration YAML to Python dict
        configuration = (
            """
            common:
                log_file: %s
                language: en

            agents_common:
                api_server_name: 192.168.1.218
                api_server_port: 5000
                api_server_https: False
                agent_cache_directory: %s/1234113241

            agents:

            - agent_name: %s
              agent_enabled: True
              agent_filename: bin/agents/_garnet.py
              agent_port: 5001
              monitor_agent_pid: True
              agent_devicenames:
                - 192.168.1.1
                - 192.168.1.2
                - 192.168.1.3
                - 192.168.1.4
            """) % (cls.log_file, cls.test_cache_dir, cls.agent_name)
        cls.configuration_dict = yaml.load(configuration)

        # Create the configuration file on disk
        test_config_file = ('%s/config.yaml') % (cls.test_config_dir)
        with open(test_config_file, 'w') as f_handle:
            f_handle.write(configuration)

        # Instantiate object to test
        os.environ['GARNET_CONFIGDIR'] = cls.test_config_dir
        cls.testobj = test_class.ConfigAgent(cls.agent_name)

    @classmethod
    def tearDownClass(cls):
        # Cleanup temporary files when done
        shutil.rmtree(cls.test_config_dir)
        shutil.rmtree(cls.test_cache_dir)
        os.remove(cls.log_file)

    def test_agents(self):
        """Testing function agents."""
        pass

    def test_agent_name(self):
        """Testing function agent_name."""
        # Initializing key variables
        result = self.testobj.agent_name()
        expected = self.agent_name
        self.assertEqual(result, expected)

    def test_api_server_name(self):
        """Testing for api_server_name."""
        # Initializing key variables
        result = self.testobj.api_server_name()
        expected = self.configuration_dict['agents_common']['api_server_name']
        self.assertEqual(result, expected)

    def test_api_server_port(self):
        """Testing for api_server_port."""
        # Initializing key variables
        result = self.testobj.api_server_port()
        expected = self.configuration_dict['agents_common']['api_server_port']
        self.assertEqual(result, expected)

    def test_api_server_https(self):
        """Testing for api_server_https."""
        # Initializing key variables
        result = self.testobj.api_server_https()
        expected = self.configuration_dict['agents_common']['api_server_https']
        self.assertEqual(result, expected)

    def test_agent_cache_directory(self):
        """Testing function agent_cache_directory."""
        # Fails because directory doesn't exist
        with self.assertRaises(SystemExit):
            self.testobj.agent_cache_directory()

        # Doesn't fail because directory now exists
        os.makedirs(self.configuration_dict[
            'agents_common']['agent_cache_directory'])
        result = self.testobj.agent_cache_directory()
        expected = self.configuration_dict[
            'agents_common']['agent_cache_directory']
        self.assertEqual(result, expected)

    def test_language(self):
        """Testing function language."""
        # Check known good value
        result = self.testobj.language()
        expected = self.configuration_dict['main']['language']
        self.assertEqual(result, expected)

    def test_log_file(self):
        """Testing function log_file."""
        # Initializing key variables
        result = self.testobj.log_file()
        expected = self.configuration_dict['main']['log_file']
        self.assertEqual(result, expected)

    def test_agent_enabled(self):
        """Testing function agent_enabled."""
        # Get agent config
        agent_config = _agent_config(
            self.agent_name, self.configuration_dict)

        # Test expected versus returned values
        result = self.testobj.agent_enabled()
        expected = agent_config['agent_enabled']
        self.assertEqual(result, expected)

    def test_monitor_agent_pid(self):
        """Testing function monitor_agent_pid."""
        # Get agent config
        agent_config = _agent_config(
            self.agent_name, self.configuration_dict)

        # Test expected versus returned values
        result = self.testobj.monitor_agent_pid()
        expected = agent_config['monitor_agent_pid']
        self.assertEqual(result, expected)

    def test_agent_filename(self):
        """Testing function agent_filename."""
        # Get agent config
        agent_config = _agent_config(
            self.agent_name, self.configuration_dict)

        # Test expected versus returned values
        result = self.testobj.agent_filename()
        expected = agent_config['agent_filename']
        self.assertEqual(result, expected)

    def test_agent_devicenames(self):
        """Testing function agent_devicenames."""
        agent_config = _agent_config(
            self.agent_name, self.configuration_dict)

        # Test expected versus returned values
        result = self.testobj.agent_devicenames()
        expected = sorted(agent_config['agent_devicenames'])
        self.assertEqual(result, expected)

    def test_agent_port(self):
        """Testing function agent_port."""
        # Get agent config
        agent_config = _agent_config(
            self.agent_name, self.configuration_dict)

        # Test expected versus returned values
        result = self.testobj.agent_port()
        expected = agent_config['agent_port']
        self.assertEqual(result, expected)

    def test_agent_metadata(self):
        """Testing function agent_metadata."""
        pass


def _agent_config(agent_name, config_dict):
    """Get agent config parameter from YAML.

    Args:
        agent_name: Agent Name
        config_dict: Dictionary to explore
        die: Die if true and the result encountered is None

    Returns:
        result: result

    """
    # Get result
    key = 'agents'
    result = None

    # Get new result
    if key in config_dict:
        configurations = config_dict[key]
        for configuration in configurations:
            if 'agent_name' in configuration:
                if configuration['agent_name'] == agent_name:
                    result = configuration
                    break

    # Return
    return result

if __name__ == '__main__':

    # Do the unit test
    unittest.main()
