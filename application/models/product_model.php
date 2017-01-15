<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Product_model extends CI_Model
{

    //put your code here
    public function __construct()
    {
        $this->load->database();
    }

    public function get_product($id = FALSE)
    {
        if ($id === FALSE) {
            $query = $this->db->get('products');
            return $query->result_array();
        }

        $query = $this->db->get_where('products', array('id' => $id));
        return $query->row_array();
    }

    public function set_product($data)
    {        
        $id = isset($data["id"])?$data["id"]:null;
        if (!$id) {
            if (!isset($data["created"])) {
                $data["created"] = date(DATE_W3C);
            }
            return $this->db->insert('products', $data);
        } else {
            if (!isset($data["modified"])) {
                $data["modified"] = date(DATE_W3C);
            }
            $this->db->where('id', $id);
            return $this->db->update('products', $data);
        }
    }

    public function delete_product($id)
    {
        $this->db->where('id', $id);
        return $this->db->delete('products');
    }

}
