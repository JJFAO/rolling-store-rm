import React, {Component} from 'react';
import logo from '../logo.png';
import { Layout, Row, Col, Input } from 'antd';
import { Redirect, Link } from 'react-router-dom'
import { getInfoCustomer } from '../reducers'
import { connect } from 'react-redux'
const { Header } = Layout;
const { Search } = Input;

class CustomHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToResults: false,
      redirectToMain: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.updateList = this.props.updateList.bind(this);
  }
  
  setRedirectToMain = () => {
    this.handleClearTerm()
    this.props.updateList([], '')
    this.setState({
      redirectToMain: true,
      redirectToResults: false,
    })
  }

  renderRedirectToMain = () => {
    if (this.state.redirectToMain) {
      return <Redirect to='/' />
    }
  }

  setRedirectToResults = () => {
    this.setState({
      redirectToResults: true,
      redirectToMain: false,
    })
  }

  renderRedirectToResults = () => {
    if (this.state.redirectToResults) {
      return <Redirect to='/results' />
    }
  }

  handleChange(e) {
    let term = e.target.value;
    this.props.updateTerm(term)
  }

  handleClearTerm() {
    this.props.updateTerm('')
  }

  handleSearch(term) {
    const localTerm = term;
    let currentProducts = [];
    let newProducts = [];

    if (localTerm !== '' && localTerm.length > 2) {
      currentProducts = this.props.products;
      newProducts = currentProducts.filter(item => {
        const lc = item.name.toLowerCase();
        const filter = localTerm.toLowerCase();
        return lc.includes(filter);
      });
      this.props.updateList(newProducts, localTerm)
    } else {
      alert("debe ingresar al menos 3 caracteres")
      this.props.updateList(this.props.products, localTerm)
      return true
    }

    this.setRedirectToResults();
  }

  render() {
    const { customer } = this.props;

    return(
      <Header className='header'>
        <Row>
          <Col xs={{ span: 5 }} lg={{ span: 3 }}>
            {this.renderRedirectToMain()}
            <Link to={{ pathname: '/' }}>
              <img src={logo} className='header-logo' alt='logo' onClick={this.setRedirectToMain} />
            </Link>
          </Col>
          <Col xs={{ span: 19 }} lg={{ span: 16 }}>
            <div className='header-search'>
              {this.renderRedirectToResults()}
              <Search
                placeholder='¿Que queres comprar?'
                onSearch={() => this.handleSearch(this.props.term)}
                onChange={this.handleChange}
                value={this.props.term}
                enterButton
              />
              {
                this.props.term !== '' ?
                <div className={'clear-icon'} onClick={() => this.handleClearTerm()}>x</div>
                :
                <div />
              }
            </div>
          </Col>
          <Col xs={{ span: 0 }} lg={{ span: 5 }}>
            <div className='header-greetings'>Bienvenido {customer}</div>
          </Col>
        </Row>
      </Header>
    );
  }
}

const mapStateToProps = state => ({
  customer: getInfoCustomer(state)
})

export default connect(
  mapStateToProps
)(CustomHeader)