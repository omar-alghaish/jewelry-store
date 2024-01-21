/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Link } from "react-router-dom";
import Popover from "react-bootstrap/Popover";
const popper = () => {
  const popover1 = () => (
    <Popover className="popover1">
      <Popover.Title as="h3">Popover title</Popover.Title>
      <Popover.Content>
        <p>And here's some amazing content. It's very engaging. Right?</p>
      </Popover.Content>
    </Popover>
  );
  const popover2 = () => (
    <Popover className="popover2">
      <Popover.Title as="h3">Popover title</Popover.Title>
      <Popover.Content>
        <p>And here's some amazing content. It's very engaging. Right?</p>
      </Popover.Content>
    </Popover>
  );
  const popover3 = () => (
    <Popover className="popover3">
      <Popover.Title as="h3">Popover title</Popover.Title>
      <Popover.Content>
        <p>And here's some amazing content. It's very engaging. Right?</p>
      </Popover.Content>
    </Popover>
  );
  const popover4 = () => (
    <Popover className="popover4">
      <Popover.Content>
        <p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus.</p>
      </Popover.Content>
    </Popover>
  );
  const popover5 = () => (
    <Popover className="popover5">
      <Popover.Content>
        <p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus.</p>
      </Popover.Content>
    </Popover>
  );
  const popover6 = () => (
    <Popover className="popover6">
      <Popover.Content>
        <p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus.</p>
      </Popover.Content>
    </Popover>
  );
  const popover7 = () => (
    <Popover className="popover7">
      <Popover.Content>
        <p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus.</p>
      </Popover.Content>
    </Popover>
  );
  return (
    <div className="page-wrapper cardhead">
      <div className="content">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Popover</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/dream-pos/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Popover</li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          {/* Popover */}
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Basic Popover</h5>
              </div>
              <div className="card-body card-buttons">
                <div className="popover-list">
                  <button
                    className="btn btn-primary me-1"
                    type="button"
                    data-bs-toggle="popover"
                    title="Popover title"
                    data-bs-content="And here's some amazing content. It's very engaging. Right?"
                  >
                    Click to toggle popover
                  </button>
                  <a
                    className="example-popover btn btn-primary me-1"
                    tabIndex={0}
                    role="button"
                    data-bs-toggle="popover"
                    data-bs-trigger="focus"
                    title="Popover title"
                    data-bs-content="And here's some amazing content. It's very engaging. Right?"
                  >
                    Dismissible popover
                  </a>
                  <button
                    className="example-popover btn btn-primary me-1"
                    type="button"
                    data-bs-trigger="hover"
                    data-container="body"
                    data-bs-toggle="popover"
                    data-bs-placement="bottom"
                    title="Popover title"
                    data-offset="-20px -20px"
                    data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                  >
                    On Hover Tooltip
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* /Popover */}
          {/* Popover */}
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Direction Popover</h5>
              </div>
              <div className="card-body card-buttons">
                <div className="popover-list">
                  <button
                    className="example-popover btn btn-primary me-1"
                    type="button"
                    data-container="body"
                    data-bs-toggle="popover"
                    data-bs-placement="top"
                    title="Popover title"
                    data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                  >
                    Popover on top
                  </button>
                  <button
                    className="example-popover btn btn-primary me-1"
                    type="button"
                    data-container="body"
                    data-bs-toggle="popover"
                    data-bs-placement="right"
                    data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                  >
                    Popover on right
                  </button>
                  <button
                    className="example-popover btn btn-primary me-1"
                    type="button"
                    data-container="body"
                    data-bs-toggle="popover"
                    data-bs-placement="bottom"
                    data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                  >
                    Popover on bottom
                  </button>
                  <button
                    className="example-popover btn btn-primary me-1"
                    type="button"
                    data-container="body"
                    data-bs-toggle="popover"
                    data-bs-placement="left"
                    data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                  >
                    Popover on left
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* /Popover */}
        </div>
      </div>
    </div>
  );
};
export default popper;
