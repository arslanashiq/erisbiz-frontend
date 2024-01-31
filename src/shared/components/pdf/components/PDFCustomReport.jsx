/* eslint-disable react/prop-types */
import React from 'react';
import { v4 as uuid } from 'uuid';
import { Font, PDFViewer, StyleSheet, Text, View } from '@react-pdf/renderer';
import palette from 'styles/mui/theme/palette';
import MainComponent from './MainComponent';
import PDFHeader from './PDFHeader';

const BORDER_COLOR = '#ccc';
// const BORDER_STYLE = `1px solid ${BORDER_COLOR}`;
const BORDER_STYLE = '';
const COLN_WIDTH = 100 / 7;

Font.register({
  family: 'Lato Bold',
  src: 'https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPHA.ttf',
});
const styles = StyleSheet.create({
  table: {
    display: 'table',
    width: '100%',
    // borderStyle: BORDER_STYLE, removed style as  applying conditionaly
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 5,
    border: BORDER_STYLE,
    fontWeight: 600,
    fontSize: 8,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 0.6,
  },
  tableHeader: {
    borderStyle: BORDER_STYLE,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    textAlign: 'right',
    flexDirection: 'column',
    width: `${COLN_WIDTH}%`,
  },
  tableBody: {
    borderTopWidth: 0,
    textAlign: 'right',
    flexDirection: 'column',
    width: `${COLN_WIDTH}%`,
  },

  tableCell: {
    margin: 5,
  },
});
const headingsBgColor = '#08517e';

function PDFCustomReport({
  tableHeader,
  reportTitle,
  companyName,
  companyLogo,
  company,
  email,
  TRN,
  timeInterval,
  isMultiReport,
  tableBody,
  modifiedTableHead,
  tableFooter,
}) {
  const renderReport = (header, body, footer) => (
    <View key={uuid()} style={[styles.table, { border: BORDER_STYLE }]}>
      {/* table Head */}
      <View style={[styles.tableRow, { backgroundColor: headingsBgColor, color: '#fff' }]}>
        {header.map(cell => (
          <View
            key={uuid()}
            style={{
              ...styles.tableHeader,
              width: `${100 / tableHeader.length}%`,
              ...cell.style,
            }}
          >
            <Text style={styles.tableCell}>{cell.title}</Text>
          </View>
        ))}
      </View>

      {/* table Body */}

      {body.length > 0 ? (
        <>
          <View>
            {body.map(tableRow => (
              <View key={uuid()} style={styles.tableRow}>
                {tableRow.map(tableCell => (
                  <View
                    key={uuid()}
                    style={{
                      ...styles.tableBody,
                      width: `${100 - tableRow.length}%`,
                      ...tableCell.style,
                    }}
                  >
                    <Text style={styles.tableCell}>{tableCell.value}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
          {/* table Footer */}
          <View>
            {footer.map(tableRow => (
              <View key={uuid()} style={styles.tableRow}>
                {tableRow.map(tableCell => (
                  <View
                    key={uuid()}
                    style={{
                      ...styles.tableBody,
                      width: `${100 - tableRow.length}%`,
                      ...tableCell.style,
                    }}
                  >
                    <Text style={styles.tableCell}>{tableCell.value}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </>
      ) : (
        <View style={{ width: '100%', textAlign: 'center' }}>
          <Text style={{ fontSize: 12, padding: 10 }}>No Data Available</Text>
        </View>
      )}
    </View>
  );
  return (
    <PDFViewer id="report-pdf-print" style={{ height: '75vh', width: '100%' }}>
      <MainComponent subject={reportTitle} title={reportTitle}>
        {/* header */}
        <PDFHeader
          companyName={companyName}
          companyLogo={companyLogo}
          companyDetail={company}
          companyEmail={email}
          companyTRN={TRN}
          reportTitle={reportTitle}
          timeInterval={timeInterval}
        />
        {isMultiReport
          ? tableBody.map((body, index) => renderReport(modifiedTableHead[index], body, tableFooter[index]))
          : renderReport(tableHeader, tableBody, tableFooter)}

        <View
          style={{
            width: '100%',
            justifyContent: 'end',
            alignItems: 'center',
            position: 'absolute',
            bottom: 10,
          }}
        >
          <Text style={{ color: palette.primary.main, fontSize: 10 }}>
            This document has been generated electronically and does not necessitate a physical stamp or
            signature
          </Text>
        </View>
      </MainComponent>
    </PDFViewer>
  );
}

export default PDFCustomReport;
