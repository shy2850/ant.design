const {
    'react': React,
    'react-dom': ReactDOM,
    'wfQuery': $,
    'antd': {
        Affix, Button, Row, Col, Form, Input
    }
} = window;

const FormItem = Form.Item;

let link = $('link[rel="stylesheet"][href="/index-2.css"]');
let cssHref = link.attr('href');
let holder = $('<div class="my-tools-bar"></div>');
$(document.body).append(holder);

holder.on('change', '.ant-form-item input', (e) => {
    let t = e.target;
    let data = {};
    data[t.name] = t.value;
    $.ajax({
        url: '/index-2.css',
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

class MyToolBar extends React.Component {
    constructor(props) {
        super(props);
    }
    filter(e) {
        this.setState({
            filter: e.target.value
        });
    }
    render() {
        let theme = this.props.theme;
        let filter = this.state ? this.state.filter : '';
        let keys = Object.keys(theme);
        return (
            <div>
                <Input size="large" placeholder="输入中文、英文或拼音检索" onChange={this.filter.bind(this)}/>
                <Form horizontal>
                    {keys.map((name) => {
                        let t = theme[name];
                        return (!filter || ~name.indexOf(filter) || ~t.name.indexOf(filter) || ~t.pinyin.indexOf(filter)) ? (
                            <FormItem>
                              <Input addonBefore={theme[name].name} name={name} defaultValue={theme[name].value}/>
                            </FormItem>
                        ) : '';
                    })}
                </Form>
            </div>
        );
    }
}

$.ajax({
    url: '/theme.json',
    success: (theme) => {
        ReactDOM.render(
            <MyToolBar theme={theme}/>
        , holder[0]);
    }
});