import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import auth, { authorUrl } from '../../../core/auth';
import request from '../../../core/auth/request';
import { fetchAuthorList } from "../../../store/actions/thunks";
import * as selectors from '../../../store/selectors';
import { useNavigate, useParams } from "react-router-dom";
import Select from 'react-select'
import { Modal } from 'react-bootstrap';
import api from '../../../core/api';
import LoadingSpinner from '../LoadingSpinner'

const GlobalStyles = createGlobalStyle`
  .btn-account{
    display: flex;
    justify-content: center;
  }
  .btn-modal-footer{
    display: flex;
    flex-wrap: wrap;
    flex-shrink: 0;
    align-items: center;
    justify-content: flex-end;
    padding: .75rem;
  }
  .forgotton{
    font-size: 12px;
    margin-right: auto;
  }
  .errormessage{
    color: red;
  }
  // input[type="submit"][disabled]:hover
  // {
  //   border: 2px outset ButtonFace;
  //   color: GrayText;
  //   cursor: inherit;
  //   background-color: #ddd;
  //   background: #ddd;
  // }
  input[type="submit"][disabled]
  {
    opacity: 0.5;
  }
  .btn-password{
    background-color: rgb(0, 154, 213);
    display: block;
    width: max-content;
    text-align: center;
    color: #fff !important;
    // background: #FC4118;
    border-radius: 6px;
    letter-spacing: normal;
    outline: 0;
    font-weight: 800;
    text-decoration: none;
    padding: 8px 40px;
    font-size: 14px;
    border: none
    // background-color: #FC4118;
  }
  .btn-account input{
    margin-left: 5px;
    margin-right: 5px;
  }
  .btn-destroy{
    display: block;
    width: max-content;
    text-align: center;
    color: #fff !important;
    background: #FC4118;
    border-radius: 6px;
    letter-spacing: normal;
    outline: 0;
    font-weight: 800;
    text-decoration: none;
    padding: 8px 40px;
    font-size: 14px;
    border: none
    // background-color: #FC4118;
  }
`;

const validationSchema = Yup.object().shape({
  email: Yup.lazy(() =>
    Yup.string()
      .required('email is required')
  ),
  // address: Yup.lazy(() =>
  //   Yup.string()
  //     .required('Wallet is required')
  // ),
});

const validationPasswordSchema = Yup.object().shape({
  current_password: Yup.lazy(() =>
    Yup.string()
      .required('current password is required')
  ),
  new_password: Yup.lazy(() =>
    Yup.string()
      .required('new password is required')
  ),
});

