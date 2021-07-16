import React, {Component} from 'react';
import { connect } from 'react-redux';
// import {robots} from './robots';
import Cardlist from '../components/Cardlist';
import Searchbox from '../components/Searchbox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import { requestRobots, setSearchField } from './action';

const mapStateToProps = state => {
    console.log(state)
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending:state.requestRobots.isPending,
        error:state.requestRobots.error
};
}


const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

class App extends Component {
    

    componentDidMount(){
        this.props.onRequestRobots()

    }

    // onSearchChange = (event) =>{
    //     this.setState({searchfield:event.target.value});
    // }
    render() {
        // const {robots} = this.state;
        const { searchField, onSearchChange, robots, isPending} = this.props;
        console.log(robots,searchField)
    
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
        return isPending ?
            <h1 className = "tc">Loading...</h1>:
        
        (
            <div className = 'tc'>
                <h1 className='f2'>RoboFriends</h1>
                <Searchbox searchChange = {onSearchChange} />
                <Scroll>
                    <ErrorBoundry>
                        <Cardlist robots = {filteredRobots} />
                    </ErrorBoundry>
                </Scroll>
            </div>
        );
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);