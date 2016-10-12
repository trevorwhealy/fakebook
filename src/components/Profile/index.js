// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Match } from 'react-router';

import { viewProfilePage } from '../../actions';
import {
  currentProfileWithExtrasSelector,
} from '../../reducers/profiles.reducer';

import MaxWidthWrapper from '../MaxWidthWrapper';
import ProfileHeader from '../ProfileHeader';
import ProfileTabSelector from '../ProfileTabSelector';
import ProfileTimeline from '../ProfileTimeline';
import ProfileAbout from '../ProfileAbout';
import styles from './styles';


class Profile extends Component {
  componentDidMount() {
    this.props.viewProfilePage({ userName: this.props.params.userName });
  }

  render() {
    const { profile, params, location } = this.props;

    console.log("Rendering", profile)

    if (typeof profile === 'undefined') {
      // This means we're still loading our main profile info.
      // Don't bother rendering anything (except maybe a spinner?)
      return null;
    }

    if (profile === null) {
      // If the profile is `null`, it means that it wasn't able to be found.
      // TODO: Display a 404-type component.
      return null;
    }

    return (
      <MaxWidthWrapper mergeStyles={styles.profile}>
        <ProfileHeader profile={profile}/>
        <ProfileTabSelector
          userName={params.userName}
          location={location}
          numOfFriends={profile.friendIds.length}
        />

        <Match exactly pattern="/:userName/" component={ProfileTimeline} />
        <Match exactly pattern="/:userName/about" component={ProfileAbout} />
      </MaxWidthWrapper>
    );
  }
};

Profile.propTypes = {

};

Profile.defaultProps = {

};

const mapStateToProps = state => ({
  profile: currentProfileWithExtrasSelector(state),
});

export default connect(mapStateToProps, { viewProfilePage })(Profile);
