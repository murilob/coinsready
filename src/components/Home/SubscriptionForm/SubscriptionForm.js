import React from 'react';
import jsonp from 'jsonp';
import styles from './SubscriptionForm.scss';
import { I18n, Trans } from 'react-i18next';

const getAjaxUrl = url => url.replace('/post?', '/post-json?');
const subscribeUrl = 'https://nexchange.us16.list-manage.com/subscribe/post?u=918b60ce5b05d82384c293db0&amp;id=b2af978303';

class SubscriptionForm extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = {
      status: null,
      msg: null,
    };
  }

  onSubmit = e => {
    e.preventDefault();
    if (!this.input.value || this.input.value.length < 5 || this.input.value.indexOf('@') === -1) {
      this.setState({
        status: 'error',
      });
      return;
    }

    const url = getAjaxUrl(subscribeUrl) + `&EMAIL=${encodeURIComponent(this.input.value)}`;
    this.setState(
      {
        status: 'sending',
        msg: null,
      },
      () =>
        jsonp(
          url,
          {
            param: 'c',
          },
          (err, data) => {
            if (err) {
              this.setState({
                status: 'error',
                msg: err,
              });
            } else if (data.result !== 'success') {
              this.setState({
                status: 'error',
                msg: data.msg,
              });
            } else {
              this.setState({
                status: 'success',
                msg: data.msg,
              });
            }
          }
        )
    );
  };

  render() {
    const { action } = this.props;
    const { status } = this.state;

    return (
      <I18n ns="translations">
        {(t, { i18n }) => (
          <div className={styles.container}>
            <div className="container text-center">
              <h2>{t('subscription.1')}</h2>
                <Trans i18nKey='subscription.6'>
      <h3>Don't hesitate and get in touch with us. Send a message to <a href="mailto:support@coinsready.io">support@coinsready.io</a></h3>
                </Trans>
            </div>
          </div>
        )}
      </I18n>
    );
  }
}

export default SubscriptionForm;
