import React from 'react';
class CreateCategoryComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            id: null,
            name: '',
            description: '',
            successCreation: null
        }
    }
    componentDidMount() {
             let categoryId=this.props.categoryId;
             if(!categoryId) {
                $('.page__header h1').text('Create product');
             } else {
                this.serverRequest = $.post("category/view/"+categoryId,
                function (category) {
                    let c = category;
                    this.setState({id: c.id});
                    this.setState({name: c.name});
                    this.setState({description: c.description});                    
                }.bind(this));
                $('.page__header h1').text('Update category');
             }
    }
    componentWillUnmount() {
        if(this.serverRequest) {
            this.serverRequest.abort();
        }
    }

 
    // handle name change
    onNameChange(e) {
        this.setState({name: e.target.value});
    }
 
    // handle description change
    onDescriptionChange(e) {
        this.setState({description: e.target.value});
    }
 

    onSave(e){
        $.post("category/create", {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description,
        },
        function(res){
            this.setState({successCreation: res.success});
            if(res.success && !this.state.id) {
                this.setState({name: ""});
                this.setState({description: ""});
                this.setState({id:""});
            }
        }.bind(this)
        );
        e.preventDefault();
    }
    
    render() {
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
                    Category was saved.
                </div>
            : null
        }
 
        {
 
            this.state.successCreation == false ?
                <div className='alert alert-danger'>
                    Unable to save category. Please try again.
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

export default CreateCategoryComponent