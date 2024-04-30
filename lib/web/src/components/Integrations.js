import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

/* import actions */
import * as appActions from 'actions/appActions.js';

/* Ante UI */
import { Layout, Divider, Form, Input, Row, Col, Button, Icon, Tabs, Result } from 'antd';

const { Content } = Layout;
const { TabPane } = Tabs;

/* mapStateToProps */
const mapStateToProps = (state) => ({
  userProfile: state.userProfileReducer.get('userProfile')
});

/* mapDispatchToProps */
const mapDispatchToProps = (dispatch) => ({
  appActions: bindActionCreators(appActions, dispatch)
});

/* Component Class */
class Integrations extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      slackDetails: null
    };
  }

  componentDidMount () {
    this.getSlackDetails();
  }

  getSlackDetails () {
    const self = this;
    this.props.appActions.getSlackDetails(function (err, result) {
      if (!err && result && result.data) {
        self.setState({
          slackDetails: result.data.attributes.value
        });
      }
      self.setState({
        addSlackLoader: false
      });
    });
  }

  handleFormChange (e) {
    const key = e.target.name;
    const value = e.target.value;
    this.setState({
      [key]: value
    });
  }

  addSlack () {
    const self = this;
    const slackWebhookURL = this.state.slackWebhookURL;
    if (!slackWebhookURL) {
      return;
    }
    this.setState({
      addSlackLoader: true
    });
    const data = {
      url: slackWebhookURL
    };
    this.props.appActions.addSlackDetails(data, function (err, result) {
      if (!err && result && result.data) {
        self.setState({
          slackDetails: result.data.attributes.value
        });
      }
      self.setState({
        addSlackLoader: false
      });
    });
  }

  updateSlackNotifications (status) {
    const self = this;
    this.setState({
      addSlackLoader: true
    });
    const data = {
      status
    };
    this.props.appActions.updateSlackNotifications(data, function (err, result) {
      if (!err && result && result.data) {
        self.setState({
          slackDetails: result.data.attributes.value
        });
      }
      self.setState({
        addSlackLoader: false
      });
    });
  }

  deleteSlack () {
    const self = this;
    this.props.appActions.deleteSlackDetails(function (err, result) {
      if (!err && result && result.data) {
        self.setState({
          slackDetails: null
        });
      }
      self.setState({
        addSlackLoader: false
      });
      self.getSlackDetails();
    });
  }

  render () {
    const slackWebhookURL = this.state.slackWebhookURL || '';
    const addSlackLoader = this.state.addSlackLoader || false;
    const slackDetails = this.state.slackDetails || null;
    let slackStatus;
    if (slackDetails) {
      slackStatus = slackDetails.status === undefined ? true : slackDetails.status;
    }

    return (
      <>
        <Row>
          <Col span={20} offset={2}>
            <Content className='all-users'>
              <Content className='setting-user'>
                <h1>Integrations</h1>
                <Divider />
                <Tabs tabPosition='left'>
                  <TabPane tab={<span><Icon type='slack' />Slack</span>} key='2'>
                    {!slackDetails &&
                      <>
                        <Form layout='horizontal'>
                          <Form.Item>
                            <Input value={slackWebhookURL} style={{ width: '500px' }} name='slackWebhookURL' placeholder='Slack Webhook URL' onChange={this.handleFormChange.bind(this)} autocomplete='off' />
                            <Button style={{ marginLeft: '20px' }} loading={addSlackLoader} type='primary' onClick={this.addSlack.bind(this)}>Add</Button>
                          </Form.Item>
                        </Form>
                        <Divider />
                        <div>
                          <ol>
                            <li>Go to <a target='_blank' href='https://my.slack.com/services/new/incoming-webhook/' rel='noreferrer'>https://my.slack.com/services/new/incoming-webhook/</a> to create a Slack Webhook.</li>
                            <li>When creating the Slack Webhook, choose the specific channel where you want to receive alerts.</li>
                          </ol>
                        </div>
                      </>}
                    {slackDetails && <Result status='success' title={slackStatus ? 'Slack Integrated' : 'Slack Notifications Paused'} subTitle={slackStatus ? 'You will receive notifications for app downtime and custom alerts directly on Slack.' : 'You have paused notifications for app downtime and custom alerts on Slack.'} extra={[<Button type='primary' onClick={this.updateSlackNotifications.bind(this, !slackStatus)} key='1'> {slackStatus ? 'Pause Notifications' : 'Resume Notifications'} </Button>, <Button type='danger' onClick={this.deleteSlack.bind(this)} key='2'> Remove Slack </Button>]} />}
                  </TabPane>
                </Tabs>
              </Content>
            </Content>
          </Col>
        </Row>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Integrations));