import React, { useState } from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import DetailTabsWrapper from 'shared/components/detail-tab-wrapper/DetailTabsWrapper';
import CompanyInformation from './components/CompanyInformation';
import 'styles/form/form.scss';
import ChangePassword from './components/ChangePassword';

function UserProfilePage() {
  const [activeTab, setActiveTab] = useState(0);

  const { company: companyData, profile: userData } = useSelector(state => state.user);
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} lg={3}>
        <Card>
          <CardContent>
            <Typography sx={{ fontWeight: 'bold' }}>Company Logo</Typography>

            <img
              style={{
                width: '100%',
                minHeight: '100px',
                maxHeight: '400px',
                objectFit: 'contain',
              }}
              src={companyData.logo}
              alt="Company Logo"
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={9}>
        <Card>
          <CardContent>
            <DetailTabsWrapper
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabsList={['Company Info', 'Change Password']}
            >
              {activeTab === 0 && <CompanyInformation companyData={companyData} />}
              {activeTab === 1 && <ChangePassword userData={userData} />}
            </DetailTabsWrapper>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default UserProfilePage;
