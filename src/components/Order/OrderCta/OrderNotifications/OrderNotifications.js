import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import GetNotified from './images/get-notified.svg';
import styles from '../OrderCta.scss';

class OrderNotifications extends Component {
  renderForm(t) {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className={styles['form-group']}>
          <input
            type="email"
            name="email"
            placeholder={t('notify.email')}
            onChange={this.props.handleChange}
            value={this.props.email}
            disabled={this.props.emailFetched}
            required
          />

          <button type="submit" className={`btn btn-primary ${styles.btn}`} disabled={this.props.emailFetched}>
            {t('generalterms.submit')}
          </button>

          {this.props.message.text && <h4 className={styles.message}>{this.props.message.text}</h4>}
        </div>
      </form>
    );
  }

  render() {
    return (
      <I18n ns="translations">
        {t => (
          <div className="col-xs-12">
            <div className={`box ${styles.container}`}>
              <div className="row">
                <div className="col-xs-12 visible-xs text-center">
                  <img className={styles.img} src={GetNotified} alt={t('notify.alt')} />
                </div>

                <div className={`col-xs-12 col-sm-7 ${styles.text}`}>
                  <h2 className={styles.title}>{t('notify.explanation')}
                  <div className={styles.links}>
                    <a
                      className={styles.link}
                      href={`https://facebook.com/sharer.php?u=https://www.facebook.com/coinsready.io`}
                      target="_blank"
                      onClick={() => {
                        window.ga('send', 'event', {
                          eventCategory: 'Referrals',
                          eventAction: 'Social click',
                          eventValue: 'facebook',
                      });
                    }}
                  >
                    <i className="fab fa-facebook-f" aria-hidden="true" />
                    </a>
                    <a
                      className={styles.link}
                      href={`https://twitter.com/intent/tweet?text=Great%20cryptocurrency%20exchange!%20Follow @coinsreadyIO&url=https://twitter.com/coinsreadyIO`}
                      target="_blank"
                      onClick={() => {
                        window.ga('send', 'event', {
                          eventCategory: 'Referrals',
                          eventAction: 'Social click',
                          eventValue: 'twitter',
                        });
                      }}
                    >
                      <i className="fab fa-twitter" aria-hidden="true" />
                    </a>
                  </div>
                  </h2>
                </div>

                <div className="col-ms-2 col-sm-5 hidden-xs text-center">
                  <img className={styles.img} src={GetNotified} alt={t('notify.alt')} />
                </div>
              </div>
            </div>
          </div>
        )}
      </I18n>
    );
  }
}

export default OrderNotifications;
