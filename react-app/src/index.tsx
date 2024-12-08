import React from 'react';
import http from 'http';
import {renderToPipeableStream} from 'react-dom/server'
import Page from './page';



const server = http.createServer((req, res) => {
    const stream = renderToPipeableStream(<Page />);
    stream.pipe(res);
});

server.listen(3019, () => {
    console.log('Server started at http://localhost:3019/')
});