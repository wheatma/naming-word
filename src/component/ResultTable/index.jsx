import React, { PureComponent } from 'react';
import { Table } from 'antd';

const columns = [{
    title: '字',
    dataIndex: 'word',
    key: 'word'
}, {
    title: '音',
    dataIndex: 'pronounce',
    key: 'pronounce'
}, {
    title: '音调',
    dataIndex: 'tone',
    key: 'tone'
}, {
    title: '笔画',
    dataIndex: 'stroke',
    key: 'stroke'
}, {
    title: '五行',
    dataIndex: 'element',
    key: 'element'
}, {
    title: '字意',
    dataIndex: 'meaning',
    key: 'meaning'
}, {
    title: '运势',
    dataIndex: 'fate',
    key: 'fate',
    render(text) {
        return text === '' ? '平' : (text === '2' ? '吉' : '凶');
    }
}];

const locale = {
    emptyText: '暂无数据'
};

export default class ResultTable extends PureComponent {
    render() {
        const {
            dataSource,
        } = this.props;
        return (
            <Table
                dataSource={dataSource}
                columns={columns}
                locale={locale}
                pagination={{
                    defaultPageSize: 50,
                    pageSizeOptions: ['50', '100', '150', '200'],
                    showSizeChanger: true,
                    showTotal: total => `共 ${total} 条`
                }}
                bordered
            />
        )
    }
}