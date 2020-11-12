
import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import ClientFunc from '../../clientFunc.js';
import Input from './input.js';

function Table(props) {

    var page_size_props = props.page_size;
    if (!props.page_size) page_size_props = 10;

    const [data, set_data] = useState([]);
    const [metadata, set_metadata] = useState({ fields: [] });
    const [order_by, set_order_by] = useState({});
    const [page_size, set_page_size] = useState(page_size_props);
    const [page_number, set_page_number] = useState(0);

    var query = {};
    query.order_by = order_by;
    query.paging = {};
    query.paging.limit = page_size;
    query.paging.offset = page_number * page_size;

    ClientFunc.entity_op(set_data, [order_by, page_size, page_number], true, props.entity, "get", query, "get");
    ClientFunc.entity_op(set_metadata, [], true, props.entity, "metadata", null, "get");

    function apply_order_by(field) {
        var order_by_f = "";
        if (order_by && order_by.length > 0) order_by_f = order_by[0];

        if (order_by_f == "" || base_field(order_by_f) != field) {
            order_by_f = field;
        } else {
            order_by_f = switch_field(order_by_f);
        }

        var order_by2 = [];
        order_by2.push(order_by_f);
        set_order_by(order_by2);
    }

    function switch_field(field) {
        if (field.startsWith("-")) return field.substring(1, field.length);
        return "-" + field;
    }

    function base_field(field) {
        if (field.startsWith("-")) return field.substring(1, field.length);
        return field;
    }

    function render_header() {
        return (<tr className='table_header'>
            {Object.keys(metadata.fields).map((field, index) => {
                return (<td key={index}><a href="#" onClick={() => apply_order_by(field)}>{field}</a></td>);
            })}
        </tr>)
    }

    function render_data() {
        return data.map((row, index) => {
            return (
                <tr className='table_row' key={index}>
                    {Object.keys(metadata.fields).map((field, index) => {
                        return (<td key={index}>{row[field]}</td>);
                    })}
                </tr>);
        })
    }

    function next_page(value) {
        set_page_number(page_number+value);
    }

    function render_pager() {
        return (
            <div>
                Page size: <Input value={page_size} set={set_page_size}></Input>
                <a href="#" onClick={() => next_page(-1)}>{'<'}</a>
                <Input value={page_number} set={set_page_number}></Input>
                <a href="#" onClick={() => next_page(+1)}>{'>'}</a>
            </div>
        );
    }

    return (
        <div className="table">
            Table!!!!
            <table>
                {render_header()}
                {render_data()}
                {render_pager()}
            </table>
            <div className="pager">

            </div>
        </div>
    );
}

export default Table;

