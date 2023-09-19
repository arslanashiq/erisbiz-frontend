import React from 'react';
import PropTypes from 'prop-types';
import { Document, Page, StyleSheet, Font } from '@react-pdf/renderer';

Font.registerHyphenationCallback(word => [word]);

const styles = StyleSheet.create({
  page: {
    padding: 20,
    paddingTop: 40,
    color: '#000000',
    fontStyle: 'normal',
    fontWeight: 400,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    '@media max-width: 400': {
      flexDirection: 'column',
    },
  },
});

function MainComponent({ pageSize, subject, title, children }) {
  return (
    <Document author="Luxury Explorers" keywords="receipt" subject={subject} title={title}>
      <Page style={styles.page} size={pageSize}>
        {children}
      </Page>
    </Document>
  );
}

MainComponent.propTypes = {
  pageSize: PropTypes.string,
  subject: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

MainComponent.defaultProps = {
  pageSize: 'letter',
};
export default MainComponent;
