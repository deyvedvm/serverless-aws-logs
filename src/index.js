'use strict';

const AWS = require('aws-sdk');
AWS.config.update({region: process.env.AWS_REGION || 'us-east-2'});
const s3 = new AWS.S3();

async function getFileFromBucket(bucket, key) {

    const params = {
        Bucket: bucket,
        Key: key
    };

    console.log('Params: ', params);

    return s3.getObject(params, (err, file) => {

        if (err) {
            console.log('Error on get file: ', err);
        }

        return file;

    }).promise();
}

module.exports.handler = async event => {

    console.log('Environment Variables', JSON.stringify(process.env));

    console.log('Event:', JSON.stringify(event));

    console.log('Records:', JSON.stringify(event.Records));

    const bucket = event.Records[0].s3.bucket.name;

    console.log('Bucket: ', bucket);

    const key = event.Records[0].s3.object.key;

    console.log('Key: ', key);

    const file = await getFileFromBucket(bucket, key);

    console.log('File', file);

    return {
        message: 'Payload extracted!',
        event
    };
};
