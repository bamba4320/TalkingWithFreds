import React from 'react';

interface IProps{}
interface IState{}

export default class HomePageContainer extends React.Component<IProps, IState>{
    constructor(props:IProps){
        super(props);
    }

    public render(){
        return(
            <div>
                home page
            </div>
        )
    }
}