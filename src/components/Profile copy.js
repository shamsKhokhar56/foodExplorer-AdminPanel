import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import './Profile.css'

export const Profile = () => {

    const [oldPass, setOldPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [newPass2, setNewPass2] = useState('')


    return (
        <div className="profileMain">
            <div className="ChangePasswordView" >
                <div className="form-main">
                    <div className="p-text-center heading-text">Change Password</div>
                    <div className="form-inner">
                        <div className="form-group">
                            <span className="p-float-label">
                                <Password toggleMask={true} value={oldPass} feedback={false}
                                    onChange={(e) => setOldPass(e.target.value)}
                                />
                                <label htmlFor="password">Old Password</label>
                            </span>
                        </div>
                        <div className="form-group">
                            <span className="p-float-label">
                                <Password toggleMask={true} value={newPass} feedback={false}
                                    onChange={e => setNewPass(e.target.value)}
                                />
                                <label htmlFor="password">New Password</label>
                            </span>
                        </div>
                        <div className="form-group">
                            <span className="p-float-label">
                                <Password toggleMask={true} value={newPass2} feedback={false}
                                    onChange={e => setNewPass2(e.target.value)}
                                />
                                <label htmlFor="password">Confirm New Password</label>
                            </span>
                        </div>
                    </div>
                    <div className="signin-button">
                        <Button label="Update Password" className="p-button-rounded p-button-warning" />
                    </div>
                </div>
            </div>
        </div>
    );
}
