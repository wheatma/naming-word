import React, { PureComponent } from 'react';
import { Form, Select, Button, Row, Col, Input } from 'antd';

import { strokes, elements, tones, fates } from "./config";

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
    }
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 20,
            offset: 4
        }
    }
};

const initFormValue = {
    word: '',
    stroke: strokes[0].value,
    element: elements[0].value,
    tone: tones[0].value,
    fate: fates[0].value
};

const getRealValue = (field, value) => {
    if (field === 'word') {
        return value.target.value;
    }
    return value;
};


export default class QueryForm extends PureComponent {
    formValue = {
        ...initFormValue
    };

    handleChange = (field) => {
        return (value) => {
            this.formValue = {
                ...this.formValue,
                [field]: getRealValue(field, value)
            };
        };
    };
    handleQuery = () => {
        const { onQuery } = this.props;
        onQuery(this.formValue);
    };

    render() {
        const { loading } = this.props;
        return (
            <Form>
                <Row gutter={24}>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="字"
                        >
                            <Input onChange={this.handleChange('word')}/>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="笔画"
                        >
                            <Select
                                defaultValue={initFormValue.stroke}
                                onChange={this.handleChange('stroke')}
                            >
                                {
                                    strokes.map(({ value, text }) => <Option key={value} value={value}>{text}</Option>)
                                }
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="五行"
                        >
                            <Select
                                defaultValue={initFormValue.element}
                                onChange={this.handleChange('element')}
                            >
                                {
                                    elements.map(({ value, text }) => <Option key={value} value={value}>{text}</Option>)
                                }
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="发音"
                        >
                            <Select
                                defaultValue={initFormValue.tone}
                                onChange={this.handleChange('tone')}
                            >
                                {
                                    tones.map(({ value, text }) => <Option key={value} value={value}>{text}</Option>)
                                }
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="运势"
                        >
                            <Select
                                defaultValue={initFormValue.fate}
                                onChange={this.handleChange('fate')}
                            >
                                {
                                    fates.map(({ value, text }) => <Option key={value} value={value}>{text}</Option>)
                                }
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={8}>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" onClick={this.handleQuery} loading={loading}>查询</Button>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        );
    }
}