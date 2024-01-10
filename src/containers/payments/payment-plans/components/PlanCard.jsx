import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
// import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router';
import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';

const PricingList = styled('ul')({
  margin: 0,
  padding: 0,
  listStyle: 'none',
});
function PlanCard({ plan, xs, sm, md }) {
  const navigate = useNavigate();
  return (
    <Grid item key={plan.title} xs={xs} sm={sm} md={md}>
      <Card>
        <CardHeader title={plan.title} sx={{ textAlign: 'center' }} />
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'baseline',
              mb: 2,
            }}
          >
            <Typography component="h2" variant="h3" color="text.primary">
              ${plan.price}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              /mo
            </Typography>
          </Box>
          <PricingList>
            {plan.description.map(line => (
              <Typography component="li" variant="subtitle1" align="center" key={line}>
                {line}
              </Typography>
            ))}
          </PricingList>
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            onClick={() => {
              navigate(`/payment?plan_id=${plan.plan_id}`);
            }}
            fullWidth
          >
            {plan.buttonText}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

PlanCard.propTypes = {
  plan: PropTypes.object.isRequired,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
};
PlanCard.defaultProps = {
  xs: 12,
  sm: 6,
  md: 4,
};

export default PlanCard;
