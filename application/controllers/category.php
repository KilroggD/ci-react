<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Category extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('category_model');
        $this->load->helper('url_helper');
    }

    /**
     * Update or delete data
     */
    public function create()
    {
        $result = [];
        $data = $this->input->post();                
        $this->load->library('form_validation');
        $this->form_validation->set_rules('name', 'Name', 'required');
        if ($this->form_validation->run() === false) {
            $result = ["success" => false, "message" => "Category name is required"];
        } else {
            $this->category_model->set_product($data);
            $result = ["success" => true, "message" => "Category added successfully"];
        }
        $this->output
                ->set_content_type('application/json')
                ->set_output(json_encode($result));
    }

    public function delete()
    {
        
    }

    public function update()
    {
        
    }

    public function view($id)
    {
        $categories = $this->category_model->get_category($id);
        $this->output
                ->set_content_type('application/json')
                ->set_output(json_encode($categories));
    }

    public function readAll()
    {
        $categories = $this->category_model->get_category();
        $this->output
                ->set_content_type('application/json')
                ->set_output(json_encode($categories));
    }

}
