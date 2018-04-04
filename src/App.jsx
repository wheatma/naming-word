import React, { PureComponent } from 'react';
import { message, Card } from 'antd';
import QueryForm from './component/QueryForm';
import ResultTable from './component/ResultTable';
import remoteCSVParse from './lib/csvParse';
import parseWordsFromCSV from './lib/parseWordsFromCSV';
import filterWords from './lib/filterWords';
import './style.css';

export default class App extends PureComponent {
    words = [];
    state = {
        filterWords: [],
        loading: false,
    };

    handleQuery = async (formValue) => {
        this.setState({
            loading: true,
        });
        const filteredWords = await filterWords(this.words, formValue);
        this.setState({
            filterWords: filteredWords,
            loading: false,
        });
    };

    async componentDidMount() {
        try {
            const wordsFromCSV = await remoteCSVParse('word.csv');
            this.words = parseWordsFromCSV(wordsFromCSV);
        } catch (e) {
            message.error(e.message);
        }
    }

    render() {
        const { filterWords, loading } = this.state;
        return (
            <div className="main-content">
                <Card className="card-row">
                    <QueryForm
                        onQuery={this.handleQuery}
                        loading={loading}
                    />
                </Card>
                <ResultTable
                    dataSource={filterWords}
                />
            </div>
        )
    }
}