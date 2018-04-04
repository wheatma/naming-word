import Papa from 'papaparse';

export default (file) => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            complete(results) {
                console.log("Finished:", results.data);
                resolve(results.data);
            },
            error(error) {
                reject(error);
            }
        });
    });
}