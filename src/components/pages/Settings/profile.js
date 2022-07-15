import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import auth, { authorUrl } from '../../../core/auth';
import request from '../../../core/auth/request';
import api from "../../../core/api";
import { fetchAuthorList } from "../../../store/actions/thunks";
import * as selectors from '../../../store/selectors';
import axios from "axios";
import LoadingSpinner from '../LoadingSpinner'

const GlobalStyles = createGlobalStyle`
  .upload-avatar{
    color: white;
    // font-weight: bold;
    background-color:#0066FF;
    border-color: #0066FF;
    border-radius: 8px;
  }
  .btn-profile{
    width: 40%;
  }
  .btn-discord{
    width: 40%;
    background-color: rgb(0, 154, 213);
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .btn-twitter{
    width: 40%;
    background-color: rgb(114, 137, 218);
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

const validationSchema = Yup.object().shape({
  name: Yup.lazy(() =>
    Yup.string()
      .required('Username is required')
  ),
});

const Profile = () => {
  const jwt = auth.getToken();
  const userInfo = auth.getUserInfo();
  const authorId = userInfo.id;
  
  const authorsState = useSelector(selectors.authorsState);
  const author = authorsState.data ? authorsState.data : null;
  
  const initialValues = {
    username: author && author.username ? author.username : '',
    about: author && author.about ? author.about : '',
    social: author && author.social ? author.social : '',
    address: author && author.address ? author.address : ''
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthorList(authorId));
  }, [dispatch, authorId]);

  const handleSubmitForm = async (data) => {
    setLoading(true)
    if(profileImage)
    handleSubmitProfilePicture(profileImage, 'avatar');
    
    const requestURL = authorUrl(authorId);
    
    await request(requestURL, { method: 'PUT', body: { data: data } })
      .then((response) => {
        console.log("response=>", response)
      }).catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleSubmitProfilePicture = async (file, field) => {
    var formData = new FormData()

    formData.append('file', file)
    formData.append('ref', 'api::author.author') // link the image to a content type
    formData.append('refId', authorId) // link the image to a specific entry
    formData.append('field', field) // link the image to a specific field
    
    await axios({
      method: 'post',
      url: `${api.localbaseUrl}/upload`,
      data: formData,
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "multipart/form-data"
      }
    }).then(res => {
      console.log("res=>", res)
    }).catch(err => {
      console.log(err)
    });
  }

  const [profileImage, setProfileImage] = useState();
  const [profileImageTemp, setProfileImageTemp] = useState(null);

  const [isLoading, setLoading] = useState(false);    //component loading

  const handleProfilePicture = (event) => {
    
    let file = event.target.files[0];
    setProfileImage(file)
    let reader = new FileReader();
    reader.onloadend = () => {
      setProfileImageTemp(reader.result)
    };
    reader.readAsDataURL(file);
  }
  
  const hiddenFileInput = React.useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  }

  return (
    <div>
      <GlobalStyles />
      <div id="section-main" aria-label="section">
        <div className="container">
          <div className="row">
            {isLoading? <LoadingSpinner /> :
            <div className="col-lg-10 offset-lg-1 d-flex">
              <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={initialValues}
                validateOnMount={validationSchema.isValidSync(initialValues)}
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
                                    <h5>Username</h5>
                                    <Field type="text" name="username" id="username" className="form-control" placeholder="Enter username" />
                                    <ErrorMessage name="username" component="div" className="errormessage" />
                                    <div className="spacer-20"></div>

                                    <h5>About</h5>
                                    <Field component="textarea" name="about" id="about" className="form-control" placeholder="Tell the world who you are!" />
                                    <ErrorMessage name="bio" component="div" className="errormessage" />
                                    <div className="spacer-20"></div>

                                    <h5>Social</h5>
                                    <Field type="text" name="social" id="social" className="form-control" placeholder="Enter Social URLs like Instagram or Twitter" />
                                    <ErrorMessage name="social" component="div" className="errormessage" />
                                    <div className="spacer-20"></div>

                                    <h5>Wallet</h5>
                                    <Field type="text" name="address" id="address" className="form-control" placeholder="Enter your Wallet Address" />
                                    <ErrorMessage name="address" component="div" className="errormessage" />
                                    <div className="spacer-20"></div>
                                  </div>
                                </div>
                                <div id="sidebar" className="col-lg-4">
                                  <h5>Profile image <i className="fa fa-info-circle id-color-2" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Recommend 400 x 400. Max size: 50MB. Click the image to upload." aria-label="Recommend 400 x 400. Max size: 50MB. Click the image to upload."></i></h5>
                                  <img
                                    src={author && (author.avatar) && (profileImageTemp === null)?  (api.publicUrl + "/uploads/profiles/" + author.avatar) : (profileImageTemp)? profileImageTemp : '../../img/author_single/author_thumbnail.jpg' }
                                    id="click_profile_img"
                                    className="d-profile-img-edit img-fluid"
                                    alt=""
                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                  />
                                  <input 
                                    name="profile_image" 
                                    type="file" 
                                    id="upload_profile_img" 
                                    style={{display: 'none'}} 
                                    ref={hiddenFileInput} 
                                    onChange={(event) => {handleProfilePicture(event)}} 
                                  />
                                  <button type="button" className="upload-avatar" onClick={() => handleClick()}>Upload an image</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <input type="submit" id="submit" className="btn-main btn-profile" value="Update profile" />
                        <input type="button" id="btn-discord" className="btn-main btn-discord" value="Connect your discord account" />
                        <input type="submit" id="btn-twitter" className="btn-main btn-twitter" value="Connect your twitter account" />
                      </Form>
                    )
                  }
                }
              </Formik>
            </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Profile);