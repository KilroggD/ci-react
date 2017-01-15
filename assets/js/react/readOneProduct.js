import React from 'react';
class ReadOneProductComponent extends React.Component {
    constructor() {
        super();
        this.state={
            id: 0,
            name: '',
            description: '',
            price: 0,
            category_name: ''
        }
    }
    // on mount, read one product based on given product ID
    componentDidMount() {
 
        let productId = this.props.productId;
 
        this.serverRequestProd = $.post("product/view/"+productId,
            function (product) {
                var p = product;
                this.setState({category_name: p.category_name});
                this.setState({id: p.id});
                this.setState({name: p.name});
                this.setState({description: p.description});
                this.setState({price: p.price});
            }.bind(this));
 
        $('.page__header h1').text('Read Product');
    }
 
    // on unmount, kill fetching the product data in case the request is still pending
    componentWillUnmount() {
        this.serverRequestProd.abort();
    }
 
    // show single product data on a table
    render() {
 
        return (
            <div>
                <a href='#'
                    onClick={() => this.props.changeAppMode('read')}
                    className='btn btn-primary margin-bottom-1em'>
                    Read Products
                </a>
 
                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{this.state.name}</td>
                        </tr>
 
                        <tr>
                            <td>Description</td>
                            <td>{this.state.description}</td>
                        </tr>
 
                        <tr>
                            <td>Price ($)</td>
                            <td>${parseFloat(this.state.price).toFixed(2)}</td>
                        </tr>
 
                        <tr>
                            <td>Category</td>
                            <td>{this.state.category_name}</td>
                        </tr>
 
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
};

export default ReadOneProductComponent;