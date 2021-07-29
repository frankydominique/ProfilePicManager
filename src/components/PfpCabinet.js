import React, { Component } from 'react'
import firebase from '../firebase/firebase';

const db = firebase.firestore();

export default class PfpCabinet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pfps: [],
        };
    }

    componentDidMount(){
        this.fetchPfp();
    }
    
    async fetchPfp() {
        try{
            const snapshot = await db.collection('pfp-alpha').get();
            const pfps = snapshot.docs.map(doc => {
                return {id: doc.id, ...doc.data()}
            });

            this.setState({ pfps: pfps })
        } catch(err) {
            console.log(err);
        }
    }

    render() {
        const { pfps } = this.state;
        return (
            <div className="d-flex flex-wrap" style={{borderColor: 'black'}}>
                {
                    pfps.map(pfp => {
                        return <div className="card m-3" key={pfp.id} style={{width: '400px', height: '400px', borderRadius: '50%', borderColor: 'black'}}>
                            <a href={pfp.link} target="_blank" rel="noreferrer">
                                <img style={{ 
                                    width: '400px', 
                                    height: '400px', 
                                    objectFit: 'cover',
                                    borderRadius: '50%',
                                }} 
                                    src={pfp.downloadUrl} 
                                    alt="pfp"/>
                            </a>
                        </div>
                    })
                }
            </div>
        )
    }
}
