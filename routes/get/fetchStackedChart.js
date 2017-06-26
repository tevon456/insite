const Infoset = require("../../utils/infoset.js");
const API = require("../../utils/api.js");
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} err 
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
    agent_data = API.get(('agents/%s') % (id_agent))
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
    data = []
    for idx_datapoint in datapoint_list:
        # Get datapoint details
        datapoint_data = API.get(
            ('datapoints/%s') % (idx_datapoint))
        agent_label = datapoint_data['agent_label']
        results = API.get(
            ('datapoints/%s/data?ts_start=%s&ts_stop=%s') % (idx_datapoint, ts_start, ts_stop))

        # Convert data to D3 format
        data = _d3_converter(results, data, agent_label)
        values = data

    return jsonify(values)

 */
function fetchStackGraph(req, res, err) {}

module.exports = fetchStackGraph;
