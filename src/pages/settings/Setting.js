import React, { Component } from 'react'
import ShortcutManual from '../../components/settings/ShortcutManual'
import ToastsMessage from '../../components/settings/ToastsMessage'
import UpdateMesurements from '../../components/settings/UpdateMesurements'

export default class Setting extends Component {
  render() {
    return (
      <div> 
        <div className='d-flex'>
        <UpdateMesurements/>
        <ShortcutManual/>
        </div>
      <ToastsMessage/>
        <div className="copyright-note">
          <p>
            copyright ©2022 all rights reserved{" "}
            <a href="http://perlaso.com/" target="_blank">
              {" "}
              PERLASO
            </a>
          </p>
        </div>
      </div>
    )
  }
}
