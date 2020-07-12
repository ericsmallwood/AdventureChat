import React, { useEffect, useState } from 'react';
import { AccountService } from '../../services/account.service';
import { PropTypes } from '@material-ui/core';

export default function Confirmation (props) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    AccountService
      .confirmRegistration(props.match.params.code)
      .then(result => {
        if (result.error) {
          return setHasError(true);
        }

        setIsConfirmed(true);
      })
      .catch(error => {
        console.log(error);
        setHasError(true);
      });
  }, []);

  return isConfirmed
    ? <div>Thank you for confirming your account!</div>
    : hasError
      ? <div>An Error Occured, please try again.</div>
      : <></>;
}

Confirmation.propTypes = {
  match: PropTypes.any
};
