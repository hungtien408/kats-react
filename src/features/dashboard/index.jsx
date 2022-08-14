import { Grid } from '@material-ui/core';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import React from 'react';
import './styles.scss';

function Dashboard() {
  return (
    <div className="dashboard">
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <article className="card-block">
            <div className="card-body">
              <Grid container spacing={2}>
                <Grid item md={3}>
                  <div className="card-icon" style={{ background: '#24d7ac' }}>
                    <DescriptionOutlinedIcon className="icon" />
                  </div>
                </Grid>
                <Grid item md={9}>
                  <div className="box">
                    <div className="title">Đơn hàng</div>
                    <div className="number">300</div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </article>
        </Grid>
        <Grid item xs={6} md={3}>
          <article className="card-block">
            <div className="card-body">
              <Grid container spacing={2}>
                <Grid item md={3}>
                  <div className="card-icon" style={{ background: '#f53c56' }}>
                    <AssignmentOutlinedIcon className="icon" />
                  </div>
                </Grid>
                <Grid item md={9}>
                  <div className="box">
                    <div className="title">Duyệt giá</div>
                    <div className="number">200</div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </article>
        </Grid>
        <Grid item xs={6} md={3}>
          <article className="card-block">
            <div className="card-body">
              <Grid container spacing={2}>
                <Grid item md={3}>
                  <div className="card-icon" style={{ background: '#7764e4' }}>
                    <LocalShippingOutlinedIcon className="icon" />
                  </div>
                </Grid>
                <Grid item md={9}>
                  <div className="box">
                    <div className="title">Vận đơn</div>
                    <div className="number">500</div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </article>
        </Grid>
        <Grid item xs={6} md={3}>
          <article className="card-block">
            <div className="card-body">
              <Grid container spacing={2}>
                <Grid item md={3}>
                  <div className="card-icon" style={{ background: '#11cdef' }}>
                    <GroupOutlinedIcon className="icon" />
                  </div>
                </Grid>
                <Grid item md={9}>
                  <div className="box">
                    <div className="title">Khách hàng</div>
                    <div className="number">1000</div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </article>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
