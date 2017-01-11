"""Module of infoset webserver routes.

Contains all routes that infoset's Flask webserver uses

"""
# Standard imports
from datetime import datetime
import time
import operator

# Pip imports
from flask import render_template, jsonify, request

# Garnet imports
from garnet.utils import general
from garnet.charts import TimeStamp
from garnet.charts import ColorWheel
from garnet.utils import log
from garnet.metadata import language
from garnet.utils.configuration import Config
from garnet.utils import api
from www import APP

# Intialize API object to communiacate with the infoset API
config = Config()
API = api.API(config)

# Setup infoset connectivity
INFOSET = api.Infoset(config)


@APP.template_filter('strftime')
def _jinja2_filter_datetime(timestamp):
    timestamp = time.strftime('%H:%M (%d-%m-%Y) ', time.localtime(timestamp))
    return timestamp


@APP.route('/')
def index():
    """Function for handling home route.

    Args:
        None

    Returns:
        Home Page

    """
    # Initialize key variables
    idx_device = INFOSET.idx_device()
    idx_agent = INFOSET.idx_agent()

    # Get UID of _garnet agent
    data = API.get(('db/agent/getidxagent/%s') % (idx_agent))
    id_agent = data['id_agent']

    # Get agent information
    device = INFOSET.devicename()
    agent_list = [data]
    data_point_dict = _get_dp_label_idx(idx_device, idx_agent)

    # Render the home page
    return render_template('index.html',
                           data=data_point_dict,
                           agent_list=agent_list,
                           id_agent=id_agent,
                           idx_agent=idx_agent,
                           idx_device=idx_device,
                           devicename=device)


@APP.route('/search')
def search():
    """Function for showing list of devices on search page.

    Args:
        None

    Returns:
        overview page

    """
    # Initialize key variables
    data = []

    # Get list of all device indices
    device_idx_list = API.get('db/deviceagent/alldeviceindices')

    for idx_device in device_idx_list:
        # Get names for device
        device_data = API.get(('db/device/getidxdevice/%s') % (idx_device))
        devicename = device_data['devicename']

        # Process agents
        all_agent_indices = API.get(
            ('db/deviceagent/agentindices/%s') % (idx_device))
        for idx_agent in all_agent_indices:
            agent_data = API.get(
                ('db/agent/getidxagent/%s') % (idx_agent))
            enabled = agent_data['enabled']

            # Process enabled agents
            if enabled is True:
                # Get agent data
                agent_name = agent_data['name']
                idx_agent = agent_data['idx_agent']

                # Append to data
                if idx_agent != 1:
                    data.append(
                        (devicename, idx_device, agent_name, idx_agent)
                    )

    # Render data on screen
    return render_template('search.html', agent_list=data)


@APP.route('/search/<idx_device>/<idx_agent>')
def search_device(idx_device, idx_agent):
    """Function for showing all data for all DIDs.

    Args:
        idx_device: IDX of Device
        idx_agent: IDX of Agent

    Returns:
        overview page

    """
    # Initialize key variables
    data = []

    # Get Devicename
    device_data = API.get(('db/device/getidxdevice/%s') % (idx_device))
    devicename = device_data['devicename']

    # Get agent details
    agent_data = API.get(('db/agent/getidxagent/%s') % (idx_agent))
    agent_name = agent_data['name']
    id_agent = agent_data['id_agent']

    # Get a description of the datapoint
    lang = language.Agent(agent_name)

    # Get datapoints charting device metrics
    datapoints = API.get(
        ('db/datapoint/timeseries/%s/%s') % (idx_device, idx_agent))
    for data_dict in datapoints:
        # Create datapoint object
        idx_datapoint = data_dict['idx_datapoint']
        timestamp = data_dict['last_timestamp']
        source = data_dict['agent_source']
        agent_label = data_dict['agent_label']

        final_description = ''

        # Get a description of the datapoint
        label_description = lang.label_description(agent_label)
        if bool(label_description) is True:
            final_description = label_description
        else:
            final_description = agent_label

        # Get datapoint source
        datex = datetime.fromtimestamp(
            timestamp).strftime('%H:%M %d-%b-%Y')

        # Append to data
        data.append(
            (devicename, agent_name, source,
             final_description, idx_datapoint, id_agent, datex)
        )

    # Sort list by label_description and source
    data = sorted(data, key=operator.itemgetter(3, 2))

    # Render data on screen
    return render_template(
        'search-device.html', agent_list=data)


