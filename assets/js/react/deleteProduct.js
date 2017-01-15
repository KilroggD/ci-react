import React from 'react';
class DeleteProductComponent extends React.Component{
 
    componentDidMount() {
        $('.page__header h1').text('Delete product');
    }
 
    onDelete(){
        var productId = this.props.productId;
 
        $.post("product/delete",
            { id: productId },
            function(res){
                this.props.changeAppMode('read');
            }.bind(this)
        );
    }
    render(){
 
        return (
            <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-6'>
                    <div className='panel panel--default'>
                        <div className='panel__body text-align-center'>Are you sure?</div>
                        <div className='panel__footer clearfix'>
                            <div className='text-align-center'>
                                <button onClick={this.onDelete}
                                    className='btn btn-danger m-r-1em'>Yes</button>
                                <button onClick={() => this.props.changeAppMode('read')}
                                    className='btn btn-primary'>No</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-3'></div>
            </div>
        );
    }
};

export default DeleteProductComponent