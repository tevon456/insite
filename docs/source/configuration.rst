Configuration and Usage
=======================

There are a number of required steps to configure ``garnet``.

1. Place a valid configuration file in the ``etc/`` directory
2. Run the ``bin/agentsd.py --start`` script to start data collection
3. Run the ``./server.py`` script to view the web pages

These will be convered in detail next:

Configuration Samples
---------------------

The ``examples/`` directory includes a sample configuration file. These
will now be explained.

garnet Configuration Samples
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``examples/etc`` directory includes a sample file that can be
edited. The ``README.md`` file there explains the parameters.

You must place your configuration file in the ``etc/`` directory as your
permanent configuration file location.

Logrotate Configuration
~~~~~~~~~~~~~~~~~~~~~~~

The ``examples/linux/logrotate/garnet`` file is a working logrotate
configuration to rotate the log files that garnet generates. These can
be extensive and adding the file to your system is highly recommended.

::

    sudo cp examples/linux/logrotate/garnet /etc/logrotate.d

Apache Configuration Samples (optional)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``examples/linux/apache`` directory includes sample files to create
a:

1. Dedicated ``garnet`` site (``sites-available.example.org.conf``)
   running on port 80
2. URI of an existing site (``conf-available.example.conf``) running on
   port 80

Starting Data Collection
------------------------

**NOTE!** You must have a valid configuration file placed in the
``etc/`` directory before activating data collection.

The ``bin/agentsd.py`` script starts all the configured data collection
agents automatically. It will only attempt to start and monitor the
agents that are ``enabled`` in the configuration file.

The script can be started like this:

::

    $ bin/agentsd.py --start

**NOTE!** Make sure this script runs at boot by placing the
``agentsd.py`` command in your ``/etc/rc.local`` file.

Viewing Data Web Pages
----------------------

garnet also includes a web interface. To start the server run
``python3 server.py`` then navigate to http://localhost:5000