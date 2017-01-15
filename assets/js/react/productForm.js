/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';
class productForm extends React.Component{
   render(){
        
    /*
    - tell the user if a product was created
    - tell the user if unable to create product
    - button to go back to products list
    - form to create a product
    */
    return (
    <div>
        {
 
            this.state.successCreation == "true" ?
                <div className='alert alert-success'>
                    Product was saved.
                </div>
            : null
        }
 
        {
 
            this.state.successCreation == "false" ?
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

export default productForm;