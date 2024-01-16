import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import { Box, Button, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

function PlanCard({ plan, xs, sm, md, lg }) {
  const navigate = useNavigate();

  return (
    <Grid item key={plan.title} xs={xs} sm={sm} md={md} lg={lg}>
      <Stack
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          minHeight: 470,
          justifyContent: 'space-between',
          marginBottom: 30,
        }}
      >
        <Stack>
          <Box
            style={{
              position: 'relative',
              height: '50px',
            }}
          >
            <img
              style={{
                width: '53%',
                maxWidth: '60%',
                height: '59px',
                position: 'absolute',
                top: 10,
                left: '-8.5%',
              }}
              decoding="async"
              src="https://wordpresss-data.s3.me-south-1.amazonaws.com/Wordpress/bes_img/tag-erisbiz.png"
              title=""
              alt=""
              loading="lazy"
            />
            <Typography
              style={{
                position: 'absolute',
                top: 20,
                color: '#F3F3F3',
                fontWeight: 'bold',
                // fontSize: 18,
                textDecoration: 'underline',
                fontFamily: '"Manrope", Sans-serif',
              }}
            >
              {plan.title}
            </Typography>
          </Box>

          <Typography
            style={{
              textAlign: 'center',
              color: '#086E99',
              fontSize: 35,
              fontWeight: 'bold',
            }}
          >
            ${plan.newPrice}
          </Typography>

          <Stack p={1}>
            {plan.planOptions?.map(option => (
              <Stack key={`${plan.planId}${option.label}`} direction="row" spacing={2} alignItems="center">
                {option.status ? (
                  <CheckIcon sx={{ color: 'green', fontSize: 15 }} />
                ) : (
                  <CloseIcon sx={{ color: 'red', fontSize: 15 }} />
                )}
                <Typography
                  sx={{
                    fontSize: 14,
                    lineHeight: 1.7,
                  }}
                >
                  {option.label}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
        <Stack pb={2} justifyContent="center" alignItems="center">
          <Button
            sx={{ width: 100 }}
            onClick={() => {
              navigate(`/register-company/payment?plan_id=${plan.planId}`);
            }}
          >
            Get Now
          </Button>
        </Stack>
      </Stack>
    </Grid>
  );
}

PlanCard.propTypes = {
  plan: PropTypes.object.isRequired,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
};
PlanCard.defaultProps = {
  xs: 12,
  sm: 12,
  md: 8,
  lg: 4,
};

export default PlanCard;
