# How to Configure `garnet`

This page has detailed information on how to configure `garnet`.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents** 

- [Configuration Explanation](#configuration-explanation)
  - [Server Configuration](#server-configuration)
  - [Agent Configuration](#agent-configuration)
- [Standard Agents](#standard-agents)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Configuration Explanation

The `examples/configuration` directory includes a sample files that can be edited. `infoset` assumes all files in this directory, or any other specified configuration directory, only contains `infoset` configuration files. Most user will only need to edit the three files supplied.

You must place your configuration file in the `etc/` directory as your permanent configuration file location.
### Server Configuration

```
main:
    log_file: /opt/garnet/log/garnet.log
    log_level: info
    agent_cache_directory: /opt/garnet/cache
    language: en
    agent_subprocesses: 10
    bind_port: 5000
    interval: 300
    listen_address: 0.0.0.0
    api_server_name: 10.32.6.69
    api_server_port: 6000
    api_server_https: False
    api_server_uri: /infoset/api/v1.0

```

Explanation:

|Parameter|Description|
| --- | --- |
| main: | YAML key describing the server configuration.|
| `log_file:` | The name of the log file `infoset-ng` uses|
| `log_level:` | Defines the logging level. `debug` level is the most verbose, followed by `info`, `warning` and `critical`|
| `agent_cache_directory:` | Location where the agents will store in the event they cannot communicate with `infoset-ng` API|
| `agent_subprocesses:` | The maximum number of subprocesses an agent will use to poll a device|
| `language:`| The language used for labeling agent datapoints. There are language YAML files located in the `garnet/metadata` directory which are used to translate agent labels to more meaningful text for use in graph titles. The default is `en` for English. Other languages are not yet supported.|
| `interval:` | The expected interval in seconds between polling updtates. All agents should wait this time between polls.|
| `listen_address:` | IP address the `garnet` webserver will be using. The default is `0.0.0.0` or all available IP addresses|
| `api_server_port:` | The TCP port the API will be listening on|
| `api_server_name:` | The IP address or DNS fully qualified domain name used by the API server|
| `api_server_https:` | True if the API uses `https`.|
| `api_server_uri:` | The TCP prefix the `infoset-ng` API uses for all HTTP `POST` and `GET` operations.|


### Agent Configuration
An `garnet` agents reports data to the central API for charting. Agent configuration is simple. Here is an example:

```
agents:
	...
    ...
    ...
    - agent_name: snmp
      agent_enabled: False
      agent_filename: bin/agents/snmp.py
      agent_port: 5001
      monitor_agent_pid: True
      agent_devicenames:
        - 192.168.3.100
```
|Parameter|Description|
| --- | --- |
| agents: | YAML key describing configured agents. All agents are listed under this key.|
| `agent_name:` | Name of the agent.|
| `agent_enabled:` | True if enabled.|
| `agent_filename:` | Name of the agent's filename relative to the `garnet` root directory.|
| `agent_port:` | (Optional depending on the needs of the agent.) The TCP / UDP port the agent should use in polling remote devices.|
| `monitor_agent_pid:` | Agents using the python3 conde in the `garnet/agents` directory periodically update their PID file. The `bin/agentsd.py` file uses this setting to determine whether to restart agents that haven't updated their PID files in 10 minutes, and are therefore assumed to be hung.|
| `agent_devicenames:` | (Optional depending on the needs of the agent.) A list of devicenames to be polled. Each device must be on a separate line and be preceded with a dash "-"|

## Standard Agents

There are a number of standard agents that `garnet` uses. These are:

|Agent|Description|
| --- | --- |
|`_garnet.py`| Used to monitor the performance of the `garnet`server itself.|
|`remote_linux_active.py`| An agent that runs on a remote Linux system and reports to the `garnet` server.|
|`linux.py`|An agent runs on the `garnet` server that polls remote Linux systems for information. This data is retrieved from the `bin/remote_linux_passive.py` running on the remote system.|
|`remote_linux_passive.py`| An agent that gathers information about the Linux system on which it runs. Data ins't sent directly by the agent. It is retrieved on demand by the `linux.py` agent running on the `garnet` server.|
