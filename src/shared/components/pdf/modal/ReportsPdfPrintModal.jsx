import React from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import { Button, Stack, Typography } from '@mui/material';
import StyledDialog from 'styles/mui/component/StyledDialog';
import { Font, PDFViewer, StyleSheet, Text, View } from '@react-pdf/renderer';
import { useSelector } from 'react-redux';
import MainComponent from '../components/MainComponent';
import PDFHeader from '../components/PDFHeader';

const BORDER_COLOR = '#08517e';
const BORDER_STYLE = '1px solid #08517e';
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
    fontSize: 7,
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

function ReportsPdfPrintModal({
  isPrintModalOpen,
  setIsPrintModalOpen,
  reportTitle,
  tableHeader,
  tableBody,
  tableFooter,
  isMultiReport,
  modifiedTableHead,
}) {
  const { name: companyName, logo: companyLogo } = useSelector(state => state.user.company);

  const handleClose = () => {
    setIsPrintModalOpen(false);
  };
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
    </View>
  );
  return (
    <div className="order-detail-wrapper">
      <StyledDialog
        maxWidth={false}
        open={isPrintModalOpen}
        onClose={handleClose}
        className="theme-light modal-dialog--custom-max-width"
      >
        <Stack spacing={2} sx={{ width: 900 }}>
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
              <PDFHeader companyName={companyName} companyLogo={companyLogo} />
              {isMultiReport
                ? tableBody.map((body, index) => renderReport(modifiedTableHead[index], body, tableFooter[index]))
                : renderReport(tableHeader, tableBody, tableFooter)}
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
  isMultiReport: PropTypes.bool,
  modifiedTableHead: PropTypes.array,
};
ReportsPdfPrintModal.defaultProps = {
  isPrintModalOpen: false,
  setIsPrintModalOpen: () => {},
  reportTitle: '',
  tableHeader: [],
  tableBody: [],
  tableFooter: [],
  isMultiReport: false,
  modifiedTableHead: [],
};

export default ReportsPdfPrintModal;
