<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Test extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->library('unit_test');
    }

    public function index()
    {
        /* echo 'test index';
          exit(); */
        $test = 1 + 1;
        $expectedResult = 2;
        $testName = 'Adds one plus one';
        $this->unit->run($test, $expectedResult, $testName);
        var_dump($this->unit->result());
        die;
    }

    public function testOne()
    {
        $test = 1 + 1;
        $expectedResult = 2;
        $testName = 'Adds one plus one';
        $str = '
<table border="0" cellpadding="4" cellspacing="1">
    {rows}
        <tr>
        <td>{item}</td>
        <td>{result}</td>
        </tr>
    {/rows}
</table>';

        $this->unit->set_template($str);
        $this->unit->run($test, $expectedResult, $testName);
        echo $this->unit->report();
        die;
    }

}
