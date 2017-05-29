import React from 'react';
import ReactDOM from 'react-dom';
import {mount, shallow} from 'enzyme';
import sinon from 'sinon';

import fs from 'fs';

import LoadStackChart from '../Dashboard/GraphBox/StackedAreaChart/LoadStackChart.js';

describe('LoadStackChart', () => {
 
  test('should match snapshot', () => {
    const loadStackChart = shallow(
      <LoadStackChart></LoadStackChart>
    );
    expect(loadStackChart).toMatchSnapshot();
  });

  test('should fetch data from infoset-ng after mount', () => {
    var route = '/fetch/agent/graphed/stacked',
        agent_Id = '2',
        stack_type = 'cpu';
    const url = route + '/' + agent_Id + '/' + stack_type;

    var infoset_dump = __dirname + '/infoset_dump.json';

    var json = JSON.parse(fs.readFileSync(infoset_dump, 'utf8'));
    
    const server = sinon.fakeServer.create();    
    server.respondWith("GET", url, (xhr, id, json) => {
      xhr.respond(
        200, 
        {"Content-Type":"application/json"},
        JSON.stringify(json)
      );
    const component = mount(<LoadStackChart></LoadStackChart>);
    server.respond();

    server.restore();
    unmount(component);
    })
  });
});