const Account = () => {
  // let { authorId } = useParams();
  const navigate = useNavigate();
  const jwt = auth.getToken();
  const userInfo = auth.getUserInfo();
  const authorId = userInfo.id;

  const authorsState = useSelector(selectors.authorsState);
  const author = authorsState.data ? authorsState.data : null;

  const initialValues = {
    email: author && author.email ? author.email : '',
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthorList(authorId));
  }, [dispatch, authorId]);

  const handleSubmitForm = async (data) => {
    const requestURL = authorUrl(authorId);
    await request(requestURL, { method: 'PUT', body: { data: data } })
      .then((response) => {
      }).catch((err) => {
        console.log(err);
      });
  }

  const conversionOptions = [
    { value: 'eth', label: 'ETH' },
    { value: 'fiat', label: 'FIAT' },
  ]

  const currencyOptions = [
    { value: 'eur', label: 'EUR' },
    { value: 'gbp', label: 'GBP' },
    { value: 'usd', label: 'USD' },
  ]
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isSaveChange, setSaveChange] = useState(false)
  const [new_pwd, setNewPwd] = useState()
  const [old_pwd, setOldPwd] = useState()
  const [showErr1, setErr1] = useState(false)
  const [showErr2, setErr2] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const changePassword = () => {
    setShow(true)
  }
  const handleChangePassword = async (passwords) => {
    console.log("password=>", passwords)
  }
  console.log("isLoading=>", isLoading)
  const destroyAccount = () => {

  }

  const onChangeField2 = (e) => {
    console.log("dede=>", e.target.value)
    if (e.target.value === '' || e.target.value === null) {
      setErr2(true)
      setSaveChange(false)
    } else {
      setErr2(false)
      setOldPwd(e.target.value)
      if (new_pwd !== null || new_pwd !== '')
        setSaveChange(true)
    }
  }

  const onChangeField1 = (e) => {
    if (e.target.value === '' || e.target.value === null) {
      setErr1(true)
      setSaveChange(false)
    } else {
      setErr1(false)
      setNewPwd(e.target.value)
      if (old_pwd !== null || old_pwd !== '')
        setSaveChange(true)
    }
  }

  const onSaveChanges = async() => {
    setLoading(true);
    const requestURL = api.localbaseUrl +'/update_account';
    const data = { userId: authorId, new_password: new_pwd, old_password: old_pwd }
    await request(requestURL, { method: 'PUT', body: { data } })
      .then((response) => {
        console.log("response=>", response)
      }).catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div>
      <GlobalStyles />
      {/* <section id='profile_banner' className='jumbotron breadcumb no-bg' style={{ backgroundImage: `url(${(author && author.banner != null? (api.publicUrl + "/uploads/profiles/" + author.banner) : '/uploads/4_1ec08f99e2.jpg')})` }}>
        <div className='mainbreadcumb'>
        </div>
      </section> */}

      <div id="section-main" aria-label="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 d-flex">
              <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={initialValues}
                validateOnMount={validationSchema.isValidSync()}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  setSubmitting(true);
                  await handleSubmitForm(values);
                  setSubmitting(false);
                  resetForm();
                }}
              >
                {
                  ({ values, isSubmitting, isValid }) => {
                    return (
                      <Form className="form-border w-100">
                        <div className="de_tab tab_simple">
                          <div className="de_tab_content">
                            <div className="tab-1">
                              <div className="row wow fadeIn animated" style={{ backgroundSize: 'cover', visibility: 'visible', animationName: 'fadeIn' }}>
                                <div className="col-lg-8 mb-sm-20">
                                  <div className="field-set">
                                    <h5>Email</h5>
                                    <Field type="text" name="email" id="email" className="form-control" placeholder="Enter email" />
                                    <ErrorMessage name="email" component="div" className="errormessage" />
                                    <div className="spacer-20"></div>

                                    <h5>Conversion</h5>
                                    <Select name="item_conversion" id="item_conversion" options={conversionOptions} defaultValue={conversionOptions[0]} />
                                    <ErrorMessage name="conversion" component="div" className="errormessage" />
                                    <div className="spacer-20"></div>

                                    <h5>Currency</h5>
                                    <Select name="item_currency" id="item_currency" options={currencyOptions} defaultValue={currencyOptions[0]} />
                                    <ErrorMessage name="currency" component="div" className="errormessage" />
                                    <div className="spacer-20"></div>
                                  </div>
                                  <div className="btn-account">
                                    <input type="submit" id="submit" className="btn-main" value="Update" />
                                    <input type="button" onClick={() => setShow(true)} id="changepassword" className="btn-password" value="Change Password" />
                                    <input type="button" onClick={() => destroyAccount()} id="destroy" className="btn-destroy" value="Destroy" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>


                      </Form>
                    )
                  }
                }
              </Formik>
            </div>
            {!isLoading? show && <Modal show={show} onHide={handleClose}>
              <Modal.Header>
                <Modal.Title>Change your password</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="form-border w-100">
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <div className="tab-1">
                        <div className="row wow fadeIn animated" style={{ backgroundSize: 'cover', visibility: 'visible', animationName: 'fadeIn' }}>
                          <div className="col-lg-12 mb-sm-20">
                            <div className="field-set">
                              <h5>Current password</h5>
                              <input type="password" onChange={(e) => onChangeField1(e)} name="current_password" id="current_password" className="form-control" placeholder="Your current password" />
                              {showErr1 && <div className="errormessage">Current password is required</div>}
                              <div className="spacer-20"></div>

                              <h5>New password</h5>
                              <input type="password" onChange={(e) => onChangeField2(e)} name="new_password" id="new_password" className="form-control" placeholder="Your new password" />
                              {showErr2 && <div className="errormessage">New password is required</div>}
                              <div className="spacer-20"></div>
                            </div>
                            <div className="btn-modal-footer">
                              <span className="forgotton" onClick={() => handleClose()}>Password forgotten?</span>
                              <input type="button" onClick={() => onSaveChanges()} id="submit" className="btn-password" value="Save Changes" disabled={!isSaveChange} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal.Body>
            </Modal> : <LoadingSpinner />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Account);