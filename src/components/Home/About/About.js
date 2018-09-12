import React from 'react';
import styles from './About.scss';
import { I18n, Trans } from 'react-i18next';

const About = () => (
  <I18n ns="translations">
    {t => (
      <div id="about" className={styles.about}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h2 className="title">{t('about.title')}</h2>
            </div>

            <div className="col-xs-12 col-sm-6">
              <p>{t('about.1')}</p>
              <p>{t('about.2')}</p>
              <Trans i18nKey="about.3">
                <p> We've gathered with <a href="https://n.exchange/?ref=RVRZW47XVEU" target="_blank" rel="noopener noreferrer">N.exchange</a> to make this platform after seeing firsthand the need for a secure, anonymous, fast and reliable exchange on the crypto market.</p>
              </Trans>
              <p>{t('about.4')}:</p>
            </div>

            <div className="col-xs-12 col-sm-6">
              <p>{t('about.5')}</p>

              <p>{t('about.6')}</p>
              <p>{t('about.7')}</p>
            </div>
          </div>
        </div>
      </div>
    )}
  </I18n>
);

export default About;
