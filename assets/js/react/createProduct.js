import React from 'react';
class CreateProductComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            id: null,
            categories: [],
            selectedCategoryId: -1,
            name: '',
            description: '',
            price: '',
            successCreation: null
        }
    }
    componentDidMount() {
        this.serverRequestCat = $.get("category/readAll", function (categories) {
            this.setState({
                categories: categories
            });
        }.bind(this));
        let productId=this.props.productId;
        if(!productId) {
            $('.page__header h1').text('Create product');
        } else {
             this.serverRequestProd = $.post("product/view/"+productId,       
             function (product) {
                let p = product;
                this.setState({selectedCategoryId: p.category_id});
                this.setState({id: p.id});
                this.setState({name: p.name});
                this.setState({description: p.description});
                this.setState({price: p.price});
              }.bind(this));
 
            $('.page__header h1').text('Update product');
        }
    }
    componentWillUnmount() {
        if(this.serverRequestCat) {
            this.serverRequestCat.abort();
        }
        if(this.serverRequestProd) {
            this.serverRequestProd.abort();
        }
    }
    // handle category change
    onCategoryChange(e) {
        this.setState({selectedCategoryId: e.target.value});
    }
 
    // handle name change
    onNameChange(e) {
        this.setState({name: e.target.value});
    }
 
    // handle description change
    onDescriptionChange(e) {
        this.setState({description: e.target.value});
    }
 
    // handle price change
    onPriceChange(e) {
        this.setState({price: e.target.value});
    }
    onSave(e){
        $.post("product/create", {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            category_id: this.state.selectedCategoryId
        },
        function(res){
            this.setState({successCreation: res.success});
            if(res.success && !this.state.id) {
                this.setState({name: ""});
                this.setState({description: ""});
                this.setState({price: ""});
                this.setState({selectedCategoryId: -1});
            }
        }.bind(this)
        );
        e.preventDefault();
    }
    
    render() {
 
    // make categories as option for the select tag.
    var categoriesOptions = this.state.categories.map(function(category){
        return (
            <option key={category.id} value={category.id}>{category.name}</option>
        );
    });
 
    /*
    - tell the user if a product was created
    - tell the user if unable to create product
    - button to go back to products list
    - form to create a product
    */
    return (
    <div>
        {
 
            this.state.successCreation == true ?
                <div className='alert alert-success'>
                    Product was saved.
                </div>
            : null
        }
 
        {
 
            this.state.successCreation == false ?
                <div className='alert alert-danger'>
                    Unable to save product. Please try again.
                </div>
            : null
        }
 
        <a href='#'
            onClick={() => this.props.changeAppMode('read')}
            className='btn btn-primary margin-bottom-1em'> Read Products
        </a>
 
 
        <form onSubmit={this.onSave}>
            <table className='table table-bordered table-hover'>
            <tbody>
                <tr>
                    <td>Name</td>
                    <td>
                        <input
                        type='text'
                        className='form-control'
                        value={this.state.name}
                        required
                        onChange={this.onNameChange} />
                    </td>
                </tr>
 
                <tr>
                    <td>Description</td>
                    <td>
                        <textarea
                        type='text'
                        className='form-control'
                        required
                        value={this.state.description}
                        onChange={this.onDescriptionChange}>
                        </textarea>
                    </td>
                </tr>
 
                <tr>
                    <td>Price ($)</td>
                    <td>
                        <input
                        type='number'
                        step="0.01"
                        className='form-control'
                        value={this.state.price}
                        required
                        onChange={this.onPriceChange}/>
                    </td>
                </tr>
 
                <tr>
                    <td>Category</td>
                    <td>
                        <select
                        onChange={this.onCategoryChange}
                        className='form-control'
                        value={this.state.selectedCategoryId}>
                        <option value="-1">Select category...</option>
                        {categoriesOptions}
                        </select>
                    </td>
                </tr>
 
                <tr>
                    <td></td>
                    <td>
                        <button
                        className='btn btn-primary'
                        onClick={this.onSave}>Save</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </form>
    </div>
    );
}
};

export default CreateProductComponent