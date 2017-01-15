/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// component that contains the functionalities that appear on top of
// the products table: create product
import React from 'react';
import ReactDOM from 'react-dom';
import CreateProductComponent from './createProduct.js';
import DeleteProductComponent from './deleteProduct.js';
import ReadProductsComponent from './readProducts.js';
import ReadOneProductComponent from './readOneProduct.js'
class MainApp extends React.Component{
    constructor(){
        super();
        this.state = {
            currentMode: 'read',
            productId: null
        }
    }
    changeAppMode(newMode, productId){
        this.setState({currentMode: newMode}); 
        if(productId !== undefined){
            this.setState({productId: productId});
        }
    }
    render() {
        let modeComponent =
            <ReadProductsComponent
            changeAppMode={this.changeAppMode.bind(this)} />;
        switch(this.state.currentMode){
            case 'read':
                break;
            case 'readOne':
                modeComponent = <ReadOneProductComponent productId={this.state.productId} changeAppMode={this.changeAppMode.bind(this)}/>;
                break;
            case 'create':
                modeComponent = <CreateProductComponent productId={null} changeAppMode={this.changeAppMode.bind(this)}/>;
                break;
            case 'update':
                modeComponent = <CreateProductComponent productId={this.state.productId} changeAppMode={this.changeAppMode.bind(this)}/>;
                break;
            case 'delete':
                modeComponent = <DeleteProductComponent productId={this.state.productId} changeAppMode={this.changeAppMode.bind(this)}/>;
                break;
            default:
                break;
    }
 
    return modeComponent;
    }
};

export default MainApp;


ReactDOM.render(
        < MainApp / > ,
        document.getElementById('content')
);