@APP.route('/graphs/did/<idx_datapoint>', methods=["GET", "POST"])
def graphs(idx_datapoint):
    """Create graphs.

    Args:
        idx_datapoint: Datapoint idx

    Returns:
        None

    """
    # Get datapoint details
    datapoint_data = API.get(
        ('db/datapoint/getidxdatapoint/%s') % (idx_datapoint))
    idx_deviceagent = datapoint_data['idx_deviceagent']
    deviceagent_data = API.get(
        ('db/deviceagent/getidxdeviceagent/%s') % (idx_deviceagent))
    idx_agent = deviceagent_data['idx_agent']
    agent_label = datapoint_data['agent_label']

    # Get agent details
    agent_data = API.get(('db/agent/getidxagent/%s') % (idx_agent))
    agent_name = agent_data['name']

    # Get a description of the datapoint
    lang = language.Agent(agent_name)
    agent_description = lang.label_description(agent_label)
    colorwheel = ColorWheel(agent_label)
    fill = colorwheel.get_scheme()
    preset = TimeStamp()
    timestamps = preset.get_times()
    return render_template('graphs.html',
                           timestamps=timestamps,
                           datapoint=idx_datapoint,
                           fill=fill,
                           description=agent_description,
                           agent_source=agent_name)


@APP.route(
    '/graphs/did/bytimestamp/<idx_datapoint>', methods=["GET", "POST"])
def fetch_graph(idx_datapoint):
    """Create graph.

    Args:
        idx_datapoint: Datapoint idx

    Returns:
        None

    """
    # Get datapoint details
    datapoint_data = API.get(
        ('db/datapoint/getidxdatapoint/%s') % (idx_datapoint))
    agent_label = datapoint_data['agent_label']

    # Getting start and stop parameters from url
    start = request.args.get('start')
    stop = request.args.get('stop')

    # Get data and return
    results = API.get(
        ('db/data/getidxdata/%s/%s/%s') % (idx_datapoint, start, stop))
    data = _d3_converter(results, agent_label)
    return jsonify(data)


@APP.route(
    '/fetch/agent/graph/stacked/<id_agent>/<stack_type>'
    '', methods=["GET", "POST"])
