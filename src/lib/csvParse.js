import Papa from 'papaparse';

export default (file) => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            download: true,
            complete(results) {
                resolve(results.data);
            },
            error(error) {
                reject(error);
            }
        });
    });
}