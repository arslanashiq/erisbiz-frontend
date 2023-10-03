/* eslint-disable no-unused-vars */
import React from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import { Button, Stack, Typography } from '@mui/material';
import StyledDialog from 'styles/mui/component/StyledDialog';
import { PDFViewer, StyleSheet, Text, View } from '@react-pdf/renderer';
import MainComponent from '../components/MainComponent';
import LogoAndCompanyInfo from '../components/LogoAndCompanyInfo';
import PDFHeader from '../components/PDFHeader';

const BORDER_COLOR = '#08517e';
const BORDER_STYLE = '1px solid #08517e';
const COL1_WIDTH = 25;
const COLN_WIDTH = 100 / 7;

const styles = StyleSheet.create({
  table: {
    display: 'table',
    width: 'auto',
    // borderStyle: BORDER_STYLE, removed style as  applying conditionaly
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 5,
    border: BORDER_STYLE,
    fontWeight: 600,
    fontSize: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 0.6,
  },
  tableCol1Header: {
    borderStyle: BORDER_STYLE,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  tableColHeader: {
    width: `${COLN_WIDTH}'%`,
    // borderLeft: BORDER_STYLE,
    // borderLeftWidth: 0.5,
    borderTopWidth: 0,
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  tableColHeaderNoBorder: {
    width: `${COLN_WIDTH}'%`,
    borderTopWidth: 0,
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  tableColHalfHeader: {
    borderLeft: BORDER_STYLE,
    borderLeftWidth: 0.5,
    borderTopWidth: 0,
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    width: `${COLN_WIDTH / 2}'%`,
  },
  tableGrandTotal: {
    width: '100%',
    borderStyle: BORDER_STYLE,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    flexDirection: 'column',
    padding: 3,
    flexShrink: 1,
  },
  tableCol1: {
    width: `${COL1_WIDTH}'%`,
    borderStyle: BORDER_STYLE,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    flexDirection: 'column',
    paddingTop: 3,
    flexShrink: 1,
  },
  tableCol: {
    width: `${COLN_WIDTH}'%`,
    borderLeft: BORDER_STYLE,
    borderLeftWidth: 0.5,
    borderTopWidth: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 3,
  },
  tableColNoBorder: {
    width: `${COLN_WIDTH}'%`,
    borderTopWidth: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 3,
  },
  tableCell: {
    margin: 5,
    fontSize: 9,
  },
  tableCellDescription: {
    fontSize: 8,
    marginLeft: 5,
    // color: '#727272',
  },
});
const headingsBgColor = '#08517e';

function ReportsPdfPrintModal({
  isPrintModalOpen,
  setIsPrintModalOpen,
  reportTitle,
  tableHeader,
  tableBody,
  tableFooter,
}) {
  const handleClose = () => {
    setIsPrintModalOpen(false);
  };
  return (
    <div className="order-detail-wrapper">
      <StyledDialog
        maxWidth={false}
        open={isPrintModalOpen}
        onClose={handleClose}
        className="theme-light modal-dialog--custom-max-width"
      >
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ padding: 1 }}>
            <Stack direction="row" className="text-left">
              <Typography variant="h5">Privew</Typography>
            </Stack>
            <Stack>
              <Stack direction="row" spacing={2}>
                <Button color="primary">Print</Button>
                <Button color="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack sx={{ padding: 2 }}>
          <PDFViewer style={{ height: '75vh', width: '100%' }}>
            <MainComponent subject={reportTitle} title={reportTitle}>
              {/* header */}
              <PDFHeader />
              <View style={[styles.table, { border: BORDER_STYLE }]}>
                {/* table Head */}
                <View style={[styles.tableRow, { backgroundColor: headingsBgColor, color: '#fff' }]}>
                  {tableHeader.map(cell => (
                    <View
                      key={uuid()}
                      style={
                        (styles.tableCol1Header, { width: `${100 / tableHeader.length}%`, ...cell.style })
                      }
                    >
                      <Text style={styles.tableCell}>{cell.title}</Text>
                    </View>
                  ))}
                </View>

                {/* table Body */}

                <View>
                  {tableBody.map(tableRow => (
                    <View key={uuid()} style={styles.tableRow}>
                      {tableRow.map(tableCell => (
                        <View
                          key={uuid()}
                          style={{ ...styles.tableColHeader, width: `${100 - tableRow.length}%` }}
                        >
                          <Text style={styles.tableCell}>{tableCell.value}</Text>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>

                {/* table Footer */}
                <View>
                  {tableFooter.map(tableRow => (
                    <View key={uuid()} style={styles.tableRow}>
                      {tableRow.map(tableCell => (
                        <View
                          key={uuid()}
                          style={{ ...styles.tableColHeader, width: `${100 - tableRow.length}%` }}
                        >
                          <Text style={styles.tableCell}>{tableCell.value}</Text>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              </View>
            </MainComponent>
          </PDFViewer>
        </Stack>
      </StyledDialog>
    </div>
  );
}

ReportsPdfPrintModal.propTypes = {
  isPrintModalOpen: PropTypes.bool,
  setIsPrintModalOpen: PropTypes.func,
  reportTitle: PropTypes.string,
  tableHeader: PropTypes.array,
  tableBody: PropTypes.array,
  tableFooter: PropTypes.array,
};
ReportsPdfPrintModal.defaultProps = {
  isPrintModalOpen: false,
  setIsPrintModalOpen: () => {},
  reportTitle: '',
  tableHeader: [],
  tableBody: [],
  tableFooter: [],
};

export default ReportsPdfPrintModal;
