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

            this.setState({ pfps: pfps})
        } catch(err) {
            console.log(err);
        }
    }

    render() {
        const { pfps } = this.state;
        return (
            <div className='card mt-5'>
                {
                    pfps.map(pfp => {
                        return <div key={pfp.id}>
                            <img style={{ 
                                width: '100%', 
                                height: '100%', 
                                objectFit: 'cover'
                            }} 
                                src={pfp.downloadUrl} alt="pfp"/>
                        </div>
                    })
                }
            </div>
        )
    }
}