def fetch_graph_stacked(id_agent, stack_type):
    """Process stacked charts.

    Args:
        id_agent: Agent id_agent
        datpoint: Datapoint idx

    Returns:
        Image of Stacked Chart

    """
    # Define key variables
    # We are only interested in the infoset server device idx for now.
    idx_device = INFOSET.idx_device()
    labels = {}

    # Set start and stop times
    ts_stop = general.normalized_timestamp()
    ts_start = ts_stop - (3600 * 24)

    # Get agent details
    agent_data = API.get(('db/agent/getidagent/%s') % (id_agent))
    idx_agent = agent_data['idx_agent']

    # Define label values
    labels['cpu'] = [
        'cpu_times_percent_iowait',
        'cpu_times_percent_irq',
        'cpu_times_percent_ctx_switches',
        'cpu_times_percent_syscalls',
        'cpu_times_percent_interrupts',
        'cpu_times_percent_soft_interrupts',
        'cpu_times_percent_softirq',
        'cpu_times_percent_steal',
        'cpu_times_percent_user',
        'cpu_times_percent_nice',
        'cpu_times_percent_system',
        'cpu_times_percent_idle',
        'cpu_times_percent_guest',
        'cpu_times_percent_guest_nice'
    ]
    labels['memory'] = [
        'memory_buffers',
        'memory_cached',
        'memory_shared',
        'memory_available',
        'memory_free'
    ]
    labels['load'] = [
        'load_average_01min',
        'load_average_05min',
        'load_average_15min'
    ]
    labels['network'] = [
        'network_bytes_recv',
        'network_bytes_sent'
    ]

    # Determine what kind of stacked chart to make
    # Memory, Load, Bytes In/Out, CPU
    if 'memory' in stack_type:
        # Do memory
        datapoint_list = _datapoint_labels(
            idx_device, idx_agent, labels['memory'])
    elif 'cpu' in stack_type:
        # Do cpu
        datapoint_list = _datapoint_labels(
            idx_device, idx_agent, labels['cpu'])
    elif 'load' in stack_type:
        # Do load
        datapoint_list = _datapoint_labels(
            idx_device, idx_agent, labels['load'])
    elif 'network' in stack_type:
        # Do network
        datapoint_list = _datapoint_labels(
            idx_device, idx_agent, labels['network'])
    elif 'disk' in stack_type:
        # Do disk
        pass

    values = []
    for idx_datapoint in datapoint_list:
        # Get datapoint details
        datapoint_data = API.get(
            ('db/datapoint/getidxdatapoint/%s') % (idx_datapoint))
        agent_label = datapoint_data['agent_label']
        results = API.get(
            ('db/data/getidxdata/%s/%s/%s') % (
                idx_datapoint, ts_start, ts_stop))

        # Convert data to D3 format
        data = _d3_converter(results, agent_label)
        values.extend(data)

    return jsonify(values)


def _datapoint_labels(idx_device, idx_agent, labels):
    """Get datapoint IDXes for a device / agent with specific labels.

    Args:
        idx_device: Device index
        idx_agent: Agent index
        labels: Labels to match

    Returns:
        listing: List of datap

    """
    # Initialize key variables
    listing = []

    # Get datapoints the agent is tracking for the device
    datapoints = _get_datapoints(idx_agent, idx_device)
    for data_dict in datapoints:
        agent_label = data_dict['agent_label']
        idx_datapoint = data_dict['idx_datapoint']
        if agent_label in labels:
            listing.append(idx_datapoint)

    # Return
    return listing


def _get_dp_label_idx(idx_device, idx_agent):
    """Get datapoint labels for agent and device.

    Args:
        idx_device: idx of device
        idx_agent: idx of agent

    Returns:
        None

    """
    # Initialize important variables
    data_dict = {}

    # Get data
    data = _get_datapoints(idx_agent, idx_device)

    # Massage data
    if len(data) > 0:
        for instance in data:
            agent_label = instance['agent_label']
            idx_datapoint = instance['idx_datapoint']
            timefixed_value = instance['timefixed_value']
            data_dict[agent_label] = (idx_datapoint, timefixed_value)
    else:
        log_message = ('Agent idx %s not found.') % (idx_agent)
        log.log2die(1050, log_message)

    # Return
    return data_dict


def _get_datapoints(idx_agent, idx_device):
    """Get datapoint data for agent and device.

    Args:
        idx_agent: idx of agent
        idx_device: idx of device

    Returns:
        None

    """
    # Initialize important variables
    data = []

    # Get charted data
    data_charted = API.get(
        ('db/datapoint/timeseries/%s/%s') % (idx_device, idx_agent))
    data.extend(data_charted)

    # Get timefixed data
    data_timefixed = API.get(
        ('db/datapoint/timefixed/%s/%s') % (idx_device, idx_agent))
    data.extend(data_timefixed)

    # Return
    return data


def _d3_converter(values, agent_label):
    """Convert API data to format that the D3 library will accept.

    Args:
        values: Dict of data
        agent_label: Agent label

    Returns:
        chart_values: List of dicts of data in D3 format.

    """
    # Initialize key variables
    chart_values = []

    # Assign data values to d3 dict
    for timestamp, value in sorted(values.items()):
        chart_values.append(
            {'x': timestamp, 'y': value, 'group': agent_label})
    return chart_values
