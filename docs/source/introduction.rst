Introduction
============

There's a lot to know about ``garnet`` which we'll summarize here.

Features
--------

``garnet`` has the following features:

1. Open source.
2. Written in python, a modern language.
3. Easy configuration.
4. Multi-process polling of devices for data. Fast.
5. ``garnet`` has a number of fault tolerant features aimed at making it
   resilient in unstable computing environemnts.
6. Agents collecting data can tolerate the loss of communication with
   the central server by caching data locally until the server returns
   online.
7. The ``garnet`` configuration is entirely stored in files. This allows
   it to collect data in the absense of a database, such as during
   maintenance or an outage.
8. Backups are simple:

   1. Save the entire contents of the ``garnet`` directory tree
      including hidden files.
   2. Save a copy of the configured ``agent_cache_directory`` directory.

We are always looking for more contributors!

Inspiration / History
---------------------

Before ``garnet`` there was ``infoset``, a python3 project that
inspiration from the SourceForge based ``switchmap`` project.
``switchmap`` was written in PERL and designed to create tabular
representations of network topologies. Early versions of ``infoset``
eventually had expanded features which included the polling of network
devices for real time performance data. This data was presented via a
web interface. The code became cumbersome and the original ``infoset``
was split into three componet parts.

1. ``infoset-ng``: An API for storing and retrieving real time data.
2. ``garnet``: A network / server performance charting web application
   that uses various types of agents for collecting real time data.
   ``garnet`` uses ``infoset-ng`` to store its data.
3. ``switchmap-ng`` A python 3 based feature equivalent version of
   ``switchmap``.

Each of these projects resides on the University of the West Indies
Computing Society's GitHub account.

Oversight
---------

``garnet`` is a student collaboration between:

1. The University of the West Indies Computing Society. (Kingston,
   Jamaica)
2. The University of Techology, IEEE Student Branch. (Kingston, Jamaica)
3. The Palisadoes Foundation http://www.palisadoes.org

And many others.