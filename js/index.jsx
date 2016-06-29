const {
    'react': React,
    'react-dom': ReactDOM,
    'wfQuery': $,
    'antd': {
        Affix, Button, Row, Col, Form, Input
    }
} = window;

const FormItem = Form.Item;

let link = $('link[rel="stylesheet"]');
let cssHref = link.attr('href');
let holder = $('<div class="my-tools-bar"></div>');
$(document.body).append(holder);

holder.on('change', 'input', (e) => {
    let t = e.target;
    let data = {};
    data[t.name] = t.value;
    $.ajax({
        url: '/index.css',
        type: 'post',
        dataType: 'text',
        data,
        success: () => {
            link.attr({
                href: cssHref + '?' + +new Date
            });
        },
        error: () => {
            alert('服务端异常，请稍后尝试！');
        }
    })
});

$.ajax({
    url: '/theme.json',
    success: (theme) => {
        let keys = Object.keys(theme);
        ReactDOM.render(
        <Form horizontal>
            {keys.map((name) => {
            return (
                <FormItem>
                  <Input addonBefore={theme[name].name} name={name} defaultValue={theme[name].value}/>
                </FormItem>
            );
            })}
        </Form>
        , holder[0]);
    }
});