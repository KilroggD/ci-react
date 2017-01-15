<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Product extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('product_model');
        $this->load->model('category_model');
        $this->load->helper('url_helper');
    }

    public function create()
    {
        //post data
        $result = [];
        $data = $this->input->post();
        $this->load->library('form_validation');
        $this->form_validation->set_rules('name', 'Name', 'required');
        if ($this->form_validation->run() === false) {
            $result = ["success" => false, "message" => "Product name is required"];
        } else {
            $this->product_model->set_product($data);
            $result = ["success" => true, "message" => "Product added successfully"];
        }
        $this->output
                ->set_content_type('application/json')
                ->set_output(json_encode($result));
    }

    public function delete()
    {
        $params = $this->input->post();
        if(isset($params["id"])) {
            $this->product_model->delete_product($params["id"]);
            $result = ["success"=>true,"message"=>"Deleted successfully"];
        } else {
            $result = ["success"=>false, "message"=>"ID not found"];
        }
        $this->output
                ->set_content_type('application/json')
                ->set_output(json_encode($result));
    }

    public function update()
    {
        
    }

    public function view($id=null)
    {
        $product = $this->product_model->get_product($id);
        $category = $this->category_model->get_category($product["category_id"]);
        $product["category_name"] = $category["name"];
        $this->output
                ->set_content_type('application/json')
                ->set_output(json_encode($product));
    }

    public function readAll()
    {
        $products = $this->product_model->get_product();
        $this->output
                ->set_content_type('application/json')
                ->set_output(json_encode($products));
    }

}
