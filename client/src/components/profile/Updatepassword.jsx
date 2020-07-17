import React from 'react';
import { useState } from 'react';

const UpdatePassword = () => {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState({ input: '', confirmed: '' });
  const [authenticated, setAuthenticated] = useState(false);
  const [changeSuccessfull, setChangeSuccessfull] = useState(false);

  if (!authenticated) {
    return (
      <>
        <div style={{ marginTop: '30vh' }}>
          <span
            className="ProfileFont"
            style={{ marginRight: '.5em', fontWeight: '700' }}
          >
            Old Pasword:
          </span>

          <div className="ui small input">
            <input
              type="password"
              value={oldPass}
              style={{ width: '15em' }}
              onChange={(event) => setOldPass(event.target.value)}
            />
          </div>
          <div
            className="ui primary button"
            onClick={() => setAuthenticated(true)}
            style={{ marginLeft: '1em' }}
          >
            Next
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div style={{ marginTop: '30vh' }}>
          <div>
            {' '}
            <span
              className="ProfileFont"
              style={{ marginRight: '.5em', fontWeight: '700' }}
            >
              New Pasword:
            </span>
            <div className="ui small input">
              <input
                type="password"
                value={newPass.input}
                style={{ width: '15em' }}
                onChange={(event) =>
                  setNewPass({ ...newPass, input: event.target.value })
                }
              />
            </div>
          </div>

          <div style={{ marginTop: '1em', marginBottom: '1em' }}>
            <span
              className="ProfileFont"
              style={{ marginRight: '.5em', fontWeight: '700' }}
            >
              Confirm Pasword:
            </span>

            <div className="ui small input">
              <input
                type="password"
                value={newPass.confirmed}
                style={{ width: '15em' }}
                onChange={(event) =>
                  setNewPass({ ...newPass, confirmed: event.target.value })
                }
              />
            </div>
          </div>
          <div
            className="ui green button"
            onClick={() => setAuthenticated(true)}
            style={{ marginLeft: '1em' }}
          >
            Update Password
          </div>
        </div>
      </>
    );
  }
};

export default UpdatePassword;
