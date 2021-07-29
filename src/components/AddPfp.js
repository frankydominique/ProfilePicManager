//TODO add link input and make redirect page to link input when pfp is clicked
import React, { Component } from 'react'

import firebase from '../firebase/firebase';

const storage = firebase.storage();
const db = firebase.firestore();

export default class AddPfp extends Component {
    
    constructor(props){
        super(props);
        this.state={
            name: '',
            file: null,
            fileDisplay: null,
            link: '',
            acctdesc: ''
        };

        this.fileInputRef = React.createRef();
    }
    
    onImageSelected(e) {
        let file = null;
        if(e.target.files.length) {
            file = e.target.files[0];

            const reader = new FileReader();
            reader.onload = ((res) => {
                const display = res.target.result;
                this.setState({ fileDisplay : display });
            });
            reader.readAsDataURL(file);
        }

        this.setState({ file: file });
    }

    onFormSubmit(e) {
        e.preventDefault();
        const { file } = this.state;
        if (!file) {return;}
        this.uploadFile(file);
    }

    async uploadFile(file) {
        // TODO

        const uploadImg = storage.ref('image/' + file.name).put(file);
        uploadImg.on('state_changed',
            (snap) => {
                console.log(snap.bytesTransferred / snap.totalBytes * 100);
            },
            (err) => { alert(err); },
            async () => {
                const downloadUrl = await uploadImg.snapshot.ref.getDownloadURL();
                this.saveImage(downloadUrl);
            });
    }
    
    async saveImage(downloadUrl) {
        // TODO 

        db.collection('pfp-alpha').add({ downloadUrl: downloadUrl, link: this.state.link, acctDesc: this.state.acctdesc });
        //db.collection('pfp-alpha').add({ link: this.state.link });
    }

    render() {

        const { fileDisplay } = this.state;

        return (
            <div className='card text-center'>
                <h3 className="mb-3">Add Profile Picture</h3>
                <h5>
                    This app keeps track of all your profile pictures of your different accounts and allows you to jump to that account from the profile picture.
                </h5>
                <div className="card p-3">
                    <div style={{fontWeight: 'bold'}}>Profile Picture</div>

                    {
                        fileDisplay ?
                        <div style={{ width: '250px', height: '200px'}}>
                        <img style={{ width: '100%', height: '100%', objectFit: 'cover'}} src={fileDisplay} alt="pfp"/>
                        </div>
                        :
                        <div></div>
                    }

                    

                    <input ref={this.fileInputRef} onChange={(e) => this.onImageSelected(e)} type="file" style={{display: 'none'}}/>
                    <button type="button" className="btn btn-primary" onClick={() => this.fileInputRef.current.click()}>
                        Choose Image
                    </button>
                    
                </div>

                <form onSubmit={(e) => this.onFormSubmit(e)}>
                <div className="input-group mb-3">
                    <label className="form-label">Add link to account here: </label>
                    <input 
                    value={this.state.link}
                    onChange={(e) => this.setState({link: e.target.value})}
                    type="text" 
                    className="form-control"
                    placeholder="link to account" />
                    <label className="form-label">Add account description here: </label>
                    <input 
                    value={this.state.link}
                    onChange={(e) => this.setState({acctdesc: e.target.value})}
                    type="text" 
                    className="form-control"
                    placeholder="link to account" />
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-secondary">
                        Save Pfp
                    </button>
                </div>
                </form>
            </div>
        )
    }
}
