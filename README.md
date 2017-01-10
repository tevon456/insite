# Garnet
`garnet` is Python 3 based application that polls devices for performance data which can then be viewed via a WebUI.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

  - [Features](#features)
  - [Inspiration / History](#inspiration--history)
  - [Oversight](#oversight)
  - [Dependencies](#dependencies)
    - [Ubuntu / Debian / Mint](#ubuntu--debian--mint)
    - [Fedora](#fedora)
  - [Installation](#installation)
    - [Install `infoset-ng` First](#install-infoset-ng-first)
    - [Install `garnet` Next](#install-garnet-next)
    - [Start `garnet`](#start-garnet)
- [Configuration and Usage](#configuration-and-usage)
  - [Configuration Samples](#configuration-samples)
    - [garnet Configuration Samples](#garnet-configuration-samples)
    - [Logrotate Configuration](#logrotate-configuration)
    - [Apache Configuration Samples (optional)](#apache-configuration-samples-optional)
  - [Starting Data Collection](#starting-data-collection)
  - [Viewing Data Web Pages](#viewing-data-web-pages)
- [Next Steps](#next-steps)
  - [Contribute](#contribute)
  - [Mailing list](#mailing-list)
  - [New Features](#new-features)
  - [Design Overview](#design-overview)
  - [Sample Output](#sample-output)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Features
`garnet` has the following features:

1. Open source.
1. Written in python, a modern language.
1. Easy configuration.
1. Multi-process polling of devices for data. Fast.
1. `garnet` has a number of fault tolerant features aimed at making it resilient in unstable computing environemnts.
 1. Agents collecting data can tolerate the loss of communication with the central server by caching data locally until the server returns online.
 1. The `garnet` configuration is entirely stored in files. This allows it to collect data in the absense of a database, such as during maintenance or an outage.
 1. Backups are simple:
     1.  Save the entire contents of the `garnet` directory tree including hidden files.
     1.  Save a copy of the configured `agent_cache_directory` directory.

We are always looking for more contributors!

## Inspiration / History
Before `garnet` there was `infoset`, a python3 project that inspiration from the SourceForge based `switchmap` project. `switchmap` was written in PERL and designed to create tabular representations of network topologies. Early versions of `infoset` eventually had expanded features which included the polling of network devices for real time performance data. This data was presented via a web interface. The code became cumbersome and the original `infoset` was split into three componet parts.

1. `infoset-ng`: An API for storing and retrieving real time data.
2. `garnet`: A network / server performance charting web application that uses various types of agents for collecting real time data. `garnet` uses `infoset-ng` to store its data.
3. `switchmap-ng` A python 3 based feature equivalent version of `switchmap`.

Each of these projects resides on the University of the West Indies Computing Society's GitHub account.

## Oversight
`garnet` is a student collaboration between:

1. The University of the West Indies Computing Society. (Kingston, Jamaica)
2. The University of Techology, IEEE Student Branch. (Kingston, Jamaica)
3. The Palisadoes Foundation http://www.palisadoes.org

And many others.

## Dependencies
The only dependencies that must be manually installed for this project are `pip`, `python3`.
### Ubuntu / Debian / Mint

The commands are:
```
# sudo apt-get install python3 python3-pip python3-dev python3-yaml
```

### Fedora
The commands are:
```
# sudo dnf install python3 python3-pip python3-dev python3-yaml
```

## Installation
Installation is simple. The first thing to do is verify that your system is running python 3.5 or higher. If not, you will need to upgrade. Use this command to check:
```
$ python3 --version
```

### Install `infoset-ng` First
Install `infoset-ng` on your `garnet` server. Make sure the `infoset-ng` API is successfully tested and running before proceeding to the next step.

`garnet` agents send data to the `infoset-ng` API. You will be able to view this data in a graphical format using the `garnet` webUI. This is why `infoset-ng` must be running first, because without it there is no data to view and the `garnet` webUI won't start.

### Install `garnet` Next
Now clone the repository and copy the sample configuration file to its final location.
```
$ git clone https://github.com/PalisadoesFoundation/garnet
$ cd garnet
$ export PYTHONPATH=`pwd`
$ cp examples/etc/* etc/
```
Edit the `etc/config.yaml` configuration file to reflect which agents you want to hve running. Make sure that the `garnet.py` agent is enabled. The `examples/etc/README.md` file explains the configuration parameters in detail.
```
$ vim etc/config.yaml
```
Create the directories that `garnet` will use for its working files.
```
$ sudo mkdir -p /opt/garnet
$ sudo chown -R $USER /opt/garnet
$ mkdir -p /opt/garnet/log
$ mkdir -p /opt/garnet/cache
```
Run the install scripts.
```
$ python3 setup.py
$ source ~/.bashrc
$ sudo make
$ source venv/bin/activate
$ sudo make install
```
### Start `garnet`
Please review the `Configuration and Usage` section on how to configure `garnet`. The default configuration will work if the `infoset-ng` API is running on the same server as `garnet`.

To start data collection you need to run the command:
```
$ bin/agentsd.py --start
```
Wait a minute or two for `infoset-ng` to process the data, then start the webserver using the command:
```
./server.py
```
Now navigate to <http://localhost:5000>

# Configuration and Usage
There are a number of required steps to configure `garnet`.

1. Place a valid configuration file in the `etc/` directory
2. Run the `bin/agentsd.py --start` script to start data collection
3. Run the `./server.py` script to view the web pages

These will be convered in detail next:

## Configuration Samples
The `examples/` directory includes a sample configuration file. These will now be explained.

### garnet Configuration Samples
The `examples/etc` directory includes a sample file that can be edited. The `README.md` file there explains the parameters.

You must place your configuration file in the `etc/` directory as your permanent configuration file location.

### Logrotate Configuration
The `examples/linux/logrotate/garnet` file is a working logrotate configuration to rotate the log files that garnet generates. These can be extensive and adding the file to your system is highly recommended.

```
sudo cp examples/linux/logrotate/garnet /etc/logrotate.d
```

### Apache Configuration Samples (optional)
The `examples/linux/apache` directory includes sample files to create a:

1. Dedicated `garnet` site (`sites-available.example.org.conf`) running on port 80
2. URI of an existing site (`conf-available.example.conf`) running on port 80

## Starting Data Collection
**NOTE!** You must have a valid configuration file placed in the `etc/` directory before activating data collection.

The `bin/agentsd.py` script starts all the configured data collection agents automatically. It will only attempt to start and monitor the agents that are `enabled` in the configuration file.

The script can be started like this:
```
$ bin/agentsd.py --start
```

**NOTE!** Make sure this script runs at boot by placing the `agentsd.py` command in your `/etc/rc.local` file.

## Viewing Data Web Pages
garnet also includes a web interface. To start the server run `python3 server.py` then navigate to <http://localhost:5000>

# Next Steps
There are many dragons to slay and kingdoms to conquer!
## Contribute
Here are a few things to know.

1. Contributions are always welcome. Contact our team for more.
2. View our contributor guidelines here: https://github.com/PalisadoesFoundation/garnet/blob/master/CONTRIBUTING.md
3. View our guidelines for committing code here: https://github.com/PalisadoesFoundation/garnet/blob/master/COMMITTERS.md

## Mailing list
Our current mailing list is: https://groups.google.com/forum/#!forum/gdg-jamaica
## New Features
Visit our GitHub issues for a full list of features and bug fixes. https://github.com/PalisadoesFoundation/garnet/issues
## Design Overview
Visit our wiki's `garnet` document for the rationale of the design. http://wiki.palisadoes.org/index.php/garnet
## Sample Output
Visit http://calico.palisadoes.org/garnet to view `garnet`'s latest stable web output.
