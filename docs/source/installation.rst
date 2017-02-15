Installation
============

Installation is straightforward.

Dependencies
------------

The only dependencies that must be manually installed for this project
are ``pip``, ``python3``. ### Ubuntu / Debian / Mint

The commands are:

::

    # sudo apt-get install python3 python3-pip python3-dev python3-yaml

Fedora
~~~~~~

The commands are:

::

    # sudo dnf install python3 python3-pip python3-dev python3-yaml

Installation
------------

Installation is simple. Follow these steps

Verify Dependencies
~~~~~~~~~~~~~~~~~~~

The first thing to do is verify that your system has the correct prerequisites. Run this command to make sure all is OK:

::

    $ bin/tools/prerequisites.py

Do the appropriate remediation to fix any reported issues. Run any commands this script suggests.

Be prepared to install ``infoset-ng`` on a newer version of your operating system.


Install ``infoset-ng`` First
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Install ``infoset-ng`` on your ``garnet`` server. Make sure the
``infoset-ng`` API is successfully tested and running before proceeding
to the next step.

``garnet`` agents send data to the ``infoset-ng`` API. You will be able
to view this data in a graphical format using the ``garnet`` webUI. This
is why ``infoset-ng`` must be running first, because without it there is
no data to view and the ``garnet`` webUI won't start.

Install ``garnet`` Next
~~~~~~~~~~~~~~~~~~~~~~~

Now clone the repository and copy the sample configuration file to its
final location.

::

    $ git clone https://github.com/PalisadoesFoundation/garnet
    $ cd garnet
    $ export PYTHONPATH=`pwd`
    $ cp examples/etc/* etc/

Edit the ``etc/config.yaml`` configuration file to reflect which agents
you want to hve running. Make sure that the ``garnet.py`` agent is
enabled. The ``examples/etc/README.md`` file explains the configuration
parameters in detail.

::

    $ vim etc/config.yaml

Create the directories that ``garnet`` will use for its working files.

::

    $ sudo mkdir -p /opt/garnet
    $ sudo chown -R $USER /opt/garnet
    $ mkdir -p /opt/garnet/log
    $ mkdir -p /opt/garnet/cache

Run the install scripts.

::

    $ python3 setup.py
    $ source ~/.bashrc
    $ sudo make
    $ source venv/bin/activate
    $ sudo make install
