import { Component } from 'react';
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import Productos from './components/Productos';
import Title from './components/Title';

class App extends Component {
  state = {
    productos: [
      { name: 'Tomate', price: 1500, img: '/productos/tomate.jpg' },
      { name: 'Arvejas', price: 2500, img: '/productos/arvejas.jpg' },
      { name: 'Lechuga', price: 500, img: '/productos/lechuga.jpg' },
    ],
    cart: [],
    isCartVisible: false,
  }

  addToCart = (product) => {
    // console.log(product);
    const { cart } = this.state

    if (cart.find(x => x.name === product.name)) {
      const newCart = cart.map(x => x.name === product.name
        ? ({
          ...x,
          quantity: x.quantity + 1
        })
        : x
      )
      
      return this.setState({ cart: newCart })
    }

    return this.setState({
      cart: this.state.cart.concat({
        ...product,
        quantity: 1,
      })
    })
  }

  showCart = () => {
    if (!this.state.cart.length) {
      return
    }
    this.setState({ isCartVisible: !this.state.isCartVisible })
  }

  render() {
    const { isCartVisible } = this.state

    return (
      <div>
        <Navbar 
          cart={this.state.cart}
          isCartVisible={isCartVisible}
          showCart={this.showCart} 
        />
        <Layout>
          <Title />
          <Productos 
            agregarAlCarro={this.addToCart}
            productos={this.state.productos}
          />
        </Layout>
      </div>
    )
  }
}

export default App;