import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  head: {
    fontSize: 13,
  },
  content: {
    fontSize: 10,
    textAlign: 'justify',
  },
  contentHead: {
    fontWeight: 'bold',
  },
});

const TermsAndNotes = ({ notes, terms, setTopMargin }) => (
  <View style={{ marginTop: setTopMargin ? 20 : 0 }}>
    {!!notes && (
      <View>
        <Text style={styles.head}>Notes</Text>
        <Text style={styles.content}>{notes}</Text>
      </View>
    )}
    {!!terms && (
      <View style={{ marginTop: 20 }}>
        <Text style={styles.head}>Terms & Conditions</Text>
        <Text style={styles.content}>{terms}</Text>
      </View>
    )}
  </View>
);

TermsAndNotes.propTypes = {
  terms: PropTypes.string,
  notes: PropTypes.string,
  setTopMargin: PropTypes.bool,
};

TermsAndNotes.defaultProps = {
  terms: null,
  notes: null,
  setTopMargin: false,
};

export default TermsAndNotes;
