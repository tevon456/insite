Operation
=========
Operation is simple.

Start ``garnet``
----------------

Please review the ``Configuration`` page on how to
configure ``garnet``. The default configuration will work if the
``infoset-ng`` API is running on the same server as ``garnet``.

To start data collection you need to run the command:

::

    $ bin/agentsd.py --start

Wait a minute or two for ``infoset-ng`` to process the data, then start
the webserver using the command:

::

    ./server.py

Now navigate to http://localhost:5000


