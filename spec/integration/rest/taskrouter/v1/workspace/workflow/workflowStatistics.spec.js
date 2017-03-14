'use strict';

var _ = require('lodash');
var Holodeck = require('../../../../../holodeck');
var Request = require('../../../../../../../lib/http/request');
var Response = require('../../../../../../../lib/http/response');
var RestException = require('../../../../../../../lib/base/RestException');
var Twilio = require('../../../../../../../lib');


var client;
var holodeck;

describe('WorkflowStatistics', function() {
  beforeEach(function() {
    holodeck = new Holodeck();
    client = new Twilio('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'AUTHTOKEN', holodeck);
  });
  it('should generate valid fetch request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var promise = client.taskrouter.v1.workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                        .workflows('WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                        .statistics().fetch();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        workspaceSid: 'WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        workflowSid: 'WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var url = _.template('https://taskrouter.twilio.com/v1/Workspaces/<%= workspaceSid %>/Workflows/<%= workflowSid %>/Statistics')(solution);

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid fetch response',
    function() {
      var body = JSON.stringify({
          'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'url': 'https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workflows/WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Statistics',
          'cumulative': {
              'avg_task_acceptance_time': 0.0,
              'end_time': '2008-01-02T00:00:00Z',
              'reservations_accepted': 0,
              'reservations_rejected': 0,
              'reservations_timed_out': 0,
              'start_time': '2008-01-02T00:00:00Z',
              'tasks_canceled': 0,
              'tasks_entered': 0,
              'tasks_moved': 0,
              'tasks_timed_out_in_workflow': 0
          },
          'realtime': {
              'longest_task_waiting_age': 0,
              'longest_task_waiting_sid': null,
              'tasks_by_status': {
                  'assigned': 1,
                  'pending': 0,
                  'reserved': 0
              },
              'total_tasks': 1
          },
          'workflow_sid': 'WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'workspace_sid': 'WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      });

      holodeck.mock(new Response(200, body));

      var promise = client.taskrouter.v1.workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                        .workflows('WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                        .statistics().fetch();
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
});
