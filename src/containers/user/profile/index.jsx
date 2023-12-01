import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
// shared components and styles
import DetailTabsWrapper from 'shared/components/detail-tab-wrapper/DetailTabsWrapper';
import ChangePassword from './components/ChangePassword';
import CompanyInformation from './components/CompanyInformation';
import 'styles/form/form.scss';

function UserProfilePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const { company: companyData, profile: userData } = useSelector(state => state.user);
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>Account Info</Typography>
          <Button
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={12} lg={3}>
        <Card>
          <CardContent>
            <Typography sx={{ fontWeight: 'bold' }}>Company Logo</Typography>

            <img
              style={{
                width: '95%',
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
              tabStyles={{ textTransform: 'capitalize' }}
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
