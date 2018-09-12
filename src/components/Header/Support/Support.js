import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { I18n } from 'react-i18next';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setUserEmail } from 'Actions';
import config from 'Config';

class Support extends Component {
  state = {
    loading: false,
    success: null,
    showForm: true,
  };

  componentDidMount() {
    if (this.props.email.value) {
      this.setState({
        email: this.props.email.value,
        emailFetched: true,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.state.show !== this.props.show) {
      this.setState({
        show: this.props.show,
      });
    }

    if (prevProps.email !== this.props.email) {
      if (this.props.email.value) {
        this.setState({
          email: this.props.email.value,
          emailFetched: true,
        });
      }
    }
  }

  handleSubmit = event => {
    event.preventDefault();

    this.setState({ loading: true });

    this.props.setUserEmail(this.state.email);

    axios({
      method: 'post',
      contentType: 'application/json',
      url: `${config.API_BASE_URL}/support/`,
      headers: { Authorization: 'Bearer ' + localStorage.token },
      data: {
        email: this.state.email,
        name: this.state.name,
        telephone: this.state.telephone,
        message: this.state.message,
        subject: this.state.subject,
      },
    })
      .then(response => {
        this.setState({ loading: false, showForm: false, success: true });
      })
      .catch(error => {
        this.setState({ loading: false, showForm: false, success: false });
      });
  };

  close = () => {
    this.setState({ success: null, showForm: true });
    this.props.onClose();
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <I18n ns="translations">
        {t => (
          <Modal id="support" show={this.state.show} onHide={this.close}>
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this.close}>
                  <i className="material-icons">clear</i>
                </button>
                <h4 className="modal-title">{t('support.1')}</h4>
              </div>

              <div className="modal-body">
                <div className="row">
                  <div className="col-xs-12 col-sm-6">
                    <h3>{t('support.3')}</h3>
                    <p>If have any problems, comments or suggestions, please contact us at</p>
                    <p>
                      <a href="mailto:support@coinsready.io">support@coinsready.io</a>
                    </p>
                  </div>
                </div>

  
              </div>
            </div>
          </Modal>
        )}
      </I18n>
    );
  }
}

const mapStateToProps = ({ email }) => ({ email });
const mapDistachToProps = dispatch => bindActionCreators({ setUserEmail }, dispatch);

export default connect(
  mapStateToProps,
  mapDistachToProps
)(Support);
