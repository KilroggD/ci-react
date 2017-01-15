<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Category_model extends CI_Model
{

    //put your code here
    public function __construct()
    {
        $this->load->database();
    }

    public function get_category($id = FALSE)
    {
        if ($id === FALSE) {
            $query = $this->db->get('categories');
            return $query->result_array();
        }

        $query = $this->db->get_where('categories', array('id' => $id));
        return $query->row_array();
    }

    public function set_category($data)
    {
        $id = isset($data["id"])?$data["id"]:null;
        if (!$id) {
            if (!isset($data["created"])) {
                $data["created"] = date(DATE_W3C);
            }
            return $this->db->insert('categories', $data);
        } else {
            if (!isset($data["modified"])) {
                $data["modified"] = date(DATE_W3C);
            }
            $this->db->where('id', $id);
            return $this->db->update('categories', $data);
        }
    }

    public function delete_category($id)
    {
        $this->db->where('id', $id);
        return $this->db->delete('categories');
    }

}
