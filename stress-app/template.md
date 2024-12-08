# Benchmark Results

The following page contains benchmark results for server-side rendering of dynamic pages in Next.js 15.0.4.

The goal of this test is to demonstrate how well the Next.js server can handle a large number of concurrent requests.

If you wish, you can run this test locally by following the instructions in the [README.md](https://github.com/WIVSW/next.js-stress-testing/blob/main/README.md).

## How the Benchmark Works

The benchmark sends concurrent requests to several pages.

Each page renders a [list of 10,000 items](https://github.com/vercel/next.js/blob/canary/bench/rendering/pages/stateless-big.js).

Each page is rendered dynamically for every incoming request.

| Route path              | Served by      | Description                                                                                                                                         |
| ----------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| /next-app-router        | App Router     | Server Component Page                                                                                                                               |
| /next-pages-router      | Pages Router   | Regular Page                                                                                                                                        |
| /react                  | Custom Server  | Regular [React 19 rendering](https://react.dev/reference/react-dom/server/renderToPipeableStream#rendering-a-react-tree-as-html-to-a-nodejs-stream) |
| /use-client-route       | App Router     | Page with `use client` on top of it                                                                                                                 |

I used two different benchmarking tools to generate concurrent requests:
1. [Apache Benchmark](https://httpd.apache.org/docs/current/programs/ab.html)
2. [Artillery](https://www.artillery.io/docs)


During the test, the Next.js server was run on Node.js v22 inside a Docker container with 2 CPU cores and 2 GB of RAM.

## Apache Benchmark Results

During this test, I sent 500 requests in total to each page with a concurrency limit of 50 requests.

{{ ab-results }}


## Artillery Results

The Artillery test shows the same results but also includes charts.

| Route path           | Sent Requests                                          | Received Responses                                      |
| -------------------- | ------------------------------------------------------ | ------------------------------------------------------- |
| /next-app-router     | [link](./next-app-router.html#http-requests-wrapper)   | [link](./next-app-router.html#http-codes-200-wrapper)   |
| /next-pages-router   | [link](./next-pages-router.html#http-requests-wrapper) | [link](./next-pages-router.html#http-codes-200-wrapper) |
| /react               | [link](./react.html#http-requests-wrapper)             | [link](./react.html#http-codes-200-wrapper)             |
| /use-client-route    | [link](./use-client-route.html#http-requests-wrapper)  | [link](./use-client-route.html#http-codes-200-wrapper)  |

## Conclusion

It appears that pages served by the App Router can handle fewer requests than those served by the Pages Router.

It is also interesting to note that when we add the `use client` directive to an App Router page, it can handle more requests per second.

I believe there is room for improvement.